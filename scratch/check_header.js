const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const headStart = html.indexOf('<header');
const headEnd = html.indexOf('</header>');
console.log(html.substring(headStart, headEnd + 9));
