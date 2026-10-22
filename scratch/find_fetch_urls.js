const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /fetch\s*\(\s*[`"']([^`"']+)[`"']/g;
let m;
const urls = [];
while ((m = regex.exec(html)) !== null) {
  urls.push(m[1]);
}

console.log('Fetch URLs:', urls);
