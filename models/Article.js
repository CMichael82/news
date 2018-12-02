var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
	headline: {
		type: String,
		trim: true,
		required: true
	},
	summary: {
		type: String,
		trim: true,
		required: true
	},
	link: {
		type:String,
		trim: true,
		required: true
	},
	comments: {
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;