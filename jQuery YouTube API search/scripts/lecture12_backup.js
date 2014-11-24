$(function(){
	$('#search-form').submit(function(e) {
		e.preventDefault();
	});
})
// I don't get why this is needed -- isn't GET actually submitting 
// the form? It seems like by using preventDefault() we would be 
// preventing the GET request! But this doesn't work w/o it.


function search() {
	// clear the containers we already have in HTML
	$('#results').html('');
	$('#buttons').html('');
	
	// grab the form field input
	q = $('#query').val(); // id of the search input field in HTML
	
	// send GET request to the API (jQuery method)
	// the URL for GET came from: 
	// https://developers.google.com/youtube/v3/docs/search/list
	// also the options, such as part and q, come from there (long list)
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{ // URL for GET
			part: 'snippet, id',
			q: q,
			type: 'video',
			key: 'AIzaSyCH0i8znvwIBCWC_nZgFr8rmaUOW6AH1Hs' // my own key
			},
			function(data){ // see below re: "data" 
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				// nextPageToken and prevPageToken are supplied by YouTube 
				// and will allow us to retrieve the next set of results
				
				// log data
				console.log(data);
				// "data" contains all the data sent from YouTube API
				// by logging it, we can see that, and we can open the
				// "snippet" in the Console and see title, descrip, etc. 
				// for each video (see http://api.jquery.com/jquery.get/ 
				// for origin of "data") 

				$.each(data.items, function(i, item) {
					// get output
					var output = getOutput(item);
					
					// display results on HTML page
					$('#results').append(output);
				});

			}
	); // end .get() method
} // end search function

