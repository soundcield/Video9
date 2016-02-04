/*
# ---------------------------------------------------- #
#  Yellsites Plugins for jQuery.                       #
#   - Developed by Tristan Brehaut for Yell Global.    #
#   - Supporting xHTML developed by Brendan Meachen.   #
#                                                      #
#  Version 1.06 (Fearless Flounder) - 25/05/2012       #
# ---------------------------------------------------- #

# ---------------------------------------------------- #
#  Slideshow Plugin for jQuery.                        #
#   - Developed by Tristan Brehaut for Yell Global.    #
# ---------------------------------------------------- #
*/
(function( $ ){
	
	$.fn.slideshow = function( options ){

		var	slideshowIntervalID,
			slideshowTimeoutIntervalID,
			carouselIntervalID;
		
		
		var settings = {
			target : this,
			slide : 'li',
			width : $(this).parent('.column').innerWidth(),
			height : parseInt($('li',this).height()),
			speed : 1800,
			interval : 5000,
			easing : 'swing',
			autoplay : true,
			timeout : 15000,
			transition : 'slide',
			direction : { x: 1, y: 0 },
			navigation: 'default'
		};

		if( options ){
			$.extend( settings, options );
		}
		
		var _el = settings.target;
		
		var methods = {
			initialise : function( settings ){

				_el.wrap( '<div class="slideshowWrapper"></div>' ).css( { width: settings.width, height: settings.height } );
				_el.wrapper = _el.parent( '.slideshowWrapper' );
				
				_el.wrapper.css({overflow: 'hidden'});
				
				_el.currentSlide = 0;
				_el.nextSlide = 1;
				_el.transition = false;
				
				_el.slides = $( settings.slide, _el );
				_el.slides.count = _el.slides.length-1;
				_el.slideTo = -1;
				
				_el.slides.each(
					function( index ){
						$(this).addClass('slide').attr( 'rel', index );
						switch( settings.transition ){
							case 'carousel':
								$(this).css({ width: settings.width, height: settings.height });
								break;
							default:
								startLeft = ( index > 0 && settings.transition == 'slide' ) ? settings.width : 0;
								startOpacity = ( index > 0 && settings.transition == 'fade' ) ? 0 : 1;
								$(this).css( { position: 'absolute', top: 0, left: startLeft, opacity: startOpacity, width: settings.width, height: settings.height } );
						}
					}
				);
				
				_el.after('<div class="slideshowNavigationWrapper"></div>');
				_el.navigationWrapper = _el.next('.slideshowNavigationWrapper');				
				_el.wrapper.css({ height: settings.height, width: settings.width });
				
				if( settings.transition == 'carousel' ) settings.navigation = 'carousel';
				
				switch( settings.navigation ){
					case 'thumbnail':
						_el.navigationWrapper.append('<ul class="carouselWrapper"></ul>');
						_el.carouselWrapper = _el.navigationWrapper.children('.carouselWrapper');
						_el.carouselWrapper.css({ position: 'absolute', left: 0, top: 0, width: 0, height: '64px' });
				
						_el.navigationWrapper.css({ position: 'absolute', left: 0, bottom: 0, width: settings.width-128, height: '64px', padding: '0 64px' });

						_el.navigationWrapper.append( '<div class="btnSlideshowPrev"></div><div class="btnSlideshowNext"></div>' );
						_el.navigation = { btnNext: _el.navigationWrapper.children( '.btnSlideshowNext' ), btnPrev: _el.navigationWrapper.children( '.btnSlideshowPrev' ) };
						
						_el.wrapper.css({height: settings.height+69});
						_el.slides.each( function( index ){
							var listItem = document.createElement('li');
							var thumb = document.createElement('img'),
								proportion = $(this).outerWidth() / $(this).outerHeight(),
								thumbHeight = 64,
								thumbWidth = Math.floor(thumbHeight * proportion);
					
							_el.carouselWrapper.css({width: '+=' + (thumbWidth + 5) });
							$(listItem).css({ 'float':'left', padding: '0 5px 0 0', cursor: 'pointer' });
							$(thumb).css({ height: thumbHeight, width: thumbWidth });
							$(thumb).attr( 'src', $(this).children('img').attr('src') ).attr( 'rel', index );
							
							$(thumb).click( function(){
								var slideTo = parseInt($(this).attr('rel'));
								if( _el.play ){
									methods.timeout();
								}
								if( !_el.transition && slideTo != _el.currentSlide  ){
									_el.direction = ( slideTo > _el.currentSlide ) ? { x: settings.direction.x, y: settings.direction.y } : { x: -settings.direction.x, y: -settings.direction.y };
									_el.slideTo = slideTo;
									methods.slide();
								}
							});
							$(listItem).html(thumb);
							_el.carouselWrapper.append(listItem);
						});
						
						_el.navigation.btnNext.hover( function(){
							carouselIntervalID = window.setInterval( function(){ methods.carousel(-3 * (settings.speed/1000)); }, 10 );
						}, function(){
							clearInterval( carouselIntervalID );
						});
						
						_el.navigation.btnPrev.hover( function(){
							carouselIntervalID = window.setInterval( function(){ methods.carousel(3 * (settings.speed/1000)); }, 10 );
						}, function(){
							clearInterval( carouselIntervalID );
						});
						
						break;
					case 'text':
					case 'icon':
						var currentFlag = false;
						_el.navigationWrapper.css({ position: 'absolute', left: 0, bottom: 0, width: settings.width-10, height: '16px', padding: '5px' });
						_el.slides.each( function(index){
							var link = document.createElement('a');
								link.innerHTML = (settings.navigation == 'text') ? (index+1) : '&nbsp;';
							$(link).css(
								{
									width: 16,
									height: 16,
									lineHeight: '16px',
									fontSize: '10px',
									textAlign: 'center',
									display: 'block',
									'float': 'left',
									textDecoration: 'none',
									cursor: 'pointer',
									margin: '0 5px 0 0',
									color: '#ffffff'
								}
							).attr('rel', index).attr('class', 'slideNavButton');
							if(!currentFlag){
								$(link).addClass('current');
								currentFlag = true;
							}
							$(link).click( function(){
								var slideTo = parseInt($(this).attr('rel'));
								if( _el.play ){
									methods.timeout();
								}
								if( !_el.transition && slideTo != _el.currentSlide  ){
									_el.direction = ( slideTo > _el.currentSlide ) ? { x: settings.direction.x, y: settings.direction.y } : { x: -settings.direction.x, y: -settings.direction.y };
									_el.slideTo = slideTo;
									methods.slide();
								}
							});
							_el.navigationWrapper.append(link);
						
						});
						_el.wrapper.hover(
							function(){
								_el.navigationWrapper.stop().animate({ opacity: 1 }, { queue: false, duration: 500 });
							},
							function(){
								_el.navigationWrapper.stop().animate({ opacity: 0 }, { queue: false, duration: 500 });
							}
						);
						break;
					
					case 'none':
						// no nav.
						break;
						
					case 'carousel':
						_el.addClass('carouselWrapper');
						_el.carouselWrapper = _el;
						_el.carouselWrapper.css({ position: 'absolute', left: 0, top: 0, width: 0, height: settings.height });
						_el.navigationWrapper.append( '<div class="btnSlideshowPrev"></div><div class="btnSlideshowNext"></div>' );
						_el.navigation = { btnNext: _el.navigationWrapper.children( '.btnSlideshowNext' ), btnPrev: _el.navigationWrapper.children( '.btnSlideshowPrev' ) };
						
						_el.slides.each( function(){
							_el.carouselWrapper.css({width: '+=' + $(this).width() });
						});
						
						_el.hover( function(){
							clearInterval( slideshowIntervalID );
						}, function(){
							methods.autoplay();
						});

						_el.navigation.btnNext.hover( function(){
							carouselIntervalID = window.setInterval( function(){ methods.carousel(-3 * (settings.speed/1000)); }, 10 );
						}, function(){
							clearInterval( carouselIntervalID );
						});
						
						_el.navigation.btnPrev.hover( function(){
							carouselIntervalID = window.setInterval( function(){ methods.carousel(3 * (settings.speed/1000)); }, 10 );
						}, function(){
							clearInterval( carouselIntervalID );
						});
						break;
					
					default:
						_el.navigationWrapper.append( '<div class="btnSlideshowPrev"></div><div class="btnSlideshowNext"></div>' );
						_el.navigation = { btnNext: _el.navigationWrapper.children( '.btnSlideshowNext' ), btnPrev: _el.navigationWrapper.children( '.btnSlideshowPrev' ) };
						_el.navigation.btnNext.click(
							function(){
								if( _el.play ){
									methods.timeout();
								}
								if( !_el.transition  ){
									_el.direction = { x: settings.direction.x, y: settings.direction.y };
									methods.slide();
								}
							}
						);
						_el.navigation.btnPrev.click(
							function(){
								if( _el.play ){
									methods.timeout();
								}
								if( !_el.transition ){
									_el.direction = { x: -settings.direction.x, y: -settings.direction.y };
									methods.slide();
								}
							}
						);
						_el.wrapper.hover(
							function(){
								_el.navigationWrapper.stop().animate({ opacity: 1 }, { queue: false, duration: 500 });
							},
							function(){
								_el.navigationWrapper.stop().animate({ opacity: 0 }, { queue: false, duration: 500 });
							}
						);
					}
				
				if( settings.autoplay ){
					methods.autoplay();
				}

			},
			
			slide : function(){
				_el.transition = true;
				
				if( _el.slideTo > -1 ){
					_el.nextSlide = _el.slideTo;
				} else {
					if( _el.direction.x > 0 || _el.direction.y > 0 ) {
						_el.nextSlide = ( _el.currentSlide == _el.slides.count ) ? 0 : _el.currentSlide + 1;
					} else {
						_el.nextSlide = ( _el.currentSlide == 0 ) ? _el.slides.count : _el.currentSlide - 1;
					}
				}
				
				switch( settings.navigation ){
					case 'icon':
					case 'text':
						$('.slideshowWrapper a[rel="'+_el.nextSlide+'"]').addClass('current');
						$('.slideshowWrapper a[rel="'+_el.currentSlide+'"]').removeClass('current');
						break;
					default:
				}
				
				switch( settings.transition ){
					case 'fade':
						$( _el.slides[_el.nextSlide] )
							.stop()
							.animate(
								{
									opacity: 1
								},
								{
									queue: false,
									duration: settings.speed,
									complete: methods.transitionComplete,
									easing: settings.easing
								}							
							);
						
						$( _el.slides[_el.currentSlide] )
							.stop()
							.animate(
								{
									opacity: 0
								},
								{
									queue: false,
									duration: settings.speed,
									complete: methods.transitionComplete,
									easing: settings.easing
								}
							);
						break;
					default:
						var left = settings.width * _el.direction.x;
						var top = settings.height * _el.direction.y;
						
						$( _el.slides[_el.currentSlide] ).animate(
							{
								left: -left,
								top: -top
							},
							{
								queue: false,
								duration: settings.speed,
								easing: settings.easing
							}
						);

						$( _el.slides[_el.nextSlide] ).css(
							{
								left: left,
								top: top
							}
						).animate(
							{
								left: 0,
								top: 0
							},
							{
								queue: false,
								duration: settings.speed,
								complete: methods.transitionComplete,
								easing: settings.easing
							}
						);
						break;
				}

				_el.currentSlide = _el.nextSlide;
				_el.slideTo = -1;
			},

			transitionComplete : function(){
				_el.transition = false;
			},
			
			autoplay : function(){
				_el.play = true;
				_el.direction = { x: settings.direction.x, y: settings.direction.y };
				switch( settings.transition ){
					case 'carousel':
						slideshowIntervalID = setInterval( function(){ methods.carousel(-1 * (settings.speed/1000)); }, 10 );
						break;
					default:				
						slideshowIntervalID = setInterval( methods.slide, settings.interval );
				}
			},
			
			timeout : function(){
				clearInterval( slideshowIntervalID );
				_el.play = false;
				if( settings.autoplay ){
					clearInterval( slideshowTimeoutIntervalID );
					slideshowTimeoutIntervalID = setTimeout( methods.autoplay, settings.timeout );
				}
			},
			
			carousel : function(delta){
				var left = parseInt(_el.carouselWrapper.css('left')),
					firstImage = _el.carouselWrapper.children('li')[0],
					lastImage = _el.carouselWrapper.children('li')[_el.carouselWrapper.children('li').length-1];
					if( Math.abs(left) > $(firstImage).width() ){
						$(firstImage).insertAfter(lastImage);
						left = 0;
					} else if( left > 0 ){
						$(lastImage).insertBefore(firstImage);
						left = -($(lastImage).width())+1;
					}
					left += delta;
					_el.carouselWrapper.css({ left: left });
			}
		};
		
		methods.initialise( settings );
		
		return this;
	};
})( jQuery );

