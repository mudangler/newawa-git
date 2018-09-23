$(function() {
	var bgcolor =  $("div:eq(1)");
	var bgc = bgcolor.css('background-color');		//二番目に出てくるdiv（背景色設定用）の背景色を取得して変数bgcに代入、
	var here = $(".here").html();	 //その中のpタグ(#here)に現在居るフォルダ名を入れているので取得して変数hereに代入
	var num;
	var fw = $(".floatWindow");

	$('.contents').css("opacity","0").animate({'opacity':'0.95'},1000);		// ページを開いた後に#contentsと#floatWindowをフェードインさせる
	$(".floatWindow").css("opacity","0").animate({'opacity':'1'},1200);

	switch(here){														//switch文で現在のフォルダ名に応じて変数numに数を代入する。
		case 'message':
		num = 0;
		break;
		case 'instractor':
		num = 1;
		break;
		case 'system':
		num = 2;
		break;
		case 'link':
		num = 4;
		break;
	}

	$('.gnavi li:eq(' + num +')').css('marginLeft','-10px');		//サイドバーのナビのnum番目の要素のマージンだけを-10pxにして現在位置を表す。


	$('.contact img').hover(										//contactのホバーの処理
		function(){
			$(this).stop().animate({'marginTop':'-85px'},500);
			bgcolor.stop().animate({ 'backgroundColor': '#f4a2c3' }, 500);
		},
		function () {
			$(this).stop().animate({'marginTop':'0px'},500);
			bgcolor.stop().animate({ 'backgroundColor': bgc }, 300);
		}
		);


	$('.gnavi li:not(:eq(' + num +'))').hover(							//サイドバーのホバーの処理
		function(){													//ホバーしたナビを伸ばすと同時に背景色をナビのcolor(CSS)と同色に変更する。
			var obic = $(this).css('color');
			$(this).stop().animate({'marginLeft':'-10px'},'1000');
			bgcolor.stop().animate({ backgroundColor: obic }, 500);
		},
		function () {
			$(this).stop().animate({'marginLeft':'-70px'},'1000');
			bgcolor.stop().animate({ backgroundColor: bgc }, 300);
		}
	);





	$('.title')																//titleのホバーの処理
	.hover(
		function(){
			bgcolor.stop().animate({ backgroundColor: '#009933' }, 500);
		},
		function () {
			bgcolor.stop().animate({ backgroundColor: bgc }, 300);
		}
		);



	$('.rumble').jrumble({									//hoverした時に要素を震えさせる処理
		x: 2,
		speed: 40
	});

	$('.rumble').hover(function(){
		$(this).trigger('startRumble');
	}, function(){
		$(this).trigger('stopRumble');
	});

	var fwdd = $(".floatWindow dd");
	var fwdi = $(".floatWindow dt img");
	var fwda = $(".floatWindow dt a");


	$("a.close, fw").live('click',function(){					//✕ボタンを押した時に練習予定を消す処理
		fwdd.fadeOut("fast");
		fwda.attr("class", "open");
		fwdi.attr("src", "/images/switch_on.png");
		if(here == "home"){										//TOPページの時だけパスを変える
			fwdi.attr("src", "/images/switch_on.png");
		}
		return false;
	});

	$("a.open, fw").live('click',function(){					//◎ボタンを押した時に練習予定を開ける処理
		fwdd.fadeIn("fast");
		fwda.attr("class", "close");
		fwdi.attr("src", "/images/switch.png");
		if(here == "home"){
			fwdi.attr("src", "images/switch.png");
		}
		return false;
	});

																//floatWindow内のdtをドラッグした時にfloatWindowを移動できる様にする処理
	$(".floatWindow dl dt").live("mousedown",function(e){
		fw.data("clickPointX" , e.pageX - fw.offset().left)
		.data("clickPointY" , e.pageY -fw.offset().top);

		$(document).mousemove(function(e){
			fw.css({
				top:e.pageY  - fw.data("clickPointY")+"px",
				left:e.pageX - fw.data("clickPointX")+"px"
			});
		});
	}).live("mouseup",function(){
		$(document).unbind("mousemove");
	});



	//レスポンシブ用の記述
	if(navigator.userAgent.match(/(iPhone|Android)/)){
		$('.gnavi li:eq(' + num +')').css('marginLeft','-5px');
		$('.gnavi').after($('.contents'));
		$('.contents').after($('.floatWindow'));
		if(num == null) {
			$('.gnavi li').css('marginLeft','-10px');
		}
	}
});


$(function() {																//mobileをホバーした時に回転させる処理
	var i = 0;
	$('.mobile')
		.hover(function(){
			timer = setInterval(function(){
			i+=10;
	        $('.mobile').rotate(i);
	    },50);
	},
		function() {
			timer && clearInterval(timer);
    		$(this).rotate(i);
	})
});


$(function() {
	var i = 0;
	$('#mobile, .logo')
	.hover(function(){
		timer = setInterval(function(){
			i+=10;
	        $('#mobile, .logo').rotate(i);
	    },100);
	},
	function() {
		timer && clearInterval(timer);
    	$(this).rotate(i);
	});
});


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


$(function() {
	if(!(navigator.userAgent.match(/(iPhone|Android)/))){
		var gray = $("#grayLayer");
		gray.height($("body").height());
		$(".youtube-position").height(window.innerHeight);
		gray.show();

		gray.on("click", function() {
			gray.fadeOut(function(){
				gray.remove();
			});
		})
	}
});