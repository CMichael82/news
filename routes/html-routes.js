var db = require('../models');

module.exports = function (app) {
	app.get('/', function (req, res) {
		db.Article.find({})
		.sort({date: -1})
		.limit(25)
		.then(function (dbArticle) {
			var articleObj = {
					article: dbArticle,
					};
				res.render('index', articleObj);
			})
			.catch(function (error) {
				res.json(error);
			});
	});

	app.get('/bookmarked', function (req, res) {
		db.Article.find({
				saved: 'true',
			})
			.then(function (dbBookmarked) {
				var bookmarkObj = {
					bookmarked: dbBookmarked
				}
				res.render('bookmarked', bookmarkObj);
			})
			.catch(function (err) {
				res.json(err);
			});
	});
};