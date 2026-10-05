// Global variables
let web3;
let contract;
let userAccount;

// Contract ABI (Application Binary Interface)
const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "string", "name": "documentHash", "type": "string"},
            {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"},
            {"indexed": true, "internalType": "address", "name": "uploader", "type": "address"},
            {"indexed": false, "internalType": "string", "name": "fileName", "type": "string"}
        ],
        "name": "DocumentAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "string", "name": "documentHash", "type": "string"},
            {"indexed": false, "internalType": "bool", "name": "exists", "type": "bool"},
            {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"},
            {"indexed": false, "internalType": "address", "name": "uploader", "type": "address"}
        ],
        "name": "DocumentVerified",
        "type": "event"
    },
    {
        "inputs": [
            {"internalType": "string", "name": "_documentHash", "type": "string"},
            {"internalType": "string", "name": "_fileName", "type": "string"}
        ],
        "name": "addDocument",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "string", "name": "_documentHash", "type": "string"}
        ],
        "name": "verifyDocument",
        "outputs": [
            {"internalType": "bool", "name": "exists", "type": "bool"},
            {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
            {"internalType": "address", "name": "uploader", "type": "address"},
            {"internalType": "string", "name": "fileName", "type": "string"}
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "string", "name": "_documentHash", "type": "string"}
        ],
        "name": "getDocument",
        "outputs": [
            {"internalType": "bool", "name": "exists", "type": "bool"},
            {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
            {"internalType": "address", "name": "uploader", "type": "address"},
            {"internalType": "string", "name": "fileName", "type": "string"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTotalDocuments",
        "outputs": [
            {"internalType": "uint256", "name": "", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "_uploader", "type": "address"}
        ],
        "name": "getDocumentsByUploader",
        "outputs": [
            {"internalType": "string[]", "name": "", "type": "string[]"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Initialize when page loads
window.addEventListener('load', async () => {
    console.log('=== Page loaded ===');

    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    } else {
        alert('Please install MetaMask to use this application!\nVisit: https://metamask.io/');
    }

    // Setup event listeners
    setupEventListeners();

    // Load saved contract address
    loadSavedContractAddress();

    // Add detection for page reload
    window.addEventListener('beforeunload', (e) => {
        console.error('=== PAGE IS RELOADING ===');
        console.trace('Reload triggered from:');
    });
});

// Setup all event listeners
function setupEventListeners() {
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('fileInput').addEventListener('change', handleFileUpload);
    document.getElementById('uploadBtn').addEventListener('click', uploadToBlockchain);
    document.getElementById('verifyFileInput').addEventListener('change', handleVerifyFileUpload);
    document.getElementById('verifyBtn').addEventListener('click', verifyDocument);
    document.getElementById('loadMyDocuments').addEventListener('click', loadMyDocuments);

    // Generate file buttons
    document.getElementById('generateLogBtn').addEventListener('click', generateLogFile);
    document.getElementById('generateMalwareBtn').addEventListener('click', generateMalwareReport);

    // Menu event listeners
    document.getElementById('menuIcon').addEventListener('click', openMenu);
    document.getElementById('closeMenu').addEventListener('click', closeMenu);
    document.getElementById('menuOverlay').addEventListener('click', closeMenu);
    document.getElementById('saveContractBtn').addEventListener('click', saveContractFromMenu);
    document.getElementById('clearContractBtn').addEventListener('click', clearSavedContract);
}

// Connect to MetaMask
async function connectWallet() {
    try {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask!');
            return;
        }

        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];

        // Initialize Web3
        web3 = new Web3(window.ethereum);

        // Get network info
        const chainId = await web3.eth.getChainId();
        const networkName = getNetworkName(chainId);

        // Update UI
        document.getElementById('statusText').textContent = 'Connected';
        document.getElementById('connectionStatus').className = 'status-connected';
        document.getElementById('accountAddress').textContent = userAccount;
        document.getElementById('networkName').textContent = networkName;
        document.getElementById('accountInfo').style.display = 'block';

        // Check if on Sepolia testnet
        if (chainId !== 11155111n) {
            alert('Please switch to Sepolia Testnet in MetaMask!\n\nCurrent network: ' + networkName);
        }

        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                console.log('Please connect to MetaMask.');
            } else {
                userAccount = accounts[0];
                document.getElementById('accountAddress').textContent = userAccount;
            }
        });

        // Listen for chain changes
        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });

    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        alert('Failed to connect to MetaMask: ' + error.message);
    }
}

