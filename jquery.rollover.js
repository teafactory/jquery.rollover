/*************************************************
**  jQuery RollOver version 1.0.5
**  Copyright Nao Fujimoto, licensed MIT
**************************************************/

(function($){
	$.fn.rollover = function(options) {
	
		var defaults = {
			isAnimated : false,
			animateOpt : {
				ease: '',
				duration: 400
			}
		}		
		
		opt = $.extend({}, defaults, options);	
		
		var imgsToLoad = [];
		var nf = {
			preloadImg: function (imgs){
				for (i=0; i<imgs.length; i++){
					  $("<img>").attr("src", imgs[i]);
				}
			}
		}
		
		if(!opt.isAnimated){
			$(this).each(function(){
				var imgPath = $(this).attr('src');
				var overImg = imgPath.replace(/\.jpg|\.jpeg|\.png|\.gif/, '_on$&') ;
				imgsToLoad.push(overImg);
			});
			
			nf.preloadImg(imgsToLoad);
	
			$(this).on('mouseover', function(){
				var el = $(this).attr('src');
				var imgPath = el.replace(/\.jpg|\.jpeg|\.png|\.gif/, '_on$&') 
				$(this).attr('src', imgPath);
			});
			
			$(this).on('mouseout', function(){
				$(this).attr('src', $(this).attr('src').replace('_on.', '.'));
			});	
		} else {
			
			$(this).each(function(){
				var imgPath = $(this).attr('src');
				var w = $(this).attr('width');
				var h = $(this).attr('height');
				var overImg = imgPath.replace(/\.jpg|\.jpeg|\.png|\.gif/, '_on$&') ;
				$(this).css({'position': 'absolute', 'left': 0, 'top': 0}).wrap('<span></span>').parent().css({position': 'relative', 'display': 'block'}).prepend('<img src="'+overImg+'" width="'+w+'" height="'+h+'" alt="" />');
				imgsToLoad.push(overImg);
			});

			$(this).on('mouseover', function(){
				$(this).stop().animate({'opacity': 0}, opt.animateOpt.duration, opt.animateOpt.ease);
			});
			
			$(this).on('mouseout', function(){
				$(this).stop().animate({'opacity': 1}, opt.animateOpt.duration, opt.animateOpt.ease);
			});
			
		}
	}
	
})(jQuery);
