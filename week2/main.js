//task1
console.log('Task1');
const shoppingCart = require('./shopping-cart-manager');
const cart = new shoppingCart();
cart.emit('onCreate');
cart.add('Apple', 1.0, 3);
cart.add('Banana', 0.5, 5);
cart.emit('onDestroy');

//task2
console.log('Task2');
const readWavFileAsync = require('./wav-reader');
const wavFilename = 'public/sample.wav';
readWavFileAsync(wavFilename)
    .then(buffer => {
        console.log('WAV file loaded into buffer.');
    })
    .catch(error => {
        console.error('Error reading WAV file:', error);
    });
/* 由于异步读取的原因，console会在所有内容输出完后再输出这段。 */

//task3
console.log('Task3');
const gbkConverter = require('./gbk-converter');
const gbkJson = '{"hello":"�������","count":16,"this":"that","price":106.959,"groups":[{"name":"Bob","age":"16"},{"name":"Alice","age":24}]}';
const jsonObj = gbkConverter(gbkJson);
console.log(jsonObj);
/*转换失败可能因为读取二进制的时候采用的编码和最初将字符转换成二进制时的编码不一致。*/

//task4
console.log('Task4');
const MusicPlaylist = require('./music-playlist');
const playlist = new MusicPlaylist();
console.log('Add tracks to playlist:');
playlist.add('Track 1');
playlist.add('Track 2');
playlist.add('Track 3');
playlist.display();
console.log('\nAdd track 4 to the beginning of the playlist:');
playlist.add('Track 4', 0);
playlist.display();
console.log('\nRemove track 4 from the playlist:');
playlist.remove('Track 4');
playlist.display();

//task5
console.log('Task5');
console.log('请在控制台运行 node server.js 查看网页');

//task6
console.log('Task6');
const copyMP3 = require('./MP3-file-copier');
const sourceFilename = 'public/sample.mp3';
const targetFilename = 'public/New.mp3';
copyMP3(sourceFilename, targetFilename)
    .then(() => {
        console.log('MP3 file copied.');
    })
    .catch(error => {
        console.error('Error copying MP3 file:', error);
    });