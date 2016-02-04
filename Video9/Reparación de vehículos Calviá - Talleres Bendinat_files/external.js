/*
# ---------------------------------------------------- #
#  Functions                                           #
#  v1.02                                               #
# ---------------------------------------------------- #
*/

function externalLinks() {
	$("a").each( function(){
		if($(this).attr('href') && $(this).attr('rel') == 'external') $(this).attr('target', '_blank');
	});
} 

function galleryCaptions() {
	var captions = $('.gallery p.caption');
	if(captions.length <= 0) return false;
	if(captions.css('position')=='relative'){
		var minHeight = 0;
		captions.each( function(){
			$(this).css({ width: $(this).prev('img').width()-parseFloat($(this).css('paddingRight'))-parseFloat($(this).css('paddingLeft')) });
		}).each( function(){
			minHeight = (minHeight < $(this).height()) ? $(this).height() : minHeight;
		}).css({height: minHeight});
	}
	captions.each( function(){
		var captionBg = ($(this).html() > "") ? $(this).css('backgroundColor') : 'transparent';
		$(this).css({backgroundColor: captionBg});
	});
}

function formLabelIndent() {
	var formLabels = $('form .label');
	if(formLabels.length <= 0) return false;
	formLabels.each( function(){
		if( $(this).width() > parseInt($('form .label').css('min-width')) ){
			$(this).next('.input').addClass('indent');
		}
	});
}

function overlayWidth(){
    var overlays = $('#contentTop .overlay, #contentBottom .overlay, #subContent .overlay');
    if(overlays.length <= 0) return false;
    overlays.each( function(){ $(this).children('div').css({width: $(this).css('width')}); });
}

function navigationLevel(){
	if( $('.navigation li').length > 0 ){
		$('.navigation li').hover( function(){
			var	nested = $(this).parent('ul').parent('li').parent('ul').length > 0 ? true : false;
			var	top = nested ? 0 : $(this).height(),
				left = nested ? $(this).width() : 0;
			$(this).children('ul').css({ position: 'absolute', display: 'block', left: left, top: top });
		}, function(){
			$(this).children('ul').css({ display: 'none' });
		});
	}
	if( $('#page .navigation li').length > 0 ){
		$('#page .navigation li').hover( function(){
			var	top = $(this).position().top,
				left = $(this).width();
			$(this).children('ul').css({ position: 'absolute', display: 'block', left: left, top: top });
		}, function(){
			$(this).children('ul').css({ display: 'none' });
		});
	}
}

function searchHint() {
	$('#headerWrapper form input[type="text"]').bind( 'focus', function(){
		if( $(this).val() == 'Search...' ){
			$(this).val('').css({color: '#333', fontStyle: 'normal'});
		}
	}).bind( 'blur', function(){
		if( $(this).val() == '' ){
			$(this).css({color: '#ccc', fontStyle: 'italic'}).val('Search...');
		}
	});
}

function accordionAssets(){
	var accordions = $('.accordionHeader');
	if(accordions.length <= 0) return false;
	accordions.each( function(){
		$(this).next('.accordionContent').css({width: $(this).next('.accordionContent').innerWidth()});
		$(this).click( function(){
			$(this).next('.accordionContent').slideToggle();
		}).css({cursor: 'pointer'}).next('.accordionContent').slideToggle();
	});
}

function progressiveEnhance() {
	externalLinks();
	galleryCaptions();
	formLabelIndent();
	overlayWidth();
	navigationLevel();
	searchHint();
	accordionAssets();
}

window.onload = progressiveEnhance;