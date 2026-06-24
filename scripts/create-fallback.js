const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'public', 'index.html');
const dir = path.dirname(indexPath);

try {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(indexPath)) {
    const content = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Inventory Management</title>
  </head>
  <body>
    <pre>Simple text fallback: No frontend provided.</pre>
  </body>
</html>`;
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('Fallback index.html created at', indexPath);
  } else {
    console.log('index.html already exists, no fallback needed.');
  }
} catch (err) {
  console.error('Failed to create fallback index.html:', err);
  process.exitCode = 1;
}
