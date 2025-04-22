# Privacy Policy

**Effective date:** [April 21, 2025]

This project (VS Code Local API Bridge) is a local tool that runs entirely on your machine. It is designed to work with the “VS Code Local API Assistant” GPT and does not collect, store, or transmit any personal data.

## Data Handling

- **Local Only**: All file access, edits, and command execution occur locally on your machine.
- **No Cloud Sync**: This project does not send data over the internet.
- **No Tracking**: We do not collect analytics, logs, or usage data.

## GPT Usage

The GPT provides local-only suggestions for file changes, command execution, and project interaction. It cannot access your system or execute changes on its own.

To apply changes, an optional Python client (`rex_bridge_client.py`) is included in this repository. This client is the component that actually performs file edits or command execution, based on user-triggered instructions from the GPT.

The client sends HTTP requests **only to your local server** (`http://localhost:3001`) and never transmits data elsewhere. You are in full control over what is run and when.


