const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /scorecardModal/g;
let count = (html.match(regex) || []).length;
console.log('scorecardModal count:', count);
