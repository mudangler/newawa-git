$(function() {
	var condd = $('.contents_dd:eq(0)');
	var height = condd.css("height");

	$('.switch').live('click',function(){									//ボタンをクリックする事でコンテンツを消す処理。
			condd.animate({'height':'570px'},'1000');
			$('.exp').css("display","block");
			$("img", this).attr("src", "/images/switch_on.png");
			$(this).attr('class','switch_off');
		});

	$('.switch_off').live('click',function(){								//ボタンをクリックする事でコンテンツを表示する処理。
			condd.animate({'height': height},'1000');
			$("img", this).attr("src", "/images/switch.png");
			$(this).attr('class','switch');
			$('.exp').css("display","none");
	});
});