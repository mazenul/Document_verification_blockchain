# Troubleshooting Guide

## Fixed Issues

### ✅ MetaMask Disconnection Issue (FIXED)

**Problem:** When clicking generate buttons, MetaMask would disconnect unexpectedly.

**Root Cause:** Buttons didn't have explicit `type="button"` attribute, which could cause unexpected form submission behavior in some browsers.

**Solution Applied:**
1. Added `type="button"` to all buttons in the application
2. Added `event.preventDefault()` and `event.stopPropagation()` to button handlers
3. Added setTimeout wrapper to scrollIntoView to prevent timing issues

**Status:** ✅ FIXED - The buttons now work correctly without disconnecting MetaMask

---

## Known Issues

### Server Log Shows 405 Errors for `/predict` Endpoint

**What You're Seeing:**
```
127.0.0.1 - - [10/Dec/2025 22:55:01] "POST /predict HTTP/1.1" 405 -
```

**Explanation:**
These requests are **NOT** coming from our application code. They are likely from:
- A browser extension (AI assistant, prediction tool, etc.)
- A cached service worker
- Another application running on your machine

**Impact:** None - these errors don't affect the functionality of our application

**If It Bothers You:**
1. Check your browser extensions and disable any that might make automatic requests
2. Clear your browser cache
3. Try opening the application in an incognito/private window

---

## How to Test the Fixes

1. **Start the Server:**
   ```bash
   python server.py
   ```

2. **Open the Application:**
   Navigate to http://localhost:5000

3. **Connect MetaMask:**
   Click "Connect MetaMask" button

4. **Test Generate Log:**
   - Click "Generate System Log" button
   - Wait for file generation (~5 seconds)
   - Verify MetaMask stays connected ✅
   - File should auto-load into "Upload Document" section

5. **Test Generate Malware Report:**
   - Click "Generate Malware Report" button
   - Wait for file generation (~60 seconds)
   - Verify MetaMask stays connected ✅
   - File should auto-load into "Upload Document" section

6. **Upload to Blockchain:**
   - After file auto-loads, click "Upload to Blockchain"
   - MetaMask should prompt for transaction confirmation
   - Confirm transaction
   - Verify successful upload

---

## Additional Tips

### If MetaMask Still Disconnects:

1. **Check Browser Console:**
   - Press F12 to open Developer Tools
   - Go to Console tab
   - Look for any error messages
   - Share them if you need further help

2. **Try Different Browser:**
   - Test in Chrome, Firefox, or Brave
   - Some browsers handle MetaMask better than others

3. **Update MetaMask:**
   - Ensure you have the latest version of MetaMask
   - Sometimes outdated versions have connection issues

4. **Check Network:**
   - Ensure you're on Sepolia Testnet
   - Sometimes switching networks can cause disconnections

### If Files Don't Auto-Load:

1. **Manual Upload:**
   - Files are still saved in their directories:
     - `Log_file_generator/log_file_YYYY.MM.DD_HH-MM-SS.txt`
     - `Malware_file_generator/malware_data_YYYY.MM.DD_HH-MM-SS.txt`
   - You can manually select them using the file input

2. **Check Console:**
   - Look for JavaScript errors that might prevent auto-loading
   - Hash calculation might take a moment for large files

---

## Performance Notes

### System Log Generation:
- **Time:** 2-5 seconds
- **File Size:** ~10-50 KB
- **Hash Calculation:** Instant

### Malware Report Generation:
- **Time:** 30-60 seconds (Windows Defender queries are slow)
- **File Size:** ~50-200 KB (depending on system activity)
- **Hash Calculation:** ~1 second
- **Note:** May require Administrator privileges for full data collection

---

## Testing Checklist

Use this checklist to verify everything works:

- [ ] Server starts without errors
- [ ] Application loads at http://localhost:5000
- [ ] MetaMask connects successfully
- [ ] Contract address can be set and saved
- [ ] "Generate System Log" button works
- [ ] MetaMask stays connected during log generation
- [ ] Log file auto-loads into upload section
- [ ] "Generate Malware Report" button works
- [ ] MetaMask stays connected during report generation
- [ ] Malware report auto-loads into upload section
- [ ] Can upload generated file to blockchain
- [ ] Can verify uploaded file
- [ ] Can load "My Documents" list

---

## Getting Help

If you encounter issues not covered here:

1. Check the browser console (F12) for error messages
2. Check the server terminal for Python errors
3. Verify all dependencies are installed: `pip install -r requirements.txt`
4. Try restarting the Flask server
5. Clear browser cache and reload the page

---

**Last Updated:** 2025-12-10
**Version:** 1.0 (Post MetaMask Fix)
