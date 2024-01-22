// task6

const fs = require('fs');

function copyMP3(sourcePath, destinationPath) {
    return new Promise((resolve, reject) => {

        const readStream = fs.createReadStream(sourcePath);

        const writeStream = fs.createWriteStream(destinationPath);

        readStream.pipe(writeStream);

        writeStream.on('finish', resolve);
        readStream.on('error', (err) => reject(err));
        writeStream.on('error', (err) => reject(err));
    });
}

module.exports = copyMP3;
