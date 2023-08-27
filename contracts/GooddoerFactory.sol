// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {IGooddoerFactory} from "./interfaces/IGooddoerFactory.sol";
import {AccessControlEnumerable, EnumerableSet} from "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import {Fundraiser} from "./Fundraiser.sol";

contract GooddoerFactory is IGooddoerFactory, AccessControlEnumerable {
    using EnumerableSet for EnumerableSet.AddressSet;

    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    EnumerableSet.AddressSet private _fundraisers;

    function fundraisersCount() external view returns (uint256) {
        return _fundraisers.length();
    }

    function isFundraiserExist(address fundraiserAddress) public view returns (bool) {
        return _fundraisers.contains(fundraiserAddress);
    }

    function fundraiserById(uint256 fundraiserId) external view returns (address) {
        require(fundraiserId < _fundraisers.length(), "GooddoerFactory: Invalid fundraiser id");
        return _fundraisers.at(fundraiserId);
    }

    function fundraisers(uint256 offset, uint256 limit) external view returns (address[] memory fundraisersAddresses) {
        uint256 salesCount = _fundraisers.length();
        if (offset >= salesCount) return new address[](0);
        uint256 to = offset + limit;
        if (salesCount < to) to = salesCount;
        fundraisersAddresses = new address[](to - offset);
        for (uint256 i = 0; i < fundraisersAddresses.length; i++) fundraisersAddresses[i] = _fundraisers.at(offset + i);
    }

    constructor(address admin_, address operator_) {
        require(admin_ != address(0), "GooddoerFactory: Admin is zero address");
        require(operator_ != address(0), "GooddoerFactory: Operator is zero address");
        _grantRole(DEFAULT_ADMIN_ROLE, admin_);
        _grantRole(OPERATOR_ROLE, operator_);
    }

    function createFundraiser(
        uint256 fundraisingAmount,
        address beneficiary,
        DocumentParams calldata document
    ) external returns (bool) {
        require(fundraisingAmount != 0, "GooddoerFactory: Fundraising amount lte zero");
        require(beneficiary != address(0), "GooddoerFactory: Beneficiary is zero address");
        require(document.name != bytes32(0), "GooddoerFactory: Document name is zero bytes");
        require(bytes(document.uri).length > 0, "GooddoerFactory: Document uri is empty");
        bytes memory bytecode = abi.encodePacked(
            type(Fundraiser).creationCode,
            abi.encode(fundraisingAmount, beneficiary, document)
        );
        bytes32 salt = keccak256(
            abi.encodePacked(fundraisingAmount, beneficiary, document.name, document.uri, document.hash)
        );
        address fundraiser;
        assembly {
            fundraiser := create2(0, add(bytecode, 32), mload(bytecode), salt)

            if iszero(extcodesize(fundraiser)) {
                revert(0, 0)
            }
        }
        _fundraisers.add(fundraiser);
        emit FundraiserCreated(fundraiser, fundraisingAmount, beneficiary, document.name, document.uri, document.hash);
        return true;
    }
}
