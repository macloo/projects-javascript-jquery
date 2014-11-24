$(function(){
	$('#search-form').submit(function(e) {
		e.preventDefault();
	});
})
// I don't get why this is needed -- isn't GET actually submitting 
// the form? It seems like by using preventDefault() we would be 
// preventing the GET request! But script doesn't work w/o it.


// I added two args (they are blank if you use the search form 
// so that same function can be used for paging instead of copying 
// all the code TWICE into the Prev and Next Page functions. 
// Seems to work fine.
function search(token, q) {
	// clear the containers we already have in HTML
	$('#results').html('');
	$('#buttons').html('');
	
	// grab the form field input
	// I added the if-test to streamline Prev and Next Page functions
	if (!q) {
		q = $('#query').val(); // id of the search input field in HTML
	}
	
	// send GET request to the API (jQuery method)
	// the URL for GET came from: 
	// https://developers.google.com/youtube/v3/docs/search/list
	// also the options, such as part and q, come from there (long list)
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{ // URL for GET
			part: 'snippet, id',
			q: q,
			pageToken: token,
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
				// "data" contains all the data sent from YouTube API.
				// By logging it, we can see that, and we can open the
				// "snippet" in the Console and see title, descrip, etc. 
				// for each video (see http://api.jquery.com/jquery.get/ 
				// for origin of "data") 

				$.each(data.items, function(i, item) {
					// get HTML output; see below for the function
					var output = getOutput(item);
					
					// display results on HTML page
					// output comes from getOutput() below
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken, q);
				// create two buttons in HTML; see below for the function
				// buttons comes from getButtons() below
				$('#buttons').append(buttons);
				
			}
	); // end .get() method
} // end search function


// Prev and Next Page functions
// in the tute, the guy COPIED all the search() code and repeated it 
// in EACH page function -- NUTS. So instead I pass the new vars into 
// the search() function
function prevPage() {
	var token = $('#prev-button').data('token');
	var q = $('#prev-button').data('query');
	// above does not exist in HTML; is written by getButtons() below
	search(token, q);
}

function nextPage() {
	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query');
	// above does not exist in HTML; is written by getButtons() below
	search(token, q);
}


// build the output to be displayed in our HTML
function getOutput(item) {
	
	// the guy in the tutorial is not clear about this at all. See:
	// PNG "data items returned by GET request.png" (my file).
	// You can dig into the data via the console and find these 
	// parameter names that way: Object > Items > 0-5 > id, snippet
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.medium.url;
	var channelTitle = item.snippet.channelTitle;
	// sometimes this is empty
	var videoDate = item.snippet.publishedAt;
	
	// build output string with HTML for one video
	// we're building two divs to float left & right inside a single <li>
	// all styled in the CSS
	var output = '<li>' +
	'<div class="list-left">' +
	'<img src="' +thumb+ '">' +
	'</div>' +
	'<div class="list-right">' +
	'<h2>' +title+ '</h2>' +
	'<p class="small">By <strong>' +channelTitle+ '</strong> on ' +videoDate+ '</p>' +
	'<p>' +description+ '</p>' +
	'</div>' +
	'</li>' +
	'<div class="clearfloats"></div>' +
	'';
	
	return output;
}


// build the buttons to be displayed in our HTML
function getButtons(prevPageToken, nextPageToken, q) {
	var prevButton = '<button id="prev-button" class="paging-button"' +
	' data-token="' +prevPageToken+ '" data-query="' +q+ '"' +
	' onclick="prevPage();">Prev Page</button>';

	var nextButton = '<button id="next-button" class="paging-button"' +
	' data-token="' +nextPageToken+ '" data-query="' +q+ '"' +
	' onclick="nextPage();">Next Page</button>';

	if(!prevPageToken){
		var buttonOutput = '<div class="button-container">' +
		nextButton + '</div>';
		// probably should add if-not-nextPageToken but not going to
	} else {
		var buttonOutput = '<div class="button-container">' +
		prevButton + ' ' +nextButton+ '</div>';
	}
	
	return buttonOutput;
}
