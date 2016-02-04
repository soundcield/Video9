/*******************************
 * Calendario para las actividades que se mueve horizontal hacia derecha e izquierda con unas flechas
 * Queremos mostrar 3 semanas en pantalla y cada semana son 182pixels .. calculando que cada td esta a 26pixels, si se cambia el ancho del td ..
 * se tendra que cambiar los valores para el calculo de los limites.
 * ********************************/
HttpCom.extensions.calendarSlider = function(scope){
	var $table = $("#calendar-table");
    var $allEvents = $table.find("td div.event");
	var width = $table.width();
	
    $(".activity-calendar .right-weeks-arrow", scope).bind("click", function(){
        var marginLeft = parseInt($table.css("margin-left"));
        var rightLimit = Math.abs(marginLeft) + 546; //182*3  , 182px es una semana
        //calculamos cuantos pixeles faltan para rellenar hasta el final si no supera los 182
        if ((rightLimit + 182) > width) {
            var pixelsToMove = -(width - (rightLimit + 182));
        }
        else 
            var pixelsToMove = -182;
        
        //Revisamos si llegamos al limite
        if (rightLimit < width) {
            var toMove = marginLeft + pixelsToMove;
            $table.css("margin-left", toMove);
            copyLabelToForm($table, toMove);
        }
		setMonthPosition();
    });
    
    
    $(".activity-calendar .left-weeks-arrow", scope).bind("click", function(){
        var marginLeft = parseInt($table.css("margin-left"));
        var leftMargin = marginLeft;
        var pixelsToMove = 182;
        //Revisamos si para llegar al limite faltan menos de 182px ,si es asi entonces utilizamos el valor de marginLeft
        if ((leftMargin + 182) > 0) {
            pixelsToMove = Math.abs(marginLeft);
        }
        if (marginLeft < 0) {
            var toMove = marginLeft + pixelsToMove;
            $table.css("margin-left", toMove);
            copyLabelToForm($table, toMove);
        }
		setMonthPosition();
    });
	
	function setMonthPosition() {
		var $td = $table.find('tr:first td:first'),
			nTdW = $td.width() + (parseInt($td.css('border-right-width'), 10) || 0) +(parseInt($td.css('border-left-width'), 10) || 0),
			nMargin = Math.abs(parseInt($table.css('margin-left'), 10) || 0),
			$activeMonthRd;
		// reseteamos todos los month-wrapper
		$table.find('div.month-wrapper').css('left', 0); 
		// redefinimos $td para llegar a la primera celda activa
		$td = $table.find('tr:first td').eq(nMargin / nTdW);
		if ($td.next().find('div.month-wrapper').length === 0 && $td.next().next().find('div.month-wrapper').length === 0) {
			$activeMonthTd = $td.prevAll(':has(div.month-wrapper):first');
			$activeMonthTd.find('div.month-wrapper').css('left', nMargin - $activeMonthTd.index() * nTdW + 'px')
		}
	}
    
    //Vamos por todos los td que estan actualmente en pantalla , obtenemos sus eventos y los copiamos al formulario. 
    function copyLabelToForm(tableScope, toMove){
    
        var $fieldset = $("#inscription-form fieldset");
        // marcamos todos para ocultar
		$fieldset.find('label').filter(function() {
			return !$(':checked', this).length;
		}).addClass('auschwitz'); // Quitamos todos los label cuyos radios no esten marcados
        var tdFirstIndex = (Math.abs(toMove) / 26);
        var tdLastIndex = tdFirstIndex + 20;
        var eventLength = $allEvents.length;
		var oIds = {};
		var $span;
		var nMax = 0;
        for (var a = 0; a <= eventLength; a++) {
            var index = $allEvents.eq(a).parent().index();
            if (index >= tdFirstIndex && index <= tdLastIndex) {
				var $label = $allEvents.eq(a).find('label'),
					sClass = $label.attr('className');
                if (!oIds[sClass]) {
					oIds[sClass] = true;
				}
            }
        }
		for (a in oIds) {
			// comprobamos si ya existe
			if (!$fieldset.find('label.n' + a).show().removeClass('auschwitz').length) {
			var s = '';
			$table.find('label.' + a).each(function (nIndex) {
				if (nIndex) {
					s = s.replace(/<span.+<\/span>/gi, '<br />').replace(/<input+[^>]+>/gi, '');
				};
				s+=this.innerHTML;
			});
			s = s.replace(/<span/gi, '</span><span');
				s = $('<label class="n'+a+'"><span>'+ s +'</label>');
			$fieldset.append(s);
		}
		}
		$fieldset.find('label.auschwitz').hide();
		
		$span = $fieldset.find('span + span');
		$span.each(function (index, item) {
			nMax = Math.max($(item).width(), nMax);
		});
		$span.width(nMax);
    }
    
    //Al pasar el mouse por un evento en el calendario ,queremos que el evento en el formulario se pueda destacar
    //le aplicamos la clase highlight al label para destacarlo.  Tambien tiene un evento click para marcar/desmarcar
    // el input radio de ese evento en el formulario.
    var labelId, labelClass;
    $('#calendar-table div.event').bind('mouseover', function(){
        $t = $(this);
        
        $label = $t.find('label');
        if ($label.length) {
            labelClass = $label.attr('class');
			
        	$('#calendar-table label.' + labelClass).parent().addClass("highlight");
            
			var $selectedLabel = $("#inscription-form label." + labelClass);
            $selectedLabel.addClass('highlight');
            $t.bind("click", function(){
                $radio = $selectedLabel.find("input[type=radio]");
                if ($radio.attr("checked") === false && !$radio.attr('disabled')) {
                    $radio.attr("checked", "checked");
                }
                else 
                    $radio.attr("checked", false);
            });
            
        }
    }).mouseleave(function(){
        $(this).unbind('click');
        $('#calendar-table label.' + labelClass).parent().removeClass("highlight");
        $("label." + labelClass).removeClass('highlight');
        
    });
    
    var divEvent;
    $("#inscription-form label").live('mouseover', function(){
    
        $t = $(this);
        labelClass = $t.attr("class");
        $t.addClass("highlight");
        if (labelClass) {
            $label = $('#calendar-table label.' + labelClass);
            if ($label) {
                divEvent = $label.parent();
                divEvent.addClass("highlight");
            }
        }
        
    }).live('mouseleave', function(){
        $(this).removeClass("highlight");
        $('#calendar-table div.event > div').removeClass("highlight");
    });
    
    
    
    //LLamamos a esta funcion la primera vez cuando carga la pagina.
    copyLabelToForm($("#calendar-table"), 0);
    
};