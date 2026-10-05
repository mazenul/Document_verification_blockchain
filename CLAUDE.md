# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a blockchain-based document verification system with auxiliary Python utilities for generating system logs and malware analysis reports. The main application allows users to upload document hashes to the Ethereum blockchain (Sepolia testnet) and verify document authenticity using cryptographic hashing.

## Core Architecture

### Blockchain Component (Main Application)

**Smart Contract (`DocumentVerification.sol`)**
- Solidity 0.8.0 contract deployed on Ethereum Sepolia testnet
- Stores document hashes with metadata (timestamp, uploader address, filename)
- Key functions:
  - `addDocument(hash, fileName)` - Stores new document hash (prevents duplicates)
  - `verifyDocument(hash)` - Returns document details and emits verification event
  - `getDocument(hash)` - View function for document lookup (no gas cost)
  - `getDocumentsByUploader(address)` - Returns all documents uploaded by an address
- Uses mapping(string => Document) for hash storage and string[] array for tracking all hashes
- Contract ABI is hardcoded in `app.js`

**Frontend (`index.html`, `style.css`, `app.js`)**
- Single-page application using vanilla JavaScript and Web3.js 1.8.0
- MetaMask integration for wallet connection and transaction signing
- SHA-256 client-side hashing using Web Crypto API
- Contract address stored in browser localStorage (menu-based configuration)
- Key workflow:
  1. User connects MetaMask wallet
  2. Sets deployed contract address (saved to localStorage)
  3. Uploads files to generate hashes
  4. Sends transactions to store/verify hashes on blockchain

**State Management**
- Global variables in `app.js`: `web3`, `contract`, `userAccount`
- Temporary file data stored in `window.currentUploadFile` and `window.currentVerifyFile`
- Contract address persists via localStorage with key 'contractAddress'

### Python Utilities

**System Logger (`Log_file_generator/system_logger.py`)**
- Generates timestamped system diagnostic logs
- Output format: `log_file_YYYY.MM.DD_HH-MM-SS.txt`
- Collects: OS info, CPU/memory/disk usage, network stats, running processes (sorted by memory)
- Uses psutil, platform, socket libraries

**Malware Report Generator (`Malware_file_generator/malware_report.py`)**
- Creates comprehensive security analysis reports
- Output format: `malware_data_YYYY.MM.DD_HH-MM-SS.txt`
- Gathers: system info, Windows Defender status, running processes, network connections, startup programs, firewall status, suspicious file locations
- Windows-specific (uses winreg, PowerShell commands for Defender checks)
- Designed for security research/educational purposes only

## Development Commands

### Blockchain Application

**Local Development Server**
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using VS Code Live Server extension (recommended)
# Right-click index.html -> "Open with Live Server"
```

**Smart Contract Deployment**
- Use Remix IDE at https://remix.ethereum.org/
- Compile with Solidity 0.8.x compiler
- Deploy via "Injected Provider - MetaMask" to Sepolia testnet
- Copy deployed contract address and paste in frontend menu
- Contract deployment requires Sepolia ETH from faucets

**Testing the Application**
1. Connect MetaMask to Sepolia testnet
2. Ensure you have Sepolia ETH (from https://sepoliafaucet.com/)
3. Set contract address in application menu
4. Upload a test file and verify it matches
5. Modify the file slightly and verify it fails verification

### Python Utilities

**Generate System Log**
```bash
cd Log_file_generator
python system_logger.py
# Creates log_file_YYYY.MM.DD_HH-MM-SS.txt in current directory
```

**Generate Malware Report** (Windows only)
```bash
cd Malware_file_generator
python malware_report.py
# Creates malware_data_YYYY.MM.DD_HH-MM-SS.txt in current directory
# Requires Administrator privileges for full functionality
```

## Important Technical Details

### Web3.js Integration
- Contract initialization requires both ABI (in `app.js`) and deployed address
- All blockchain writes (addDocument, verifyDocument) require MetaMask transaction confirmation
- Read operations (getDocument, getTotalDocuments, getDocumentsByUploader) are free view calls
- Network detection checks for Sepolia (chainId: 11155111n) and warns if on wrong network

### File Hashing
- Uses browser's Web Crypto API: `crypto.subtle.digest('SHA-256', buffer)`
- Files are read as ArrayBuffer via FileReader
- Hash is converted to hex string for blockchain storage
- Any file modification (even single byte) produces completely different hash

### Contract Address Management
- Side menu (hamburger icon) provides contract configuration
- Address saved to `localStorage.setItem('contractAddress', address)`
- Auto-loads on page refresh if previously set
- Validates address format using `web3.utils.isAddress()`

### Event Listeners
- MetaMask account changes reload user address
- Network changes trigger full page reload
- File input changes trigger immediate hash calculation

## Network Configuration

**Sepolia Testnet (Default)**
- Chain ID: 11155111
- RPC: https://sepolia.infura.io/v3/
- Block Explorer: https://sepolia.etherscan.io/
- Faucets: https://sepoliafaucet.com/, https://www.infura.io/faucet/sepolia

**Gas Costs (Approximate on Sepolia)**
- Deploy contract: 0.002-0.005 SepoliaETH
- Add document: 0.0005-0.001 SepoliaETH
- Verify document (with event): 0.0001-0.0003 SepoliaETH
- Read operations: Free (view functions)

## File Structure

```
New_Try/
├── DocumentVerification.sol      # Smart contract
├── index.html                    # Frontend HTML
├── style.css                     # Gradient purple theme styling
├── app.js                        # Web3 integration logic
├── README.md                     # Comprehensive documentation
├── SETUP_INSTRUCTIONS.md         # Step-by-step deployment guide
├── QUICK_START.md                # Checklist for quick setup
├── Log_file_generator/
│   └── system_logger.py          # System diagnostics utility
└── Malware_file_generator/
    └── malware_report.py         # Security analysis utility
```

## Common Gotchas

1. **Contract ABI Sync**: If you modify the Solidity contract, you must update the `contractABI` array in `app.js` with the new ABI from Remix
2. **MetaMask Network**: Application expects Sepolia testnet; warns but doesn't prevent usage on other networks
3. **File Privacy**: Only document hashes are stored on-chain, but filenames are visible to everyone on the blockchain
4. **Duplicate Prevention**: Contract prevents duplicate hash uploads by the same or different users
5. **Python Dependencies**: Both Python scripts require `psutil`; malware_report.py is Windows-specific and needs admin rights for full data collection
6. **localStorage Persistence**: Contract address persists across sessions; use "Clear Contract Address" in menu to reset

## Security Considerations

- This is a testnet application using test cryptocurrency (SepoliaETH has no real value)
- Never deploy to mainnet without understanding gas costs
- Python malware report script is for authorized security testing/education only
- Never share MetaMask recovery phrase or private keys
- Contract address and user addresses are public on blockchain
- File hashes and filenames are permanently stored and publicly visible