/*
# ---------------------------------------------------- #
#  Lightbox Plugin for jQuery.                         #
#   - Developed by Tristan Brehaut for Yell Global.    #
# ---------------------------------------------------- #
*/
(function( $ ){

	$.fn.lightbox = function( options ){
		
		var	dimTheLightsHTML = '<div id="dimTheLights"></div>',
			lightBoxHTML = '<div id="lightBox"><div id="lightBoxIMGWrap"></div><div id="lightBoxLoading"></div><div id="lightBoxCaption"></div><div id="lightBoxBtnClose"></div><div id="lightBoxBackward"></div><div id="lightBoxForward"></div></div>';
		
		var settings = {
			target : this,
			imgwrap : 'a',
			captiontarget : 'p.caption',
			padding : 16
		};
		
		if( options ) {
			$.extend( settings, options );
		}
		
		var methods = {
			initialise : function( settings ){
				
				$('body').append( dimTheLightsHTML, lightBoxHTML );
				
				var _el = settings.target;

				_el.current = 0;
				_el.visible = false;
				_el.array = [];
				_el.images = $(settings.imgwrap, _el);
				_el.count = _el.images.length;
				_el.navigation = { btnNext: $('#lightBoxForward'), btnPrev: $('#lightBoxBackward'), btnClose: $('#lightBoxBtnClose') };
				
				_el.images.each(
					function( index ){
						var caption = $(this).children( settings.captiontarget ).html() || '';
						_el.array[index] = [$(this).prop('href'), caption];
						$(this).attr( 'rel', index );
					}
				).click(
					function(){
						$('#dimTheLights').css( { height: $(document).height(), width: $(window).width(), opacity: '0.8' } );
						$('#lightBox').css( { width: 200, height: 200 } ).center();
						_el.current = parseInt( $(this).prop( 'rel' ) );
						methods.loadImage( _el );
						return false;
					}
				);

				_el.navigation.btnNext.click(
					function(){
						_el.current += 1;
						if( _el.current > _el.count-1 ){
							_el.current = 0;
						}
						methods.loadImage( _el );
					}
				);
				
				_el.navigation.btnPrev.click(
					function(){
						_el.current -= 1;
						if( _el.current < 0 ){
							_el.current = _el.count-1;
						}
						methods.loadImage( _el );
					}
				);
				
				$('#dimTheLights, #lightBoxBtnClose').click(
					function(){
						$('#dimTheLights, #lightBox, #lightBoxLoading').fadeOut( 'fast' );
						_el.visible = false;
						return false;
					}
				);
				
				$('#lightBox').click(
					function(){
						return false;
					}
				).bind(
					'contextmenu',
					function(){
						$('#dimTheLights, #lightBox, #lightBoxLoading').fadeOut( 'fast' );
						return false;
					}
				);
				
				$(window).bind(
					'scroll resize',
					function(){
						if( _el.visible ){
							$('#dimTheLights').css( { height: $(document).height(), width: $(window).width() } );
							$('#lightBox').center();
						}
					}
				).bind(
					'keyup',
					function(e){
						if( _el.visible ){
							var key = e.keyCode;
							switch( key ){
								case 37: _el.navigation.btnPrev.trigger('click'); break;
								case 39: _el.navigation.btnNext.trigger('click'); break;
								case 27: _el.navigation.btnClose.trigger('click'); break;
								default: break;
							}
						}
					}
				);			
			},
			
			loadImage : function( _el ){
			
				$('#dimTheLights, #lightBox').fadeIn( 'slow' );
				$('#lightBoxLoading').css( { display: 'block' } );
				$('#lightBoxIMGWrap').html( '<img src=' + _el.array[_el.current][0] + ' id="lightBoxIMG" />');
				$('#lightBoxCaption').html( _el.array[_el.current][1] );
				$('#lightBoxIMG, #lightBoxCaption, #lightBoxBtnClose').css( { display: 'none' } );

				_el.visible = true;
				
				$('#lightBoxIMG').load(
					function(){

						var imgWidth = $(this).width();
						var imgHeight = $(this).height();
					
						$('#lightBoxLoading').css( { display: 'none' } );
												
						if( imgWidth === 0 ) {
							methods.loadImage( _el.current );
						}
						
						$('#lightBoxCaption').css( { width: imgWidth } );
						var captionHeight = $('#lightBoxCaption').height();
						
						if( captionHeight >= 1 ) { 
							captionHeight = captionHeight + ( settings.padding * 2 );
						} else {
							captionHeight = settings.padding;
						}
						
						if( _el.count <= 1 ){
							$('#lightBoxBackward, #lightBoxForward').css( { display: 'none' } );
						} else {
							$('#lightBoxBackward, #lightBoxForward').css( { height: imgHeight } );
						}
						
						var lbTop = (($(window).height() - ( imgHeight + captionHeight )) / 2) + $(window).scrollTop() - 10;
						var lbLeft = ($(window).width() - imgWidth) / 2;

						$('#lightBox').animate( {
								top: lbTop,
								left: lbLeft,
								width: imgWidth,
								height: imgHeight + captionHeight
							}, {
								queue: false,
								duration: 'fast',
								complete: function(){
									$('#lightBoxIMG, #lightBoxCaption, #lightBoxBtnClose').fadeIn( 'fast' );
									_el.visible = true;
								}
							}
						);
					}
				);
			}
		};
		
		methods.initialise( settings );
	
		return this;
	};
})( jQuery );

