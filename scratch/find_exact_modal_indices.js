const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const m1 = html.indexOf('id="otpLoginModal"');
console.log('m1 index:', m1);
console.log('Before m1:', html.substring(m1 - 100, m1));

const m2 = html.indexOf('<!--', m1 + 2000);
console.log('After modal:', html.substring(m2, m2 + 100));
