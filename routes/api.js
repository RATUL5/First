var main=require('../index');
var express=require('express');
var router=express.Router();
var assert=require('assert');


var db=main.db;

router.get('/movies',function(req,res,next){
      db.collection('movieDetails').find({},function(err,movies){
      	assert.equal(null,err);
      	res.json(movies);
      }).limit(10);
});