// Get network name from chain ID
function getNetworkName(chainId) {
    const networks = {
        1n: 'Ethereum Mainnet',
        11155111n: 'Sepolia Testnet',
        5n: 'Goerli Testnet',
        137n: 'Polygon Mainnet',
        80001n: 'Mumbai Testnet'
    };
    return networks[chainId] || `Unknown Network (Chain ID: ${chainId})`;
}

// Calculate SHA-256 hash of file
async function calculateHash(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const buffer = e.target.result;
                const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                resolve(hashHex);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

// Handle file upload for adding to blockchain
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        // Update file name display
        document.getElementById('fileNameDisplay').textContent = file.name;

        // Calculate hash
        const hash = await calculateHash(file);

        // Display file info
        document.getElementById('uploadFileName').textContent = file.name;
        document.getElementById('uploadFileSize').textContent = formatFileSize(file.size);
        document.getElementById('uploadFileHash').textContent = hash;
        document.getElementById('uploadInfo').style.display = 'block';

        // Store file info for later use
        window.currentUploadFile = {
            name: file.name,
            hash: hash
        };

        // Enable upload button
        document.getElementById('uploadBtn').disabled = false;

    } catch (error) {
        console.error('Error processing file:', error);
        alert('Error processing file: ' + error.message);
    }
}

// Upload document hash to blockchain
async function uploadToBlockchain() {
    if (!contract) {
        alert('Please set the contract address first!');
        return;
    }

    if (!window.currentUploadFile) {
        alert('Please select a file first!');
        return;
    }

    const statusDiv = document.getElementById('uploadStatus');
    statusDiv.style.display = 'block';
    statusDiv.className = 'status-message info-message';
    statusDiv.textContent = 'Uploading to blockchain... Please confirm the transaction in MetaMask.';

    try {
        // Check if document already exists
        const existingDoc = await contract.methods.getDocument(window.currentUploadFile.hash).call();

        if (existingDoc.exists) {
            statusDiv.className = 'status-message warning-message';
            statusDiv.textContent = 'This document already exists on the blockchain!';
            return;
        }

        // Add document to blockchain
        const result = await contract.methods
            .addDocument(window.currentUploadFile.hash, window.currentUploadFile.name)
            .send({ from: userAccount });

        console.log('Transaction result:', result);

        statusDiv.className = 'status-message success-message';
        statusDiv.innerHTML = `
            <strong>Success!</strong> Document uploaded to blockchain.<br>
            <strong>Transaction Hash:</strong> ${result.transactionHash}<br>
            <strong>Block Number:</strong> ${result.blockNumber}
        `;

        // Clear the form
        document.getElementById('fileInput').value = '';
        document.getElementById('fileNameDisplay').textContent = 'Choose a file...';
        document.getElementById('uploadInfo').style.display = 'none';
        document.getElementById('uploadBtn').disabled = true;
        window.currentUploadFile = null;

    } catch (error) {
        console.error('Error uploading to blockchain:', error);
        statusDiv.className = 'status-message error-message';
        statusDiv.textContent = 'Error: ' + (error.message || 'Transaction failed');
    }
}

// Handle file upload for verification
async function handleVerifyFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        // Update file name display
        document.getElementById('verifyFileNameDisplay').textContent = file.name;

        // Calculate hash
        const hash = await calculateHash(file);

        // Display file info
        document.getElementById('verifyFileName').textContent = file.name;
        document.getElementById('verifyFileHash').textContent = hash;
        document.getElementById('verifyInfo').style.display = 'block';

        // Store file info for later use
        window.currentVerifyFile = {
            name: file.name,
            hash: hash
        };

        // Enable verify button
        document.getElementById('verifyBtn').disabled = false;

    } catch (error) {
        console.error('Error processing file:', error);
        alert('Error processing file: ' + error.message);
    }
}