/*
# ---------------------------------------------------- #
#  Video Lightbox Plugin for jQuery.                   #
#   - Developed by Tristan Brehaut for Yell Global.    #
# ---------------------------------------------------- #
*/
(function( $ ){

	$.fn.videoLightbox = function( options ){
		
		var	dimTheLightsHTML = '<div id="dimTheLights"></div>',
			lightBoxHTML = '<div id="lightBox"><div id="lightBoxIMGWrap"></div><div id="lightBoxLoading"></div><div id="lightBoxCaption"></div><div id="lightBoxBtnClose"></div><div id="lightBoxBackward"></div><div id="lightBoxForward"></div></div>';
		
		var settings = {
			target : this,
			imgwrap : 'a',
			captiontarget : 'p.caption',
			padding : 16
		};
		
		if( options ) {
			$.extend( settings, options );
		}
		
		var methods = {
			initialise : function( settings ){
				
				$('body').append( dimTheLightsHTML, lightBoxHTML );
				
				var _el = settings.target;

				_el.current = 0;
				_el.visible = false;
				_el.array = [];
				_el.images = $(settings.imgwrap, _el);
				_el.count = _el.images.length;
				_el.navigation = { btnNext: $('#lightBoxForward'), btnPrev: $('#lightBoxBackward'), btnClose: $('#lightBoxBtnClose') };
				
				_el.images.each(
					function( index ){
						var caption = $(this).children( settings.captiontarget ).html() || '';
						_el.array[index] = [$(this).prop('href'), caption];
						$(this).attr( 'rel', index );
					}
				).click(
					function(){
						$('#dimTheLights').css( { height: $(document).height(), width: $(window).width(), opacity: '0.8' } );
						$('#lightBox').css( { width: 200, height: 200 } ).center();
						_el.current = parseInt( $(this).prop( 'rel' ) );
						methods.loadImage( _el );
						return false;
					}
				);

				_el.navigation.btnNext.click(
					function(){
						_el.current += 1;
						if( _el.current > _el.count-1 ){
							_el.current = 0;
						}
						methods.loadImage( _el );
					}
				);
				
				_el.navigation.btnPrev.click(
					function(){
						_el.current -= 1;
						if( _el.current < 0 ){
							_el.current = _el.count-1;
						}
						methods.loadImage( _el );
					}
				);
				
				$('#dimTheLights, #lightBoxBtnClose').click(
					function(){
						$('#dimTheLights, #lightBox, #lightBoxLoading').fadeOut( 'fast' );
						$('#lightBoxIMGWrap').html('');
						_el.visible = false;
						return false;
					}
				);
				
				$('#lightBox').click(
					function(){
						//return false;
					}
				).bind(
					'contextmenu',
					function(){
						$('#dimTheLights, #lightBox, #lightBoxLoading').fadeOut( 'fast' );
						return false;
					}
				);
				
				$(window).bind(
					'scroll resize',
					function(){
						if( _el.visible ){
							$('#dimTheLights').css( { height: $(document).height(), width: $(window).width() } );
							$('#lightBox').center();
						}
					}
				).bind(
					'keyup',
					function(e){
						if( _el.visible ){
							var key = e.keyCode;
							switch( key ){
								case 37: _el.navigation.btnPrev.trigger('click'); break;
								case 39: _el.navigation.btnNext.trigger('click'); break;
								case 27: _el.navigation.btnClose.trigger('click'); break;
								default: break;
							}
						}
					}
				);			
			},
			
			loadImage : function( _el ){
				var loadtarget = '#lightBoxIMGWrap';
				
				$('#dimTheLights, #lightBox').fadeIn( 'slow' );
				
				$('#lightBoxLoading').css( { display: 'block' } );
				$('#lightBoxCaption').html( _el.array[_el.current][1] );
				$('#lightBoxCaption, #lightBoxBtnClose, #lightBoxImgWrap, #lightBoxIMG').css( { display: 'none' } );
				
				_el.visible = true;
				
				$(loadtarget).load( _el.array[_el.current][0],
					function(response, status, XHR){
							
						if( XHR.status != 200 ){
							$(this).html('<p>Failed to load resource.<br/>Error code: ' + XHR.status + '</p>');
							return false;
						}
						
						var imgWidth = 0,
							imgHeight = 0,
							navTop = 0;
						
						var captionHeight = $('#lightBoxCaption').height();
						if( captionHeight >= 1 ) { 
							captionHeight = captionHeight + ( settings.padding * 2 );
						} else {
							captionHeight = settings.padding;
						}
						
						if( _el.array[_el.current][0].match(/uximage/gi) ){
							imgWidth = parseInt($(this).find('img').width());
							imgHeight = parseInt($(this).find('img').height());
							navTop = captionHeight+(settings.padding/2);
						} else if( _el.array[_el.current][0].match(/uxembed/gi) ){
							imgWidth = parseInt($(this).find('iframe').attr('width')) || parseInt($(this).find('video').attr('width')) || parseInt($(this).find('embed').attr('width')) || parseInt($(this).find('object').attr('width'));
							imgHeight = parseInt($(this).find('iframe').attr('height')) || parseInt($(this).find('video').attr('height')) || parseInt($(this).find('embed').attr('height')) || parseInt($(this).find('object').attr('height'));
							imgHeight += settings.padding/2;
							navTop = (imgHeight + settings.padding + captionHeight)-32;
							
						} else {
							imgWidth = 600;
							//imgHeight = (parseInt($(this).outerHeight()) && parseInt($(this).find('img').outerHeight(true)))+(settings.padding/2);
							//imgHeight = 400;
							imgHeight = parseInt($(this).outerHeight(true));
							navTop = imgHeight + (settings.padding*2);
						}
						
						$('#lightBoxLoading').css( { display: 'none' } );
												
						if( imgWidth === 0 ) {
							methods.loadImage( _el );
						}
						
						if( _el.count <= 1 ){
							$('#lightBoxBackward, #lightBoxForward').css( { display: 'none' } );
						} else {
							$('#lightBoxBackward, #lightBoxForward').css( { height: '32px', top: navTop, display: 'block' } );
						}
						
						var lbTop = (($(window).height() - ( imgHeight + captionHeight )) / 2) + $(window).scrollTop() - 10;
						var lbLeft = ($(window).width() - imgWidth) / 2;
						
						$('#lightBoxCaption').css( { width: imgWidth } );
						$('#lightBox').animate( {
								top: lbTop,
								left: lbLeft,
								width: imgWidth,
								height: imgHeight + captionHeight
							}, {
								queue: false,
								duration: 'fast',
								complete: function(){
									$('#lightBoxIMGWrap, #lightBoxCaption, #lightBoxBtnClose').fadeIn( 'fast' );
									_el.visible = true;
								}
							}
						);
					}
				);
			}
		};
		
		methods.initialise( settings );
	
		return this;
	};
})( jQuery );


