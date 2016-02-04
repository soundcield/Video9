/*
* This extension depends on jQuery
*/
HttpCom.extensions.keepElementsCozyInIE = function (scope) {
   
if (!$.support.borderRadius && ($.browser.msie  && parseInt($.browser.version) < 9 )) {

function whiteBoxCorners($page){
 $page.css({"position":"relative","margin-top":"20px"});
 var c4Width = $page.width();
 var topC4width = c4Width - 28;
 var bottomC4width = c4Width - 33;
  $page.prepend("<div class='ie-styles-right-shadow'></div><div class='top-borders-holder'><div class='ie-styles-corner-top-left'></div><div class='ie-styles-center' style='width:"+topC4width+"px'></div><div class='ie-styles-corner-top-right'></div></div>");
  $page.append("<div class='bottom-borders-holder'><div class='ie-styles-corner-bottom-left'></div><div class='white-bottom-shadow' style='width:"+bottomC4width+"px'></div><div class='ie-styles-corner-bottom-right'></div></div>");

}

function ieTabWithGreyFooter($tab){
  var width = $tab.width();
    holderWidth = width + 15;
    bottomShadowWidth = width - 18;
    topCenterWidth = width - 28;
   
   $tab.css({"position":"relative","margin-top":"20px"});
   $tab.prepend("<div class='ie-styles-right-shadow'></div><div class='top-borders-holder'><div class='ie-styles-corner-top-left'></div><div class='ie-styles-center' style='width:"+topCenterWidth+"px'></div><div class='ie-styles-corner-top-right'></div></div>");
   $tab.find("div[class~=tab-footer]").prepend("<div class='footer-borders-holder' style='width:"+holderWidth+"px'><div class='ie-footer-corner-bottom-left'></div><div class='ie-footer-bottom-shadow' style='width:"+bottomShadowWidth+"px'></div><div class='ie-footer-corner-bottom-right'></div></div>");

}

//ie-c-box son las cajas blancas con sombra.
$ie = $(".ie-c-box");
if($ie.length){
  whiteBoxCorners($ie);
}

//ie-tab-box es la cajas que tienen un footer gris.
var $tab = $(".ie-tab-box");         
if($tab.length){
ieTabWithGreyFooter($tab);    
}

/***************************************/

var $tabs = $(".tabs");
if($tabs.length){
 $tabs.children().append("<div class='tabs-top-left-corner'></div><div class='tabs-top-right-corner'></div>");
}


/*********** Header - barra negra - borders **************/
var $headerAjuntament = $("#ajuntament-barcelona span.ajuntament");
if($headerAjuntament.length){
$headerAjuntament.append("<span class='ajuntament-corner-top-left'></span><span class='ajuntament-corner-top-right'></span><span class='ajuntament-corner-bottom-left'></span><span class='ajuntament-corner-bottom-right'></span>");
}

var blackBoxes = $(".ie-black-box");
 if(blackBoxes.length){
 blackBoxes.css("position","relative");
 blackBoxes.append("<span class='ie-black-left-corners'></span><span class='ie-black-right-corners'></span>");   
 }


//***********  Tab de pestañas con diferentes colores*/

function setBordersToColoredTabs($element){
 if($element.length){
  $.each(['violet','teal','pink','green','lime'], function(index, value) { 
    $c = $element.find("div[class~='"+value+"']");
    $c.css({"border-right" : 0,"border-bottom" : 0,"position":"relative"});
    $c.prepend("<div class='ie-tab-"+value+"-right-shadow'></div>");
    $c.append("<br /><div style='height:10px;position:relative;'><div class='ie-tab-"+value+"-left-corner'></div><div class='ie-tab-"+value+"-right-corner'></div><div class='ie-tab-shadow-bottom-"+value+"'></div></div>"); 
 });
 }
}

function setBordersToColoredTabsGray($element){
 if($element.length){
  
    $c = $element.find("div[class~='gray']");
    $element.find("div[class~='tab-footer']").css("z-index","-1");
    $c.css({"border-right" : 0,"border-bottom" : 0,"position":"relative"});
    $c.prepend("<div class='ie-tab-gray-right-shadow'></div>");
    $c.append("<div class='ie-tab-gray-left-corner'></div><div class='ie-tab-gray-right-corner'></div><div class='ie-tab-shadow-bottom-gray'></div>"); 

 }
}


setBordersToColoredTabs($("#home"));
setBordersToColoredTabs($("#llistat-activitats"));
setBordersToColoredTabsGray($("#llistat-recursos"));




}
}