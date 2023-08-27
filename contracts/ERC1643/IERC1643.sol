// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IERC1643 {
    struct Document {
        bytes32 docHash;
        uint256 lastModified;
        string docURI;
    }

    event DocumentRemoved(bytes32 indexed _name, string _uri, bytes32 _documentHash);
    event DocumentUpdated(bytes32 indexed _name, string _uri, bytes32 _documentHash);

    function getDocument(bytes32 _name) external view returns (string memory, bytes32, uint256);

    function getAllDocuments() external view returns (bytes32[] memory);

    function setDocument(bytes32 _name, string memory _uri, bytes32 _documentHash) external returns (bool);

    function removeDocument(bytes32 _name) external returns (bool);
}
