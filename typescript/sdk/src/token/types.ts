import { compareVersions } from 'compare-versions';
import { z } from 'zod';

import { CONTRACTS_PACKAGE_VERSION } from '@hyperlane-xyz/core';
import { objMap } from '@hyperlane-xyz/utils';

import { HookConfig, HookType } from '../hook/types.js';
import {
  IsmConfig,
  IsmType,
  OffchainLookupIsmConfigSchema,
} from '../ism/types.js';
import { ZHash } from '../metadata/customZodTypes.js';
import {
  DerivedRouterConfig,
  GasRouterConfigSchema,
  RemoteRouterDomainOrChainNameSchema,
} from '../router/types.js';
import { ChainMap, ChainName } from '../types.js';
import { isCompliant } from '../utils/schemas.js';

import { TokenType } from './config.js';

export const WarpRouteDeployConfigSchemaErrors = {
  ONLY_SYNTHETIC_REBASE: `Config with ${TokenType.collateralVaultRebase} must be deployed with ${TokenType.syntheticRebase}`,
  NO_SYNTHETIC_ONLY: `Config must include Native or Collateral OR all synthetics must define token metadata`,
};

export const contractVersionMatchesDependency = (version: string) => {
  return compareVersions(version, CONTRACTS_PACKAGE_VERSION) === 0;
};

export const VERSION_ERROR_MESSAGE = `Contract version must match the @hyperlane-xyz/core dependency version (${CONTRACTS_PACKAGE_VERSION})`;

export const TokenMetadataSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  decimals: z.number().gt(0).optional(),
  scale: z.number().optional(),
  isNft: z.boolean().optional(),
  contractVersion: z.string().optional(),
});
export type TokenMetadata = z.infer<typeof TokenMetadataSchema>;
export const isTokenMetadata = isCompliant(TokenMetadataSchema);

const MovableTokenRebalancingBridgeConfigSchema = z.object({
  bridge: ZHash,
  approvedTokens: z
    .array(ZHash)
    .transform((rawRebalancers) => Array.from(new Set(rawRebalancers)))
    .optional(),
});

export const BaseMovableTokenConfigSchema = z.object({
  allowedRebalancingBridges: z
    .record(
      RemoteRouterDomainOrChainNameSchema,
      z.array(MovableTokenRebalancingBridgeConfigSchema),
    )
    .optional(),
  allowedRebalancers: z
    .array(ZHash)
    .transform((rawRebalancers) => Array.from(new Set(rawRebalancers)))
    .optional(),
});

export const NativeTokenConfigSchema = TokenMetadataSchema.partial().extend({
  type: z.enum([TokenType.native, TokenType.nativeScaled]),
  ...BaseMovableTokenConfigSchema.shape,
});
export type NativeTokenConfig = z.infer<typeof NativeTokenConfigSchema>;
export const isNativeTokenConfig = isCompliant(NativeTokenConfigSchema);

export const OpL2TokenConfigSchema = NativeTokenConfigSchema.omit({
  type: true,
}).extend({
  type: z.literal(TokenType.nativeOpL2),
  l2Bridge: z.string(),
});

export const OpL1TokenConfigSchema = NativeTokenConfigSchema.omit({
  type: true,
})
  .extend({
    type: z.literal(TokenType.nativeOpL1),
    portal: z.string(),
    version: z.number(),
  })
  .merge(OffchainLookupIsmConfigSchema.omit({ type: true, owner: true }));

export type OpL1TokenConfig = z.infer<typeof OpL1TokenConfigSchema>;
export const isOpL1TokenConfig = isCompliant(OpL1TokenConfigSchema);

export type OpL2TokenConfig = z.infer<typeof OpL2TokenConfigSchema>;
export const isOpL2TokenConfig = isCompliant(OpL2TokenConfigSchema);

export const CollateralTokenConfigSchema = TokenMetadataSchema.partial().extend(
  {
    type: z.enum([
      TokenType.collateral,
      TokenType.collateralVault,
      TokenType.collateralVaultRebase,
      TokenType.collateralFiat,
      TokenType.collateralUri,
    ]),
    token: z
      .string()
      .describe(
        'Existing token address to extend with Warp Route functionality',
      ),
    ...BaseMovableTokenConfigSchema.shape,
  },
);

export type CollateralTokenConfig = z.infer<typeof CollateralTokenConfigSchema>;
export const isCollateralTokenConfig = isCompliant(CollateralTokenConfigSchema);

const xERC20LimitConfigSchema = z.object({
  bufferCap: z.string().optional(),
  rateLimitPerSecond: z.string().optional(),
});
export type XERC20LimitConfig = z.infer<typeof xERC20LimitConfigSchema>;

