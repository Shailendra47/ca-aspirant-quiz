const fs = require('fs');
const code = fs.readFileSync('server/server.js', 'utf8');

const start = code.indexOf("app.post('/api/auth/register'");
const end = code.indexOf("app.get('/api/health'", start);
console.log(code.substring(start, end));
