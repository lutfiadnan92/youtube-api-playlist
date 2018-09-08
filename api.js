$(document).ready(function(){
	const key = 'AIzaSyCWusO3KY_F6TruyS4aWqgrweKghqsBi1s';
	const playlistId = 'PLG6xZ0MALv7o_LL0l1H7VJWWQPApfOR5Y';
	const URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

	const options = {
		part: 'snippet',
		key: key,
		maxResults: 20,
		playlistId: playlistId
	}

	loadVideo();

	function loadVideo(){
		$.getJSON(URL, options, function(data){
			console.log(data);
			const id = data.items[1].snippet.resourceId.videoId;
			mainVideo(id);
			resultLoop(data);
		})
	}

	function mainVideo(id){
		$('#video').html(`
		<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
		`);
	}

	function resultLoop(data){
		$.each(data.items, function(i, item){
			const thumb = item.snippet.thumbnails.medium.url;
			const title = item.snippet.title;
			const desc = item.snippet.description.substring(0,100);
			const vid = item.snippet.resourceId.videoId;

			$('main').append(`
			<article class="items" data-key="${vid}">
				<img src="${thumb}" alt="" class="thumb"></img>
				<div class="details">
					<h4>${title}</h4>
					<p>${desc}</p>
				</div>
			</article>
			`);
		});
	}
	$('main').on('click', 'article', function(){
		const id = $(this).attr('data-key');
		mainVideo(id);
	});

});