const xERC20ExtraBridgesLimitConfigsSchema = z.object({
  lockbox: z.string(),
  limits: xERC20LimitConfigSchema,
});

const xERC20TokenMetadataSchema = z.object({
  xERC20: z
    .object({
      extraBridges: z.array(xERC20ExtraBridgesLimitConfigsSchema).optional(),
      warpRouteLimits: xERC20LimitConfigSchema,
    })
    .optional(),
});
export type XERC20TokenMetadata = z.infer<typeof xERC20TokenMetadataSchema>;
export type XERC20TokenExtraBridgesLimits = z.infer<
  typeof xERC20ExtraBridgesLimitConfigsSchema
>;

export const XERC20TokenConfigSchema = CollateralTokenConfigSchema.omit({
  type: true,
})
  .extend({
    type: z.enum([TokenType.XERC20, TokenType.XERC20Lockbox]),
  })
  .merge(xERC20TokenMetadataSchema);

export type XERC20LimitsTokenConfig = z.infer<typeof XERC20TokenConfigSchema>;
export const isXERC20TokenConfig = isCompliant(XERC20TokenConfigSchema);

export const CctpTokenConfigSchema = CollateralTokenConfigSchema.omit({
  type: true,
})
  .extend({
    type: z.literal(TokenType.collateralCctp),
    messageTransmitter: z
      .string()
      .describe('CCTP Message Transmitter contract address'),
    tokenMessenger: z
      .string()
      .describe('CCTP Token Messenger contract address'),
  })
  .merge(OffchainLookupIsmConfigSchema.omit({ type: true, owner: true }));

export type CctpTokenConfig = z.infer<typeof CctpTokenConfigSchema>;
export const isCctpTokenConfig = isCompliant(CctpTokenConfigSchema);

export const CollateralRebaseTokenConfigSchema =
  TokenMetadataSchema.partial().extend({
    type: z.literal(TokenType.collateralVaultRebase),
  });
export const isCollateralRebaseTokenConfig = isCompliant(
  CollateralRebaseTokenConfigSchema,
);

export const SyntheticTokenConfigSchema = TokenMetadataSchema.partial().extend({
  type: z.enum([TokenType.synthetic, TokenType.syntheticUri]),
  initialSupply: z.string().or(z.number()).optional(),
});
export type SyntheticTokenConfig = z.infer<typeof SyntheticTokenConfigSchema>;
export const isSyntheticTokenConfig = isCompliant(SyntheticTokenConfigSchema);

export const SyntheticRebaseTokenConfigSchema =
  TokenMetadataSchema.partial().extend({
    type: z.literal(TokenType.syntheticRebase),
    collateralChainName: z.string(),
  });
export type SyntheticRebaseTokenConfig = z.infer<
  typeof SyntheticRebaseTokenConfigSchema
>;
export const isSyntheticRebaseTokenConfig = isCompliant(
  SyntheticRebaseTokenConfigSchema,
);

export enum ContractVerificationStatus {
  Verified = 'verified',
  Unverified = 'unverified',
  Error = 'error',
  Skipped = 'skipped',
}

export enum OwnerStatus {
  Active = 'active', // Active address with nonce > 0 and/or contract code
  Inactive = 'inactive',
  GnosisSafe = 'gnosisSafe',
  Error = 'error',
  Skipped = 'skipped',
}
export const HypTokenRouterVirtualConfigSchema = z.object({
  contractVerificationStatus: z.record(
    z.enum([
      ContractVerificationStatus.Error,
      ContractVerificationStatus.Skipped,
      ContractVerificationStatus.Verified,
      ContractVerificationStatus.Unverified,
    ]),
  ),
  ownerStatus: z.record(
    z.enum([
      OwnerStatus.Error,
      OwnerStatus.Skipped,
      OwnerStatus.Active,
      OwnerStatus.Inactive,
      OwnerStatus.GnosisSafe,
    ]),
  ),
});
export type HypTokenRouterVirtualConfig = z.infer<
  typeof HypTokenRouterVirtualConfigSchema
>;

/**
 * @remarks
 * The discriminatedUnion is basically a switch statement for zod schemas
 * It uses the 'type' key to pick from the array of schemas to validate
 */
export const HypTokenConfigSchema = z.discriminatedUnion('type', [
  NativeTokenConfigSchema,
  OpL2TokenConfigSchema,
  OpL1TokenConfigSchema,
  CollateralTokenConfigSchema,
  XERC20TokenConfigSchema,
  SyntheticTokenConfigSchema,
  SyntheticRebaseTokenConfigSchema,
  CctpTokenConfigSchema,
]);
export type HypTokenConfig = z.infer<typeof HypTokenConfigSchema>;

