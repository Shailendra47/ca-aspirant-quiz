const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const modalStart = html.indexOf('id="otpLoginModal"');
if (modalStart !== -1) {
  console.log(html.substring(modalStart, modalStart + 4000));
} else {
  console.log('otpLoginModal not found');
}
