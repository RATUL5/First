var express=require('express');
var app=express();
var router=express.Router();
var morgan=require('morgan');

var ObjectID=require('mongodb').ObjectID;
var BSON=require('mongodb').BSONPure;

var bodyparser=require('body-parser');
var assert=require('assert');
var MongoClient=require('mongodb').MongoClient;

var users=require('./routes/home');
//var api=require('./routes/api');

app.set('view engine','ejs');
app.set('view',__dirname+'/views');

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

var db;

router.get('/',function(req,res,next){
      db.collection('movieDetails').find({}).limit(10).toArray(function(err,movies){
      	  assert.equal(null,err);
      	  res.json(movies);
      });
});



router.get('/:id',function(req,res,next){
	  var obj_id=new ObjectID(req.params.id);
	  db.collection('movieDetails').findOne({_id:obj_id},function(err,movie){
	  	assert.equal(null,err);
	  	console.log(movie);
	  	res.json(movie)

	  });
});

//router.get('/top10/:tops',function(req,res,next){
	//db.collection('movieDetails').find({"tomato.meter":req.params.tops}).limit(2).toArray(function(err,movies){
		// assert.equal(null,err);
		// res.json(movies);
	//})
//});


app.use('/api',router);
 

app.get('/',function(req,res,next){
	res.sendFile(__dirname+'/views/index.html');
});



MongoClient.connect('mongodb://localhost:27017/video',function(err,database){
	
      assert.equal(null,err);
      console.log('connected to database.');
	  
	  db=database;
	  
});

app.use(errorHandler);

function errorHandler(err,req,res,next){
	console.error(error.message);
	console.error(error.stack);
	res.status(500);
}

app.listen(3000,function(){
	  	console.log('server is running at port 3000....');
 });

module.exports=db;

