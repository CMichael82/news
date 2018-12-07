$(document).ready(function () {
	var $scrapeBtn = $('#scrapeBtn');
	var $viewSaved = $('#viewSaved');

	function scrapeArticles() {
		$.ajax({
			method: "GET",
			url: "/scrape"
		}).then(function () {
			alert('Scrape Completed');
			location.reload();
		});;
	};

	function bookmarkArticles() {
		console.log('You are saving me!');
		var thisId = $(this).attr("data-id");
		$.ajax({
				method: "POST",
				url: "/saved/" + thisId
			})
			.then(function (data) {
				console.log(data);
				alert("Article Saved!");
				window.location = '/bookmarked';
			})
	}

	function viewBookmarked() {
		window.location = '/bookmarked';
	}

	$scrapeBtn.on('click', scrapeArticles);
	$('body').on('click', '#saveBtn', bookmarkArticles);
	$viewSaved.on('click', viewBookmarked);

});