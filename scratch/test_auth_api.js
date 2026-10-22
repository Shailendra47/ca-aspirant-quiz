const http = require('http');

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let resData = '';
      res.on('data', chunk => resData += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(resData || '{}') }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

(async () => {
  // Test login
  const loginRes = await post('/api/auth/login', {
    email: 'shailendra.profilent@gmail.com',
    password: 'password123'
  });
  console.log('Login result:', loginRes);

  if (loginRes.status === 401 || loginRes.status === 500) {
    // Try register
    const regRes = await post('/api/auth/register', {
      name: 'Shailendrasingh deo',
      email: 'shailendra.profilent@gmail.com',
      password: 'password123'
    });
    console.log('Register result:', regRes);
  }
})();