// Verify document on blockchain
async function verifyDocument() {
    if (!contract) {
        alert('Please set the contract address first!');
        return;
    }

    if (!window.currentVerifyFile) {
        alert('Please select a file first!');
        return;
    }

    const resultDiv = document.getElementById('verifyResult');
    resultDiv.style.display = 'block';
    resultDiv.className = 'status-message info-message';
    resultDiv.textContent = 'Verifying document on blockchain...';

    try {
        // Get document from blockchain
        const doc = await contract.methods.getDocument(window.currentVerifyFile.hash).call();

        if (doc.exists) {
            const date = new Date(Number(doc.timestamp) * 1000);
            resultDiv.className = 'status-message success-message';
            resultDiv.innerHTML = `
                <strong>✓ VERIFIED!</strong> This document exists on the blockchain and has NOT been tampered with.<br><br>
                <strong>Original File Name:</strong> ${doc.fileName}<br>
                <strong>Uploaded By:</strong> ${doc.uploader}<br>
                <strong>Upload Date:</strong> ${date.toLocaleString()}<br>
                <strong>Document Hash:</strong> ${window.currentVerifyFile.hash}
            `;
        } else {
            resultDiv.className = 'status-message error-message';
            resultDiv.innerHTML = `
                <strong>✗ NOT VERIFIED!</strong> This document does NOT exist on the blockchain.<br><br>
                Either it was never uploaded, or the file has been modified/tampered with.<br>
                <strong>Document Hash:</strong> ${window.currentVerifyFile.hash}
            `;
        }

    } catch (error) {
        console.error('Error verifying document:', error);
        resultDiv.className = 'status-message error-message';
        resultDiv.textContent = 'Error: ' + (error.message || 'Verification failed');
    }
}

