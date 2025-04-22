# VS Code API Bridge

A local server that connects your VS Code project to a Custom GPT using an API bridge.

This bridge enables file reading, editing, and command execution via `http://localhost:3001`. It is designed to pair with the **VS Code Local API Assistant** GPT, giving it the ability to suggest changes that you can apply locally.

## 🛠 Setup

```bash
npm install
node server.js

The server runs at: http://localhost:3001
It automatically uses the workspace at: C:/AI/Assistant (you can change this in server.js)

📡 API Endpoints

GET /files – List all files (recursively)

GET /file?path=... – Read the contents of a file

POST /edit – Overwrite a file with new content

POST /suggest-edit – (Mock) return an edit suggestion based on instruction

POST /preview-diff – Compare current content with proposed new content

POST /run-command – Run a terminal or VS Code command in your workspace

🐍 Python Helper Client (Optional)
This script (rex_bridge_client.py) acts as the execution layer for applying file changes and running commands suggested by the GPT.

💡 While the GPT provides suggestions and generates code edits, this Python client is what actually makes changes to your files by sending them to the local bridge server you are running.

You are always in control — nothing is executed without your explicit action, and no files are transmitted outside your machine.


📦 Install
pip install requests


### 🧪 Example Usage

```python
from rex_bridge_client import read_file, send_edit, run_command

# Read a file from your workspace
print(read_file("README.md"))

# Apply a file change
send_edit("scripts/test.py", "print('Hello from GPT')")

# Run a command in your workspace
print(run_command("echo Rex is ready"))

🗂️ Workspace Root: By default, the bridge uses C:/AI/Assistant as the project directory.
You can change this in server.js by modifying the basePath variable:

const basePath = path.resolve("C:/AI/Assistant"); // Change to your own workspace path

All API paths and file operations are relative to this directory.


