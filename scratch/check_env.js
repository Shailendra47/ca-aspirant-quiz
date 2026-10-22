const fs = require('fs');
console.log('Root .env exists:', fs.existsSync('.env'));
console.log('Server .env exists:', fs.existsSync('server/.env'));
if (fs.existsSync('server/.env')) {
  const lines = fs.readFileSync('server/.env', 'utf8').split('\n');
  lines.forEach(l => {
    if (l.startsWith('MONGO') || l.startsWith('PORT') || l.startsWith('JWT')) {
      console.log(l.split('=')[0] + ' = ' + l.substring(l.indexOf('=') + 1, l.indexOf('=') + 15) + '...');
    }
  });
}
