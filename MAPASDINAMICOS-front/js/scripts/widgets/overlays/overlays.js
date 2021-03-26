/**
 * Despliega cada una de las capas vectoriales permitiendo encender o  apagarlas, para lo cual se emplea el archivo webmapservices como referencia
 */
define(["webmapservices","map","features"], function(webmapservices,map,features){
$.widget( "custom.overlays", {
          id:'custom_overlays',
          clock:null,
          temporal:null,
          overlays:null,
          aditionals:[
                    {label:'Predios en poligono',layer:'Polygons',active:true},
                    {label:'Predios en punto',layer:'Predios',active:true}
          ],
	  options:{
                    userActive:null,
                    controller:null
          },
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          getLayers:function(layers,group){
                    var chain = '';
                    for(var y in layers){
                              var l = layers[y];
                              chain+='<div class="item_layer">'+
                                        '<input class="inputLayer" id="'+group+'_'+y+'" type="checkbox" '+((l.active)?'checked':'')+' group="'+group+'">'+
                                        '<label for="'+group+'_'+y+'" class="label">'+l.label+'</label>'+
                                     '</div>';
                    }
                    return chain;
          },
          getGroups:function(){
                    var o = webmapservices.overlays;
                    var chain ='';
                    var obj=this;
                    for(var x in o){
                           var group = o[x];
                           chain+='<div class="item_group">'+
                                        //'<div class="title">'+group.label+'</div>'+
                                        obj.getLayers(group.layers,x)+
                                        (((obj.options.userActive.roleId>2)&&(obj.options.userActive.roleId<6))?'':obj.getAditionals())+
                                  '</div>';
                                  
                    }
                    return chain;
          },
          getAditionals: function(){
                    var obj = this;
                    chain = '';
                    var group = 'aditinal';
                    for (var x in obj.aditionals) {
                              var i = obj.aditionals[x];
                              chain+='<div class="item_layer">'+
                                        '<input class="inputLayer" id="'+group+'_'+i.layer+'" type="checkbox" '+((i.active)?'checked':'')+' group="'+group+'" reference="true">'+
                                        '<label for="'+group+'_'+i.layer+'" class="label">'+i.label+'</label>'+
                                     '</div>';
                    }
                    return chain;
          },
          
	  buildStructure:function(){
                    var obj=this;
                    obj.overlays=webmapservices.overlays;
                    var chain='<div class="'+obj.id+'">'+
                                                 obj.getGroups()+
                              '</div>';
                    $(obj.element).append(chain);
	  },
          
          show:function(){
                 $("."+this.id).show();   
          },
          
          hide:function(){
                 $("."+this.id).hide();   
          },
          clearClock:function(){
                    var obj = this;
                    if(obj.clock){
                             clearTimeout(obj.clock); 
                    }
          },
          getLayersFromGroup : function(group){
                    var obj = this;
                    var g = obj.overlays[group];
                    var layers=[];
                    for(var x in g.layers){
                              if (g.layers[x].active) {
                                       layers.push(x);
                              }
                              
                    }
                    return layers.join(',')
          },
          setGroup:function(group){
                    obj=this;
                    if (obj.temporal==null) {
                          obj.temporal={}; 
                    }
                    obj.temporal[group]=true;
                    obj.clearClock();
                    obj.clock= setTimeout(function(){
                          var array = [];
                          for(var g in obj.temporal){
                              var layers =obj.getLayersFromGroup(g);
                              array.push({layer:g,params:{layers:layers}});
                              map.activeLayers(array);
                          }
                          obj.temporal=null;
                    },1000);
          },
          
          events:function(){
                    var obj=this;
                    
                    $(".inputLayer").each(function(){
                              
                              $(this).click(function(){
                                        var reference = $(this).attr('reference');
                                        var id =$(this).attr('id');
                                        var status = $(this).prop( "checked" );
                                        var group = $(this).attr('group');
                                        var layer = id.replace(group+'_','');
                                        if (reference) {
                                                  features.setVisivility(layer,status);
                                        }else{
                                                  obj.overlays[group].layers[layer].active = status;
                                                  obj.setGroup(group);  
                                        }
                                        
                                        
                                        
                              });
                    });
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
                                                  //this.options.data = value;
                                                  //this.update();
                                        break;
                                                          
                              }
		    }
	  }
);
});