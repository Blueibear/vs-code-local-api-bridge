const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 3001;

app.use(express.json());

const basePath = path.resolve("C:/AI/Assistant");

function walkDir(dir) {
  let results = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else {
      results.push(path.relative(basePath, fullPath));
    }
  });
  return results;
}

app.get('/files', (req, res) => {
  try {
    const files = walkDir(basePath);
    res.json(files);
  } catch (err) {
    res.status(500).send('Error reading files');
  }
});

app.get('/file', (req, res) => {
  const relPath = req.query.path;
  const filePath = path.join(basePath, relPath);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }
  const content = fs.readFileSync(filePath, 'utf8');
  res.type('text/plain').send(content);
});

app.post('/suggest-edit', (req, res) => {
  const { path: filePath, instruction } = req.body;
  const suggestion = `// Suggestion based on instruction: "${instruction}"\n/* your code here */`;
  res.json({ suggestion });
});

app.post('/preview-diff', (req, res) => {
  const { path: relPath, newContent } = req.body;
  const fullPath = path.join(basePath, relPath);
  if (!fs.existsSync(fullPath)) {
    return res.status(404).send('File not found');
  }
  const oldContent = fs.readFileSync(fullPath, 'utf8');
  res.json({ oldContent, newContent });
});

app.post('/edit', (req, res) => {
  const { path: relPath, newContent } = req.body;
  const fullPath = path.join(basePath, relPath);
  fs.writeFileSync(fullPath, newContent, 'utf8');
  res.send('File updated');
});

app.post('/run-command', (req, res) => {
  const { command } = req.body;
  exec(command, { cwd: basePath }, (err, stdout, stderr) => {
    if (err) return res.status(500).type('text/plain').send(stderr);
    res.type('text/plain').send(stdout);
  });
});

app.listen(port, () => {
  console.log(`✅ VS Code API bridge running at http://localhost:${port}`);
});

