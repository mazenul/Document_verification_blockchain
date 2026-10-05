# Blockchain Document Verification System

A decentralized application (DApp) for verifying document authenticity using Ethereum blockchain technology. Upload documents, generate their cryptographic hash, and store it permanently on the blockchain to prove document integrity.

## Features

- **Document Upload:** Upload any file and store its SHA-256 hash on the blockchain
- **Tamper Detection:** Verify if a document has been modified or tampered with
- **MetaMask Integration:** Secure wallet connection and transaction signing
- **Immutable Records:** Once uploaded, document hashes cannot be altered
- **Timestamp Proof:** Each document is timestamped when uploaded
- **User History:** View all documents you've uploaded to the blockchain
- **No File Storage:** Only hashes are stored - your files remain private

## How It Works

1. **Hash Generation:** When you upload a file, it's converted to a unique SHA-256 hash
2. **Blockchain Storage:** The hash (along with filename, timestamp, and uploader address) is stored on Ethereum
3. **Verification:** To verify a document, its hash is recalculated and compared with the blockchain
4. **Result:** If hashes match, the document is authentic and unchanged

## Technology Stack

### Smart Contract
- **Language:** Solidity 0.8.0
- **Platform:** Ethereum
- **Network:** Sepolia Testnet (for testing)

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with gradient design
- **JavaScript** - Application logic
- **Web3.js** - Blockchain interaction library

### Wallet
- **MetaMask** - Browser extension wallet for Ethereum

### Development Tools
- **Remix IDE** - Smart contract deployment
- **VS Code** - Frontend development

## Project Structure

```
New_Try/
│
├── DocumentVerification.sol     # Solidity smart contract
├── index.html                   # Main HTML file
├── style.css                    # CSS styling
├── app.js                       # JavaScript + Web3.js integration
│
├── SETUP_INSTRUCTIONS.md        # Detailed setup guide
├── QUICK_START.md               # Quick reference checklist
└── README.md                    # This file
```

## Smart Contract Functions

### Main Functions

1. **addDocument(hash, fileName)**
   - Stores document hash on blockchain
   - Emits DocumentAdded event
   - Prevents duplicate uploads

2. **verifyDocument(hash)**
   - Checks if document exists
   - Returns: exists, timestamp, uploader, fileName
   - Emits DocumentVerified event

3. **getDocument(hash)**
   - View function to get document details
   - No gas cost (read-only)

4. **getTotalDocuments()**
   - Returns total number of documents stored

5. **getDocumentsByUploader(address)**
   - Returns all documents uploaded by a specific address

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, or Brave)
- MetaMask browser extension
- Free Sepolia ETH for testing (from faucets)

### Quick Setup

1. **Install MetaMask**
   ```
   Visit: https://metamask.io/
   Install browser extension
   Create wallet and save recovery phrase
   ```

2. **Get Test ETH**
   ```
   Switch MetaMask to Sepolia Testnet
   Visit: https://sepoliafaucet.com/
   Get free Sepolia ETH
   ```

3. **Deploy Contract**
   ```
   Open: https://remix.ethereum.org/
   Create file: DocumentVerification.sol
   Paste contract code
   Compile and deploy to Sepolia
   Copy contract address
   ```

4. **Run Application**
   ```
   Open project folder
   Run with Live Server or Python HTTP server
   Connect MetaMask
   Paste contract address
   Start uploading and verifying documents!
   ```

