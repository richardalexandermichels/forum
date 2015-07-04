var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Forum');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));



var authorSchema = new mongoose.Schema({
	author: String,
	location: [Number],
	numPosts: Number,
	// uniqArtId: ObjectId

})


var articleSchema  = new mongoose.Schema({
	title: String,
	articleAuthor: String,
	contents: String,
	date: {type: Date, default: Date.now}
})

// assign a function to the "statics" object of our animalSchema
articleSchema.statics.findByName = function (name, cb) {
  return this.find({ articleAuthor: name}, cb);
}

var author = mongoose.model('Author', authorSchema)
var article = mongoose.model('Article', articleSchema)

module.exports = {

	Author: author,
	Article: article

}