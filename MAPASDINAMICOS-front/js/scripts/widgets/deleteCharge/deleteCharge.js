/**
 * Permite la carga de archivos al servidor, mediante el empledo de tres bloques para subir archivos
 */
define(["validator","connections","structure","Alert","features"], function(validator,connections,structure,Alert,features){
$.widget( "custom.deleteCharge", {
	  id:'custom_deleteCharge',
          countSpinner:0,
          typeSelected:null,
          options:{
                 userActive:null,
                 dataFile:null,
                 data:{
                              zones:null,
                              user:null,
                              width:300,
                              height:180
                    }
          },
	  _init:function(){
                    
	  },
          getBlocker :function(){
                    var chain = '<div class="blocker">'+
                                        '<div class="veil"></div>'+
                                        '<div class="loader" align="center">'+
                                                  '<img src="img/loader.gif">'+
                                                  '<div class="label">Eliminando datos</div>'+
                                        '</div>'+
                                '</div>';
                    return chain;
          },
          getButtons:function(){
                    var obj = this;
                    var chain='';
                    var b = obj.options.data.buttons;
                    for(var x in b){
                              chain+=   '<div class="item_tool" align="center">'+
                                                  '<div class="icon">'+
                                                            '<div style="height:20px;width:20px;background:gray;"></div>'+
                                                  '</div>'+
                                                  '<div class="border"></div>'+
                                        '</div>';
                    }
                    return chain;
          },
          showSpinner:function(){
                    var obj=this;
                    if (obj.countSpinner==0) {
                              $("."+obj.id +" .blocker").show();
                    }
                    obj.countSpinner+=1;
                   
          },
          hideSpinner:function(){
                    var obj=this;
                    obj.countSpinner-=1;
                    if (obj.countSpinner==0) {
                              $("."+obj.id +" .blocker").hide();
                    }
          },
          getTitle:function(){
                    var chain='';
                    var o = this.options.data;
                    var title = 'Informaci&oacute;n a eliminar para el ejercicio '+this.options.data.year;
                    chain+=   '<div class="header_deleteCharge" style="width:'+o.width+'px">'+
                                        '<p class="label">'+title+'</p>'+
                                        
                              '</div>';
                    return chain;
          },
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          getContentModal:function(){
                    var obj=this;
                    var o = obj.options.data;
                    var chain='';
                    chain+=   obj.getTitle()+
                              '<div class="container_update" style="width:'+o.width+'px;height:'+o.height+'px;">'+
                                        '<div class="data_container">'+
                                                  
                                                  '<div class="sectionTabs">'+
                                                            
                                                            '<div id="dw_tracklog" status="close" class="item_head_deleteCharge" type="universe" align="center">'+
                                                                      '<div class="border_head"></div>'+
                                                                      '<div class="icon_head">'+
                                                                          '<div class="template_deleteCharge tdch_charge"></div>'+
                                                                      '</div>'+
                                                                      '<div class="label_head2">Universo</div>'+
                                                            '</div>'+
                                                            
                                                            '<div id="dw_charge" status="close" class="item_head_deleteCharge" type="charge" align="center">'+
                                                                      '<div class="border_head"></div>'+
                                                                      '<div class="icon_head">'+
                                                                          '<div class="template_deleteCharge tdch_charge"></div>'+
                                                                      '</div>'+
                                                                      '<div class="label_head2">Carga de trabajo</div>'+
                                                            '</div>'+
                                                            
                                                            
                                                  '</div>'+
                                                  '<div class="buttons_section" align="center">'+
                                                            '<button id="btnDeleteCharge" class="textButton">Aceptar</button>'+
                                                            '<button id="btnDeleteChargeCancel" class="textButton">Cancelar</button>'+
                                                  '</div>';
                                                  
                                                  obj.getBlocker()+
                                        '</div>'+
                              '</div>';
                    return chain;
          },
	  buildStructure:function(){
                    var obj = this;
                    var chain='<div class="'+obj.id+'">'+
                                        '<center>'+
                                        '<div class="veil_deleteCharge"></div>'+
                                        '<div class="modal_deleteCharge">'+
                                                  obj.getContentModal()+
                                        '</div>'+
                                        '</center>'+
                                       
                              '</div>';
                    $("."+this.id).remove();
                    this.element.append(chain);
	  },
          
          showError:function(text){
                    var item = $(".msgErrorDeleteCharge");
                    item.children().html(text);
                    var evento = function(){
                              setTimeout(function(){
                                        item.hide();
                              },4000);
                    }
                    item.show( 'shake', {}, 500, evento );
                    
          },
          hide:function(){
                    $("."+this.id).remove();    
          },
          events:function(){
                    var obj=this;
                    obj.selectOption('dw_charge');
                    obj.typeSelected = 'charge';
                    
                    var o = obj.options.data;
                    $("."+obj.id+' .blocker').hide();
                    $(".msgErrorDeleteCharge").hide();
                    
                    $("#btnDeleteCharge").click(function(){
                              o.evento(obj.typeSelected);
                              obj.hide();
                    });
                    $("#btnDeleteChargeCancel").click(function(){
                              obj.hide();
                    });
                   /****************/
                    $(".item_head_deleteCharge").each(function(){
                              $(this).click(function(){
                                        var id  = $(this).attr('id');
                                        obj.selectOption(id);
                              });
                    });
                    
          },
          
          selectOption:function(id){
                   var obj = this;
                   obj.typeSelected = $("#"+id).attr('type');
                   var clase ='item_head_deleteCharge_selected';
                   $('.'+clase).removeClass(clase);
                   $("#"+id).addClass(clase);
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
    
          _setOptions: function() {
            // _super and _superApply handle keeping the right this-context
            this._superApply( arguments );
            this._refresh();
          },
 
      
          _setOption: function(key, value){
                    this.options[key] = value;
                              switch(key){
                                        case "data":
                                                  this.options.data = value;
                                                  this.update();
                                                  this.countSpinner=0;
                                        break;
                                                          
                              }
		    }
	  }
);
});