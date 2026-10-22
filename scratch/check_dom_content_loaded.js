const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf("window.addEventListener('DOMContentLoaded'");
console.log(html.substring(start, start + 3000));
