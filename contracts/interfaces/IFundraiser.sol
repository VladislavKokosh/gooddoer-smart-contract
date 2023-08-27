// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IFundraiserStruct} from "./IFundraiserStruct.sol";

interface IFundraiser is IFundraiserStruct {
    function fundraisingAmount() external view returns (uint256);

    function beneficiary() external view returns (address);
}
