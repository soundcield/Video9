/**
 * Funciones genericas
 *
 */
 
function openWindow(page,titWindow,w,h,l,t){
	if (w==null) w=800;
	if (h==null) h=575;
	if (l==null) l=100;
	if (t==null) t=100;
	var parameter = "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes,resizable=1,copyhistory=0,left="+l+",top="+t+",width="+w+",height="+h+"";
	var ventanaID=window.open(page,titWindow,parameter);
	ventanaID.focus();	
}

/**
 * Funciones para eliminacion de espacios en blanco
 */
function Trim(TRIM_VALUE){
	if(TRIM_VALUE.length < 1){
	return"";
	}
	TRIM_VALUE = RTrim(TRIM_VALUE);
	TRIM_VALUE = LTrim(TRIM_VALUE);
	if(TRIM_VALUE==""){
	return "";
}
else{
return TRIM_VALUE;
}
} //End Function

function RTrim(VALUE){
var w_space = String.fromCharCode(32);
var v_length = VALUE.length;
var strTemp = "";
if(v_length < 0){
return"";
}
var iTemp = v_length -1;

while(iTemp > -1){
if(VALUE.charAt(iTemp) == w_space){
}
else{
strTemp = VALUE.substring(0,iTemp +1);
break;
}
iTemp = iTemp-1;

} //End While
return strTemp;

} //End Function

function LTrim(VALUE){
var w_space = String.fromCharCode(32);
if(v_length < 1){
return"";
}
var v_length = VALUE.length;
var strTemp = "";

var iTemp = 0;

while(iTemp < v_length){
if(VALUE.charAt(iTemp) == w_space){
}
else{
strTemp = VALUE.substring(iTemp,v_length);
break;
}
iTemp = iTemp + 1;
} //End While
return strTemp;
} //End Function

function trimEspais(str) {
	var strNoEspais='';
	var strArr=str.split(" ");
	if(strArr.length>1) {
	for(var a=0;a<strArr.length;a++) {
	 strNoEspais=strNoEspais+strArr[a];
	}
	} else {
	 strNoEspais=str;
	}
	return strNoEspais;
}

function isEmpty(formName,fieldName,msg,showMsg) {
   camp='document.'+formName+'.'+fieldName+'.type';
	    if(eval(camp)=='text' || eval(camp)=='textarea' || eval(camp)=='password') {
	    
	     if(trimEspais(eval('document.'+formName+'.'+fieldName+'.value'))=='') {
	     	if(showMsg==undefined || showMsg==1) alert(msg);
		return false;	     
	     }
	    } else if(eval(camp)=='checkbox') {
	    	if(eval('document.'+formName+'.'+fieldName+'.checked')==false) {
	     	  if(showMsg==undefined || showMsg==1) alert(msg);
		  return false;	     
	        }	
	    } else if(eval(camp)=='file') {
	    	if(eval('document.'+formName+'.'+fieldName+'.value')=="") {
	     	  if(showMsg==undefined || showMsg==1) alert(msg);
		  return false;	     
	        }
	    } else if (eval('document.'+formName+'.'+fieldName+'.selectedIndex==0') || 
	               eval('document.'+formName+'.'+fieldName+'[document.'+formName+'.'+fieldName+'.selectedIndex].value')=='') { 
	        if(showMsg==undefined || showMsg==1) alert(msg);
	        return false;
	    }
	
return true;
}

function esEmail(str) {
  // are regular expressions supported?
  var supported = 0;
  if (window.RegExp) {
    var tempStr = "a";
    var tempReg = new RegExp(tempStr);
    if (tempReg.test(tempStr)) supported = 1;
  }
  if (!supported)
    return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);
  var r1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
  //Canviat: AMS_15/01/08 ( Dominis .info no els reconeix )
  //var r2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$");
  var r2 = new  RegExp("^[a-zA-Z0-9\\-\\.\\_]+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,6}|[0-9]{1,3})(\\]?)$");   

  return (!r1.test(str) && r2.test(str));
}

