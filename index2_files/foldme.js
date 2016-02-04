/*
 * Create unfoldable elemenents with a control.
 * The state of the element is stored inside a cookie so that the element stays as it is meant to be.
 * To use this feature you need pairs of .showPanel and .panel elements:
 * The .showPanel element will toggle the visibilty of the .panel element with the same index.
 * 
 * This script depends heavily on jQuery and global.js
 */
(function ($) {
    var estadoPaneles;
    try {
        estadoPaneles = eval(getCookie('estadoPaneles'));
    } catch(e) {}
    estadoPaneles = estadoPaneles || {};
    /*
	 * This extension controls de visibility of panels when they are loaded.
	 * Check each panel inside the scope to see if the ID of the panel is
	 * present in the cookie then it will handle the classes for that panel and
	 * its control. Otherwise the classes stay as they came in the HTML.
	 * This extension is defined inside the $(function () {...}) 'coz it makes
	 * use of estadoPaneles as a closure and should NOT be accesible from outside.
	 */
    HttpCom.extensions.initPanels = function (scope) {
		
        var $i = $('._showPanel-button', scope),
			$a = $('.showPanel', scope),
            $p = $('.panel', scope);
        $p.each(function(index) {
            var sAccion = false,
                $thisI = $i.eq(index),
                $thisA = $a.eq(index),
                $thisP = $p.eq(index),
                clasesOK = $thisI.filter('.active').length === $thisA.filter('.active').length === $thisP.filter('.shown').length;
            // comprobamos la cookie para ver si hay que hacer alguna accion
            if (estadoPaneles[this.id] === 0 || !clasesOK) {
                sAccion = 'removeClass';
            } else if (estadoPaneles[this.id] === 1) {
                sAccion = 'addClass';
            }
            if (sAccion) {
                $thisI[sAccion]('active');
                $thisA[sAccion]('active');
                $thisP[sAccion]('shown');
            }
            // chivato para desarrollo en caso de error
            if (!clasesOK) {
                try {
                    console.log('Error de emparejamiento de clases entre:');
                    console.log($thisI.get(0));
                    console.log($thisA.get(0));
                    console.log($thisP.get(0));
                } catch(e) {}
            }
        });
		
		$("#defaultTarget").click();
		
    }
    // evento de mostrar/ocultar
	// TODO: plantear si .showPanel va a ser solamente elementos <a>, de tal modo que podamos usar document.getElementsByTagName en lugar de tener que andar por todo el arbol en cada peticion $('.showPanel')
	$('._showPanel-button').live('click', function() {
		var $i = $('._showPanel-button'),
			index = $i.index(this);
			$a = $('.showPanel').eq(index);
		$a.click();
		return false;
	});
	$('.showPanel').live('click', function() {
        var $a = $('.showPanel'),
            index = $a.index(this),
            $i = $('._showPanel-button').eq(index),
            $p = $('.panel').eq(index),
            nToBeShown = $p.hasClass('shown') ? 0 : 1;
        $a = $a.eq(index).toggleClass('active');
        $i = $('._showPanel-button').eq(index).toggleClass('active');
        $p.css('height','').slideToggle(400, function() {
            var $t = $(this);
            $t.toggleClass('shown').css({display:'', height:$.browser.msie ? '1%':''}); // height:1% para corregir bug IE
            if (this.id) {
                estadoPaneles[this.id] = nToBeShown;
            }
        }).trigger(nToBeShown === 0 ? 'collapse' : 'expand');
        return false;
    });
    
    // preparacion del CSS (se debe ejecutar solamente una vez y por eso no esta
	// en HttpCom.extensions)
    addCSSRule('html body .shown').style.display = 'block';
    addCSSRule('body .panel').style.display = 'none';
	
    // almacenar cookie
    $(window).unload(function() {
        var aTemp = [], i;
        for (i in estadoPaneles) {
            aTemp.push('"'+i+'":'+estadoPaneles[i]);
        }
        setCookie('estadoPaneles', '({' +aTemp.join(',')+ '})', 7);
    });
})(jQuery);

/*
 * control panel events so that only one of the same family remains shown
 */
HttpCom.extensions.autoClosePanels = function (scope) {
	var sElements ='div',
		sControlClass = '.auto-close-related';
	// llegamos a todos los paneles del interior de cada uno de los elementos posibles con .auto-close-panels
	$(sElements, scope).filter(sControlClass).find('.panel').each(function () {
		var $t = $(this), $e = $t;
		// comprobamos que el panel al que le queremos asignar el evento es un panel de primer nivel
		// y no uno anidado en el interior de otro:
		do {
			$e = $e.parent();
			if ($e.is('.panel')) {
				return;
			} else {
			}
		}
		while (!$e.is(sElements) && !$e.is(sControlClass));
		// finalmente asignamos el evento
		$t.bind('expand', function () {
			// vamos hasta el primero elemento que esta justo por debajo de la clase sControlClass...
			$(this).parents(function () {
				return $(this).parent().is(sControlClass);
			}).eq(0)
			// ... seleccionamos sus "hermanos" y buscamos en ellos los .showPanel que esten activos para llamar a sus eventos "click"
			.siblings().find('.showPanel.active').click();
		});
	});
}