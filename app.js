var express = require('express')
var logger = require('morgan');
var app = express()
var swig = require('swig')
var routes = require('./routes/');
var body =  require('body-parser')
var path = require("path");

swig.setDefaults({cache: false});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './views')
app.use("/bower_components", express.static(path.join(__dirname, "/bower_components")));
app.use(logger('dev'));

app.use(body.json());
app.use(body.urlencoded({extended: false }));
 
app.use('/', routes);


app.use(function(req,res,next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
})

app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.send(err.message)
})



app.listen(3000)