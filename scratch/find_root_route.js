const fs = require('fs');
const code = fs.readFileSync('server/server.js', 'utf8');

const regex = /app\.get\(['"]\/['"][\s\S]*?\}\);/g;
let m;
while ((m = regex.exec(code)) !== null) {
  console.log(m[0]);
}
