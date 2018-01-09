var express = require('express');

var router = express.Router();

router
    .route('/json')
	.get(function(req, res){
		 console.log("GET the json routte");

		  res
			.status(200)
			.json({"scripts":"Post Get" });
	})
	.post(function(req, res){
		 console.log("post the json route");

		  res
			.status(200)
			.json({"scripts":"Post received" });
	});


module.exports = router;