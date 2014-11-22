$(document).ready(function() {  // do not delete 
// ----------------------------------------------------------------------------

// simple content slider with no auto-play options

// slider options
var speed = 500;       // fade speed, in milliseconds

// add active class to first slide
$('.slide').first().addClass('active');

// hide all slides
$('.slide').hide();

// show first slide
$('.active').show();

// click action event handlers (next and prev)
$('#next').on('click', function() {
	$('.active').removeClass('active').addClass('oldActive');
	// check to see if we have reached the final slide
	if ($('.oldActive').is(':last-child')) {
		$('.slide').first().addClass('active');
	} else {
		$('.oldActive').next().addClass('active');
	}
	$('.oldActive').removeClass('oldActive');
	$('.slide').fadeOut(speed);
	$('.active').fadeIn(speed);
});

$('#prev').on('click', function() {
	$('.active').removeClass('active').addClass('oldActive');
	// check to see if we are on the first slide
	if ($('.oldActive').is(':first-child')) {
		$('.slide').last().addClass('active');
	} else {
		$('.oldActive').prev().addClass('active');
	}
	$('.oldActive').removeClass('oldActive');
	$('.slide').fadeOut(speed);
	$('.active').fadeIn(speed);
});


// ----------------------------------------------------------------------------
});