export const HypTokenRouterConfigSchema = HypTokenConfigSchema.and(
  GasRouterConfigSchema,
).and(HypTokenRouterVirtualConfigSchema.partial());

export type HypTokenRouterConfig = z.infer<typeof HypTokenRouterConfigSchema>;

export type DerivedTokenRouterConfig = z.infer<typeof HypTokenConfigSchema> &
  z.infer<typeof GasRouterConfigSchema> &
  DerivedRouterConfig;

export type DerivedWarpRouteDeployConfig = ChainMap<DerivedTokenRouterConfig>;

export function derivedHookAddress(config: DerivedTokenRouterConfig) {
  return typeof config.hook === 'string' ? config.hook : config.hook.address;
}

export function derivedIsmAddress(config: DerivedTokenRouterConfig) {
  return typeof config.interchainSecurityModule === 'string'
    ? config.interchainSecurityModule
    : config.interchainSecurityModule.address;
}

export const HypTokenRouterConfigMailboxOptionalSchema =
  HypTokenConfigSchema.and(
    GasRouterConfigSchema.extend({
      mailbox: z.string().optional(),
    }),
  ).and(HypTokenRouterVirtualConfigSchema.partial());

export type HypTokenRouterConfigMailboxOptional = z.infer<
  typeof HypTokenRouterConfigMailboxOptionalSchema
>;

export const WarpRouteDeployConfigSchema = z
  .record(HypTokenRouterConfigMailboxOptionalSchema)
  .refine((configMap) => {
    const entries = Object.entries(configMap);
    return (
      entries.some(
        ([_, config]) =>
          isCollateralTokenConfig(config) ||
          isCollateralRebaseTokenConfig(config) ||
          isCctpTokenConfig(config) ||
          isXERC20TokenConfig(config) ||
          isNativeTokenConfig(config),
      ) || entries.every(([_, config]) => isTokenMetadata(config))
    );
  }, WarpRouteDeployConfigSchemaErrors.NO_SYNTHETIC_ONLY)
  // Verify synthetic rebase tokens config
  .transform((warpRouteDeployConfig, ctx) => {
    const collateralRebaseEntry = Object.entries(warpRouteDeployConfig).find(
      ([_, config]) => isCollateralRebaseTokenConfig(config),
    );

    const syntheticRebaseEntry = Object.entries(warpRouteDeployConfig).find(
      ([_, config]) => isSyntheticRebaseTokenConfig(config),
    );

    // Require both collateral rebase and synthetic rebase to be present in the config
    if (!collateralRebaseEntry && !syntheticRebaseEntry) {
      //  Pass through for other token types
      return warpRouteDeployConfig;
    }

    if (
      collateralRebaseEntry &&
      isCollateralRebasePairedCorrectly(warpRouteDeployConfig)
    ) {
      const collateralChainName = collateralRebaseEntry[0];
      return objMap(warpRouteDeployConfig, (_, config) => {
        if (config.type === TokenType.syntheticRebase)
          config.collateralChainName = collateralChainName;
        return config;
      }) as Record<string, HypTokenRouterConfig>;
    }

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: WarpRouteDeployConfigSchemaErrors.ONLY_SYNTHETIC_REBASE,
    });

    return z.NEVER; // Causes schema validation to throw with above issue
  })
  // Verify that CCIP hooks are paired with CCIP ISMs
  .transform((warpRouteDeployConfig, ctx) => {
    const { ccipHookMap, ccipIsmMap } = getCCIPConfigMaps(
      warpRouteDeployConfig,
    );

    // Check hooks have corresponding ISMs
    const hookConfigHasMissingIsms = Object.entries(ccipHookMap).some(
      ([originChain, destinationChains]) =>
        Array.from(destinationChains).some((chain) => {
          if (!ccipIsmMap[originChain]?.has(chain)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [chain, 'interchainSecurityModule', '...'],
              message: `Required CCIP ISM not found in config for CCIP Hook with origin chain ${originChain} and destination chain ${chain}`,
            });
            return true;
          }
          return false;
        }),
    );

    // Check ISMs have corresponding hooks
    const ismConfigHasMissingHooks = Object.entries(ccipIsmMap).some(
      ([originChain, destinationChains]) =>
        Array.from(destinationChains).some((chain) => {
          if (!ccipHookMap[originChain]?.has(chain)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [originChain, 'hook', '...'],
              message: `Required CCIP Hook not found in config for CCIP ISM with origin chain ${originChain} and destination chain ${chain}`,
            });
            return true;
          }
          return false;
        }),
    );

    return hookConfigHasMissingIsms || ismConfigHasMissingHooks
      ? z.NEVER
      : warpRouteDeployConfig;
  });

