$(document).ready(function () {
	var $viewCommentBtn = $('#viewCommentBtn');
	var $home = $('#home');
	var $saveComment = $('#saveComment');
	var $removeArticle = $('#removeArticle');
	var $deleteComment = $('#deleteComment');

	function returnHome() {
		window.location = '/';
	}

	function openCommentModal() {
		console.log("You Clicked Me!");
		var thisId = $(this).attr("data-id");
		console.log(thisId);
		$.ajax({
				method: "GET",
				url: "/comments/" + thisId
			})
			.then(function (data) {
				console.log(data);
				$("#commentHeader").html(data.headline);
				$saveComment.attr('data-id', data._id);
			});
	}

	function saveComment() {
		var thisId = $(this).attr("data-id");
		$.ajax({
				method: "POST",
				url: '/saveComment/' + thisId,
				data: {
					title: $("#titleInput").val(),
					body: $("#bodyInput").val()
				}
			})
			.then(function (data) {
				console.log(data);
			});
		$("#titleInput").val("");
		$("#bodyInput").val("");
	}

	function viewComments() {
		var thisId = $(this).attr("data-id");
		console.log('This Comment ID', thisId);
		$.ajax({
				method: "GET",
				url: "/comments/" + thisId,
			})
			.then(function (data) {
				$('#noteTitle').html(data.note.title),
					$('#noteBody').html(data.note.body),
					$('#articleTitle').text(data.headline);
					$('#deleteComment').attr('data-id', data.note._id);
			});
	}

	function removeBookmark() {
		var thisId = $(this).attr("data-id");
		$.ajax({
				method: "POST",
				url: "/unSave/" + thisId,
			})
			.then(function (data) {
				location.reload();
			})
	}

	function deleteComment(){
		var thisId = $(this).attr("data-id");
		$.ajax({
			method: "DELETE",
			url: "/deleteComment/" + thisId,
		})
		.then(function(data){
			console.log("Comment Deleted!");
		})
	}

	$viewCommentBtn.modal();
	$('.modal').modal();
	$home.on('click', returnHome);
	$('body').on('click', '#commentBtn', openCommentModal);
	$saveComment.on('click', saveComment);
	$viewCommentBtn.on('click', viewComments);
	$removeArticle.on('click', removeBookmark);
	$deleteComment.on('click', deleteComment);

});