# Server Setup Instructions

This guide explains how to run the Flask backend server that enables the "Generate System Files" feature.

## Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

## Installation Steps

### 1. Install Required Python Packages

Open a command prompt in the project directory and run:

```bash
pip install -r requirements.txt
```

This will install:
- Flask (web server)
- flask-cors (for handling cross-origin requests)
- psutil (for system information gathering)

### 2. Start the Flask Server

Run the server:

```bash
python server.py
```

You should see output like:
```
======================================================================
Blockchain Document Verification Server
======================================================================
Server starting at: http://localhost:5000
Press CTRL+C to stop the server
======================================================================
```

**Keep this terminal window open** - the server needs to stay running!

### 3. Open the Application

Open your web browser and navigate to:
```
http://localhost:5000
```

The application will now have full functionality including the file generation features.

## Using the New Features

### Generate System Log

1. Click the **"Generate System Log"** button at the top of the page
2. Wait a few seconds for the log file to be generated
3. The generated file will automatically load into the "Upload Document" section
4. You can then click "Upload to Blockchain" to store its hash on the blockchain

The system log includes:
- Operating system information
- CPU and memory usage
- Disk information
- Network statistics
- Running processes

### Generate Malware Report

1. Click the **"Generate Malware Report"** button
2. Wait up to 60 seconds (this report takes longer to generate)
3. The generated file will automatically load into the "Upload Document" section
4. You can then upload it to the blockchain

The malware report includes:
- System information
- Windows Defender status
- Recent threat detections
- Running processes
- Active network connections
- Startup programs
- Firewall status
- Suspicious file locations check

**Note:** On Windows, some features may require administrator privileges. If you encounter errors, try running the command prompt as Administrator before starting the server.

## Troubleshooting

### Error: "Could not connect to server"

**Solution:** Make sure the Flask server is running on port 5000. Check the terminal where you ran `python server.py` for any error messages.

### Error: "Script execution failed"

**Solution:**
- For system log: Make sure `psutil` is installed
- For malware report: You may need administrator privileges (Windows-specific features)

### Port 5000 Already in Use

**Solution:**
1. Stop any other application using port 5000
2. Or modify `server.py` to use a different port (change the last line)
3. Also update the port in `app.js` (lines 564 and 617)

### Permission Errors (Malware Report)

**Solution:**
1. Right-click Command Prompt
2. Select "Run as Administrator"
3. Navigate to project directory
4. Run `python server.py`

## Development Mode

The Flask server runs in debug mode by default, which means:
- Automatic reloading when you modify code
- Detailed error messages
- **Not suitable for production use**

## Stopping the Server

Press `CTRL+C` in the terminal where the server is running.

## Architecture

```
Browser (http://localhost:5000)
    ↓
Flask Server (server.py)
    ↓
Python Scripts (system_logger.py / malware_report.py)
    ↓
Generated Files → Returned to Browser → Auto-loaded for Upload
```

## Files Created

Generated files are saved in their respective directories:
- System logs: `Log_file_generator/log_file_YYYY.MM.DD_HH-MM-SS.txt`
- Malware reports: `Malware_file_generator/malware_data_YYYY.MM.DD_HH-MM-SS.txt`

The files remain on your local disk but the content is also sent to the browser for immediate use.

---

**Happy Generating!**
