$(document).ready(function() {
	$("#home").mouseover(function () {
		$(this).removeClass('bon').addClass('boff');
	});
	$("#home").mouseout(function () {
		$(this).removeClass('boff').addClass('bon');
	});
	$("#about").mouseover(function () {
		$(this).removeClass('bon').addClass('boff');
	});
	$("#about").mouseout(function () {
		$(this).removeClass('boff').addClass('bon');
	});
	$("#cont").mouseover(function () {
		$(this).removeClass('bon').addClass('boff');
	});
	$("#cont").mouseout(function () {
		$(this).removeClass('boff').addClass('bon');
	});
	$("#git").mouseover(function () {
		$(this).removeClass('bon').addClass('boff');
	});
	$("#git").mouseout(function () {
		$(this).removeClass('boff').addClass('bon');
	});
});