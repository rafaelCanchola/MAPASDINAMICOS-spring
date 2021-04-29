/**
 * Permite el despliegue de un componente en donde se muestra la leyenda asociada a cada predio desplegado en el mapa
 */
define(["webmapservices","validator","features"], function(webmapservices,validator,features){
$.widget( "custom.legend", {
          id:'custom_legend',
	  options:{
                 data:[
                    
                    {color:validator.getColorStatus(5050000),label:'Agave',id:5050000},
                    {color:validator.getColorStatus(5060000),label:'Aguacate',id:5060000},
                    {color:validator.getColorStatus(7580000),label:'Manzana',id:7580000},
                 ]
          },
	  _init:function(){

	  },

          getItems:function(){
                    var chain='';
                    var o = this.options.data;
              chain+='<div class="item_option">'+
                  '<div class="status" style="background:'+o[0].color+'"></div>'+
                  '<input class="filterLayer" type="checkbox" id="'+o[0].id+'" checked >'+
                  '<div class="label">'+o[0].label+'</div>'+
                  '</div>';
                    for(var x in o){
                        if(x != 0){
                            var i = o[x];
                            chain+='<div class="item_option">'+
                                '<div class="status" style="background:'+i.color+'"></div>'+
                                '<input class="filterLayer" type="checkbox" id="'+i.id+'" >'+
                                '<div class="label">'+i.label+'</div>'+
                                '</div>';
                        }
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
              webmapservices.changeAgave(true);
              $(".filterLayer").each(function() {
                  $(this).click(function(){
                      var id =$(this).attr('id');
                      var status = $(this).prop( "checked" );
                      switch(parseInt(id)){
                          case 5050000:
                              webmapservices.changeAgave(status);
                              break;
                          case 5060000:
                              webmapservices.changeAguacate(status);
                              break;
                          case 7580000:
                              webmapservices.changeManzana(status);
                              break;
                      }
                      //this.checkBox[id].active = status;

                      if(status){
                          features.loadFilterPolygons(id)
                      }else{
                          features.clearPolygons(id)
                          //borrarCAPA
                      }
                      /*if (reference) {
                          features.setVisivility(layer,status);
                      }else{
                          obj.overlays[group].layers[layer].active = status;
                          obj.setGroup(group);
                      }*/



                  });
              });
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