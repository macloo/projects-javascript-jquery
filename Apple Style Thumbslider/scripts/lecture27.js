$(document).ready(function(){   
// ----------------------------------------------------------------------------

var totalWidth = 0;
var positions = new Array();

// put gray bg in first LI (behind thumbnail image)
$('#thumbs ul li').first().addClass('active');

// build an array containing the left edge position of each big image
// loop through all slides 
$('#slides .slide').each(function(i) {
	positions[i] = totalWidth;
	totalWidth += $(this).width();
	
	if (!$(this).width()) {
		alert("Please add a width to your images.");
		return false;
	}
	// console.log(positions);
	// [0, 900, 1800, 2700] now we know where each slide starts 
}); 

// set width of slides container to the total of all slides' widths
$('#slides').width(totalWidth);

// click event handler for the thumbnails:  
// the 2 args, 'e' and 'keepScrolling,' are only nec. b/c of the autoscroll
// function at bottom. If we remove autoscroll() we do not need the args.
// NOTE: 'e' will be 'click' event in either case.
$('#thumbs ul li img').click(function(e, keepScrolling) {
	
	// the .active class adds a gray background on the thumbnail
	// remove .active class from all LIs
	$('#thumbs ul li').removeClass('active');
	// add .active class to current LI
	$(this).parent().addClass('active');
	
	// find out how many LIs are before this one --
	// returns 0 for first item, 1 for second, etc. (nice!) 
	// use pos to associate thumb clicked with position number in array
	var pos = $(this).parent().prevAll().length;
	// console.log(pos); // works 
	
	// the .prevAll() method searches through the predecessors of 
	// these elements in the DOM tree and constructs a new jQuery object 
	// from the matching elements; the elements are returned in order 
	// beginning with the closest sibling.
	
	$('#slides').stop().animate(
		{
		marginLeft:-positions[pos]+'px'
		}, 450);
	// 450 is the speed. 
	// at this point, the slider already works. 
	// I don't get why stop() comes first here, before animate --
	// stop() should work on a currently running animation --
	// but this works! Nicely! 

	// if click was NOT triggered by autoscroll() function, stop autoplay
	// ('keepScrolling' will = '' if you manually clicked a thumbnail --
	// then it would be false) 
	if (!keepScrolling) clearInterval(doAutoscroll);
	// this was done wrong in the original tutorial, so autoplay never stopped

});


// autoplay function 
// $('#thumbs ul li img') is the set of all img objects in that UL. 
// .eq() "reduces the set of matched elements to the one at the 
// specified index," i.e. img[0], or img[1], etc. 
// this is brilliant: dividing by the length of the array always 
// yields remainders that match the set elements, in order, no matter 
// how long the function runs. 
// Example: 98 % 4 = 2, 99 % 4 = 3, 100 % 4 = 0 ...  
var current = 1;
function autoscroll() {
	if (current == -1) return false; // if NaN
	$('#thumbs ul li img').eq(current % $('#thumbs ul li img').length)
		.trigger('click', [true]); 
		// this [true] will be passed in as arg/param 'keepScrolling'
	current++;
	// console.log(current % $('#thumbs ul li img').length);
	// this cycles 2, 3, 0, 1, 2, 3, 0 ...
	// 3 % 4 = 3 (remainder 3; modulus is integers only) 
	// 4 & 4 = 0
	// 5 % 4 = 1 ... etc. 
}


var doAutoscroll = setInterval(autoscroll, 2000);
// remember how setInterval and clearInterval work: we cannot clear 
// unless we have a var. Also, no () in function name here.
// 2000 is milliseconds, the length of the interval (the pause 
// before re-running the function) 

// ----------------------------------------------------------------------------
}); 