/*
# ---------------------------------------------------- #
#  Gallery Captions Plugin for jQuery.                 #
#   - Developed by Tristan Brehaut for Yell Global.    #
# ---------------------------------------------------- #
*/
(function( $ ){
	
	$.fn.captions = function( options ){
	
		var settings = {
			transition : 'default',
			speed : 1000,
			easing : 'linear'
		};
		
		if( options ) {
			$.extend( settings, options );
		}
	
		if(settings.transition === 'default' ){
			return this;
		}
		
		$('.contentlist.gallery p.caption').css({top:'inherit'});
		this.each(function(){
			var _el = $(this);
			_el.find('a').css({ position: 'relative', 'float':'left' });
			_el.find('.caption').css({position: 'absolute', bottom: '0', left: '0', display: 'none'});
			_el.hover(function(){
				switch(settings.transition){
					case 'slide': _el.find('.caption').slideDown(settings.speed, settings.easing); break;
					case 'fade': _el.find('.caption').fadeIn(settings.speed, settings.easing); break;
					default:
				}
			}, function(){
				switch(settings.transition){
					case 'slide': _el.find('.caption').slideUp(settings.speed, settings.easing); break;
					case 'fade' : _el.find('.caption').fadeOut(settings.speed, settings.easing); break;
					default:
				}
			});
		});
		return this;
	};

})( jQuery );


/*
# ---------------------------------------------------- #
#  Center Plugin for jQuery.                           #
#   - Developed by Tristan Brehaut for Yell Global.    #
# ---------------------------------------------------- #
*/
(function ($) {
	$.fn.center = function () {
		this.css({
			position: 'absolute',
			top: (($(window).height() - this.height()) / 2) + $(window).scrollTop()-10,
			left: (($(window).width() - this.width()) / 2)
		});
		return this;
	};
})( jQuery );
