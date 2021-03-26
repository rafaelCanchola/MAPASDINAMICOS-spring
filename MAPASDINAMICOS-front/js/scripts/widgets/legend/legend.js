/**
 * Permite el despliegue de un componente en donde se muestra la leyenda asociada a cada predio desplegado en el mapa
 */
define(["validator"], function(validator){
$.widget( "custom.legend", {
          id:'custom_legend',
	  options:{
                 data:[
                    
                    {color:validator.getColorStatus(1),label:'Disponibles'},
                    {color:validator.getColorStatus(2),label:'Asignados'},
                    {color:validator.getColorStatus(3),label:'Entregados'},
                    //{color:validator.getColorStatus(13),label:'Referencias'},
                    {color:validator.getColorStatus(9),label:'Validando SC'},
                    {color:validator.getColorStatus(8),label:'Validando TG'},
                    {color:validator.getColorStatus(7),label:'Validado CG'}
                 ]
          },
	  _init:function(){
                    
	  },
          
          getItems:function(){
                    var chain='';
                    var o = this.options.data;
                    for(var x in o){
                              var i = o[x];
                              chain+='<div class="item_option">'+
                                                  '<div class="status" style="background:'+i.color+'"></div>'+
                                                  '<div class="label">'+i.label+'</div>'+
                                     '</div>';
                    }
                    return chain;
          },
	  buildStructure:function(){
                    var chain = '<div id="'+this.id+'" class="'+this.id+'">'+
                                        this.getItems()+
                               '<div>';
                    this.element.html(chain);
	  },
          
          events:function(){
                    
          },
         
          
          _create: function() {
		this.buildStructure();
                this.events();
                //this.eventsToItems();
          },
      
          _refresh: function(){
            // trigger a callback/event
            this._trigger( "change" );
          },
         
          _destroy: function() {
              this.element.remove();
          },
    
          _setOptions: function() {
            // _super and _superApply handle keeping the right this-context
            this._superApply( arguments );
            this._refresh();
          },
 
      
          _setOption: function(key, value){
                    this.options[key] = value;
                              switch(key){
                                        case "something":
                                                
                                        break;
                              }
		    }
	  }
);
});