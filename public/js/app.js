function displayArticles() {
	$.getJSON("/articles", function (data) {
		var number = 0;

		for (var i = 0; i < data.length; i++) {
			number++;

			var commentBtn = $("<button data-id='" + data[i]._id + "'>");
			commentBtn.text(' Add Comment ');
			commentBtn.attr("id", "commentBtn");
			commentBtn.attr("class", "modal-trigger blue-grey lighten-3 white-text");
			commentBtn.attr('data-target', 'commentModal');

			var saveBtn = $("<button data-id='" + data[i]._id + "'>");
			saveBtn.text(' Save Article ');
			saveBtn.attr("id", "saveBtn");
			saveBtn.attr("class", "blue-grey lighten-3 white-text");
	
			var siteLink = $("<a>");
			siteLink.text("BBC News");
			siteLink.attr("href", 'https://www.bbc.com' + data[i].link);
			siteLink.attr("target", '_blank');

			var tr = $("<tr>").append(
				$("<td>").text(number),
				$("<td id='headline'>").text(data[i].headline),
				$("<td id='summary'>").text(data[i].summary),
				$("<td>").append(commentBtn),
				$("<td>").append(saveBtn),
				$("<td>").append(siteLink),
			);
			$("tbody").append(tr);
		};
	});
}

$(document).ready(function () {
	$('.modal').modal();
});


$(document).on('click', '#scrapeBtn', function () {
	$.ajax({
		method: "GET",
		url: "/scrape"
	}).then(function () {
		console.log('Scrape Completed');
	});
	displayArticles();
});

$(document).on("click", "#commentBtn", function () {
	console.log("You Clicked Me!");
	// $('#commentModal').modal();
	var thisId = $(this).attr("data-id");
	$.ajax({
		method: "GET",
		url: "/articles/" + thisId
	})
	.then(function (data) {
		console.log(data);
		$("#commentHeader").html(data.headline);
		// $("#comments").append("<input id='titleinput' name='title' >");
		// $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
		// $("#comments").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
		// if (data.note) {
			// 	$("#comments").val(data.note.title);
			// 	$("#comments").val(data.note.body);
			// }
		});
	});

	displayArticles();