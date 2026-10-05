// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title DocumentVerification
 * @dev Store and verify document hashes on the blockchain
 */
contract DocumentVerification {

    // Structure to store document information
    struct Document {
        string documentHash;
        uint256 timestamp;
        address uploader;
        string fileName;
        bool exists;
    }

    // Mapping from document hash to Document struct
    mapping(string => Document) private documents;

    // Array to keep track of all document hashes
    string[] private documentHashes;

    // Events
    event DocumentAdded(
        string indexed documentHash,
        uint256 timestamp,
        address indexed uploader,
        string fileName
    );

    event DocumentVerified(
        string indexed documentHash,
        bool exists,
        uint256 timestamp,
        address uploader
    );

    /**
     * @dev Add a new document hash to the blockchain
     * @param _documentHash The SHA-256 hash of the document
     * @param _fileName The name of the document
     */
    function addDocument(string memory _documentHash, string memory _fileName) public {
        require(bytes(_documentHash).length > 0, "Document hash cannot be empty");
        require(bytes(_fileName).length > 0, "File name cannot be empty");
        require(!documents[_documentHash].exists, "Document already exists");

        documents[_documentHash] = Document({
            documentHash: _documentHash,
            timestamp: block.timestamp,
            uploader: msg.sender,
            fileName: _fileName,
            exists: true
        });

        documentHashes.push(_documentHash);

        emit DocumentAdded(_documentHash, block.timestamp, msg.sender, _fileName);
    }

    /**
     * @dev Verify if a document exists and get its details
     * @param _documentHash The SHA-256 hash of the document to verify
     * @return exists Whether the document exists
     * @return timestamp When the document was added
     * @return uploader Who uploaded the document
     * @return fileName The name of the document
     */
    function verifyDocument(string memory _documentHash) public returns (
        bool exists,
        uint256 timestamp,
        address uploader,
        string memory fileName
    ) {
        Document memory doc = documents[_documentHash];

        emit DocumentVerified(_documentHash, doc.exists, doc.timestamp, doc.uploader);

        return (doc.exists, doc.timestamp, doc.uploader, doc.fileName);
    }

    /**
     * @dev Get document details (view function - doesn't emit events)
     * @param _documentHash The SHA-256 hash of the document
     */
    function getDocument(string memory _documentHash) public view returns (
        bool exists,
        uint256 timestamp,
        address uploader,
        string memory fileName
    ) {
        Document memory doc = documents[_documentHash];
        return (doc.exists, doc.timestamp, doc.uploader, doc.fileName);
    }

    /**
     * @dev Get total number of documents stored
     */
    function getTotalDocuments() public view returns (uint256) {
        return documentHashes.length;
    }

    /**
     * @dev Get all documents uploaded by a specific address
     * @param _uploader The address of the uploader
     */
    function getDocumentsByUploader(address _uploader) public view returns (string[] memory) {
        uint256 count = 0;

        // First, count how many documents this uploader has
        for (uint256 i = 0; i < documentHashes.length; i++) {
            if (documents[documentHashes[i]].uploader == _uploader) {
                count++;
            }
        }

        // Create array of the right size
        string[] memory userDocs = new string[](count);
        uint256 index = 0;

        // Fill the array
        for (uint256 i = 0; i < documentHashes.length; i++) {
            if (documents[documentHashes[i]].uploader == _uploader) {
                userDocs[index] = documentHashes[i];
                index++;
            }
        }

        return userDocs;
    }
}
