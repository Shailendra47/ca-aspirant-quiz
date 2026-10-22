const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /API_BASE_URL\s*=[^;]+;/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(m[0]);
}
