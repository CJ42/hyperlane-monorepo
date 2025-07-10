import {
  HypERC20CollateralPausable__factory,
  HypERC20Collateral__factory,
  HypERC20Pausable__factory,
  HypERC20__factory,
  HypERC721Collateral__factory,
  HypERC721URICollateral__factory,
  HypERC721URIStorage__factory,
  HypERC721__factory,
  HypERC4626Collateral__factory,
  HypERC4626OwnerCollateral__factory,
  HypERC4626__factory,
  HypFiatToken__factory,
  HypLSP7CollateralPausable__factory,
  HypLSP7Collateral__factory,
  HypLSP7Pausable__factory,
  HypLSP7__factory,
  HypLSP8CollateralPausable__factory,
  HypLSP8Collateral__factory,
  HypLSP8Pausable__factory,
  HypLSP8__factory,
  HypNativePausable__factory,
  HypNative__factory,
  HypXERC20Lockbox__factory,
  HypXERC20__factory,
  OpL1V1NativeTokenBridge__factory,
  OpL2NativeTokenBridge__factory,
  TokenBridgeCctp__factory,
} from '@hyperlane-xyz/core';

import { TokenType } from './config.js';

export const hypTokenContracts = {
  [TokenType.synthetic]: 'HypERC20',
  [TokenType.syntheticRebase]: 'HypERC4626',
  [TokenType.syntheticUri]: 'HypERC721',
  [TokenType.syntheticPausable]: 'HypERC20Pausable',
  [TokenType.syntheticLSP7]: 'HypLSP7',
  [TokenType.syntheticLSP7Pausable]: 'HypLSP7Pausable',
  [TokenType.syntheticLSP8]: 'HypLSP8',
  [TokenType.syntheticLSP8Pausable]: 'HypLSP8Pausable',
  [TokenType.collateral]: 'HypERC20Collateral',
  [TokenType.collateralFiat]: 'HypFiatToken',
  [TokenType.collateralUri]: 'HypERC721Collateral',
  [TokenType.XERC20]: 'HypXERC20',
  [TokenType.XERC20Lockbox]: 'HypXERC20Lockbox',
  [TokenType.collateralVault]: 'HypERC4626OwnerCollateral',
  [TokenType.collateralVaultRebase]: 'HypERC4626Collateral',
  [TokenType.collateralCctp]: 'TokenBridgeCctp',
  [TokenType.collateralPausable]: 'HypERC20CollateralPausable',
  [TokenType.collateralLSP7]: 'HypLSP7Collateral',
  [TokenType.collateralLSP7Pausable]: 'HypLSP7CollateralPausable',
  [TokenType.collateralLSP8]: 'HypLSP8Collateral',
  [TokenType.collateralLSP8Pausable]: 'HypLSP8CollateralPausable',
  [TokenType.native]: 'HypNative',
  [TokenType.nativePausable]: 'HypNativePausable',
  [TokenType.nativeOpL2]: 'OPL2TokenBridgeNative',
  [TokenType.nativeOpL1]: 'OpL1TokenBridgeNative',
  // uses same contract as native
  [TokenType.nativeScaled]: 'HypNative',
} as const;
export type HypTokenContracts = typeof hypTokenContracts;

export const hypTokenFactories = {
  [TokenType.synthetic]: new HypERC20__factory(),
  [TokenType.syntheticPausable]: new HypERC20Pausable__factory(),
  [TokenType.syntheticLSP7]: new HypLSP7__factory(),
  [TokenType.syntheticLSP7Pausable]: new HypLSP7Pausable__factory(),
  [TokenType.syntheticLSP8]: new HypLSP8__factory(),
  [TokenType.syntheticLSP8Pausable]: new HypLSP8Pausable__factory(),
  [TokenType.collateral]: new HypERC20Collateral__factory(),
  [TokenType.collateralCctp]: new TokenBridgeCctp__factory(),
  [TokenType.collateralVault]: new HypERC4626OwnerCollateral__factory(),
  [TokenType.collateralVaultRebase]: new HypERC4626Collateral__factory(),
  [TokenType.collateralPausable]: new HypERC20CollateralPausable__factory(),
  [TokenType.collateralLSP7]: new HypLSP7Collateral__factory(),
  [TokenType.collateralLSP7Pausable]: new HypLSP7CollateralPausable__factory(),
  [TokenType.collateralLSP8]: new HypLSP8Collateral__factory(),
  [TokenType.collateralLSP8Pausable]: new HypLSP8CollateralPausable__factory(),
  [TokenType.syntheticRebase]: new HypERC4626__factory(),
  [TokenType.collateralFiat]: new HypFiatToken__factory(),
  [TokenType.XERC20]: new HypXERC20__factory(),
  [TokenType.XERC20Lockbox]: new HypXERC20Lockbox__factory(),
  [TokenType.native]: new HypNative__factory(),
  [TokenType.nativePausable]: new HypNativePausable__factory(),
  [TokenType.nativeOpL2]: new OpL2NativeTokenBridge__factory(),
  // assume V1 for now
  [TokenType.nativeOpL1]: new OpL1V1NativeTokenBridge__factory(),
  [TokenType.nativeScaled]: new HypNative__factory(),
} as const;
export type HypTokenFactories = typeof hypTokenFactories;

export const hypNFTContracts = {
  [TokenType.collateralUri]: 'HypERC721URICollateral',
  [TokenType.collateral]: 'HypERC721Collateral',
  [TokenType.collateralLSP8]: 'HypLSP8Collateral',
  [TokenType.collateralLSP8Pausable]: 'HypLSP8CollateralPausable',
  [TokenType.syntheticUri]: 'HypERC721URIStorage',
  [TokenType.synthetic]: 'HypERC721',
  [TokenType.syntheticLSP8]: 'HypLSP8',
  [TokenType.syntheticLSP8Pausable]: 'HypLSP8Pausable',
} as const;

export type HypNFTContracts = typeof hypNFTContracts;

export const hypNFTFactories = {
  [TokenType.collateralUri]: new HypERC721URICollateral__factory(),
  [TokenType.collateral]: new HypERC721Collateral__factory(),
  [TokenType.collateralLSP8]: new HypLSP8Collateral__factory(),
  [TokenType.collateralLSP8Pausable]: new HypLSP8CollateralPausable__factory(),
  [TokenType.syntheticUri]: new HypERC721URIStorage__factory(),
  [TokenType.synthetic]: new HypERC721__factory(),
  [TokenType.syntheticLSP8]: new HypLSP8__factory(),
  [TokenType.syntheticLSP8Pausable]: new HypLSP8Pausable__factory(),
} as const;
export type HypNFTFactories = typeof hypNFTFactories;

export type TokenFactories = HypTokenFactories | HypNFTFactories;