function esVacio(strValor){
    if (strValor == "" || strValor == null)  // no hay nada
    {
       return true
    }
    return false
} 

function esNumero(strValor)
{
 if (esVacio(strValor)) return false;
for (var j=0; j < strValor.length; j++)		// recorrer letra a letra
    {
    var letra = strValor.charAt(j)			// letra actual
    if (letra < "0" || letra > "9")		// no es nuemro
       {
       return false				// devuelve falso y sale
       }
    } // Fin del bucle
return true
}

function isNumber(formName,fieldName,msg,showMsg) {
   camp=eval('document.'+formName+'.'+fieldName+'.value');
   if (esNumero (camp))
	    return true;
   else
   {
		if (showMsg==undefined || showMsg==1) alert(msg);
   }
   return false;
}

function isValidInterval (fecha1, fecha2, msg){
	var dia = "";
        var mes = "";
      	var ano = "";
		if (fecha1!="" && fecha2!=""){
			dia = fecha1.substring(0,2);
      			mes = fecha1.substring(3,5);
      			ano = fecha1.substring(6,10);

      			var IntFecha1 = ano + mes + dia;

      			dia = fecha2.substring(0,2);
      			mes = fecha2.substring(3,5);
      			ano = fecha2.substring(6,10);

        		var IntFecha2 = ano + mes + dia;

        		if (IntFecha1 > IntFecha2) {
       				alert(msg);
       				return false;
      			} 	
      		}
      	return true;
}

function validarTecla(a, e) {
	var valor= a.value;
	
	if (e==8 || e==46) {
		a.value="";
	} else {
		a.value=valor;
	}
	a.blur();
}

function comprueba_extension(archivo) { 
   extensiones_permitidas = new Array(".pdf"); 
   
   if (archivo) { 
      //recupero la extensión de este nombre de archivo 
      extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase(); 
      
      //compruebo si la extensión está entre las permitidas 
      permitida = false; 
      for (var i = 0; i < extensiones_permitidas.length; i++) { 
         if (extensiones_permitidas[i] == extension) { 
         permitida = true; 
         break; 
         } 
      } 
      if (!permitida) { 
        //alert("Comprova l'extensió dels arxius a pujar. \nNomés es poden pujar arxius amb extensions : " + extensiones_permitidas.join()); 
      	return false;
      } 
      return true;
   } 
} 
function comprueba_extensiones(archivo, extensiones_permitidas) {  
   
   if (archivo) { 
      //recupero la extensión de este nombre de archivo 
      extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase(); 
      
      //compruebo si la extensión está entre las permitidas 
      permitida = false; 
      for (var i = 0; i < extensiones_permitidas.length; i++) { 
         if (extensiones_permitidas[i] == extension) { 
         permitida = true; 
         break; 
         } 
      } 
      if (!permitida) { 
        //alert("Comprova l'extensió dels arxius a pujar. \nNomés es poden pujar arxius amb extensions : " + extensiones_permitidas.join()); 
      	return false;
      } 
      return true;
   } 
}
function validarFecha(Cadena){
	var Fecha= new String(Cadena)	// Crea un string
	var RealFecha= new Date()	// Para sacar la fecha de hoy
	// Cadena Año
	var Ano= new String(Fecha.substring(Fecha.lastIndexOf("/")+1,Fecha.length))
	// Cadena Mes
	var Mes= new String(Fecha.substring(Fecha.indexOf("/")+1,Fecha.lastIndexOf("/")))
	// Cadena Día
	var Dia= new String(Fecha.substring(0,Fecha.indexOf("/")))

	// Valido el año
	if (isNaN(Ano) || Ano.length!=4 || parseFloat(Ano)<1900){
        	//alert('Año inválido')
		return false
	}
	// Valido el Mes
	if (isNaN(Mes) || Mes.length!=2 || parseFloat(Mes)<1 || parseFloat(Mes)>12){
		//alert('Mes inválido')
		return false
	}
	// Valido el Dia
	if (isNaN(Dia) || Dia.length!=2 || parseInt(Dia, 10)<1 || parseInt(Dia, 10)>31){
		//alert('Día inválido')
		return false
	}
	if (Mes==4 || Mes==6 || Mes==9 || Mes==11 || Mes==2) {
		//if (Mes==2 && Dia > 28 || Dia>30) {
			//alert('Día inválido')
		//	return false
		//}
		if (Mes==2 && Dia == 29) {
			// Comprovació d'any de traspàs
			if (!((Ano % 4 == 0) && ((Ano % 100 != 0) || (Ano % 400 == 0)))) {
				// No és any de traspàs
				return false;
			} 
		} else if (Dia>30) {
			return false;
		}
	}
	return true;
}