// Load user's documents
async function loadMyDocuments() {
    if (!contract) {
        alert('Please set the contract address first!');
        return;
    }

    if (!userAccount) {
        alert('Please connect to MetaMask first!');
        return;
    }

    const listDiv = document.getElementById('myDocumentsList');
    listDiv.innerHTML = '<p>Loading your documents...</p>';

    try {
        // Get documents uploaded by current user
        const documentHashes = await contract.methods.getDocumentsByUploader(userAccount).call();

        if (documentHashes.length === 0) {
            listDiv.innerHTML = '<p class="info-message">You haven\'t uploaded any documents yet.</p>';
            return;
        }

        // Get details for each document
        let html = `<p><strong>Total Documents:</strong> ${documentHashes.length}</p>`;

        for (let i = 0; i < documentHashes.length; i++) {
            const hash = documentHashes[i];
            const doc = await contract.methods.getDocument(hash).call();
            const date = new Date(Number(doc.timestamp) * 1000);

            html += `
                <div class="document-item">
                    <p><strong>File Name:</strong> ${doc.fileName}</p>
                    <p><strong>Upload Date:</strong> ${date.toLocaleString()}</p>
                    <p><strong>Hash:</strong> <span class="hash-value">${hash}</span></p>
                </div>
            `;
        }

        listDiv.innerHTML = html;

    } catch (error) {
        console.error('Error loading documents:', error);
        listDiv.innerHTML = '<p class="error-message">Error loading documents: ' + error.message + '</p>';
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ========== MENU MANAGEMENT FUNCTIONS ==========

// Open side menu
function openMenu() {
    document.getElementById('sideMenu').classList.add('active');
    document.getElementById('menuOverlay').classList.add('active');
}

// Close side menu
function closeMenu() {
    document.getElementById('sideMenu').classList.remove('active');
    document.getElementById('menuOverlay').classList.remove('active');
}

// Load saved contract address from localStorage
function loadSavedContractAddress() {
    const savedAddress = localStorage.getItem('contractAddress');

    if (savedAddress) {
        // Update menu display
        document.getElementById('currentContractAddress').textContent = savedAddress;

        // Auto-fill the input field with the saved address
        document.getElementById('menuContractInput').value = savedAddress;

        // Auto-initialize contract if Web3 is available
        if (web3 && web3.utils.isAddress(savedAddress)) {
            initializeContract(savedAddress);
        }

        console.log('Loaded saved contract address:', savedAddress);
    }

    // Load and display contract address history
    loadContractAddressHistory();
}

// Initialize contract with address
function initializeContract(address) {
    try {
        contract = new web3.eth.Contract(contractABI, address);

        const statusDiv = document.getElementById('contractStatus');
        statusDiv.className = 'info-message success-message';
        statusDiv.textContent = 'Contract connected successfully! Address: ' + address;
        statusDiv.style.display = 'block';

        // Enable buttons
        document.getElementById('loadMyDocuments').disabled = false;

        console.log('Contract initialized:', address);
    } catch (error) {
        console.error('Error initializing contract:', error);
    }
}

// Save contract address from menu
function saveContractFromMenu() {
    const address = document.getElementById('menuContractInput').value.trim();

    if (!address) {
        alert('Please enter a contract address!');
        return;
    }

    if (!web3) {
        alert('Please connect to MetaMask first!');
        return;
    }

    if (!web3.utils.isAddress(address)) {
        alert('Invalid contract address!');
        return;
    }

    // Save to localStorage
    localStorage.setItem('contractAddress', address);

    // Add to address history
    addToContractAddressHistory(address);

    // Update menu display
    document.getElementById('currentContractAddress').textContent = address;

    // Initialize contract
    initializeContract(address);

    // Keep the address in the input field instead of clearing
    // (User request: auto-fill on reload)

    // Refresh the history display
    loadContractAddressHistory();

    // Close menu
    closeMenu();

    alert('Contract address saved successfully!');
}

// Clear saved contract address
function clearSavedContract() {
    const confirmClear = confirm('Are you sure you want to clear the saved contract address?');

    if (confirmClear) {
        // Remove from localStorage
        localStorage.removeItem('contractAddress');

        // Reset menu display
        document.getElementById('currentContractAddress').textContent = 'Not Set';

        // Clear menu input
        document.getElementById('menuContractInput').value = '';

        // Reset contract status
        const statusDiv = document.getElementById('contractStatus');
        statusDiv.style.display = 'none';

        // Disable buttons
        document.getElementById('loadMyDocuments').disabled = true;

        // Reset contract variable
        contract = null;

        alert('Saved contract address cleared!');
    }
}

// ========== CONTRACT ADDRESS HISTORY FUNCTIONS ==========

// Add address to history (max 5 addresses)
function addToContractAddressHistory(address) {
    // Get existing history
    let history = JSON.parse(localStorage.getItem('contractAddressHistory') || '[]');

    // Remove if already exists (to move it to top)
    history = history.filter(addr => addr.toLowerCase() !== address.toLowerCase());

    // Add to beginning
    history.unshift(address);

    // Keep only last 5 addresses
    history = history.slice(0, 5);

    // Save back to localStorage
    localStorage.setItem('contractAddressHistory', JSON.stringify(history));
}

// Load and display contract address history
function loadContractAddressHistory() {
    const history = JSON.parse(localStorage.getItem('contractAddressHistory') || '[]');
    const historyContainer = document.getElementById('contractAddressHistory');

    if (!historyContainer) return;

    if (history.length === 0) {
        historyContainer.innerHTML = '<p class="no-history">No saved addresses yet</p>';
        return;
    }

    let html = '<p class="history-label">Recently Used Addresses (click to select):</p>';
    html += '<div class="address-list">';

    history.forEach((address, index) => {
        const isCurrent = address === localStorage.getItem('contractAddress');
        html += `
            <div class="address-item ${isCurrent ? 'current-address' : ''}" onclick="selectContractAddress('${address}')">
                <span class="address-text">${address}</span>
                ${isCurrent ? '<span class="current-badge">Current</span>' : ''}
            </div>
        `;
    });

    html += '</div>';
    historyContainer.innerHTML = html;
}

// Select a contract address from history
function selectContractAddress(address) {
    // Fill the input field
    document.getElementById('menuContractInput').value = address;

    // If web3 is available, we could auto-save it
    // For now, just fill the input so user can click Save
    console.log('Selected contract address:', address);
}

// Clear all contract address history
function clearContractAddressHistory() {
    const confirmClear = confirm('Are you sure you want to clear all saved contract addresses from history?');

    if (confirmClear) {
        localStorage.removeItem('contractAddressHistory');
        loadContractAddressHistory();
        alert('Contract address history cleared!');
    }
}

// ========== FILE GENERATION FUNCTIONS ==========

// Generate system log file
async function generateLogFile(event) {
    console.log('generateLogFile called');

    // Prevent any default behavior
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const statusDiv = document.getElementById('generateStatus');
    const generateLogBtn = document.getElementById('generateLogBtn');

    statusDiv.style.display = 'block';
    statusDiv.className = 'status-message info-message';
    statusDiv.textContent = 'Generating system log file... Please wait.';
    generateLogBtn.disabled = true;

    try {
        console.log('Fetching log file from server...');
        const response = await fetch('http://localhost:5000/api/generate-log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Response received:', response.status);
        const data = await response.json();
        console.log('Data parsed, file:', data.filename);

        if (data.success) {
            console.log('File generation successful');
            statusDiv.className = 'status-message success-message';
            statusDiv.innerHTML = `
                <strong>Success!</strong> ${data.message}<br>
                <strong>File:</strong> ${data.filename}<br>
                <em>File automatically loaded in Upload Document section below.</em>
            `;

            console.log('Creating Blob and File objects...');
            // Decode base64 content to binary
            const binaryString = atob(data.content);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // Create a File object from the binary data
            const blob = new Blob([bytes], { type: 'text/plain' });
            const file = new File([blob], data.filename, { type: 'text/plain' });
            console.log('File object created:', file.name, file.size, 'bytes');

            // Automatically load into upload section
            console.log('Calling loadGeneratedFileToUpload...');
            await loadGeneratedFileToUpload(file);
            console.log('Returned from loadGeneratedFileToUpload');

        } else {
            statusDiv.className = 'status-message error-message';
            statusDiv.textContent = 'Error: ' + data.error;
        }

    } catch (error) {
        console.error('Error generating log file:', error);
        statusDiv.className = 'status-message error-message';
        statusDiv.innerHTML = `
            <strong>Error:</strong> Could not connect to server.<br>
            <em>Make sure the Flask server is running on port 5000.</em><br>
            <em>Run: python server.py</em>
        `;
    } finally {
        generateLogBtn.disabled = false;
    }
}

// Generate malware report file
async function generateMalwareReport(event) {
    console.log('generateMalwareReport called');

    // Prevent any default behavior
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const statusDiv = document.getElementById('generateStatus');
    const generateMalwareBtn = document.getElementById('generateMalwareBtn');

    statusDiv.style.display = 'block';
    statusDiv.className = 'status-message info-message';
    statusDiv.textContent = 'Generating malware report... This may take up to 60 seconds.';
    generateMalwareBtn.disabled = true;

    try {
        console.log('Fetching malware report from server...');
        const response = await fetch('http://localhost:5000/api/generate-malware-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Response received:', response.status);
        const data = await response.json();
        console.log('Data parsed, file:', data.filename);

        if (data.success) {
            statusDiv.className = 'status-message success-message';
            statusDiv.innerHTML = `
                <strong>Success!</strong> ${data.message}<br>
                <strong>File:</strong> ${data.filename}<br>
                <em>File automatically loaded in Upload Document section below.</em>
            `;

            // Decode base64 content to binary
            const binaryString = atob(data.content);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // Create a File object from the binary data
            const blob = new Blob([bytes], { type: 'text/plain' });
            const file = new File([blob], data.filename, { type: 'text/plain' });

            // Automatically load into upload section
            await loadGeneratedFileToUpload(file);

        } else {
            statusDiv.className = 'status-message error-message';
            statusDiv.innerHTML = `
                <strong>Error:</strong> ${data.error}<br>
                <em>Note: Malware report generation may require administrator privileges on Windows.</em>
            `;
        }

    } catch (error) {
        console.error('Error generating malware report:', error);
        statusDiv.className = 'status-message error-message';
        statusDiv.innerHTML = `
            <strong>Error:</strong> Could not connect to server.<br>
            <em>Make sure the Flask server is running on port 5000.</em><br>
            <em>Run: python server.py</em>
        `;
    } finally {
        generateMalwareBtn.disabled = false;
    }
}

// Load generated file into upload document section
async function loadGeneratedFileToUpload(file) {
    try {
        console.log('loadGeneratedFileToUpload called with file:', file.name);

        // Update file name display
        document.getElementById('fileNameDisplay').textContent = file.name;
        console.log('File name display updated');

        // Calculate hash
        console.log('Starting hash calculation...');
        const hash = await calculateHash(file);
        console.log('Hash calculated:', hash);

        // Display file info
        document.getElementById('uploadFileName').textContent = file.name;
        document.getElementById('uploadFileSize').textContent = formatFileSize(file.size);
        document.getElementById('uploadFileHash').textContent = hash;
        document.getElementById('uploadInfo').style.display = 'block';
        console.log('File info displayed');

        // Store file info for later use
        window.currentUploadFile = {
            name: file.name,
            hash: hash
        };
        console.log('File info stored in window.currentUploadFile');

        // Enable upload button
        document.getElementById('uploadBtn').disabled = false;
        console.log('Upload button enabled');

        // Scroll to upload section after a brief delay to ensure DOM updates are complete
        setTimeout(() => {
            const uploadBtn = document.querySelector('#uploadBtn');
            if (uploadBtn) {
                uploadBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                console.log('Scrolled to upload button');
            }
        }, 100);

        console.log('loadGeneratedFileToUpload completed successfully');

    } catch (error) {
        console.error('Error loading generated file:', error);
        alert('Error loading generated file: ' + error.message);
    }
}
