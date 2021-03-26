/**
 * Permite la generación de un modulo que permite la busqueda de información referente a un usuario en particular
 */
define(["validator","connections"], function(validator,connections){
$.widget( "custom.search", {
	  options:{
                    id:'menuUser_',
                    data:{
                              title:'Busqueda de usuarios',
                              action:''
                    }
                    
          },
	  _init:function(){
                    $(".background_menuUsers").show();
	  },
          
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          getItems:function(a){
                    var chain='';
                    return chain;
          },
          getTitleAction:function(action){
                    var o='';
                    switch (action) {
                              case 'delete':o='Eliminar';
                                        break;
                              case 'edit':o='Editar';
                                        break;
                              case 'consult':o='Consultar';
                                        break;  
                    }
                    return o;
          },
          showMessage:function(msg){
                    var item = $(".search_msgError");
                    item.children().html(msg);
                    var evento=function(){
                        setTimeout(function(){
                            item.hide();
                        },4000);
                    }
                    item.show( 'shake', {}, 500, evento );
          },
          getButton:function(id){
                    var obj=this;
                    var a = obj.options.data.action;
                    chain='<button user="'+id+'" class="textButton">'+obj.getTitleAction(a)+'</button>';
                    return chain;
          },
          
          fillTable:function(data){
                    var obj=this;
                    var chain='';
                    chain+='<div class="search_table_results">';
                    chain+='<div class="Heading">'+
                              '<div class="Cell borderHeading">'+
                                  '<p>Usuario</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow">'+
                                  '<p>Nombre</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow">'+
                                  '<p>Rol</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow">'+
                                  '<p>Acci&oacute;n</p>'+
                              '</div>'+
                          '</div>';
                    var clase = 'rowFilled';
                    for(var x in data){
                              var i = data[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                              
                              chain+='<div class="Row">'+
                                        '<div class="Cell '+clase+'">'+
                                            '<p>'+i.username+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+'">'+
                                            '<p>'+i.firstname+ ' '+i.lastname+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+'">'+
                                            '<p>'+validator.getRol(i.roleId)+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+'" align="center">'+
                                            obj.getButton(i.id)+
                                        '</div>'+
                                    '</div>';
                                  
                    }
                    chain+='</div>';
                    $('.search_results').html(chain);
                    $(".search_table_results .textButton").each(function(){
                              $(this).click(function(){
                                        var id = $(this).attr('user')
                                        obj.searchRequest({id:id},true);
                              });
                    });
          },
          searchRequest : function(params,byId){
                    byId = (byId)?true:false;
                    var obj=this;
                    var spinner = $(".spinner_search");
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.success){
                                        valid=true;
                                        if (byId) {
                                                  obj.createForm(json.data.user);
                                        }else{
                                                  obj.fillTable(json.data.users);
                                        }
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {
                                spinner.removeClass(clase);
                                if (!byId) {
                                       $('.search_results').html('');
                                        $(".search_msgError").hide();
                                }
                                
                                
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                spinner.addClass(clase)
                            }
                    };
                    r = $.extend(r, connections.users.search);
                    /*
                    r.xhrFields= {withCredentials: true};	    
                    r.crossDomain= true;
                    r.username=dataUsers.username;
                    r.password=dataUsers.password;
                    */
                    r.data=JSON.stringify(params);
                    if (byId) {
                          r.url=r.url+'/id/'+params.id;
                          r.type='GET';
                    }
                    $.ajax(r);
          },
          
	  buildStructure:function(){
                    var obj=this;
                    var o = obj.options.data;
                    var chain = ''+
                              '<div class="custom_search" align="center">'+
                                            '<div class="boxToSearch">'+
                                                    '<input id="text_search" class="textInput" type="text" value="" placeholder="Texto a buscar"/>'+
                                                    '<div class="icon_search">'+
                                                        '<div class="icon">'+
                                                            '<div class="customSearch_template_icon"></div>'+
                                                        '</div>'+
                                                    '</div>'+
                                            '</div>'+
                                            
                                            '<div class="search_results">'+
                                            
                                            '</div>'+
                                            '<div  align="center" class="spinner_search hidden"><div class="spinner"></div></div>'+
                                            '<div class="search_msgError"><div class="label"></div></div>'+
                                        
                              '</div>';
                    obj.hide();
                    this.element.append(chain);
	  },
          
          hide:function(){
                 $(".custom_search").remove();   
          },
          
          events:function(){ 
                    var obj =this;
                    $(".search_msgError").hide();
                    $(".icon_search").click(function(){
                              var text = $(".custom_search .textInput").val();
                              if (!validator.isEmpty(text)) {
                                        var params= {
                                                  username: text,
                                                  firstname: text,
                                                  lastname: text
                                        }
                                       obj.searchRequest(params);
                              }
                              
                    });
                    $(".back_button").click(function(){
                              obj.hide();
                    });
                   $(".btn_back").click(function(){
                              obj.hide();
                    });
          },
          createForm:function(data){
                    var obj=this;
                    var o = obj.options;
                    var params={action:o.data.action,data:data,userActive:o.userActive};
                    this.element.customForm(params);
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