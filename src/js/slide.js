$(function(){
	var slide = $('.slides');
	slide.append('<img src="images/main_image2.png" width="630" height="400" /><img src="images/main_image3.png" width="630" height="400" /><img src="images/main_image4.png" width="630" height="400" /><img src="images/main_image5.png" width="630" height="400" /><img src="images/main_image6.png" width="630" height="400" />');
 slide.bxSlider({
        auto: true,  //自動再生
        pause:  5000, //静止時間
        speed: 1000, //エフェクトのスピード
        mode: 'fade', //エフェクトの種類
        pager:false, //ページャーの有無
		controls:false
        });
});