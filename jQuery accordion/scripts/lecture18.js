$(document).ready(function() {
// ---------------------------
// simple accordion menu or FAQ list, with rotating image


// hide all answers 
$('dd').hide();

var action = "click";
var speed = "500";

$('dt').on(action,function() {
	// get next element in DOM 
	$(this).next()
		.slideToggle(speed)
		.siblings('dd')
		.slideUp(); // close all siblings
	
	// get image for the active question
	var current = $(this).children('img');
	// remove rotate class from any other img
	 $('img').not(current).removeClass('rotate');
	// toggle rotate class on the current img
	$(current).toggleClass('rotate');
	
});


// ------------------------ end
});
