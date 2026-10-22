const fs = require('fs');
const serverCode = fs.readFileSync('server/server.js', 'utf8');

console.log('server.js size:', serverCode.length, 'bytes');
const lines = serverCode.split('\n');
console.log('server.js line count:', lines.length);

// Check routes
const routes = lines.filter(l => l.trim().startsWith('app.get(') || l.trim().startsWith('app.post(') || l.trim().startsWith('app.put(') || l.trim().startsWith('app.delete('));
console.log('Routes in server.js:');
routes.forEach(r => console.log('  ' + r.trim().substring(0, 70)));

