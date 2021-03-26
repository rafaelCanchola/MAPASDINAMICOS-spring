/**
 * years.js Libreria para el despliegue de la información referente a los años
 * 
 */
define(["validator","connections","structure","features","graph","restrictions","Alert"], function(validator,connections,structure,features,graph,restrictions,Alert){
$.widget( "custom.years", {
          
	  options:{
                 process:'consult'
          },
          countSpinner:0,
	  _init:function(){
                    
	  },         
          getYears:function(years){
                    var chain='';
                    var userActive = this.options.userActive;
                    var process = this.options.process;
                    var buttonAdd='';
                    if (process=='administration') {
                            buttonAdd ='<div class="button_add_year">'+
                                                            '<div class="label">Nuevo ejercicio</div>'+
                                                            '<div class="icon">'+
                                                                      '<div class="template_years ty_plus"></div>'+
                                                            '</div>'+
                                        '</div>';
                              
                    }
                    chain+=buttonAdd;
                    this.totalYears=null;
                    this.totalYears={};
                    for(var x in years){
                              var i = years[x];
                              var id = 'y'+i.year;
                              this.totalYears[id]=i;
                              var color = (i.enabled)?'#006BA7':'#8E9091';
                              var controls = '';
                              if (process=='consult') {
                                       controls = '<div class="year_tools">'+
                                                            ((i.charge.delete)?'<div class="year_action year_deleteCharge" _title="Eliminar carga" title="Eliminar carga" year="'+id+'"  action="deleteCharge"><div class="template_years ty_deleteCgarge"></div></div>':'')+
                                                            ((i.charge.download)?'<div class="year_action year_download" _title="Descargar carga" title="Descargar carga" year="'+id+'" action="download"><div class="template_years ty_download"></div></div>':'')+
                                                            ((i.charge.upload)? '<div class="year_action year_upload" _title="Subir carga" title="Subir carga" year="'+id+'" action="upload"><div class="template_years ty_upload"></div></div>':'')+
                                                            
                                                  '</div>';
                                        
                              }
                              if (process =='administration') {
                                       controls = '<div class="year_tools">'+
                                                            '<div class="year_action user_delete" _title="Eliminar" title="Eliminar" year="'+id+'" action="delete"><div class="template_years ty_delete"></div></div>'+
                                                            '<div class="year_action user_edit" _title="Editar" title="Editar" year="'+id+'"  action="edit"><div class="template_years ty_edit"></div></div>'+
                                                            '<div class="year_action user_info" _title="Consultar" title="Consultar" year="'+id+'" action="consult"><div class="template_years ty_info"></div></div>'+
                                                  '</div>';
                              }
                              chain+=   '<div id="itemu'+x+'" class="item_year">'+
                                                  '<div class="year_color" style="background:'+color+';"></div>'+
                                                  '<div class="year_alias">Ejercicio '+i.year+'</div>'+
                                                  '<div class="year_progress" style="background:'+color+';"></div>'+
                                                  controls+
                                        '</div>';
                    }
                    $(".custom_years").append(chain);
                    this.eventsItems();
          },
          getHeader:function(){
                    var chain='';
                              var i = this.options.userActive;
                              var nom = i.username;
                              var role = validator.getRol(i.roleId);
                              var id = "user_"+i.id+"i";
                              var state = ((!i.state)||(i.state==''))?'':' '+restrictions.states['e'+i.state].alias;
                              chain+='<div id="'+id+'" class="item_year_selected">'+
                                        '<div class="user_color" style="background:'+i.color+';"></div>'+
                                        '<div class="user_alias">'+nom+'</div>'+
                                        '<div class="user_role">('+role+')'+state+'</div>'+
                                        ((i.charge)?
                                        '<div class="user_charge">'+i.charge+'/'+i.total+'</div>'
                                        :'')+
                                        '<div class="user_progress" style="background:'+i.color+';"></div>'+
                                        
                                        '<div class="year_back" style="position:absolute;left:2px;top:10px;"><img src="img/back.png"></div>'+
          
                                     '</div>';
                    
                    return chain;
          },
          update:function(){
                   this.show(); 
                   this.buildStructure();
                   this.events();
          },
          show:function(){
                    this.element.show();        
          },
          getBlocker :function(){
                    var chain = '<div class="blocker">'+
                                        '<div class="veil"></div>'+
                                        '<div class="loader" align="center">'+
                                                  '<img src="img/loader.gif">'+
                                                  '<div class="label">Procesando</div>'+
                                        '</div>'+
                                '</div>';
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
	  buildStructure:function(){
                    var obj = this;
                    obj.id = 'custom_years';
                    var chain = '<div id="custom_years" class="custom_years">'+
                                        this.getHeader()+
                                        this.getBlocker()+
                               '<div>';
                    this.element.html(chain);
                    obj.getYearsRequest({action:'getall'});
	  },
          getYearsRequest:function(params){
                    var obj = this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                              if(json){
                                    if (json.response.sucessfull){
                                                  msg=null;
                                                  obj.getYears(json.data);
                                        
                                    }else{
                                        msg=json.response.message;
                                    }
                              }
                              
                            },
                            beforeSend: function(solicitudAJAX) {
                              obj.showSpinner();
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                            },
                            complete: function(solicitudAJAX,estatus) {
                              obj.hideSpinner();
                            }
                    };
                    r = $.extend(r, connections.years.getAll);
                    r.data = params;
                    $.ajax(r);
          },
          events:function(){
                    var obj = this;
                    var process = obj.options.process;
                    $(".custom_years .year_back").click(function(){
                              obj.element.hide();
                    });
          },
          eventsItems :function(){
                    var obj = this;
                    var process = obj.options.process;
                    if(process=='administration'){
                              $(".button_add_year").click(function(){
                                                  
                                                            var params={
                                                                      data:{
                                                                          title:'Nuevo ejercicio',
                                                                          buttons:[
                                                                              {label:'',event:function(div){
                                                                                var params={action:'new',data:{},userActive:obj.options.userActive};
                                                                                $("#"+div).customFormExercise(params);
                                                                              }}
                                                                          ],
                                                                          firstActive:true,
                                                                          showbuttons:false,
                                                                          rebuild:true
                                                                      }
                                                                  };
                                                             $("#custom_years").customMenu(params);
                                                  
                              });    
                              $('.custom_years .year_action').each(function(){
                                                  $(this).click(function(event){
                                                            var action = $(this).attr('action');
                                                            var id = $(this).attr('year');
                                                            var year = obj.totalYears[id].year;
                                                            var title = $(this).attr('_title');
                                                            if (action=='delete') {
                                                                      var params = {action:'clean',user:obj.options.userActive.id,currentyear:year};
                                                                      var evento = function(){
                                                                                obj.removeExercise(params);
                                                                      };
                                                                      Alert.show({
                                                                                title:'Notificaci&oacute;n',
                                                                                type:'notification',
                                                                                messages:['&iquest;Realmente desea eliminar el Ejercicio '+year+'?'],
                                                                                buttons:[                          
                                                                                          {label:'Si',event:function(){
                                                                                                    evento();
                                                                                          }},
                                                                                          {label:'No'}
                                                                                ]
                                                                      });
                                                            }else{
                                                                      var params={
                                                                                data:{
                                                                                    title:title,
                                                                                    buttons:[
                                                                                        {label:'',event:function(div){
                                                                                            obj.searchRequest({year:year,action:'get'},action,div);
                                                                                        }}
                                                                                    ],
                                                                                    firstActive:true,
                                                                                    showbuttons:false,
                                                                                    rebuild:true
                                                                                }
                                                                            };
                                                                      $("#custom_years").customMenu(params);
                                                            }
                                                            event.stopPropagation();
                                                  });
                              });
                    }else{
                              $('.custom_years .year_action').each(function(){
                                        $(this).click(function(event){
                                                  var action = $(this).attr('action');
                                                  var id = $(this).attr('year');
                                                  var year = obj.totalYears[id].year;
                                                  switch (action) {
                                                            case 'upload': 
                                                                      $('body').upload({userActive:obj.options.userActive,info:'year',data:{year:year,user:obj.options.userActive,width:370,height:225}});
                                                                      break;
                                                            case 'download':
                                                                      $('.app_left_section_years').actionYears({data:{active:obj.options.userActive,action:action,year:year,type:'charge'}});
                                                                      break;
                                                            case 'deleteCharge':
                                                                      var evento = function(type){
                                                                                $('.app_left_section_years').actionYears({data:{active:obj.options.userActive,action:action,year:year,type:type}});
                                                                      };
                                                                      $('body').deleteCharge({userActive:obj.options.userActive,data:{year:year,user:obj.options.userActive,width:370,height:140,evento:evento}});
                                                                      
                                                                      break;
                                                  }
                                                  event.stopPropagation();
                                        });
                              });
                    }
          },
          deleteRequest : function(params){
                    var obj=this;
                    var spinner = $(".spinner_search");
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'notification',
                                                  messages:['La carga del ejercicio '+params.currentyear+' ha sido eliminada satisfactoriamente'],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                                        
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {
                                        //obj.showSpinner();
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                //obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                        //obj.hideSpinner();
                            }
                    };
                    r = $.extend(r, connections.years.deleteCharge);
                    r.data=params;
                    $.ajax(r);
          },
          searchRequest : function(params,action,idDiv){
                    var obj=this;
                    var spinner = $(".spinner_search");
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        obj.createForm(json.data,action,idDiv);
                                        
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {
                              
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                //obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                            }
                    };
                    r = $.extend(r, connections.years.get);
                    r.data=params;
                    $.ajax(r);
          },
          removeExercise : function(params){
                    var obj=this;
                    var spinner = $(".spinner_search");
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        if (obj.options.userActive.currentyear==params.currentyear) {
                                                  setTimeout(function(){
                                                            structure.logoutRequest();
                                                  },100);
                                        }else{
                                                  obj.update();
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
                              obj.showSpinner();
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                //obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                obj.hideSpinner();
                            }
                    };
                    r = $.extend(r, connections.years.remove);
                    r.data=params;
                    $.ajax(r);
          },
          createForm:function(data,action,id){
                    var obj=this;
                    var o = obj.options;
                    var params={action:action,data:data,userActive:o.userActive};
                    $("#"+id).customFormExercise(params);
          },
          
          _create: function() {
                this.show(); 
		this.buildStructure();
                this.events();
          },
      
          _refresh: function(){
            this._trigger( "change" );
          },
         
          _destroy: function() {
              this.element.remove();
          },
    
          _setOptions: function() {
            this._superApply( arguments );
            this._refresh();
          },
          _setOption: function(key, value){
                    this.options[key] = value;
                              switch(key){
                                        case "data":
                                                  this.options.data=value;
                                                  this.update();
                                                  features.loadPredios(this.options.data.active);
                                        break;
                                        case "process":
                                                  this.options.process=value;
                                                  this.update();
                                        break;
                                        case "reload":
                                                  structure.getUsersRequest({action:'getnodes',id:this.options.data.active.id,useractive:this.options.userActive.id,currentyear:this.options.userActive.currentyear});
                                                  
                                                  
                                        break;
                                        
                                        
                                                  
                                                          
                              }
		    }
	  }
);
});