// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;
import {IFundraiser} from "./interfaces/IFundraiser.sol";
import {ERC1643} from "./ERC1643/ERC1643.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract Fundraiser is IFundraiser, ERC1643, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    address public immutable factory;

    uint256 private _fundraisingAmount;
    address private _beneficiary;
    Document private _document;

    function fundraisingAmount() public view returns (uint256) {
        return _fundraisingAmount;
    }

    function beneficiary() public view returns (address) {
        return _beneficiary;
    }

    constructor(uint256 fundraisingAmount_, address beneficiary_, DocumentParams memory document) {
        factory = msg.sender;
        _grantRole(ADMIN_ROLE, beneficiary_);
        _fundraisingAmount = fundraisingAmount_;
        _beneficiary = beneficiary_;
        _setDocument(document.name, document.uri, document.hash);
    }

    function _setDocument(
        bytes32 documentName,
        string memory uri,
        bytes32 documentHash
    ) internal override onlyRole(ADMIN_ROLE) {
        super._setDocument(documentName, uri, documentHash);
    }

    function _removeDocument(bytes32 documentName) internal override onlyRole(ADMIN_ROLE) {
        super._removeDocument(documentName);
    }
}
