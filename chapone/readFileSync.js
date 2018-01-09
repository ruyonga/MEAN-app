var fs = require('fs'); //node js read file module
console.log("Going to get a file");

var file = fs.readFileSync('readFileSync.js');
console.log("Got the file");

console.log("App continues....");