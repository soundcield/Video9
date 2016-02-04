HttpCom.extensions.homeSlider = function (scope) {
	var $ul = $('#home-slider ul', scope),
		nUlWidth = $ul.width(),
		$li = $ul.children(),
		nLiLength = $li.length,
		nLiMaxWidth,
		nDeltaFactor = .11,
		nDeltaWidth,
		$activeLi = $li.filter('.active'),
		i, l;
		
	// Check elements or stop 
	if ($ul.length === 0 || nLiLength === 0) {
		return;
	}
	
	// Prepare DOM
	// define the max dimensions variable
	oLiMaxDim = {
		width: $li.width(),
		height: $li.height(),
		paddingTop: parseFloat($li.css('paddingTop'), 10),
		paddingRight: parseFloat($li.css('paddingRight'), 10),
		paddingBottom: parseFloat($li.css('paddingBottom'), 10),
		paddingLeft: parseFloat($li.css('paddingLeft'), 10)
	}
	nLiMaxWidth = oLiMaxDim.width + oLiMaxDim.paddingLeft + oLiMaxDim.paddingRight;
	nDeltaWidth = nLiMaxWidth * nDeltaFactor
	
	// Check that one and only one element is active
	if ($activeLi.length !== 1) {
		$activeLi = $li.removeClass('active').eq(0).addClass('active');
	}
	
	// set position of all elements
	$li.each(function (nIndex) {
		var oCss = calculateStyles(nIndex);
		$(this).css(oCss);
	});

	// change event
	$li.bind('mousemove', function liMousemove(ev) {
		var $target = $(ev.target),
			$closest = $target.closest('li'),
			nHalfWidth = $closest.width() / 2,
			$toShow,
			posx,
			deltax;
		
		// si el evento pasa en un li cancelamos	
		if ($target.is('li')) {
			return;
		}
		// si pasa en un a cuyo padre no esta activo lo seleccionamos como el bueno
		else if ($target.is('a') && !$closest.is('active')) {
			$toShow = $target.closest('li');
		}
		// si no, tenemos que hacer unos calculos
		else {
			// calculamos posicion del raton
			if (ev.pageX) 	{
				posx = ev.pageX;
			}
			else if (ev.clientX) 	{
				posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			}
			
			// comparamos con la posicion del centro del li mas cercano para ver si
			// esta mas alla del limite del circulo
			deltax = posx - $closest.offset().left - $closest.find('img').width() / 2;
			if (deltax > nHalfWidth) {
				$toShow = $closest.next();
			}
			else if (deltax < -nHalfWidth){
				$toShow = $closest.prev();
			}
			else {
				return;
			}
		}
		
		if ($toShow.length && !$toShow.is('.active')) {
			// anyadimos clases y gestionamos
			$toShow.addClass('active').siblings().removeClass('active');
			$li.unbind('mousemove').each(function (nIndex) {
				var oCss = calculateStyles(nIndex);
				$(this).stop().animate(oCss, 400, function () {
					$(this).bind('mousemove', liMousemove);
				});
			});
		}
	});
	
	function calculateStyles(nIndex){
		var $t = $(this),
			nActiveIndex = $li.filter('.active').index(),
			nPositionFactor = nIndex/(nLiLength - 1) || 0,
			nDeltaSteps = nIndex - nActiveIndex,
			nStepsAway = Math.abs(nDeltaSteps),
			nResizeFactor = 1 - nStepsAway * nDeltaFactor,
			oCss = {};
		/* Factores de la posicion horizontal:
		 * 
		 * anchura disponible: nUlWidth - nLiMaxWidth
		 * redimension del elemento: nDeltaWidth * nStepsAway
		 * ajuste para alejar de la bola mas grande: nMoveAway
		 */
		if (nDeltaSteps !== 0 && nIndex !== 0 && nIndex !== nLiLength - 1) {
			nMoveAway = nDeltaSteps/Math.pow(nStepsAway, 1.5) * nLiMaxWidth/5;
		}
		else {
			nMoveAway = 0;
		}
		oCss = {
			fontSize:[10*nResizeFactor, 'px'].join(''),
			top: [nDeltaFactor * nStepsAway * 100, 'px'].join(''),
			left: [(nUlWidth - nLiMaxWidth + nDeltaWidth * nStepsAway ) * nPositionFactor + nMoveAway, 'px'].join(''),
			zIndex: 10 - nStepsAway
		};
		if (!$.browser.msie) {
			oCss.opacity = Math.pow(nResizeFactor, 2);
		}
		return(oCss);
	}
};