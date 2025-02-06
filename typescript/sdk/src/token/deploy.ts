import { LSP4DataKeys } from '@lukso/lsp4-contracts';
import { constants, ethers } from 'ethers';

import {
  ERC20__factory,
  ERC721Enumerable__factory,
  GasRouter,
  HypLSP7__factory,
  IERC4626__factory,
  IXERC20Lockbox__factory,
} from '@hyperlane-xyz/core';
import { assert, objKeys, objMap, rootLogger } from '@hyperlane-xyz/utils';

import { HyperlaneContracts } from '../contracts/types.js';
import { ContractVerifier } from '../deploy/verify/ContractVerifier.js';
import { HyperlaneIsmFactory } from '../ism/HyperlaneIsmFactory.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { GasRouterDeployer } from '../router/GasRouterDeployer.js';
import { ChainName } from '../types.js';

import { TokenType, gasOverhead } from './config.js';
import {
  HypNFTFactories,
  HypTokenFactories,
  TokenFactories,
  hypNFTcontracts,
  hypNFTfactories,
  hypTokencontracts,
  hypTokenfactories,
} from './contracts.js';
import {
  HypTokenRouterConfig,
  TokenMetadata,
  TokenMetadataSchema,
  WarpRouteDeployConfig,
  isCollateralTokenConfig,
  isNativeTokenConfig,
  isSyntheticRebaseTokenConfig,
  isSyntheticTokenConfig,
  isTokenMetadata,
} from './types.js';

abstract class TokenDeployer<
  Factories extends TokenFactories,
> extends GasRouterDeployer<HypTokenRouterConfig, Factories> {
  constructor(
    multiProvider: MultiProvider,
    factories: Factories,
    loggerName: string,
    ismFactory?: HyperlaneIsmFactory,
    contractVerifier?: ContractVerifier,
    concurrentDeploy = false,
  ) {
    super(multiProvider, factories, {
      logger: rootLogger.child({ module: loggerName }),
      ismFactory,
      contractVerifier,
      concurrentDeploy,
    }); // factories not used in deploy
  }

  async constructorArgs(
    _: ChainName,
    config: HypTokenRouterConfig,
  ): Promise<any> {
    if (isCollateralTokenConfig(config)) {
      return [config.token, config.mailbox];
    } else if (isNativeTokenConfig(config)) {
      return config.scale ? [config.scale, config.mailbox] : [config.mailbox];
    } else if (isSyntheticTokenConfig(config)) {
      assert(config.decimals, 'decimals is undefined for config'); // decimals must be defined by this point
      return [config.decimals, config.mailbox];
    } else if (isSyntheticRebaseTokenConfig(config)) {
      const collateralDomain = this.multiProvider.getDomainId(
        config.collateralChainName,
      );
      return [config.decimals, config.mailbox, collateralDomain];
    } else {
      throw new Error('Unknown token type when constructing arguments');
    }
  }

  // TODO: add parameter for LSP4Metadata in HypLSP7/8
  async initializeArgs(
    chain: ChainName,
    config: HypTokenRouterConfig,
  ): Promise<any> {
    const signer = await this.multiProvider.getSigner(chain).getAddress();
    const defaultArgs = [
      config.hook ?? constants.AddressZero,
      config.interchainSecurityModule ?? constants.AddressZero,
      // TransferOwnership will happen later in RouterDeployer
      signer,
    ];
    if (isCollateralTokenConfig(config) || isNativeTokenConfig(config)) {
      return defaultArgs;
    } else if (isSyntheticTokenConfig(config)) {
      return [config.totalSupply, config.name, config.symbol, ...defaultArgs];
    } else if (isSyntheticRebaseTokenConfig(config)) {
      return [0, config.name, config.symbol, ...defaultArgs];
    } else {
      throw new Error('Unknown collateral type when initializing arguments');
    }
  }

  // TODO: resolve metadata differently here for HypLSP7 / HypLSP7Collateral
  static async deriveTokenMetadata(
    multiProvider: MultiProvider,
    configMap: WarpRouteDeployConfig,
  ): Promise<TokenMetadata | undefined> {
    // this is used for synthetic token metadata and should always be 0
    const DERIVED_TOKEN_SUPPLY = 0;

    for (const [chain, config] of Object.entries(configMap)) {
      if (isTokenMetadata(config)) {
        return TokenMetadataSchema.parse(config);
      }

      if (isNativeTokenConfig(config)) {
        const nativeToken = multiProvider.getChainMetadata(chain).nativeToken;
        if (nativeToken) {
          return TokenMetadataSchema.parse({
            totalSupply: DERIVED_TOKEN_SUPPLY,
            ...nativeToken,
          });
        }
      }

      if (isCollateralTokenConfig(config)) {
        const provider = multiProvider.getProvider(chain);

        if (config.isNft) {
          const erc721 = ERC721Enumerable__factory.connect(
            config.token,
            provider,
          );
          const [name, symbol] = await Promise.all([
            erc721.name(),
            erc721.symbol(),
          ]);
          return TokenMetadataSchema.parse({
            name,
            symbol,
            totalSupply: DERIVED_TOKEN_SUPPLY,
          });
        }

        let token: string;
        switch (config.type) {
          case TokenType.XERC20Lockbox:
            token = await IXERC20Lockbox__factory.connect(
              config.token,
              provider,
            ).callStatic.ERC20();
            break;
          case TokenType.collateralVault:
            token = await IERC4626__factory.connect(
              config.token,
              provider,
            ).callStatic.asset();
            break;
          default:
            token = config.token;
            break;
        }

        let name, symbol, decimals;

        if (config.type === TokenType.collateralLSP7) {
          const lsp7 = HypLSP7__factory.connect(token, provider);

          decimals = await lsp7.decimals();

          const [encodedName, encodedSymbol] = await lsp7.getDataBatch([
            LSP4DataKeys.LSP4TokenName,
            LSP4DataKeys.LSP4TokenSymbol,
          ]);

          name = ethers.utils.toUtf8String(encodedName);
          symbol = ethers.utils.toUtf8String(encodedSymbol);
        } else {
          const erc20 = ERC20__factory.connect(token, provider);
          [name, symbol, decimals] = await Promise.all([
            erc20.name(),
            erc20.symbol(),
            erc20.decimals(),
          ]);
        }

        return TokenMetadataSchema.parse({
          name,
          symbol,
          decimals,
          totalSupply: DERIVED_TOKEN_SUPPLY,
        });
      }
    }

    return undefined;
  }

  async deploy(configMap: WarpRouteDeployConfig) {
    let tokenMetadata: TokenMetadata | undefined;
    try {
      tokenMetadata = await TokenDeployer.deriveTokenMetadata(
        this.multiProvider,
        configMap,
      );
    } catch (err) {
      this.logger.error('Failed to derive token metadata', err, configMap);
      throw err;
    }

    const resolvedConfigMap = objMap(configMap, (_, config) => ({
      ...tokenMetadata,
      gas: gasOverhead(config.type),
      ...config,
    }));
    return super.deploy(resolvedConfigMap);
  }
}

