// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {IERC1643} from "./IERC1643.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

abstract contract ERC1643 is IERC1643 {
    using EnumerableSet for EnumerableSet.Bytes32Set;

    mapping(bytes32 => Document) private _documents;
    EnumerableSet.Bytes32Set private _docsHashes;

    function getDocument(bytes32 documentName) public view virtual returns (string memory, bytes32, uint256) {
        require(bytes(_documents[documentName].docURI).length != 0, "");
        Document memory document = _documents[documentName];
        return (document.docURI, document.docHash, document.lastModified);
    }

    function getAllDocuments() public view virtual returns (bytes32[] memory documents) {
        uint256 documentsCount = _docsHashes.length();
        for (uint256 i; i < documentsCount; ) {
            documents[i] = _docsHashes.at(i);
            unchecked {
                ++i;
            }
        }
    }

    function setDocument(bytes32 documentName, string memory uri, bytes32 documentHash) external returns (bool) {
        _setDocument(documentName, uri, documentHash);
        return true;
    }

    function removeDocument(bytes32 documentName) external returns (bool) {
        _removeDocument(documentName);
        return true;
    }

    function _setDocument(bytes32 documentName, string memory uri, bytes32 documentHash) internal virtual {
        require(documentName != bytes32(0), "");
        require(bytes(uri).length > 0, "");
        if (_documents[documentName].lastModified == 0) {
            _docsHashes.add(documentHash);
        }
        _documents[documentName] = Document({docURI: uri, docHash: documentHash, lastModified: block.timestamp});
        emit DocumentUpdated(documentName, uri, documentHash);
    }

    function _removeDocument(bytes32 documentName) internal virtual {
        Document memory document = _documents[documentName];
        require(document.lastModified != 0, "Document doesnt exist");
        _docsHashes.remove(document.docHash);
        delete _documents[documentName];
        emit DocumentRemoved(documentName, document.docURI, document.docHash);
    }
}
