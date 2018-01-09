var fs = require('fs'); //node js read file module
console.log("Going to get a file");
var onFileload = function(err, file) {
	// body...
	console.log("Got the file");
};

fs.readFile('readFileSync.js', onFileload);


console.log("App continues....");