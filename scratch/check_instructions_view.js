const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('id="instructionsView"');
const end = html.indexOf('id="examCbtView"');
console.log(html.substring(start, end));
