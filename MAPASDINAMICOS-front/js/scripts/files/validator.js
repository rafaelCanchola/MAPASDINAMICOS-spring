/**
 * Comprende un n�mero determinado de m�todos mediante los cuales se podra, determinar si un string esta vacio, validaciones para determinar si un campo es telefonico,
 * obtencion de roles por tipo de usuario, obtenci�n de estatus para predios desplegados en el mapa, remover acentos, y mensajes de notifiaci�n en base a un determinado estatus
 */
define([], function(){
	var removeEmptySpaces=function(a){
	//console.log(a + " - ");	
	return a.replace(/\s+/, "");
    }
    var trim = function(a){
		//console.log(a + " - ");
        return a.replace(/^\s+|\s+$/g, '');
    }
    var isEmpty=function(a){
        var response = true;
        var text = trim(a);
        if (text.length>0) {
            response = false;
    }
	return response;
    }
    var isDate = function(p){
	var re = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/;
	return re.test(p);
    }
    var isPhoneLada=function(p){
	var re = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
	return re.test(p);
    }
    var isPhone=function(p){
	var re = /^[0-9]{3}[-\s\.]{0,1}[0-9]{4}[0-9]{0,1}$/;
	return re.test(p);
    }
    var isCURP = function(curp){
        var valid = false;
        if(curp.match(/^([a-z]{4})([0-9]{6})([a-z]{6})([0-9]{2})$/i)){
            valid = true;
        }
        return valid;
    }
    var isRFC = function(rfcStr,moral){
        var response = false;
        var strCorrecta;
        strCorrecta = rfcStr;
        if (moral){
            var valid = '^(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
            //var valid = '^(([A-Z]|[a-z]|\s){1})(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
        }else{
            var valid = '^(([A-Z]|[a-z]){4})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
        }
        var validRfc=new RegExp(valid);
        var matchArray=strCorrecta.match(validRfc);
        if (matchArray!=null) {
            response=true;
        }
        return response;
    }
    var isEmail = function(email){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
    }
    var getRol=function(a){
	var rol='';
	switch (parseInt(a)) {
	    case 1: rol="Administrador";
		break;
	    case 2: rol="Coordinador de Gabinete";
		break;
	    case 3: rol="T&eacute;cnico de Gabinete"; //rol="Subcoordinador de Zona";
		break;
	    case 4: rol="Supervisor de Campo";
		break;
	    case 5: rol="T&eacute;cnico de Campo";
		break;
	    case 6: rol="Ejecutivo";
		break;

	}
	return rol;
    };
    var getColorStatus = function(status){
	var color ='';
	switch (status) {
	    case 1:
		color="#007836";
		break;
	    case 2:
		color="#C5002E";
		break;
	    case 3:
		color="#FFB620";
		break;
	    case 4:
		color="#C5002E";
		break;
	    case 5:
		color="#C5002E";
		break;
	    case 6://seleccion por wkt o filtro
		color="#1de9b6";
		break;
	    case 8://proceso validacion estatal
		color="#779ECB";
		break;
	    case 10://proceso validacion estatal (no aprobado)
		color="#779ECB";
		break;
	    case 9://proceso validacion supervisor
		color="#AEC6CF";
		break;
	    case 11: //proceso validacon supervisor (no aprobado)
		color="#AEC6CF";
		break;
	    //case 9://proceso validacion brigadista
		//color="#CB99C9";
		//break;
	    case 7://validados
		color="#006BA7";
		break;
	    case 12://validados siap no aprobados
		color="#006BA7";
		break;
	    case 13://referencias
		    color="#757575";
		    break;
	    case 14://upas inexistentes
		    color="#131313";
		    break;

		case 5050000://Agave
			color="#00727f";
			break;
	}
	

	return color;
    }
    this.removeAcent = function(a){
		var chain = a;
		chain = chain.replace(/[\u00E1]/gi,'a');
		chain = chain.replace(/[\u00E9]/gi,'e');
		chain = chain.replace(/[\u00ED]/gi,'i');
		chain = chain.replace(/[\u00F3]/gi,'o');
		chain = chain.replace(/[\u00FA]/gi,'u');
		chain = chain.replace(/[\u00F1]/gi,'n');
		
		chain = chain.replace(/[\u00C1]/gi,'A');
		chain = chain.replace(/[\u00C9]/gi,'E');
		chain = chain.replace(/[\u00CD]/gi,'I');
		chain = chain.replace(/[\u00D3]/gi,'O');
		chain = chain.replace(/[\u00DA]/gi,'U');
		chain = chain.replace(/[\u00D1]/gi,'N');
		
		return chain;
	}
    var getFormatHtml = function(chain){
		
		chain = chain.replace(/[\u00E1]/gi,'a');
		chain = chain.replace(/[\u00E9]/gi,'e');
		chain = chain.replace(/[\u00ED]/gi,'i');
		chain = chain.replace(/[\u00F3]/gi,'o');
		chain = chain.replace(/[\u00FA]/gi,'u');
		chain = chain.replace(/[\u00F1]/gi,'n');
		
		chain = chain.replace(/[\u00C1]/gi,'A');
		chain = chain.replace(/[\u00C9]/gi,'E');
		chain = chain.replace(/[\u00CD]/gi,'I');
		chain = chain.replace(/[\u00D3]/gi,'O');
		chain = chain.replace(/[\u00DA]/gi,'U');
		chain = chain.replace(/[\u00D1]/gi,'N');
		
		return chain;
    }
    var getFormatHtml2 = function(chain){
		
		chain = chain.replace(/[\u00E1]/gi,'&aacute;');
		chain = chain.replace(/[\u00E9]/gi,'&eacute;');
		chain = chain.replace(/[\u00ED]/gi,'&iacute;');
		chain = chain.replace(/[\u00F3]/gi,'&oacute;');
		chain = chain.replace(/[\u00FA]/gi,'&uacute;');
		chain = chain.replace(/[\u00F1]/gi,'&ntilde;');
		
		chain = chain.replace(/[\u00C1]/gi,'&Aacute;');
		chain = chain.replace(/[\u00C9]/gi,'&Eacute;');
		chain = chain.replace(/[\u00CD]/gi,'&Iacute;');
		chain = chain.replace(/[\u00D3]/gi,'&Oacute;');
		chain = chain.replace(/[\u00DA]/gi,'&Uacute;');
		chain = chain.replace(/[\u00D1]/gi,'&Ntilde;');
		
		return chain;
    }
    var validTotalPredios = function(total){
        return (total<=700);
    }
    var isText = function(text){
        var exp = /^[a-z ]+$/gi;
        var re = new RegExp(exp);
        return re.test(text);
    }
    var getNotificacionLogin=function(role,phase){
	var msg='';
	if (phase==0) {
	    switch (role) {
		case 2:
		    msg='Solicite a su administrador que finalice la creaci&oacute;n de usuarios principales';
		    break;
		case 3:
		    msg="Solicite a su Coordinador de Gabinete que finalice sus tareas pendientes";
		    break;
		case 4:
		    msg="Solicite a su Subcoordinador de Zona que finalice sus tareas pendientes";
		    break;
		case 5:
		    msg="Solicite a su Supervisor que finalice sus tareas pendientes";
		    break;
	    }
	}
	return msg;
    }
    var getFormatNumber = function(nStr){
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		//alert('antes');
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
    var convertToHtml = function(texto){
		
		var ta=document.createElement("textarea");
		ta.innerHTML=texto.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		return ta.value;
    }
    return {
	    removeSpaces:removeEmptySpaces,
	    isEmpty:isEmpty,
	    isPhone:isPhone,
	    isPhoneLada:isPhoneLada,
	    isEmail:isEmail,
	    getRol:getRol,
	    trim:trim,
	    getColorStatus:getColorStatus,
	    getFormatHtml:getFormatHtml,
	    getNotificacionLogin:getNotificacionLogin,
	    removeAcent:removeAcent,
	    getFormatNumber:getFormatNumber,
	    convertToHtml:convertToHtml,
	    getFormatHtml2:getFormatHtml2,
	    isDate:isDate,
	    isText:isText,
	    validTotalPredios:validTotalPredios,
	    isCURP:isCURP,
	    isRFC:isRFC
    }
    
});