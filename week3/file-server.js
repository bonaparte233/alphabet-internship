// Task 1 and 2
const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/sample.mp3');

http.createServer((request, response) => {
    if (request.url === '/play') {
        response.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': 'inline'
        });

        const readStream = fs.createReadStream(filePath);
        readStream.pipe(response);
    } else {
        response.writeHead(404);
        response.end('404 Not Found');
    }
}).listen(8080, () => {
    console.log('Server is running on http://localhost:8080/play');
});
