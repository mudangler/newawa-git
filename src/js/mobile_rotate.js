$(function() {
	var i = 0;
	$('#mobile')
	.hover(function(){
		timer = setInterval(function(){
			i+=10;
	        $('#mobile').rotate(i);
	    },100);
	},
	function() {
		timer && clearInterval(timer);
    	$(this).rotate(i);
	});
});
