const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('id="otpLoginModal"');
const end = html.indexOf('<!-- ==================== IMAGE 2: PRE-TEST INSTRUCTIONS MODAL');
console.log(html.substring(start, end));
