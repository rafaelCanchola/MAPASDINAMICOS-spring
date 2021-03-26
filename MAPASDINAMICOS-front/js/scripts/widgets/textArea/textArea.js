/**
* @textArea.js Libreria para el despliegue de áreas de texto
*
* @version 1.0
*/
define(["connections","Alert","validator"], function(connections,Alert,validator){
$.widget( "custom.textArea", {
          /**
          * Define el identificador para este componente
          */
	  id:'custom_textArea',
          /**
          * Ubicación en doom donde se insertara el componente
          */
          root:'body',
          /**
          * Contiene los parametros de configuración inicial
          */
          options:{
                 data:{
                    field:'',
                    idInput:'',
                    label:'',
                    text:'',
                    mode:'',//delete,edit,new,consult,
                    maxlength:0,
                    dataType:'',
                    event:function(){}
                 }
          },
          /**
          * Inicializa la invocación del componente
          */
          _init:function(){
                          
          },
          /**
          * Permite recargar el contenido de la interfaz
          */
          update:function(){
                   this.buildStructure();
                   this.events();
          },
          /**
          * Obtiene el encabezado del panel
          * @return {String} cadena de texto que contiene el codigo html
          */
          getHeader : function(){
                    var obj = this;
                    var extraClass = obj.options.data.mode;
                    var chain='<div class="Header '+extraClass+'">'+
                                        '<div class="label">'+obj.options.data.label+'</div>'+
                                        '<div class="icon"><div class="template_textArea tta_back"></div></div>'+
                              '</div>';
                              
                    return chain;
          },
          /**
          * Determina que el área de texto solo sera para consulta de información
          * @return {String} cadena de texto que contiene el codigo html
          */
          getAttributeReadOnly : function(){
                    var obj = this;
                    var response='';
                    switch (obj.options.data.mode) {
                              case 'delete':
                              case 'consult':
                                        response=' readonly ';
                              break;
                    }
                    return response;
          },
          /**
          * Cosntruye la estructura del área de texto a desplegar
          * @return {String} cadena de texto que contiene el codigo html
          */
          getData : function(){
                    var obj = this;
                    var extraClass = obj.options.data.mode;
                    var additionalOption=obj.getAttributeReadOnly(); 
                    var chain='<div class="dataComments '+extraClass+'">'+
                              '<div class="containerTextArea">'+
                                    '<textarea id="infoTextArea" '+additionalOption+' maxlength="'+obj.options.data.maxlength+'">'+
                                          obj.options.data.text+
                                    '</textarea>'+
                              '</div>'+
                              ((extraClass=='new')?'<div class="buttonsDescription"><button class="button cancelDescription">Cancelar</button><button class="button sendDescription">Aceptar</button></div>'
                               :'')+
                              '</div>';
                    return chain;
          },
          /**
          * Genera la estructura html principal para este componente
          */
	  buildStructure:function(){
                    var obj = this;
                    var o = obj.options.data;
                    var chain=''+
                    '<div id="'+obj.id+'" class="'+obj.id+'">'+
                             '<div class="veil"></div>'+
                             '<div class="mainContainer">'+
                                        '<div class="column w100" style="height:100%;">'+
                                         '<div class="container">'+
                                                   '<div class="data">'+ 
                                                             obj.getHeader()+
                                                             obj.getData()+
                                                   '</div>'+
                                         '</div>'+
                                        '</div>'+
                              '</div>'+
                    '</div>';
                    $("."+obj.id).remove();
                    $(obj.root).append(chain);
	  },
          /**
          * Asigna los eventos a cada no de los elementos visuales
          */
      events:function(){
                    var obj = this;
                    $("."+obj.id+" .tta_back").click(function(){
                              var text = $(".dataComments #infoTextArea").val();
                              $("input[id='"+obj.options.data.idInput+"']").val(text);
                             $("."+obj.id).hide();
                    });
                    if (obj.options.data.dataType=='alphanumeric') {
                              $("."+obj.id+" #infoTextArea").bind("keypress", function(evt) {
                                                var otherresult = 12;
                                                  if(window.event != undefined){
                                                        otherresult = window.event.keyCode;
                                                  }
                                                  var charCode = (evt.which) ? evt.which : otherresult;  
                                                  var keyChar = String.fromCharCode(charCode);
                                                  var keyChar2 = keyChar.toLowerCase();
                                                  //var re =   /^[a-z0-9 ]+$/i
                                                  var re = /^[a-z0-9 \u00E0-\u00FC]+$/i;
                                                  var result = re.test(keyChar2);
                                                  return result;                               
                              }).bind("paste",function(event){
                                        return false;
                                        
                              });
                    }
                    $("."+obj.id+" .cancelDescription").click(function(){
                              $("."+obj.id).hide();
                    });
                    $("."+obj.id+" .sendDescription").click(function(){
                              var description = $("."+obj.id+" #infoTextArea").val();
                              
                              description = (validator.isEmpty(description))?validator.convertToHtml('Sin descripci&oacute;n'):description;
                              $("."+obj.id).hide();
                              obj.options.data.event(description);
                              
                    });
                    if (obj.options.data.mode=='new') {
                              $("."+obj.id+" #infoTextArea").focus();
                    }
      },
      /**
      * Detona el evneto para ocultar el área de texto actual
      */
      closeWindow:function(){
                    var obj =this;
                    $("."+obj.id+" .iconClose").click();
      },
          /**
          * Invoca la generación de los elementos que integran este componente
          */
      _create: function() {
		this.update();
      },
      /**
          * Evento que se lanza cada vez que se refrezca el componente
          */
      _refresh: function(){
            // trigger a callback/event
            this._trigger( "change" );
      },
       /**
          * Metodo que se lanza para la destrucción del componente
          */  
      _destroy: function() {
              this.element.remove();
      },
    
      _setOptions: function() {
            // _super and _superApply handle keeping the right this-context
            this._superApply( arguments );
            this._refresh();
      },
          /**
          * Metodo que ejecuta un evento dependiendo del parametro que se reciva
          * @key {String} atributo a actualizarse
          * @value {Object} valor del atributo a actualizarse
          */
      
      _setOption: function(key, value){
                    this.options[key] = value;
                              switch(key){
                                        case "data":
                                                  this.counter=0;
                                                  this.options.data = value;
                                                  this.update(value);
                                        break;
                                                          
                              }
		    }
	  }
);
});