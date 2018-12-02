var axios = require('axios');
var cheerio = require('cheerio');
var db = require('../models');

module.exports = function (app) {
	app.get('/scrape', function (req, res) {
		axios.get('https://www.bbc.com/news').then(function (response) {
			var $ = cheerio.load(response.data);
			var result = {};
			$('div.gs-c-promo-body').each(function (i, element) {
				result.headline = $(this).find('h3').text();
				result.summary = $(this).find('p').text();
				result.link = $(this).find('a').attr("href");
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
			});
		});
		res.send('Scrape Complete');
	});

	app.get('/articles', function (req, res) {
		db.Article.find({})
			.then(function (dbArticle) {
				res.json(dbArticle);
			})
			.catch(function (error) {
				res.json(error);
			})
	});


};