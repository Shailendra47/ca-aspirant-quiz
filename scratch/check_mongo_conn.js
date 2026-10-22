const fs = require('fs');
const code = fs.readFileSync('server/server.js', 'utf8');

const start = code.indexOf('mongoose.connect');
console.log(code.substring(start, start + 1000));
