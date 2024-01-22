const fs = require('fs');

function readJsonFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('No such file: ', err.message);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            console.log(jsonData);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr.message);
        }
    });
}

module.exports = readJsonFile;

