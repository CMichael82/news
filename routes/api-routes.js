var axios = require('axios');
var cheerio = require('cheerio');
var db = require('../models');

module.exports = function (app) {

	//////////////SCRAPE THE NEWS///////////////////////
	app.get('/scrape', function (req, res) {
		axios.get('https://www.bbc.com/news').then(function (response) {
			var $ = cheerio.load(response.data);
			var result = {};
			$('div.gs-c-promo-body').each(function (i, element) {
				result.headline = $(this).find('h3').text();
				result.summary = $(this).find('p').text();
				result.link = $(this).find('a').attr("href");
				if (result.summary) {
					db.Article.findOneAndUpdate({
							headline: result.headline
						}, result, {
							upsert: true,
							new: true
						})
						.then(function (dbArticle) {
							console.log(dbArticle);
						})
						.catch(function (error) {
							console.log(error);
						})
				};
			});
		});
		res.send('Scrape Complete');
		location.reload();
	});

	/////////BOOKMARK/SAVE A SPECIFIC ARTICLE////////////
	app.post('/saved/:id', function (req, res) {
		db.Article.update({
				_id: req.params.id
			}, {
				$set: {
					saved: true
				}
			})
			.then(function (dbSavedArticle) {
				res.json(dbSavedArticle);
			})
			.catch(function (err) {
				res.json(err);
			});
	});

	app.post('/unSave/:id', function(req, res){
		db.Article.update({
			_id: req.params.id
		},{
			$set: {
				saved: false
			}
		})
		.then(function(dbUnsaved){
			res.json(dbUnsaved);
		})
		.catch(function(err){
			res.json(err);
		});
	});

	////////////////////SAVE A COMMENT & TIE TO IT'S ARTICLE//////////////
	app.post("/saveComment/:id", function (req, res) {
		db.Note.create(req.body)
			.then(function (dbNote) {
				///////////////IS THIS NOT WORKING???///////////////
				console.log("REQ PARAMS", req.params.id);
				return db.Article.findOneAndUpdate({
					_id: req.params.id
				}, {
					note: dbNote._id
				}, {
					new: true
				});
			})
			.then(function (dbArticle) {
				console.log("Saved Comment", dbArticle);
				res.json(dbArticle);
			})
			.catch(function (err) {
				res.json(err);
			});
	});

	app.delete("/deleteComment/:id", function(req, res){
		db.Note.remove({
			_id: req.params.id
		})
		.then(function(dbDelted){
			console.log("Deleted COmment", dbDelted);
		})
		.catch(function(err){
			res.json(err);
		});
	});




	// ///////////////FIND AN ARTICLE AND IT'S RELATED COMENTS//////////
	app.get("/comments/:id", function (req, res) {
		console.log("Comments Req.Params", req.params.id);
		db.Article.findOne({
				_id: req.params.id
			})
			.populate("note")
			.then(function (dbArticle) {
				res.json(dbArticle);
			})
			.catch(function (err) {
				res.json(err);
			});
	});

};