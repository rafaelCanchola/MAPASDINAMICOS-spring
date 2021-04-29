/**
 * Comprende la generaci�n de la estructura para el despliegue de la ventana que permite el acceso al sistema
 */
var datos={};
define(["structure","connections","validator"], function(structure,connections,validator){
    var title = 'Mapas Din&aacute;micos';
    var buildStructure = function(){
	var chain='<div class="Loging">'+
		    '<div class="Header">'+
			'<div class="app_header">'+
			    '<div class="section_header">'+
				'<div class="section_logo">'+
				    '<div class="template_logo"></div>'+
				'</div>'+
				'<div class="section_title_system">Mapas Din&aacute;micos</div>'+
			    '</div>'+
			'</div>'+
		    '</div>'+
		    '<div class="Section">'+
			'<div class="divisor"></div>'+
			'<div class="Bg"></div>'+
		    '</div>'+
		    
		    '<div align="center" class="info_login">'+
			//'<center>'+
			    '<div class="modal">'+
			    
				'<div class="title"><div class="label">Para ingresar al sistema introduzca:</div></div>'+
				'<div class="content Foot" align="center">'+
				    '<div class="background_content"></div>'+
				    '<div class="data">'+
					'<input id="user" class="textInput" type="text" value="" placeholder="Nombre de usuario"/>'+
					'<input id="pass" class="textInput" type="password" value="" placeholder="Contrase&ntilde;a"/>'+
					//'<select id="year" class="selectInput"></select>'+
					'<div align="center">'+
					    '<div class="spinner hidden"></div>'+
					    '<button id="btnLoging" class="textButton">Ingresar</button>'+
					'</div>'+
					'<div class="msgError">'+
					    '<label></label>'+
					'</div>'+
					
				    '</div>'+
				'</div>'+
				
			    '</div>'+
			//'</center>'+
		    '</div>'+
		'</div>';
	$("body").html(chain);
	$(".msgError").hide();

    };
    var showMessage = function(msg){
	var item = $(".Foot .msgError");
	item.children().html(msg);
	var evento=function(){
	    setTimeout(function(){
		item.hide();
	    },4000);
	}
	item.show( 'shake', {}, 500, evento );
    };

    var loginRequest = function(params,aditional){
	    var clase='hidden';
	    var msg = 'Servicio no disponible intente m&aacute;s tarde'
	    var r= {
			statusCode:{
				200: function (json,estatus){
					structure.init(json);
					amplify.store( 'dataLoggingMAPAS', json);
				},
				400: function(){
					showMessage('Error en la información');
				},
				403: function (){
					showMessage('Usuario o Contraseña incorrectos');
				}
			},
			beforeSend: function(solicitudAJAX) {
			$(aditional.btn).addClass(clase);
			$(aditional.spinner).removeClass(clase);
		    },
		    complete: function(solicitudAJAX,estatus) {
			$(aditional.btn).removeClass(clase);
			$(aditional.spinner).addClass(clase)
		    }
		    };
	    r = $.extend(r, connections.users.login);
	    r.data=JSON.stringify(params);
	    $.ajax(r);
    };
    var events=function(){
	$("#btnLoging").click(function(){
	    var user = validator.removeSpaces($("#user").val());
	    var pass = validator.removeSpaces($("#pass").val());
	    //var year = $("#year :selected").val();
	    var params = {username:user,password:pass};//,currentyear:year};
	    loginRequest(params,{btn:'#btnLoging',spinner:'.spinner'});
	    var item = $(".Foot .msgError").hide();
	    
	});
	
	$("#pass").bind("keypress", function(evt) {
			var otherresult = 12;
			if(window.event != undefined){
				otherresult = window.event.keyCode;
			}
			
			var charCode = (evt.which) ? evt.which : otherresult;  
			if (charCode==13) {
			    $("#btnLoging").click();
			}else{
				return true;
			}
											
		});
    };
    var sessionActive = function(){
	var data = amplify.store( 'dataLoggingMAPAS' );
	var startLoggin=false;
	if ((typeof data != "undefined")&&(data!=null)) {
	    startLoggin=true;
	    structure.init(data);
	}
	return startLoggin;
    }

    var init = function(){
	$( document ).ready(function() {
	    if(!sessionActive()){
		//yearsRequest();
			buildStructure();
			events();
	    }
	});
    }
    return {
	    init:init
    }
    
});