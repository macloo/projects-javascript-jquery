$(document).ready(function() {  // do not delete 
// ----------------------------------------------------------------------------

// content slider with auto-play options - setInterval() and clearInterval()
// note: does not include ability to restart auto-play 
// auto-play simply ceases if you click Prev or Next arrows

// slider options
var speed = 500;       // fade speed, in milliseconds
var autoswitch = true; // auto-play on
var autoswitchSpeed = 3000; // sliding speed

// add active class to first slide
$('.slide').first().addClass('active');

// hide all slides
$('.slide').hide();

// show first slide
$('.active').show();

// click action event handlers - now they call named functions
$('#next').on('click', function() {
	clearInterval(autoplay); // stops slider auto-playing
	nextSlide();
});
$('#prev').on('click', prevSlide);

// start auto-playing 
if (autoswitch) {
	var autoplay = setInterval(nextSlide, autoswitchSpeed);
}

function nextSlide() {
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
}

function prevSlide() {
	clearInterval(autoplay);
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
}

// ----------------------------------------------------------------------------
});
