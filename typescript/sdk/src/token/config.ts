export enum TokenType {
  synthetic = 'synthetic',
  syntheticLSP7 = 'syntheticLSP7',
  syntheticLSP8 = 'syntheticLSP8',
  syntheticRebase = 'syntheticRebase',
  fastSynthetic = 'fastSynthetic',
  syntheticUri = 'syntheticUri',
  collateral = 'collateral',
  collateralLSP7 = 'collateralLSP7',
  collateralLSP8 = 'collateralLSP8',
  collateralVault = 'collateralVault',
  collateralVaultRebase = 'collateralVaultRebase',
  XERC20 = 'xERC20',
  XERC20Lockbox = 'xERC20Lockbox',
  collateralFiat = 'collateralFiat',
  fastCollateral = 'fastCollateral',
  collateralUri = 'collateralUri',
  native = 'native',
  nativeScaled = 'nativeScaled',
}

export const gasOverhead = (tokenType: TokenType): number => {
  switch (tokenType) {
    case TokenType.fastSynthetic:
    case TokenType.synthetic:
      return 64_000;
    case TokenType.native:
      return 44_000;
    default:
      return 68_000;
  }
};
