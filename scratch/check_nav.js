const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const navStart = html.indexOf('<nav');
const navEnd = html.indexOf('</nav>');
console.log(html.substring(navStart, navEnd + 6));
