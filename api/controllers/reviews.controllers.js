var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function(req, res){

var hotelId = req.params.hotelId;
console.log("GET the hotel",  hotelId);

	Hotel
		.findById(hotelId)
		.select('reviews')
		.exec(function(err, doc){
			if(err){
				console.log("err getting reviews for hotel");
				res
				.status(500)
				.json(err)
				return;
			}else{
			console.log("found results");
			  res
				.status(200)
				.json(doc.reviews);
		}
		});

};


module.exports.reviewsGetOne = function(req, res){
 var hotelId = req.params.hotelId;
 var reviewId = req.params.reviewId;
 console.log("Got Review ID" + reviewId + "for hotel"+ hotelId);

	Hotel
		.findById(hotelId)
		.select('reviews')
		.exec(function(err, doc){
				var response = {
					status : 200,
					message : []
				
				};

			if(err){
			 console.log("Returned hotel", err);
			 response.status = 500;
			 response.message = err;
			
			}else if(!doc){
			  console.log("Returned hotel", doc.length);
			 response.status = 404;
			 response.message = {"message" : "Review with id "+ reviewId + "not found"};
	

			}else{
			console.log("Returned hotel", hotel);
			 response.message = doc.reviews ? doc.reviews : []
			}
			res
			  .status(response.status)
			  .json(response.message);
		});
};

//Process Data insert

var _addReview = function(req, res, hotel){
hotel.reviews.push({
		 name : req.body.name,
		 rating : parseInt(req.body.rating, 10),
		 review : req.body.review
	});

hotel.save(function(err, hotelUpdated){
	if(err){
		res
		 .status(500)
		 .json(err);
	}else{
		res
		  .status(201)
		  .json(hotelUpdated.reviews[hotelUpdated.length - 1]);
	}
});
};

module.exports.reviewsAddOne = function(req, res){
console.log(" hotel"+ req.params);
var hotelId = req.params.hotelId;
 console.log(" hotel"+ hotelId);

	Hotel
		.findById(hotelId)
		.select('reviews')
		.exec(function(err, doc){
				var response = {
					status : 200,
					message : []
				};
			if(err){
			 console.log("Returned hotel", err);
			 response.status = 500;
			 response.message = err;
			
			}else if(!doc){
			  console.log("Returned hotel", doc.length);
			  response.status = 404;
			  response.message = {"message" : "Review with id "+ reviewId + "not found"};
			}

			if(doc){
				_addReview(req, res, doc);
			}else{
			res
			  .status(response.status)
			  .json(response.message);
			}
		});
};


module.exports.reviewsUpdateOne = function(req, res){

}


module.exports.reviewsDeleteOne = function(req, response){

};