export type WarpRouteDeployConfig = z.infer<typeof WarpRouteDeployConfigSchema>;

const _RequiredMailboxSchema = z.record(
  z.object({
    mailbox: z.string(),
  }),
);

export const WarpRouteDeployConfigMailboxRequiredSchema =
  WarpRouteDeployConfigSchema.and(_RequiredMailboxSchema);

export type WarpRouteDeployConfigMailboxRequired = z.infer<
  typeof WarpRouteDeployConfigMailboxRequiredSchema
>;

function isCollateralRebasePairedCorrectly(
  warpRouteDeployConfig: WarpRouteDeployConfig,
): boolean {
  // Filter out all the non-collateral rebase configs to check if they are only synthetic rebase tokens
  const otherConfigs = Object.entries(warpRouteDeployConfig).filter(
    ([_, config]) => !isCollateralRebaseTokenConfig(config),
  );

  if (otherConfigs.length === 0) return false;

  // The other configs MUST be synthetic rebase
  const allOthersSynthetic: boolean = otherConfigs.every(
    ([_, config], _index) => isSyntheticRebaseTokenConfig(config),
  );
  return allOthersSynthetic;
}

/**
 * Map tracking which chains can be CCIP destinations for each origin chain.
 * { [origin chain]: Set<valid destination chain> }
 */
type CCIPContractExistsMap = ChainMap<Set<ChainName>>;

function getCCIPConfigMaps(
  warpRouteDeployConfig: Record<string, HypTokenRouterConfigMailboxOptional>,
): {
  ccipHookMap: CCIPContractExistsMap;
  ccipIsmMap: CCIPContractExistsMap;
} {
  const ccipHookMap: CCIPContractExistsMap = {};
  const ccipIsmMap: CCIPContractExistsMap = {};

  Object.entries(warpRouteDeployConfig).forEach(([chainName, config]) => {
    extractCCIPHookMap(chainName, config.hook, ccipHookMap);
    extractCCIPIsmMap(chainName, config.interchainSecurityModule, ccipIsmMap);
  });

  return { ccipHookMap, ccipIsmMap };
}

function extractCCIPHookMap(
  currentChain: ChainName,
  hookConfig: HookConfig | undefined,
  existsCCIPHookMap: CCIPContractExistsMap,
) {
  if (!hookConfig || typeof hookConfig === 'string') {
    return;
  }

  switch (hookConfig.type) {
    case HookType.AGGREGATION:
      hookConfig.hooks.forEach((hook) =>
        extractCCIPHookMap(currentChain, hook, existsCCIPHookMap),
      );
      break;
    case HookType.ARB_L2_TO_L1:
      extractCCIPHookMap(currentChain, hookConfig.childHook, existsCCIPHookMap);
      break;
    case HookType.CCIP:
      if (!existsCCIPHookMap[currentChain]) {
        existsCCIPHookMap[currentChain] = new Set();
      }
      existsCCIPHookMap[currentChain].add(hookConfig.destinationChain);
      break;
    case HookType.FALLBACK_ROUTING:
    case HookType.ROUTING:
      Object.entries(hookConfig.domains).forEach(([_, hook]) => {
        extractCCIPHookMap(currentChain, hook, existsCCIPHookMap);
      });
      break;
    default:
      break;
  }
}

function extractCCIPIsmMap(
  currentChain: ChainName,
  ismConfig: IsmConfig | undefined,
  existsCCIPIsmMap: CCIPContractExistsMap,
) {
  if (!ismConfig || typeof ismConfig === 'string') {
    return;
  }

  switch (ismConfig.type) {
    case IsmType.AGGREGATION:
    case IsmType.STORAGE_AGGREGATION:
      ismConfig.modules.forEach((hook) =>
        extractCCIPIsmMap(currentChain, hook, existsCCIPIsmMap),
      );
      break;
    case IsmType.CCIP:
      if (!existsCCIPIsmMap[ismConfig.originChain]) {
        existsCCIPIsmMap[ismConfig.originChain] = new Set();
      }
      existsCCIPIsmMap[ismConfig.originChain].add(currentChain);
      break;
    case IsmType.FALLBACK_ROUTING:
    case IsmType.ROUTING:
      Object.entries(ismConfig.domains).forEach(([_, hook]) => {
        extractCCIPIsmMap(currentChain, hook, existsCCIPIsmMap);
      });
      break;
    default:
      break;
  }
}

const MovableTokenSchema = z.discriminatedUnion('type', [
  CollateralTokenConfigSchema,
  NativeTokenConfigSchema,
]);
export type MovableTokenConfig = z.infer<typeof MovableTokenSchema>;
export const isMovableCollateralTokenConfig = isCompliant(MovableTokenSchema);
