const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const end = html.lastIndexOf('</script>');
console.log(html.substring(end - 4000, end));
