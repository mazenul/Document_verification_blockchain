# Quick Start Checklist

Use this checklist to quickly set up and run your blockchain application.

## Preparation (One-time Setup)

- [ ] Install MetaMask browser extension from https://metamask.io/
- [ ] Create MetaMask wallet and save recovery phrase
- [ ] Switch MetaMask to "Sepolia Testnet"
- [ ] Get free Sepolia ETH from https://sepoliafaucet.com/
- [ ] Verify you have 0.5+ SepoliaETH in wallet

## Deploy Smart Contract (One-time)

- [ ] Open Remix IDE at https://remix.ethereum.org/
- [ ] Create new file: `DocumentVerification.sol`
- [ ] Copy and paste contract code from your project folder
- [ ] Click "Solidity Compiler" tab (3rd icon)
- [ ] Click "Compile DocumentVerification.sol"
- [ ] Click "Deploy & Run" tab (4th icon)
- [ ] Select "Injected Provider - MetaMask" as environment
- [ ] Connect MetaMask when prompted
- [ ] Click orange "Deploy" button
- [ ] Confirm transaction in MetaMask
- [ ] Wait 30 seconds for deployment
- [ ] Copy contract address and save it in a text file

## Run Frontend Application

### Option A: Using VS Code + Live Server
- [ ] Install VS Code
- [ ] Install "Live Server" extension by Ritwick Dey
- [ ] Open project folder in VS Code
- [ ] Right-click `index.html` → "Open with Live Server"

### Option B: Using Python
- [ ] Open Command Prompt
- [ ] Navigate to project folder: `cd C:\Users\imaze\Desktop\cse498R\New_Try`
- [ ] Run: `python -m http.server 8000`
- [ ] Open browser: http://localhost:8000

## Use the Application

- [ ] Click "Connect MetaMask" and approve connection
- [ ] Paste your contract address in the "Contract Address" field
- [ ] Click "Set Contract"
- [ ] Upload a test file
- [ ] Click "Upload to Blockchain" and confirm in MetaMask
- [ ] Wait for success message
- [ ] Verify the same file - should show "✓ VERIFIED"
- [ ] Modify the file and verify again - should show "✗ NOT VERIFIED"

## Troubleshooting Quick Fixes

**MetaMask won't connect?**
- Refresh page and try again

**Transaction failing?**
- Check you're on Sepolia Testnet
- Check you have enough SepoliaETH

**Contract not working?**
- Verify contract address is correct (42 characters starting with 0x)
- Make sure contract was deployed on Sepolia network

**Need more test ETH?**
- Visit faucets: https://sepoliafaucet.com/ or https://www.infura.io/faucet/sepolia

## URLs to Bookmark

- **MetaMask:** https://metamask.io/
- **Remix IDE:** https://remix.ethereum.org/
- **Sepolia Faucet:** https://sepoliafaucet.com/
- **Sepolia Explorer:** https://sepolia.etherscan.io/

## Important Reminders

- This is a TEST network - Sepolia ETH has no real value
- Never share your MetaMask recovery phrase
- Only the file hash is stored on blockchain, not the file itself
- Any change to a file will change its hash

## Contract Address

Save your deployed contract address here:
```
Contract Address: _______________________________________________

Deployed on: _______________

Network: Sepolia Testnet
```

---

For detailed instructions, see `SETUP_INSTRUCTIONS.md`
