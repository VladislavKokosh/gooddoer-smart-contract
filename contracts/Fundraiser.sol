// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {IFundraiser} from "./interfaces/IFundraiser.sol";

contract Fundraiser is IFundraiser {
    uint256 private _fundraisingAmount;
    address private _beneficiary;
    Document private _document;

    constructor(uint256 fundraisingAmount_, address beneficiary_, Document memory document_) {
        _fundraisingAmount = fundraisingAmount_;
        _beneficiary = beneficiary_;
        _document = document_;
    }
}