export class HypTokenDeployer extends TokenDeployer<HypTokenFactories> {
  constructor(
    multiProvider: MultiProvider,
    ismFactory?: HyperlaneIsmFactory,
    contractVerifier?: ContractVerifier,
    concurrentDeploy = false,
  ) {
    super(
      multiProvider,
      hypTokenfactories,
      'HypTokenDeployer',
      ismFactory,
      contractVerifier,
      concurrentDeploy,
    );
  }

  router(contracts: HyperlaneContracts<HypTokenFactories>): GasRouter {
    for (const key of objKeys(hypTokenfactories)) {
      if (contracts[key]) {
        return contracts[key];
      }
    }
    throw new Error('No matching contract found');
  }

  routerContractKey(config: HypTokenRouterConfig): keyof HypTokenFactories {
    assert(config.type in hypTokenfactories, 'Invalid ERC20 token type');
    return config.type as keyof HypTokenFactories;
  }

  routerContractName(config: HypTokenRouterConfig): string {
    return hypTokencontracts[this.routerContractKey(config)];
  }
}

export class HypNFTDeployer extends TokenDeployer<HypNFTFactories> {
  constructor(
    multiProvider: MultiProvider,
    ismFactory?: HyperlaneIsmFactory,
    contractVerifier?: ContractVerifier,
  ) {
    super(
      multiProvider,
      hypNFTfactories,
      'HypNFTDeployer',
      ismFactory,
      contractVerifier,
    );
  }

  router(contracts: HyperlaneContracts<HypNFTFactories>): GasRouter {
    for (const key of objKeys(hypNFTfactories)) {
      if (contracts[key]) {
        return contracts[key];
      }
    }
    throw new Error('No matching contract found');
  }

  routerContractKey(config: HypTokenRouterConfig): keyof HypNFTFactories {
    assert(config.type in hypNFTfactories, 'Invalid ERC721 token type');
    return config.type as keyof HypNFTFactories;
  }

  routerContractName(config: HypTokenRouterConfig): string {
    return hypNFTcontracts[this.routerContractKey(config)];
  }
}
