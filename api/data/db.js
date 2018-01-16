var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel';

mongoose.connect(dburl);

mongoose.connection.on('connected', function(){
	console.log('mongoose connected to ' + dburl );
});


mongoose.connection.on('disconnected', function(){
	console.log('mongoose disconnected to ' + dburl );
});

mongoose.connection.on('error', function(err){
	console.log('mongoose connection error to ' + err );
});

process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log('mongoose disconnected through app termination')
		process.exit(0)
	})
})

process.on('SIGTERM', function(){
	mongoose.connection.close(function(){
		console.log('mongoose disconnected through app termination')
		process.exit(0)
	})
})



//Bring in the schemas and models
require('./hotels.model');
require('./users.model');

// process.on('SIGUSR2', function(){
// 	mongoose.connection.close(function(){
// 		console.log('mongoose disconnected through app termination(SIGUSR2)')
// 		process.kill(process.pid, 'SIGUSR2')
// 	})
// })





























