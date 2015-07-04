var express = require('express');
var router = express.Router();
var models =require('../models');

router.get('/', function(req,res,next){
	//google map
	/**** map ****/
	
	// res.render('home', {map locations})
	
	// res.render('homepage',{greetings: "HELLO"})
	res.render('homepage', {greetings: 'yo'})
});

router.get('/forum', function(req,res,next){
	models.Article.find({}, function(err, article){
		res.render('forum', {articles: article})
	})
})

router.post('/forum', function(req,res,next) {
	console.log(req.body);
	models.Article.create(req.body)
	.then(
		res.redirect('/forum'))
	.then(null, function(err) {
		next(err);
	})
});




module.exports = router;