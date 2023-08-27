// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IFundraiserStruct} from "./IFundraiserStruct.sol";

interface IGooddoerFactory is IFundraiserStruct {
    event FundraiserCreated(
        address indexed fundraiser,
        uint256 fundraisingAmount,
        address beneficiary,
        bytes32 documentName,
        string documentUri,
        bytes32 documentHash
    );

    function createFundraiser(
        uint256 fundraisingAmount,
        address beneficiary,
        DocumentParams calldata document
    ) external returns (bool);
}
