const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const m1 = html.indexOf('id="otpLoginModal"');
const m2 = html.indexOf('id="instructionsModal"');
console.log('instructionsModal at:', m2);
console.log('Between modal and instructionsModal:');
console.log(html.substring(m2 - 200, m2));
