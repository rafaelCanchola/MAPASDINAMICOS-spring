/**
 * Despliega un menu con cada una de las faces con las que cuenta el proyecto
 */
define(["webmapservices","map","infofaces"], function(webmapservices,map,infofaces){
$.widget( "custom.faces", {
          id:'custom_faces',
	  options:{
                    
                    source:{},
                    data:{
                              face:1,
                              subface:1
                    }
          },
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          getItemFaces : function(){
                    var obj=this;
                    var chain='';
                    var f = obj.options.source;
                    for(var x in f){
                               chain += '<div id="'+this.id+'_'+x+'" class="item_faces" align="center">'+
                                                  
                                                  '<div class="label">'+f[x].label+'</div>'+
                                                  '<div class="border"></div>'+
                                                  '<div class="icon hidden"></div>'+
                                                  
                                        '</div>';   
                    }
                    
                    return chain;
          },
          
          
	  buildStructure:function(){
                    var obj=this;
                    obj.options.source = infofaces;
                    var chain='<div class="'+obj.id+'">'+
                                        '<div class="line"></div>'+
                                        '<div class="title_faces"><div class="label">Faces</div></div>'+
                                        '<div class="group_faces">'+
                                                  obj.getItemFaces()+
                                        '</div>'+
                                        
                                        
                              '</div>';
                    $(obj.element).append(chain);
	  },
          
          show:function(){
                 $("#"+this.id).show();   
          },
          
          hide:function(){
                 $("#"+this.id).hide();   
          },
          
          events:function(){
                    var clase = 'item_faces_selected'
                    $("."+clase).removeClass(clase);
                    $("."+clase+' .icon').addClass('hidden');
                    $("#"+this.id+'_f'+this.options.data.face).addClass(clase);
                    $("#"+this.id+'_f'+this.options.data.face+' .icon').removeClass('hidden');
          },

           _init:function(){
                   this.show();
	  },
          _create: function() {
		this.update();
          },
      
          _refresh: function(){
            // trigger a callback/event
            this._trigger( "change" );
          },
         
          _destroy: function() {
              this.element.remove();
          },
      
          _setOption: function(key, value){
                    this.options[key] = value;
                              switch(key){
                                        case "data":
                                                  this.options.data = value;
                                                  this.update();
                                        break;
                                                          
                              }
		    }
	  }
);
});