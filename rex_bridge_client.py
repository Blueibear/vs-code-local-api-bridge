import requests

BASE_URL = "http://localhost:3001"

def list_files():
    """List all files in the project (relative to C:/AI/Assistant)"""
    r = requests.get(f"{BASE_URL}/files")
    r.raise_for_status()
    return r.json()

def read_file(rel_path):
    """Read the content of a file"""
    r = requests.get(f"{BASE_URL}/file", params={"path": rel_path})
    if r.status_code == 200:
        return r.text
    raise Exception(f"Error reading file: {r.text}")

def suggest_edit(rel_path, instruction):
    """Get a code suggestion for a file based on an instruction (mock)"""
    payload = { "path": rel_path, "instruction": instruction }
    r = requests.post(f"{BASE_URL}/suggest-edit", json=payload)
    r.raise_for_status()
    return r.json().get("suggestion", "")

def preview_diff(rel_path, new_content):
    """Preview the diff between the current and new file content"""
    payload = { "path": rel_path, "newContent": new_content }
    r = requests.post(f"{BASE_URL}/preview-diff", json=payload)
    r.raise_for_status()
    return r.json()

def send_edit(rel_path, new_content):
    """Apply the new content to the given file"""
    payload = { "path": rel_path, "newContent": new_content }
    r = requests.post(f"{BASE_URL}/edit", json=payload)
    r.raise_for_status()
    return r.text

def run_command(command):
    """Run a terminal command within the C:/AI/Assistant workspace"""
    payload = { "command": command }
    r = requests.post(f"{BASE_URL}/run-command", json=payload)
    r.raise_for_status()
    return r.text

# Example usage block
if __name__ == "__main__":
    print("✅ Rex Bridge Python Client Ready\n")

    # List first few files
    files = list_files()
    print("📁 Files found:", files[:3])

    # Try reading a file
    try:
        content = read_file("README.md")
        print("\n📄 README.md preview:\n", content[:200], "...")
    except Exception as e:
        print("❌", e)

    # Example command
    try:
        output = run_command("echo Hello from Rex")
        print("\n🖥 Command output:\n", output)
    except Exception as e:
        print("❌", e)
