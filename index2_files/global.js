/*jslint browser: true, devel: true, evil: true, forin: true */
/*
 * -------------------------------------------------------------- utilizacion de cookies
*/
function getCookie   (name) {var start=document.cookie.indexOf(name+"=");var len=start+name.length+1;if((!start)&&(name!=document.cookie.substring(0,name.length))){return null}if(start==-1){return null}var end=document.cookie.indexOf(';',len);if(end==-1){end=document.cookie.length}return unescape(document.cookie.substring(len,end))}
function setCookie   (name,value,expires,path,domain,secure) {var today=new Date();today.setTime(today.getTime());if(expires){expires=expires*1000*60*60*24}var expires_date=new Date(today.getTime()+(expires));document.cookie=name+'='+escape(value)+((expires)?';expires='+expires_date.toGMTString():'')+((path)?';path='+path:'')+((domain)?';domain='+domain:'')+((secure)?';secure':'')}
function deleteCookie(name,path,domain) {if(getCookie(name)){document.cookie=name+'='+((path)?';path='+path:'')+((domain)?';domain='+domain:'')+';expires=Thu, 01-Jan-1970 00:00:01 GMT'}}

/*
 * -------------------------------------------------------------- Manipulacion de hojas de estilo
*/
function getCSSRule(ruleName,deleteFlag){ruleName=ruleName.toLowerCase();if(document.styleSheets){for(var i=0;i<document.styleSheets.length;i++){var styleSheet=document.styleSheets[i];var ii=0;var cssRule=false;do{if(styleSheet.cssRules){cssRule=styleSheet.cssRules[ii]}else{cssRule=styleSheet.rules[ii]}if(cssRule&&cssRule.selectorText){if(cssRule.selectorText.toLowerCase()==ruleName){if(deleteFlag=='delete'){if(styleSheet.cssRules){styleSheet.deleteRule(ii)}else{styleSheet.removeRule(ii)}return true}else{return cssRule}}}ii++}while(cssRule)}}return false}
function killCSSRule(ruleName) {return getCSSRule(ruleName,'delete')}
function addCSSRule (ruleName) {if(document.styleSheets){if(!getCSSRule(ruleName)){if(document.styleSheets[0].addRule){document.styleSheets[0].addRule(ruleName,null,0)}else{document.styleSheets[0].insertRule(ruleName+' { }',0)}}}return getCSSRule(ruleName)}

/*
 * Management of extensions and events.
 * 
 * If an element needs to be formatted or has an event attached on its creation
 * we use an HttpCom.extensions function in order to execute it.
 * 
 * In a similar way, if a function creates new DOM elements, they have to be extended
 * through the HttpCom.extend().
 */
var HttpCom = {};
HttpCom.extensions = {};
HttpCom.extend = function (scope) {
	var actualScope = scope || document,i;
	for (i in this.extensions) {
		this.extensions[i](actualScope);
	} 
}

/*
 * Usage of HttpCom.extensions:
 * We use the extensions to add some clases to list-like elements.
 */
HttpCom.extensions.addListClasses = function (scope) {
	var $el = $('li, tr', scope);
	$el.filter(':first-child').addClass('first');
	$el.filter(':last-child').addClass('last');
	$el.filter(':nth-child(2n+1)').addClass('odd').next().addClass('even');
};

HttpCom.extensions.handleSearchLabel = function (scope) {
	$('#header-search input[type=text]', scope).bind('focus', function () {
		$(this).siblings().hide();
	})
	.bind('blur', function () {
		var $t = $(this);
		if (!$t.val()) {
			$t.siblings().show();
		}
	});
}

/*
 * Extension to adjust the #nav and .tabs children elements' width 
 */
HttpCom.extensions.setNavElementsWidth = function (scope) {
	var $ul = $('#nav, ul.tabs', scope);
	$ul.each(function () {
		var $li = $(this).find('li'),
			nLiIndex,
	        nCurrWidth = 0,
	        nMaxWidth = $li.eq(0).parent().width() || 0;
		$li.each(function (index) {
			var $t = $li.eq(index);
	        nCurrWidth += (
	            parseInt($t.css('marginLeft'), 10) +
				parseInt($t.css('paddingLeft'), 10) +
				parseInt($t.width(), 10) +
				parseInt($t.css('paddingRight'), 10) +
				parseInt($t.css('marginRight'), 10)
			);
		});
		while (nCurrWidth < nMaxWidth) {
			nLiIndex = nCurrWidth % $li.length;
			$li.eq(nLiIndex).width($li.eq(nLiIndex).width() + 1);
			nCurrWidth++;
		}
	});
};

/* Events called only once */
/* Bakcground position fancy scrolling */
$(window).bind('scroll', function () {
	var nScroll = -$(window).scrollTop()/3;
	document.getElementsByTagName('body')[0].style.backgroundPosition = '50% ' + nScroll/3 + 'px';
	document.getElementById('wrapper').style.backgroundPosition = '50% ' + nScroll + 'px';
});

function shareFacebook(uri, url, titol) {
	window.open(uri+'?u='+encodeURIComponent(url)+'&t='+encodeURIComponent(titol),"shareWindow",'width=600,height=400');
}
function shareTwitter(uri, url, titol) {
	window.open(uri+'?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(titol),"shareWindow",'width=600,height=400');
}