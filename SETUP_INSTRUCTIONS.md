# Document Verification System - Complete Setup Guide

This is a blockchain-based document verification system that allows you to upload files, generate their hash, store it on the Ethereum blockchain, and verify if files have been tampered with.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step 1: Install MetaMask](#step-1-install-metamask)
3. [Step 2: Setup MetaMask for Sepolia Testnet](#step-2-setup-metamask-for-sepolia-testnet)
4. [Step 3: Get Free Sepolia ETH](#step-3-get-free-sepolia-eth)
5. [Step 4: Deploy Smart Contract using Remix](#step-4-deploy-smart-contract-using-remix)
6. [Step 5: Run the Frontend Application](#step-5-run-the-frontend-application)
7. [Step 6: Use the Application](#step-6-use-the-application)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, make sure you have:
- A modern web browser (Chrome, Firefox, or Brave recommended)
- Internet connection
- Basic understanding of blockchain concepts

---

## Step 1: Install MetaMask

MetaMask is a cryptocurrency wallet that runs in your browser.

### Installation Steps:

1. **Visit MetaMask Website**
   - Go to: https://metamask.io/
   - Click "Download" button

2. **Install Browser Extension**
   - Choose your browser (Chrome/Firefox/Brave)
   - Click "Install MetaMask for [Your Browser]"
   - Click "Add to Browser" or "Add Extension"

3. **Setup MetaMask**
   - Click on the MetaMask icon in your browser extensions
   - Click "Get Started"
   - Choose "Create a new wallet"
   - Create a strong password
   - **IMPORTANT:** Write down your Secret Recovery Phrase (12 words)
   - Store it in a safe place - NEVER share it with anyone!
   - Confirm your recovery phrase

4. **Verify Installation**
   - You should see your MetaMask wallet with 0 ETH balance
   - Default network will be "Ethereum Mainnet"

---

## Step 2: Setup MetaMask for Sepolia Testnet

We'll use Sepolia Testnet (a test blockchain) so you don't need real money.

### Steps:

1. **Open MetaMask**
   - Click the MetaMask extension icon

2. **Show Test Networks**
   - Click the network dropdown at the top (it says "Ethereum Mainnet")
   - Click "Show/hide test networks" at the bottom
   - Toggle ON "Show test networks"

3. **Switch to Sepolia**
   - Click the network dropdown again
   - Select "Sepolia test network"
   - Your balance will show 0 SepoliaETH

**Note:** If you don't see Sepolia, you can add it manually:
- Network Name: Sepolia Testnet
- RPC URL: https://sepolia.infura.io/v3/
- Chain ID: 11155111
- Currency Symbol: SepoliaETH
- Block Explorer: https://sepolia.etherscan.io

---

## Step 3: Get Free Sepolia ETH

You need some Sepolia ETH (test cryptocurrency) to pay for transactions.

### Using Sepolia Faucet:

1. **Copy Your Wallet Address**
   - Open MetaMask
   - Click on your account name to copy the address
   - It looks like: 0x1234...5678

2. **Visit a Sepolia Faucet** (try these in order):

   **Option 1: Alchemy Faucet (Recommended)**
   - Go to: https://sepoliafaucet.com/
   - Create a free Alchemy account if needed
   - Paste your wallet address
   - Click "Send Me ETH"
   - Wait 1-2 minutes

   **Option 2: Infura Faucet**
   - Go to: https://www.infura.io/faucet/sepolia
   - Create a free Infura account if needed
   - Paste your wallet address
   - Complete any captcha
   - Click "Receive ETH"

   **Option 3: Google Cloud Faucet**
   - Go to: https://cloud.google.com/application/web3/faucet/ethereum/sepolia
   - Sign in with Google account
   - Paste your wallet address
   - Click "Get Sepolia ETH"

3. **Verify You Received ETH**
   - Open MetaMask
   - You should see 0.5 or 1 SepoliaETH
   - If not received after 5 minutes, try another faucet

**Note:** These are test networks, so the ETH has no real value!

---

## Step 4: Deploy Smart Contract using Remix

Remix is an online IDE for Solidity smart contracts.

### Detailed Steps:

1. **Open Remix IDE**
   - Go to: https://remix.ethereum.org/
   - You'll see the Remix interface with a file explorer on the left

2. **Create New File**
   - In the left sidebar, under "File Explorer"
   - Click the "Create new file" icon (document with +)
   - Name it: `DocumentVerification.sol`
   - Press Enter

3. **Copy Smart Contract Code**
   - Open the file `DocumentVerification.sol` in your project folder
   - Copy ALL the code
   - Paste it into Remix editor (right side)
   - The code should appear without errors

4. **Compile the Contract**
   - Click the "Solidity Compiler" tab (left sidebar, 3rd icon from top)
   - Make sure compiler version is `0.8.x` (any 0.8 version works)
   - Click the big blue "Compile DocumentVerification.sol" button
   - You should see a green checkmark ✓
   - If you see warnings (yellow), that's okay - ignore them
   - If you see errors (red), double-check you copied the code correctly

5. **Connect MetaMask to Remix**
   - Click the "Deploy & Run Transactions" tab (4th icon, left sidebar)
   - Under "ENVIRONMENT", select "Injected Provider - MetaMask"
   - MetaMask will pop up asking to connect
   - Click "Next" then "Connect"
   - You should see your account address appear under "ACCOUNT"
   - Balance should show your Sepolia ETH

6. **Deploy the Contract**
   - Make sure "DocumentVerification" is selected in the CONTRACT dropdown
   - Click the orange "Deploy" button
   - MetaMask will pop up asking to confirm the transaction
   - **Gas Fee:** You'll see an estimated fee (e.g., 0.001 SepoliaETH)
   - Click "Confirm" in MetaMask
   - Wait 10-30 seconds for deployment

7. **Get Your Contract Address**
   - After deployment, look at the bottom of the left sidebar
   - Under "Deployed Contracts", you'll see your contract
   - Click the copy icon next to the contract address
   - **SAVE THIS ADDRESS** - You'll need it later!
   - Example address: `0x1234567890abcdef1234567890abcdef12345678`

8. **Verify Deployment (Optional)**
   - Go to: https://sepolia.etherscan.io/
   - Paste your contract address in the search bar
   - You should see your contract with transaction details

**IMPORTANT:** Save your contract address in a text file!

---

## Step 5: Run the Frontend Application

### Method 1: Using Live Server (Recommended)

1. **Install Visual Studio Code**
   - Download from: https://code.visualstudio.com/
   - Install it on your computer

2. **Install Live Server Extension**
   - Open VS Code
   - Click Extensions icon (left sidebar, or Ctrl+Shift+X)
   - Search for "Live Server"
   - Install the one by "Ritwick Dey"

3. **Open Project Folder**
   - In VS Code, click File → Open Folder
   - Navigate to: `C:\Users\imaze\Desktop\cse498R\New_Try`
   - Click "Select Folder"

4. **Start Live Server**
   - Right-click on `index.html` in the file explorer
   - Click "Open with Live Server"
   - Your browser will automatically open the application
   - URL will be something like: http://127.0.0.1:5500/index.html

### Method 2: Using Python HTTP Server

1. **Open Command Prompt**
   - Press Windows + R
   - Type `cmd` and press Enter

2. **Navigate to Project Folder**
   ```
   cd C:\Users\imaze\Desktop\cse498R\New_Try
   ```

3. **Start Server**
   - If you have Python 3:
     ```
     python -m http.server 8000
     ```
   - If you have Python 2:
     ```
     python -m SimpleHTTPServer 8000
     ```

4. **Open in Browser**
   - Open your browser
   - Go to: http://localhost:8000

### Method 3: Direct File Open (Not Recommended)

- Simply double-click `index.html`
- Note: Some features might not work due to CORS restrictions

---

## Step 6: Use the Application

### A. Connect Your Wallet

1. **Open the Application**
   - You should see the Document Verification System page
   - Beautiful purple gradient design

2. **Click "Connect MetaMask"**
   - MetaMask will pop up
   - Click "Next" then "Connect"
   - Your wallet address should appear on the page
   - Status should show "Connected" in green
   - Network should show "Sepolia Testnet"

**If wrong network:**
- MetaMask might ask you to switch networks
- Click "Switch Network"
- Or manually switch to Sepolia in MetaMask

### B. Set Contract Address

1. **Paste Contract Address**
   - Find the "Smart Contract Configuration" section
   - Paste the contract address you saved from Remix
   - Click "Set Contract"
   - You should see: "Contract connected successfully!"

### C. Upload a Document to Blockchain

1. **Choose a File**
   - In the "Upload Document" section
   - Click "Choose a file..."
   - Select any file (PDF, image, text file, etc.)

2. **View File Information**
   - File name, size, and SHA-256 hash will appear
   - The hash is a unique fingerprint of your file

3. **Upload to Blockchain**
   - Click "Upload to Blockchain"
   - MetaMask will pop up asking to confirm
   - You'll see gas fee estimate (very small amount)
   - Click "Confirm"
   - Wait 10-30 seconds
   - Success message will appear with transaction details

### D. Verify a Document

1. **Choose a File to Verify**
   - In the "Verify Document" section
   - Click "Choose a file to verify..."
   - Select a file

2. **Verify on Blockchain**
   - Click "Verify on Blockchain"
   - Wait a few seconds
   - Results will show:
     - **✓ VERIFIED:** File exists and hasn't been tampered
     - **✗ NOT VERIFIED:** File doesn't exist or was modified

### E. View Your Documents

1. **Load Your Documents**
   - In the "My Documents" section
   - Click "Load My Documents"
   - All documents you've uploaded will appear
   - Each shows: file name, upload date, and hash

---

## Testing the System

### Test 1: Upload and Verify Same File
1. Upload a text file (e.g., `test.txt`)
2. Wait for transaction to confirm
3. Verify the same file
4. Result: **✓ VERIFIED**

### Test 2: Verify Modified File
1. Upload a text file
2. Open the file in notepad
3. Change a single character
4. Save the file
5. Try to verify it
6. Result: **✗ NOT VERIFIED** (hash is different!)

### Test 3: Duplicate Upload
1. Try to upload the same file twice
2. Result: Warning that document already exists

---

## Troubleshooting

### Problem: MetaMask not connecting
- **Solution:** Refresh the page and try again
- Make sure you approved the connection in MetaMask
- Try disconnecting and reconnecting in MetaMask settings

### Problem: "Insufficient funds" error
- **Solution:** Get more Sepolia ETH from faucets
- Each transaction costs very little (0.001-0.01 SepoliaETH)

### Problem: Transaction pending forever
- **Solution:** The network might be congested
- Wait 5-10 minutes
- Check transaction on https://sepolia.etherscan.io
- Can try to speed up transaction in MetaMask

### Problem: Wrong network error
- **Solution:** Open MetaMask
- Click network dropdown
- Select "Sepolia test network"
- Refresh the page

### Problem: Contract address invalid
- **Solution:** Double-check you copied the entire address
- Should start with "0x" and be 42 characters long
- Make sure you deployed on Sepolia network

### Problem: File hash keeps changing
- **Solution:** This is normal! Even small changes alter the hash
- That's the point - it detects tampering
- Make sure you're verifying the EXACT same file

### Problem: Application doesn't load
- **Solution:** Check browser console (F12) for errors
- Make sure all files are in the same folder
- Try using Live Server instead of opening file directly

---

## Understanding the System

### How It Works:

1. **File Hashing:**
   - Your file is converted to a unique SHA-256 hash
   - This hash is like a fingerprint - any change creates a different hash
   - Example: "Hello" → hash → `185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969`
   - Change to "Hello!" → different hash!

2. **Blockchain Storage:**
   - Only the hash is stored on blockchain (not the file itself)
   - Also stores: file name, timestamp, uploader address
   - This data cannot be changed or deleted (immutable)

3. **Verification:**
   - Hash of your file is calculated
   - Compared with hash stored on blockchain
   - If they match: file is authentic and unchanged
   - If they don't match: file was modified

### Why Use Blockchain?

- **Immutable:** Once stored, cannot be changed
- **Transparent:** Anyone can verify
- **Decentralized:** No single authority controls it
- **Timestamped:** Proves when document was uploaded

---

## Project File Structure

```
New_Try/
├── DocumentVerification.sol    (Smart contract - deploy to Remix)
├── index.html                  (Frontend HTML)
├── style.css                   (Styling)
├── app.js                      (Web3 integration)
└── SETUP_INSTRUCTIONS.md       (This file)
```

---

## Important Notes

1. **This is on TEST network:**
   - Sepolia ETH has no real value
   - Use it freely for testing
   - Perfect for learning!

2. **Never share:**
   - Your MetaMask password
   - Your recovery phrase (12 words)
   - Your private key

3. **Gas Fees:**
   - Every blockchain transaction costs gas
   - On testnet: free (using test ETH)
   - On mainnet: costs real money!

4. **File Privacy:**
   - Only the hash is stored, not the file content
   - The file name is visible to everyone
   - Anyone can see the hash on the blockchain
   - Keep sensitive files private!

---

## Next Steps & Improvements

Want to enhance the application? Try:

1. **Add file metadata:** Store file size, type, description
2. **Add access control:** Only certain addresses can upload
3. **Batch upload:** Upload multiple files at once
4. **Email notifications:** Get notified on verification attempts
5. **IPFS integration:** Store actual files on IPFS, hash on blockchain
6. **QR codes:** Generate QR codes for easy verification

---

## Getting Help

If you encounter issues:

1. Check the Troubleshooting section above
2. Look at browser console for errors (Press F12)
3. Verify you followed all steps in order
4. Make sure you're on Sepolia testnet
5. Check you have enough Sepolia ETH

---

## Deployment to Mainnet (Future)

**WARNING:** Don't deploy to mainnet without understanding costs!

To deploy on Ethereum Mainnet:
1. Get real ETH (costs money!)
2. Switch MetaMask to "Ethereum Mainnet"
3. Follow same deployment steps in Remix
4. Transactions will cost real money

**Alternatives (cheaper):**
- Polygon Network (much cheaper gas fees)
- Binance Smart Chain
- Arbitrum or Optimism (Layer 2 solutions)

---

## Conclusion

Congratulations! You've built and deployed a blockchain application!

You now understand:
- How to use MetaMask
- How to deploy smart contracts with Remix
- How to interact with blockchain from a web app
- How document verification on blockchain works

This is a foundation for many other blockchain applications!

---

**Built with:**
- Solidity 0.8.0
- Web3.js 1.8.0
- Ethereum Sepolia Testnet
- HTML/CSS/JavaScript

**Happy Building!**
