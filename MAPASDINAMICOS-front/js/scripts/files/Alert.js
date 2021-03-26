/**
 * Comprende el objeto Alert empleado para generar notifiaciones
 */
define(["connections","validator"], function(connections,validator){
    
/**
 * Lanza una ventana modal con un mesaje especifico
 * @param {Object} params - comprende el mensaje a desplegarse, los botones que empleara y el tipo de notificación
 */
    var show=function(params){
	buildAlert(params);
	event(params);
    };
/**
 * Obtiene los botones en base parametros enviados
 * @param {Object} params - comprende la etiqueta del boton y el tipo del mismo
 */
    var getButtons =function(params){
	var buttons = params.buttons;
	var chain='';
	    if (buttons[0]) {
		chain+='<button class="textButton textButton_'+params.type+'">'+buttons[0].label+'</button>';
					
	    }
	    if (buttons[1]) {
		chain+='<button class="textButton textButton_'+params.type+'">'+buttons[1].label+'</button>';
	    }
	return chain;
    };
/**
 * Construye la notificación
 * @param {Object} params - comprende tipo, botones y mensaje
 */
    var buildAlert=function(params){
	var a = '';
	var msgs = params.messages;
	for(var x in msgs){
	    var i = msgs[x];
	    a+='<p>'+i+'</p>';
	}
	var content = (params.content)?params.content:'';
	
    var chain = '<div class="custom_alert '+((params.clase)?params.clase:'')+'">'+
			'<div class="custom_alert_veil"></div>'+
			'<div class="message">'+
				'<div class="header '+params.type+'"><div class="label">'+params.title+'</div></div>'+
				'<div class="content">'+
				    a+
				    content+
				    '<div class="buttons" align="center">'+
					getButtons(params)+
				    '</div>'+
				'</div>'+
			'</div>'+
		    '</div>';
	hide();
	$('body').append(chain);
    };
/**
 * Oculta la notifiación
 * @param {string} clase - comprende una clase la cual sera empleada para ocultar la notificación
 */
    var hide = function(clase){
	if (clase) {
	    $("."+clase).remove();
	}else{
	    $(".custom_alert").remove();
	}
    }
/**
 * Asignación de evento a botones
 * @param {string} params - comprende cada uno de los botones que emplea la ventana modal
 */
    var event = function(params){
    
	if (params.buttons[0]) {
	    $( ".custom_alert button:first" ).click(function(){
		
		    if (params.buttons[0].event) {
			params.buttons[0].event();
		    }
		    hide();

	    });
	}
	if (params.buttons[1]) {
	    $( ".custom_alert button:last" ).click(function(){
		
		    if (params.buttons[1].event) {
			params.buttons[1].event();
		    }
		    hide();
	    });
	}
    };
    return {
	    show:show,
	    hide:hide
    }
    
});