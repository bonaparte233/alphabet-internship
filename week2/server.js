// task5

const http = require('http');

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Welcome to YouTube Music');
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');