For detailed step-by-step instructions, see [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

For a quick checklist, see [QUICK_START.md](QUICK_START.md)

## Usage Examples

### Upload a Document

1. Click "Choose a file..." in Upload section
2. Select your document (PDF, image, text, etc.)
3. Review the generated SHA-256 hash
4. Click "Upload to Blockchain"
5. Confirm transaction in MetaMask
6. Wait for confirmation (15-30 seconds)

### Verify a Document

1. Click "Choose a file to verify..." in Verify section
2. Select the document to check
3. Click "Verify on Blockchain"
4. See result:
   - ✓ **VERIFIED** - Document is authentic and unchanged
   - ✗ **NOT VERIFIED** - Document not found or has been modified

## Security Features

- **Immutability:** Once stored, hashes cannot be changed
- **Cryptographic Security:** SHA-256 hash algorithm
- **Blockchain Transparency:** All records are publicly verifiable
- **MetaMask Security:** Private keys never leave your wallet
- **No File Upload:** Only hashes are stored, files stay private

## Use Cases

- **Legal Documents:** Prove a contract existed at a specific time
- **Academic Certificates:** Verify authenticity of diplomas/transcripts
- **Intellectual Property:** Timestamp creative works
- **Supply Chain:** Verify product authenticity documents
- **Government Records:** Tamper-proof public records
- **Medical Records:** Verify integrity of health documents

## Network Information

### Sepolia Testnet (Default)
- **Network Name:** Sepolia Testnet
- **Chain ID:** 11155111
- **Currency:** SepoliaETH (test ETH)
- **Block Explorer:** https://sepolia.etherscan.io/
- **Gas Fees:** Free (using test ETH)

### Moving to Mainnet
To deploy on Ethereum Mainnet:
- Switch MetaMask to Ethereum Mainnet
- Acquire real ETH
- Deploy contract (costs gas fees)
- Update frontend with new contract address

**WARNING:** Mainnet transactions cost real money!

## Gas Costs (Approximate)

On Sepolia Testnet:
- **Deploy Contract:** 0.002 - 0.005 SepoliaETH
- **Upload Document:** 0.0005 - 0.001 SepoliaETH
- **Verify Document:** 0.0001 - 0.0003 SepoliaETH
- **View Documents:** Free (read-only)

## Limitations

- Only stores hash, not the actual file
- Requires MetaMask browser extension
- Gas fees required for transactions
- Blockchain queries may take a few seconds
- File size doesn't matter (only hash is stored)

## Future Enhancements

Potential improvements:
- [ ] IPFS integration for file storage
- [ ] Multiple blockchain support (Polygon, BSC)
- [ ] QR code generation for documents
- [ ] Email notifications on verification attempts
- [ ] Bulk upload functionality
- [ ] Document expiration dates
- [ ] Access control lists
- [ ] Mobile app version
- [ ] Integration with cloud storage (Google Drive, Dropbox)

## Troubleshooting

### Common Issues

**Problem:** MetaMask not connecting
- **Solution:** Refresh page, check if MetaMask is unlocked

**Problem:** Transaction failing
- **Solution:** Ensure you're on Sepolia network and have enough ETH

**Problem:** Contract address invalid
- **Solution:** Verify address is 42 characters starting with "0x"

**Problem:** Verification always fails
- **Solution:** Make sure you're verifying the EXACT same file

For more troubleshooting, see [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md#troubleshooting)

## Contributing

Want to improve this project? Ideas:
- Add support for more file metadata
- Implement batch processing
- Create mobile-friendly UI
- Add multi-language support
- Optimize gas costs

## License

This project is open source and available for educational purposes.

## Disclaimer

- This is a demonstration/educational project
- Use Sepolia Testnet for testing (free)
- Be cautious when deploying to mainnet
- Never share your MetaMask recovery phrase
- Transactions on mainnet cost real money
- No warranty or guarantee provided

## Support

Need help?
1. Check [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)
2. Review [QUICK_START.md](QUICK_START.md)
3. Check browser console for errors (F12)
4. Verify all prerequisites are met

## Acknowledgments

- **Ethereum** - Blockchain platform
- **MetaMask** - Wallet provider
- **Remix** - Smart contract IDE
- **Web3.js** - JavaScript library
- **Sepolia Testnet** - Test environment

---

**Built with Ethereum • MetaMask • Solidity • Web3.js**

**Happy Verifying!**
