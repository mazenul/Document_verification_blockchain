from flask import Flask, send_from_directory, jsonify, send_file, make_response
from flask_cors import CORS
import os
import sys
import datetime
import subprocess
import base64

app = Flask(__name__, static_folder='.')
CORS(app)  # Enable CORS for all routes

# Add CSP headers to allow our JavaScript to work
@app.after_request
def add_security_headers(response):
    # Allow inline scripts and eval (needed for Web3.js and dynamic content)
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https:; "
        "style-src 'self' 'unsafe-inline'; "
        "connect-src 'self' http://localhost:* https: wss: ws:; "
        "img-src 'self' data: https:; "
        "font-src 'self' data:; "
        "object-src 'none'; "
        "base-uri 'self';"
    )
    return response

# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def index():
    """Serve the main HTML file"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files (CSS, JS, etc.)"""
    return send_from_directory('.', path)

@app.route('/api/generate-log', methods=['POST'])
def generate_log():
    """Generate system log file"""
    try:
        # Path to the system logger script
        script_path = os.path.join(BASE_DIR, 'Log_file_generator', 'system_logger.py')

        # Change to the Log_file_generator directory
        log_dir = os.path.join(BASE_DIR, 'Log_file_generator')

        # Execute the Python script
        result = subprocess.run(
            [sys.executable, script_path],
            cwd=log_dir,
            capture_output=True,
            text=True,
            timeout=30
        )

        if result.returncode != 0:
            return jsonify({
                'success': False,
                'error': f'Script execution failed: {result.stderr}'
            }), 500

        # Find the most recently created log file
        log_files = [f for f in os.listdir(log_dir) if f.startswith('log_file_') and f.endswith('.txt')]
        if not log_files:
            return jsonify({
                'success': False,
                'error': 'Log file was not created'
            }), 500

        # Get the most recent log file
        latest_log = max(log_files, key=lambda f: os.path.getmtime(os.path.join(log_dir, f)))
        log_file_path = os.path.join(log_dir, latest_log)

        # Read the file content as binary to preserve exact bytes
        with open(log_file_path, 'rb') as f:
            file_bytes = f.read()

        # Encode as base64 for JSON transport
        file_content_base64 = base64.b64encode(file_bytes).decode('ascii')

        return jsonify({
            'success': True,
            'filename': latest_log,
            'content': file_content_base64,
            'encoding': 'base64',
            'message': 'Log file generated successfully'
        })

    except subprocess.TimeoutExpired:
        return jsonify({
            'success': False,
            'error': 'Script execution timed out'
        }), 500
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/generate-malware-report', methods=['POST'])
def generate_malware_report():
    """Generate malware report file"""
    try:
        # Path to the malware report script
        script_path = os.path.join(BASE_DIR, 'Malware_file_generator', 'malware_report.py')

        # Change to the Malware_file_generator directory
        malware_dir = os.path.join(BASE_DIR, 'Malware_file_generator')

        # Execute the Python script
        result = subprocess.run(
            [sys.executable, script_path],
            cwd=malware_dir,
            capture_output=True,
            text=True,
            timeout=60  # Malware report takes longer
        )

        if result.returncode != 0:
            return jsonify({
                'success': False,
                'error': f'Script execution failed: {result.stderr}'
            }), 500

        # Find the most recently created malware report file
        report_files = [f for f in os.listdir(malware_dir) if f.startswith('malware_data_') and f.endswith('.txt')]
        if not report_files:
            return jsonify({
                'success': False,
                'error': 'Malware report file was not created'
            }), 500

        # Get the most recent report file
        latest_report = max(report_files, key=lambda f: os.path.getmtime(os.path.join(malware_dir, f)))
        report_file_path = os.path.join(malware_dir, latest_report)

        # Read the file content as binary to preserve exact bytes
        with open(report_file_path, 'rb') as f:
            file_bytes = f.read()

        # Encode as base64 for JSON transport
        file_content_base64 = base64.b64encode(file_bytes).decode('ascii')

        return jsonify({
            'success': True,
            'filename': latest_report,
            'content': file_content_base64,
            'encoding': 'base64',
            'message': 'Malware report generated successfully'
        })

    except subprocess.TimeoutExpired:
        return jsonify({
            'success': False,
            'error': 'Script execution timed out (may require administrator privileges)'
        }), 500
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Server is running'})

if __name__ == '__main__':
    print("=" * 70)
    print("Blockchain Document Verification Server")
    print("=" * 70)
    print(f"Server starting at: http://localhost:5000")
    print("Press CTRL+C to stop the server")
    print("=" * 70)
    app.run(debug=True, host='0.0.0.0', port=5000)
