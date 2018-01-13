//var dbconn = require('../data/dbconnection.js');
//var ObjectId = require('mongodb').ObjectId;
//var hotelData = require('../data/hotel-data.json')

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res){
	var lat = parseFloat(req.query.lng);
    var lng = parseFloat(req.query.lat);

    var point = {
    	type : "Point",
    	coordinates : [lat, lng]
    };

    var goeOptions = {
    	spherical : true,
    	maxDistance : 2000,
    	num : 5
    };

    Hotel
      .geoNear(point, goeOptions, function(err, results,stats){
      	console.log("Geo results", results );
      	console.log("Geo stats", stats);

      	res
      		.status(200)
      		.json(results);

      });

};





module.exports.hotelsGetAll = function(req, res) {

	 var offset = 0;
	 var count = 5;
	 var maxcount = 10;
	 if(req.query && req.query.lat && req.query.lng){
	 		runGeoQuery(req, res);
	 	return;
     }

    //Check if the query property exists and has values.
     if(req.query && req.query.count){
     	count = parseInt(req.query.count, 10);  //convert string to int
     }

     if(req.query && req.query.offset){
     	offset = parseInt(req.query.offset, 10);
     }
     //check if subpplied values isnota number
     if(isNaN(count) || isNaN(offset)){
		res
			.status(400)
			.json({
				"message": "Values supplied in the offset and count must be numbers"
			});
     	return;
     }
     if(count > maxcount){
     	res
     	.status(400)
     	.json({
     		"message" : "exceeded count limit of "+ maxcount
     	});
     	return 
     }
     Hotel
      	.find()
      	.skip(offset)
	    .limit(count)
      	.exec(function(err, hotels){
      		if(err){
	  			console.log("Error finding hotels")
	  			res
	      			.status(500)
	      			.json(err)
	      		
      		}else{
	      		console.log("found the hotels", hotels.length);
	      		res
	      		 .status(200)
	      		 .json(hotels);
      		}
      	});
};

//GET one item
module.exports.hotelsGetOne = function(req, res) {

  var hotelId = req.params.hotelId;
console.log("GET the hotel",  hotelId);

	Hotel
		.findById(hotelId)
		.exec(function(err, doc){
				var response = {
					status :  200,
					message : doc
				};

			if(err){
	  			console.log("Error finding hotels")
	  			response.status = 500;
	  			response.message = err;
	      		
      		}else if(!doc){
	      		response.status =404;
	      		response.message  ={
	      			"message" : "Hotel Id not found"
	      		};
      		}
      		
      		res
      		    .status(response.status)
      		    .json(response.message)
		  
		});

 
};
var _spiltArray = function(input){
  var output;
  if(input && input.length > 0){
  	output = input.split(";");
  }else{
  	output = [];
  }
  return output;
};

module.exports.hotelsAddOne = function(req, res){
	 
	   Hotel
	   	  .create({
	   	  	 name : req.body.name,
	   	  	 description : req.body.description,
	   	  	 stars : parseInt(req.body.stars,10),
	   	  	 services : _spiltArray(req.body.services),
	   	  	 photos : _spiltArray(req.body.photos),
	   	  	 currency : req.body.currency,
	   	  	 location : {
	   	  	 	address : req.body.address,
	   	  	 	coordinates : [
	   	  	 	   parseFloat(req.body.lng),
	   	  	 	   parseFloat(req.body.lat)
	   	  	 	   ]
	   	  	 } 
	   	  },function(err, hotel){
	   	  		if(err){
	   	  			console.log("Error creating hotel");
	   	  			res
	   	  			  .status(404)
	   	  			  .json(err);
	   	  		}else{
	   	  			console.log("Hotel Created", hotel);
	   	  			res
	   	  			  .status(201)
	   	  			  .json(hotel);
	   	  		}
	   	  });
	
};

module.exports.hotelsUpdateOne = function(req, res){

  var hotelId = req.params.hotelId;
  console.log("GET the hotel",  hotelId);

	Hotel
		.findById(hotelId)
		.select("-reviews -rooms")
		.exec(function(err, doc){
				var response = {
					status :  200,
					message : doc
				};

			if(err){
	  			console.log("Error finding hotels")
	  			response.status = 500;
	  			response.message = err;
	      		
      		}else if(!doc){
	      		response.status =404;
	      		response.message  ={
	      			"message" : "Hotel Id not found"
	      		};
      		}
      		if(response.status !== 200){
      			res
      		    .status(response.status)
      		    .json(response.message)
      		}else{
      			doc.name = req.body.name;
	      		doc.description = req.body.description,
		   	  	doc.stars = parseInt(req.body.stars,10),
		   	  	doc.services = _spiltArray(req.body.services),
		   	  	doc.photos = _spiltArray(req.body.photos),
		   	  	doc.currency = req.body.currency,
		   	  	doc.location = {
		   	  	 	address : req.body.address,
	   	  	 	coordinates : [
	   	  	 	   parseFloat(req.body.lng),
	   	  	 	   parseFloat(req.body.lat)
	   	  	 	   ]
	   	  	 	}; 
	   	  	 	doc.save(function(err, hotelsUpdated){
	   	  	 		if(err){
	   	  	 			res
	   	  	 			.status(500)
	   	  	 			.json(err);
	   	  	 		}else{
	   	  	 			res
	   	  	 			 .status(504)
	   	  	 			 .json()
	   	  	 		}
	   	  	 	});
      		}
      		
		  
		});

}



module.exports.hotelsDeleteOne = function(req, res){
  var hotelId = req.params.hotelId;

Hotel
	.findByIdAndRemove(hotelId)
	.exec(function(err, hotel){
		if(err){
			res
		     .status(404)
		     .json(err);
		 }else{
		 	console.log("Hotel Delted "+ hotelId);
		 	 res
		 	  .status(204)
		 	  .json();
		 }
	});
};









