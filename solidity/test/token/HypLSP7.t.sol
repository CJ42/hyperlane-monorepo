// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.0;

import "forge-std/Test.sol";
import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import {_INTERFACEID_LSP0} from "@lukso/lsp0-contracts/contracts/LSP0Constants.sol";
import {_LSP4_TOKEN_TYPE_TOKEN, _LSP4_TOKEN_NAME_KEY, _LSP4_TOKEN_SYMBOL_KEY, _LSP4_TOKEN_TYPE_KEY, _LSP4_CREATORS_ARRAY_KEY, _LSP4_CREATORS_MAP_KEY_PREFIX, _LSP4_METADATA_KEY} from "@lukso/lsp4-contracts/contracts/LSP4Constants.sol";

import {TypeCasts} from "../../contracts/libs/TypeCasts.sol";
import {MockMailbox} from "../../contracts/mock/MockMailbox.sol";
import {LSP7Test} from "../../contracts/test/LSP7Test.sol";
import {TestPostDispatchHook} from "../../contracts/test/TestPostDispatchHook.sol";
import {TestInterchainGasPaymaster} from "../../contracts/test/TestInterchainGasPaymaster.sol";
import {HypLSP7} from "../../contracts/token/HypLSP7.sol";
import {HypLSP7Collateral} from "../../contracts/token/HypLSP7Collateral.sol";
import {TokenRouter} from "../../contracts/token/libs/TokenRouter.sol";

contract HypLSP7Test is Test {
    using TypeCasts for address;

    uint32 internal constant ORIGIN = 11;
    uint32 internal constant DESTINATION = 12;
    uint256 internal REQUIRED_VALUE; // initialized in setUp
    uint256 internal constant GAS_LIMIT = 10_000;
    uint256 internal TRANSFER_AMT = 100e18;

    string internal constant NAME = "HyperlaneInu";
    string internal constant SYMBOL = "HYP";
    uint256 internal constant LSP4_TOKEN_TYPE = _LSP4_TOKEN_TYPE_TOKEN;
    bool internal constant IS_NON_DIVISIBLE = false;
    uint256 internal constant TOTAL_SUPPLY = 1_000_000e18;
    uint8 internal constant DECIMALS = 18;

    address internal constant ALICE = address(0x1);
    address internal constant BOB = address(0x2);
    address internal constant CAROL = address(0x3);
    address internal constant DANIEL = address(0x4);
    address internal constant PROXY_ADMIN = address(0x37);

    LSP7Test internal primaryToken;
    TokenRouter internal localToken;
    HypLSP7 internal remoteToken;
    MockMailbox internal localMailbox;
    MockMailbox internal remoteMailbox;
    TestPostDispatchHook internal noopHook;
    TestInterchainGasPaymaster internal igp;

    function _getInitDataKeysAndValues()
        internal
        returns (bytes32[] memory dataKeys, bytes[] memory dataValues)
    {
        dataKeys = new bytes32[](4);
        dataKeys[0] = _LSP4_CREATORS_ARRAY_KEY;
        dataKeys[1] = bytes32(
            abi.encodePacked(
                bytes16(_LSP4_CREATORS_ARRAY_KEY),
                bytes16(uint128(0))
            )
        );
        dataKeys[2] = bytes32(
            abi.encodePacked(
                _LSP4_CREATORS_MAP_KEY_PREFIX,
                bytes2(0),
                bytes20(msg.sender)
            )
        );
        dataKeys[3] = _LSP4_METADATA_KEY;

        dataValues = new bytes[](4);
        dataValues[0] = abi.encodePacked(bytes16(uint128(1)));
        dataValues[1] = abi.encodePacked(bytes20(msg.sender));
        dataValues[2] = abi.encodePacked(
            _INTERFACEID_LSP0,
            bytes16(uint128(0))
        );
        dataValues[3] = bytes("LSP4Metadata");
    }

    function setUp() public virtual {
        localMailbox = new MockMailbox(ORIGIN);
        remoteMailbox = new MockMailbox(DESTINATION);
        localMailbox.addRemoteMailbox(DESTINATION, remoteMailbox);
        remoteMailbox.addRemoteMailbox(ORIGIN, localMailbox);

        primaryToken = new LSP7Test(
            NAME,
            SYMBOL,
            LSP4_TOKEN_TYPE,
            IS_NON_DIVISIBLE,
            TOTAL_SUPPLY,
            DECIMALS
        );

        noopHook = new TestPostDispatchHook();
        localMailbox.setDefaultHook(address(noopHook));
        localMailbox.setRequiredHook(address(noopHook));
        remoteMailbox.setDefaultHook(address(noopHook));
        remoteMailbox.setRequiredHook(address(noopHook));

        REQUIRED_VALUE = noopHook.quoteDispatch("", "");

        (
            bytes32[] memory dataKeys,
            bytes[] memory dataValues
        ) = _getInitDataKeysAndValues();

        HypLSP7 implementation = new HypLSP7(DECIMALS, address(remoteMailbox));
        TransparentUpgradeableProxy proxy = new TransparentUpgradeableProxy(
            address(implementation),
            PROXY_ADMIN,
            abi.encodeWithSelector(
                HypLSP7.initialize.selector,
                TOTAL_SUPPLY,
                NAME,
                SYMBOL,
                address(noopHook),
                address(igp),
                address(this),
                dataKeys,
                dataValues
            )
        );
        remoteToken = HypLSP7(payable(proxy));
        remoteToken.enrollRemoteRouter(
            ORIGIN,
            address(localToken).addressToBytes32()
        );
        igp = new TestInterchainGasPaymaster();
        vm.deal(ALICE, 125000);
    }

    function test_InitializeParams() public {
        (
            bytes32[] memory dataKeys,
            bytes[] memory dataValues
        ) = _getInitDataKeysAndValues();

        for (uint256 index = 0; index < dataKeys.length; index++) {
            vm.assertEq(
                remoteToken.getData(dataKeys[index]),
                dataValues[index]
            );
        }
    }

    function test_SetData_ChangeTokenName_Reverts(bytes memory name) public {
        vm.expectRevert(bytes4(keccak256("LSP4TokenNameNotEditable()")));
        remoteToken.setData(_LSP4_TOKEN_NAME_KEY, name);
    }

    function test_SetData_ChangeTokenSymbol_Reverts(bytes memory name) public {
        vm.expectRevert(bytes4(keccak256("LSP4TokenSymbolNotEditable()")));
        remoteToken.setData(_LSP4_TOKEN_SYMBOL_KEY, name);
    }

    function test_SetData_ChangeTokenType_Reverts(bytes memory name) public {
        vm.expectRevert(bytes4(keccak256("LSP4TokenTypeNotEditable()")));
        remoteToken.setData(_LSP4_TOKEN_TYPE_KEY, name);
    }
}
