// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IFundraiserStruct} from "./IFundraiserStruct.sol";

interface IGooddoerFactory is IFundraiserStruct {
    event FundraiserCreated(
        address indexed fundraiser,
        uint256 fundraisingAmount,
        address beneficiary,
        bytes32 documentName,
        string documentUri
    );

    function createFundraiser(
        uint256 fundraisingAmount,
        address beneficiary,
        Document calldata document
    ) external returns (bool);
}
