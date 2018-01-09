	var express = require('express'); //requires express
	var app = express(); //instatiate express
	
    var bodyParser = require('body-parser');
	var path = require('path');

	var routes = require('./api/routes');

	app.set('port', 3000);

	app.use(function(req, res, next){
		console.log(req.method, req.url);
		next();

	});

	app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.urlencoded({ extended : false})); //encodes form posts
    app.use('/api', routes); 

	


	var server = app.listen(app.get('port'), function(){ //annonymus function call
		var port = server.address().port;
		console.log("Magic happens on port "+ port);
	});

