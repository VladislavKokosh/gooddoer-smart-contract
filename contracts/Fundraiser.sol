// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {IFundraiser} from "./interfaces/IFundraiser.sol";

contract Fundraiser is IFundraiser {
    uint256 private _fundraisingAmount;
    address private _beneficiary;
    Document private _document;

    constructor(uint256 fundraisingAmount_, address beneficiary_, Document memory document_) {
        require(fundraisingAmount_ != 0, "Fundraiser: Fundraising amount lte zero");
        require(beneficiary_ != address(0), "Fundraiser: Beneficiary is zero address");
        require(document_.name != bytes32(0), "Fundraiser: Document name is zero bytes");
        require(
            keccak256(abi.encodePacked(document_.uri)) == keccak256(abi.encodePacked("")),
            "Fundraiser: Document uri is empty"
        );
        _fundraisingAmount = fundraisingAmount_;
        _beneficiary = beneficiary_;
        _document = document_;
    }
}
