var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
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
		type: String,
		trim: true,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
	saved: {
		type: Boolean,
		default: false
	}
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;