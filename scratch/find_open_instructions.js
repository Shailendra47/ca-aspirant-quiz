const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('function openPreTestInstructions');
if (start !== -1) {
  console.log(html.substring(start, start + 3000));
} else {
  console.log('Not found');
}
