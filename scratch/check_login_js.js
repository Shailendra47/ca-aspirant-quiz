const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('function openOtpLoginModal');
const end = html.indexOf('// ==================== IMAGE 2: PRE-TEST INSTRUCTIONS LOGIC');
console.log(html.substring(start, end));
