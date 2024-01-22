//task1
const sayHello = require('./hello');
const result = sayHello('Steve');
console.log(result);
//task6
const readJsonFile = require('./read-json-file');
readJsonFile('./package.json');
//task7
const convertCurrency = require('./currency-convert');
convertCurrency('USD', 'HRK', 20)
    .then((message) => {
        console.log(message);})
    .catch((error) => {
        console.log(error.message);});
