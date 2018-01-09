var child_process = require('child_process')
console.log("1");

var newProces = child_process.spawn('node', ['./_fibnonci.js'],{
	stdio : 'inherit'
});

//require('./_fibnonci.js');

console.log(2);