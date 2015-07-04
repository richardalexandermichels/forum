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
	//console.log(req.body);
	models.Article.create(req.body)
	.then(function(article){
		// models.Author.create({author: req.body.articleAuthor ,uniqArtId:article._id})
		// console.log(article)
		res.redirect('/forum')
	})
	.then(null, function(err) {
		next(err);
	})
});

router.get('/:name', function(req, res, next) {
	// console.log(req.params.name)
	models.Article.findByName(req.params.name, function(err, article){
		//console.log(article)
		res.render('forum', {articles: article})})
})

router.get('/:title/edit', function (req, res, next) {
	//console.log(req.params.title)
	models.Article.findOne(models.Article.where({title: req.params.title}), function(err, article) {
		//console.log(article.contents)
	res.render('edit', {title: article.title, author: article.articleAuthor, comment: article.contents})	
	})
})


router.post('/:title/edit', function(req,res,next) {
	models.Article.findOneAndUpdate({title: req.params.title}, {contents: req.body.contents}, {new: true}, function(err, article){
		
		console.log(article);
		res.redirect('/forum')
	})
})

		 // article[0].save()
















module.exports = router;