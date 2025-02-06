import { Logger } from 'pino';

import { TokenRouter } from '@hyperlane-xyz/core';
import { Address, objKeys } from '@hyperlane-xyz/utils';

import { appFromAddressesMapHelper } from '../contracts/contracts.js';
import {
  HyperlaneAddressesMap,
  HyperlaneContracts,
  HyperlaneContractsMap,
} from '../contracts/types.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { GasRouterApp } from '../router/RouterApps.js';
import { ProxiedFactories, proxiedFactories } from '../router/types.js';
import { ChainMap } from '../types.js';

import { HypTokenFactories, hypTokenfactories } from './contracts.js';

export class HypERC20App extends GasRouterApp<
  HypTokenFactories & ProxiedFactories,
  TokenRouter
> {
  constructor(
    contractsMap: HyperlaneContractsMap<HypTokenFactories & ProxiedFactories>,
    multiProvider: MultiProvider,
    logger?: Logger,
    foreignDeployments: ChainMap<Address> = {},
  ) {
    super(contractsMap, multiProvider, logger, foreignDeployments);
  }

  router(contracts: HyperlaneContracts<HypTokenFactories>): TokenRouter {
    for (const key of objKeys(hypTokenfactories)) {
      if (contracts[key]) {
        return contracts[key] as unknown as TokenRouter;
      }
    }
    throw new Error('No router found in contracts');
  }

  static fromAddressesMap(
    addressesMap: HyperlaneAddressesMap<HypTokenFactories & ProxiedFactories>,
    multiProvider: MultiProvider,
  ): HypERC20App {
    const helper = appFromAddressesMapHelper(
      addressesMap,
      { ...hypTokenfactories, ...proxiedFactories },
      multiProvider,
    );
    return new HypERC20App(helper.contractsMap, helper.multiProvider);
  }
}
