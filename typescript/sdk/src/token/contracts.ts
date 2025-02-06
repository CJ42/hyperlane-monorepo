import {
  FastHypERC20Collateral__factory,
  FastHypERC20__factory,
  HypERC20Collateral__factory,
  HypERC20__factory,
  HypERC721Collateral__factory,
  HypERC721URICollateral__factory,
  HypERC721URIStorage__factory,
  HypERC721__factory,
  HypERC4626Collateral__factory,
  HypERC4626OwnerCollateral__factory,
  HypERC4626__factory,
  HypFiatToken__factory,
  HypLSP7Collateral__factory,
  HypLSP7__factory,
  HypLSP8Collateral__factory,
  HypLSP8__factory,
  HypNativeScaled__factory,
  HypNative__factory,
  HypXERC20Lockbox__factory,
  HypXERC20__factory,
} from '@hyperlane-xyz/core';

import { TokenType } from './config.js';

// ERC20 + LSP7 standards
// ----------------------

// LSP7 and LSP8 standards are just added to this list alongside ERC standards.
// Both ERC and LSP are EVM standards.
export const hypTokencontracts = {
  [TokenType.fastCollateral]: 'FastHypERC20Collateral',
  [TokenType.fastSynthetic]: 'FastHypERC20',
  [TokenType.synthetic]: 'HypERC20',
  [TokenType.syntheticLSP7]: 'HypLSP7',
  [TokenType.syntheticRebase]: 'HypERC4626',
  [TokenType.collateral]: 'HypERC20Collateral',
  [TokenType.collateralLSP7]: 'HypLSP7Collateral',
  [TokenType.collateralFiat]: 'HypFiatToken',
  [TokenType.XERC20]: 'HypXERC20',
  [TokenType.XERC20Lockbox]: 'HypXERC20Lockbox',
  [TokenType.collateralVault]: 'HypERC4626OwnerCollateral',
  [TokenType.collateralVaultRebase]: 'HypERC4626Collateral',
  [TokenType.native]: 'HypNative',
  [TokenType.nativeScaled]: 'HypNativeScaled',
};
export type HypTokenContracts = typeof hypTokencontracts;

export const hypTokenfactories = {
  [TokenType.fastCollateral]: new FastHypERC20Collateral__factory(),
  [TokenType.fastSynthetic]: new FastHypERC20__factory(),
  [TokenType.synthetic]: new HypERC20__factory(),
  [TokenType.syntheticLSP7]: new HypLSP7__factory(),
  [TokenType.collateral]: new HypERC20Collateral__factory(),
  [TokenType.collateralLSP7]: new HypLSP7Collateral__factory(),
  [TokenType.collateralVault]: new HypERC4626OwnerCollateral__factory(),
  [TokenType.collateralVaultRebase]: new HypERC4626Collateral__factory(),
  [TokenType.syntheticRebase]: new HypERC4626__factory(),
  [TokenType.collateralFiat]: new HypFiatToken__factory(),
  [TokenType.XERC20]: new HypXERC20__factory(),
  [TokenType.XERC20Lockbox]: new HypXERC20Lockbox__factory(),
  [TokenType.native]: new HypNative__factory(),
  [TokenType.nativeScaled]: new HypNativeScaled__factory(),
};
export type HypTokenFactories = typeof hypTokenfactories;

// ERC721 + LSP8 standards
// -----------------------

export const hypNFTcontracts = {
  [TokenType.collateralUri]: 'HypERC721URICollateral',
  [TokenType.collateral]: 'HypERC721Collateral',
  [TokenType.collateralLSP8]: 'HypLSP8Collateral',
  [TokenType.syntheticUri]: 'HypERC721URIStorage',
  [TokenType.synthetic]: 'HypERC721',
  [TokenType.syntheticLSP8]: 'HypLSP8',
};
export type HypNFTcontracts = typeof hypNFTcontracts;

export const hypNFTfactories = {
  [TokenType.collateralUri]: new HypERC721URICollateral__factory(),
  [TokenType.collateral]: new HypERC721Collateral__factory(),
  [TokenType.collateralLSP8]: new HypLSP8Collateral__factory(),
  [TokenType.syntheticUri]: new HypERC721URIStorage__factory(),
  [TokenType.synthetic]: new HypERC721__factory(),
  [TokenType.syntheticLSP8]: new HypLSP8__factory(),
};
export type HypNFTFactories = typeof hypNFTfactories;

export type TokenFactories = HypTokenFactories | HypNFTFactories;
