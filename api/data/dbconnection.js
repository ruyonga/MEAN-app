var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/meanhotel';



var _connection = null;

var open = function(){
//make connection
	MongoClient.connect(dburl, function(err, db){
     if(err){
     	console.log("DB connection failed");
     return
     }else{

     _connection = db.db('meanhotel');
     console.log("DB connection success");
 }
	}); 
};

var get = function(){
	return _connection;
};

module.exports = {

	open : open,
	get : get
};