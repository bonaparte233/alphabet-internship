// task3

const iconv = require('iconv-lite');

function gbkConverter(gbk) {
    try {
        const utf8Json = iconv.decode(Buffer.from(gbk, 'binary'), 'GBK');
        return JSON.parse(utf8Json);
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = gbkConverter;