function validateNIF(strValor) {
	if (strValor.length == 9) {
		dni=strValor.substring(0,strValor.length-1);
		let=strValor.charAt(strValor.length-1);
		if (!isNaN(let)) {
	  		return false;
	 	}
		else {
	  		cadena="TRWAGMYFPDXBNJZSQVHLCKET"
	  		posicion = dni % 23
	  		letra = cadena.substring(posicion,posicion+1)
	  		if (letra!=let.toUpperCase()) {
	    			return false
	   		}
	 	}
	} else {
		return false;
	}	
	return true;
}

function validateNIE(strValor) {
	var valid = false;
	//strValor = trimEspais(strValor);
	strValor = strValor.toUpperCase();
	
        // Formato: XnnnnnnnL o YnnnnnnnL o ZnnnnnnnL
        if (strValor.length == 9 && ((strValor.charAt(0) == 'X') || (strValor.charAt(0) == 'Y') || (strValor.charAt(0) == 'Z'))) {
                // Reemplazamos la X por un 0 y comprobamos que el resultado sea un NIF valido 
                // Reemplazamos la Y por un 1 y comprobamos que el resultado sea un NIF valido 
                // Reemplazamos la Z por un 2 y comprobamos que el resultado sea un NIF valido 
                if (strValor.charAt(0) == 'X') {
                    prefixeNx10milons = "0";
                }
                if (strValor.charAt(0) == 'Y') {
                    prefixeNx10milons = "1";
                }
                if (strValor.charAt(0) == 'Z') {
                    prefixeNx10milons = "2";
                }
                var nif = prefixeNx10milons + strValor.substring(1); 
                valid = validateNIF(nif);
        }
        // Formato: XnnnnnnnnL o YnnnnnnnnL o ZnnnnnnnnL 
        else if (strValor.length == 10 && ((strValor.charAt(0) == 'X') || (strValor.charAt(0) == 'Y') || (strValor.charAt(0) == 'Z'))) {
                var nif = strValor.substring(1, strValor.length); 
                valid = validateNIF(nif);         
        }
        // Formato: 0000XnnnnnnnnL o 0000YnnnnnnnnL o 0000ZnnnnnnnnL 
        else if (strValor.length == 14 && (("0000X" == strValor.substring(0, 5)) || ("0000Y" == strValor.substring(0, 5)) || ("0000Z" == strValor.substring(0, 5))) ) {
                var nif = strValor.substring(5, strValor.length); 
                valid = validateNIF(nif);  
        } else {
        	valid = false;
	}
        return valid;	
}

