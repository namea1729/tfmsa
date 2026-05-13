const fs = require('fs');
const path = require('path');

function generateListing(dirPath, outputFile) {
  const files = fs.readdirSync(dirPath);
  
  const rows = files
    .filter(f => !f.startsWith('.'))
    .sort()
    .map(f => {
      const fullPath = path.join(dirPath, f);
      const type = fs.statSync(fullPath).isDirectory() ? 'directory' : 'file';
      const href = type === 'directory' ? `${f}/` : f;
      return `    <tr>
      <td><a href="${href}">${f}</a></td>
      <td>${type}</td>
    </tr>`;
    })
    .join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirecting</title>
  <meta http-equiv="refresh" content="9999; url=/home">
</head>
<body>
  <h6>Click <a href="/home" target="_self">here</a>, to return home.</h6>
  <table>
    <tr>
      <td style="min-width: 60vw;"><b>Name:</b></td>
      <td><b>Type:</b></td>
    </tr>
    <tr>
      <td style="min-height: 1em;">&nbsp;</td>
    </tr>
${rows}
  </table>
</body>
</html>`;

  fs.writeFileSync(outputFile, html);
}

generateListing('./images', './images/index.html');
generateListing('./images/notbyai', './images/notbyai/index.html');
