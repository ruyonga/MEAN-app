var hotelData = require('../data/hotel-data.json')

module.exports.hotelsGetAll = function(req, res) {
	// body...
	 console.log("GET the hotel");
	 console.log(req.query);

	 var offset = 0;
	 var count = 5;

	 var returnData = hotelData.slice(offset, offset+count);
//Check if the quesy property exists and has values.
     if(req.query && req.query.count){
     	count = parseInt(req.query.count, 10);
     }

       if(req.query && req.query.offset){
     	offset = parseInt(req.query.offset, 10);
     }

		  res
			.status(200)
			.json(hotelData);
};

//GET on item
module.exports.hotelsGetOne = function(req, res) {
	
	var hotelId = req.params.hotelId;
	var thisHotel = hotelData[hotelId];
	 console.log("GET the hotel",  hotelId);
		  res
			.status(200)
			.json(thisHotel);
};

module.exports.hotelsAddOne = function(req, res){
	console.log("POST new Hotel");
	console.log(req.body);

	res
	  .status(200)
	  .json(req.body);
};