function validarDigitoControlCIF(strValor) {
	var valid = false;
	
	var v1 = new Array(0,2,4,6,8,1,3,5,7,9); 
   	var temp = 0;

   	for(i = 2; i <= 6; i += 2) {
    		temp = temp + v1[parseInt(strValor.substr(i-1,1))];
    		temp = temp + parseInt(strValor.substr(i,1));
   	}
   	temp = temp + v1[parseInt(strValor.substr(7,1))];
   	temp = ((10 - ( temp % 10))) % 10;
   	
   	var control = strValor.substring(8, 9); 
                                        
	var control1 = "0123456789"; 
        control1 = control1.substring(temp, temp + 1); 
                                        
        var control2 = "JABCDEFGHI"; 
        control2 = control2.substring(temp, temp + 1);
        
        if ((control1 == control) || control2 == control) { 
        	valid = true; 
        } else {
        	valid =  false; 
        } 
    	return valid;
}

function validateCIF(strValor) {
	var valid = false;
	
	// Pasar a mayúsculas
  	strValor = strValor.toUpperCase(); 

	// Son 9 dígitos?
  	if (!/^[A-Za-z0-9]{9}$/.test(strValor)) {
   		valid = false;
   	}
   	// El primer digito es una letra de las siguientes: A,B,C,D,E,F,G,H,J,K,L,M,N,P,R,Q,S,U,V,W ?	
  	else if (!/^[ABCDEFGHJKLMNPRQSUVW]/.test(strValor)) {
  		valid = false;
	}
	// Validar digito de control del CIF
	else {	
		valid = validarDigitoControlCIF(strValor);
	}
   	return valid;
}
function calcular_edad(fecha){ 
    //Calculo la fecha de hoy 
    hoy=new Date() 

    //Calculo la fecha que recibo y la descompongo en un array 
    var array_fecha = fecha.split("/") 
    var ano = array_fecha[2]; 
    var mes = array_fecha[1] *1 ; 
    var dia = array_fecha[0] *1; 

    //Resto los años de las dos fechas 
    edad=hoy.getFullYear()- ano - 1; //-1 porque no se si ha cumplido años ya este año 

    //Si resto los meses y me da menor que 0 entonces no ha cumplido años. Si da mayor si ha cumplido 
    if (hoy.getMonth() + 1 - mes < 0) //+ 1 porque los meses empiezan en 0 
       return edad 
    if (hoy.getMonth() + 1 - mes > 0) 
       return edad+1 

    //Entonces es que eran iguales. Miro los dias 
    //Si resto los dias y me da menor que 0 entonces no ha cumplido años. Si da mayor o igual si ha cumplido 
    if (hoy.getUTCDate() - dia >= 0) 
       return edad + 1 

    return edad 
}

function validateFieldFormat(value){
    var control = true;
        
    var w_space = String.fromCharCode(32);
    var v_length = value.length;	
    var strTemp = "";
	
    if(v_length < 0){
        return false;	
    }

    var iTemp = v_length -1;
	
    while(iTemp > -1) {

        if(value.charAt(iTemp) == w_space || value.charAt(iTemp) == "-" || value.charAt(iTemp) == "." || value.charAt(iTemp) == "_" || value.charAt(iTemp) == ":" || value.charAt(iTemp) == "/"){
           control = false;
           break;
        }
        iTemp = iTemp-1;
    } 
    return control;
}

function comprobarFechaAnteriorActual(fechaIntroducida){
    var hoy=new Date() 
	var xMonth=hoy.getMonth() + 1;
    var xDay=hoy.getUTCDate();
    var xYear=hoy.getFullYear(); 

    var yMonth=fechaIntroducida.substring(3, 5);   
    var yDay=fechaIntroducida.substring(0, 2);   
    var yYear=fechaIntroducida.substring(6,10);   

	if (xYear > yYear) {   
        return(true)   	
    } else {   
	
        if (xYear == yYear) {    
      
		    if (xMonth> yMonth) {   
                return(true)   
		   
            } else {    
                if (xMonth == yMonth) {
		  
                    if (xDay> yDay)   
                        return(true);   
                    else  
                        return(false);   
			 
                } else  
                    return(false);   
           }
	   } else {  
           return(false);   
	   }	
    }
}