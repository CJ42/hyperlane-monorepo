// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.0;

import {LSP7DigitalAsset} from "@lukso/lsp7-contracts/contracts/LSP7DigitalAsset.sol";

contract LSP7Test is LSP7DigitalAsset {
    uint8 public immutable _decimals;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 lsp4TokenType_,
        bool isNonDivisible_,
        uint256 totalSupply_,
        uint8 decimals_
    )
        LSP7DigitalAsset(
            name_,
            symbol_,
            msg.sender,
            lsp4TokenType_,
            isNonDivisible_
        )
    {
        _decimals = decimals_;
        _mint(msg.sender, totalSupply_, true, "");
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }
}
