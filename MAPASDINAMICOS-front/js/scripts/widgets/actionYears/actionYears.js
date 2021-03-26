/**
 * Muestra las acciones para realizar en un año determinado, eliminado de carga o descarga
 */
define(["validator","connections","structure","features","graph","restrictions","Alert"], function(validator,connections,structure,features,graph,restrictions,Alert){
$.widget( "custom.actionYears", {
          id:'custom_actionYears',
          countSpinner:0,
          list:{
                    data:{},
                    selected:{},
                    total:0
          },
          idForm:'data_years',
	  options:{
                 data:{
                    active:null,
                    action:null,
                    year:null,
                    type:null,
                    title:null
                 }
          },
	  _init:function(){
                    
	  },
          _create: function() {
		this.update();
          },
          update:function(){
                   this.buildStructure();
                   this.events();
          },
	  buildStructure:function(){
                    var chain = '<div id="'+this.id+'" class="'+this.id+'">'+
                                        this.getTitle()+
                                        this.getDataBlock()+
                                        this.getBlocker()+
                               '<div>';
                    $('.'+this.id).remove();
                    this.element.html(chain);
	  },
          
          
          getTitle:function(){
                              var obj=this;
                              var user = this.options.data.active;
                              var nom = user.username;
                              var label = (obj.options.data.title==null)?'Ejercicio '+this.options.data.year:obj.options.data.title;
                              var role = validator.getRol(user.roleId);
                              var chain='';
                              chain+='<div class="item_user">'+
                                        '<div class="user_alias">'+label+'</div>'+
                                        //'<div class="user_role">('+role+')</div>'+
                                        '<div class="user_back" id="back_years"><img src="img/back.png"></div>'+
                                     '</div>';
                    return chain;
          },

          getDataBlock:function(){
                    var obj=this;
                    var chain='<div class="data_blocks">'+
                                        '<div class="msgError"><div class="label">No existe informaci&oacute;n</div></div>'+
                                        '<div class="tools">'+
                                                  '<div class="allItems">'+
                                                            '<div class="inputAll icon_input template_actionYears tay_notcheck"></div>'+
                                                            '<div class="label">Todo</div>'+
                                                  '</div>'+
                                                  '<div class="button_'+obj.options.data.action+' template_actionYears tay_'+obj.options.data.action+'"></div>'+
                                        '</div>'+
                                        '<div class="list_data">'+
                                        
                                        '</div>'+
                              '</div>';
                    return chain;
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
          eventsIntpus:function(){
                    var obj = this;
                    $("."+obj.id+' .list_data .Row').each(function(){
                              $(this).click(function(){
                                        var item = $(this);
                                        var id = item.attr('id');
                                        var prop = parseInt(item.attr('prop'));
                                        var input = $("#"+id+'_input');
                                        var active = (input.attr('active'))?true:false;
                                        
                                        if (active) {
                                                  input.removeAttr('active');
                                                  obj.list.total-=1;
                                                  input.removeClass('tay_check').addClass('tay_notcheck');
                                                  delete obj.list.selected['i'+prop];
                                        }else{
                                                  input.attr('active','true');
                                                  obj.list.total+=1;
                                                  input.removeClass('tay_notcheck').addClass('tay_check');
                                                  obj.list.selected['i'+prop]=obj.list.data[prop];
                                        }
                                        var inputAll = $("."+obj.id+" .inputAll");
                                        inputAll.removeClass('tay_check').removeClass('tay_notcheck');
                                        if (obj.list.data.length==obj.list.total) {
                                                  inputAll.addClass('tay_check');
                                                  inputAll.attr('active','true');
                                        }else{
                                                  inputAll.addClass('tay_notcheck');
                                                  inputAll.removeAttr('active');
                                        }
                              });
                    });
                    $("."+obj.id+' .inputAll').unbind();
                    $("."+obj.id+' .inputAll').click(function(){
                                        var item = $(this);
                                        var active = (item.attr('active'))?true:false;
                                        if (active) {
                                                  item.removeAttr('active');
                                                  obj.list.total=0;
                                                  item.removeClass('tay_check').addClass('tay_notcheck');
                                                  obj.changeStatusInput(false);
                                        }else{
                                                  item.attr('active','true');
                                                  obj.list.total=obj.list.data.length+0;
                                                  item.removeClass('tay_notcheck').addClass('tay_check');
                                                  obj.changeStatusInput(true);
                                        }
                    });
          },
          events:function(){
                    var obj=this;
                    obj.updateMainList();
                    var o = obj.options.data;
                    $("#back_years").click(function(){
                              if (obj.options.data.title==null) {
                                        $('.app_left_section_years').years({process:'consult',userActive:o.active});
                              }else{
                                    $('.app_left_section_years').hide();    
                              }
                              
                    });
                    
                    $("."+obj.id+" .button_download").click(function(){
                              if (obj.list.total==0) {
                                        obj.showMessage('Debe seleccionar por lo menos un elemento');
                              }else{
                                        var zones = obj.getItemSelected();
                                        if (obj.options.data.type=='polygons') {
                                                  obj.requestList({action:'getSeed',polygons:zones,currentyear:o.year,type:o.type,user:o.active.id});
                                        }else{
                                                  $('body').download({userActive:o.active,data:{year:o.year,user:o.active,width:370,height:140,zones:zones}});
                                        }
                              }
                    });
                    $("."+obj.id+" .button_deleteCharge").click(function(){
                              if (obj.list.total==0) {
                                        obj.showMessage('Debe seleccionar por lo menos un elemento');
                              }else{
                                        var zones = obj.getItemSelected();
                                        //console.log(zones);
                                        var evento = function(){
                                                  obj.requestList({action:'delete',zones:zones,currentyear:o.year,type:o.type});
                                        };
                                        
                                        Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'notification',
                                                  messages:['&iquest;Realmente desea eliminar la informaci&oacute;n seleccionada del ejercicio '+o.year+'?'],
                                                  buttons:[                          
                                                            {label:'Si',event:function(){
                                                                      evento();
                                                            }},
                                                            {label:'No'}
                                                  ]
                                        });
                                        
                              }
                    });
          },
          getItemSelected:function(){
                    var obj = this;
                    var separator = '|';
                    var chain='';
                    for(var x in obj.list.selected){
                              chain+= (chain=='')?obj.list.selected[x]:separator+obj.list.selected[x];
                    }
                    return chain;
          },
          changeStatusInput: function(active){
                    var obj = this;
                    for(var x in obj.list.data){
                              var prop = x;
                              var idInput = obj.id+'Zone'+x+'_input';
                              var input = $("#"+idInput);
                              input.removeClass('tay_check').removeClass('tay_notcheck');
                              if (active) {
                                        input.addClass('tay_check');
                                        input.attr('active','true');
                                        obj.list.selected['i'+prop]=obj.list.data[prop];
                                        
                              }else{
                                        input.addClass('tay_notcheck');
                                        input.removeAttr('active');
                                        delete obj.list.selected['i'+prop];
                              }
                    }
          },
          updateMainList:function(){
                    var obj=this;
                    var o = obj.options.data;
                    var params = {action:'get',currentyear:o.year,type:o.type};
                    if (o.type=='polygons') {
                              params.user=o.active.id
                    }
                    obj.requestList(params);
          },
          fillTable:function(data){
                    var obj=this;
                    var chain='';
                    
                    chain+='<div class="years_table_results">';
                    
                    var clase = 'rowFilled';
                    var btnValidateCharge = false;
                    
                    for(var x in data){
                              var i = data[x];
                              var idItem = obj.id+'Zone'+x;
                             
                              var claseItem = 'tay_notcheck';
                              validateCharge = '<div id="'+idItem+'_input" class="icon_input template_actionYears '+claseItem+'"></div>';
                              
                              chain+='<div id="'+idItem+'"  class="Row" prop="'+x+'">'+
                                        '<div class="Cell text_center borderRow">'+
                                            (
                                             (validateCharge!='')?validateCharge:i.id
                                             )+
                                        '</div>'+
                                        '<div class="Cell borderRow">'+
                                            i+
                                        '</div>'+
                                    '</div>';
                              
                    }
                    chain+='</div>';
                    
                    $('.'+obj.id+' .list_data').html(chain);
                    obj.eventsIntpus();
          },
          showMessage:function(msg){
                     $('body').notification({data:[msg]});
          },
          restatInputAll:function(){
                    var obj = this;
                    var input = $("."+obj.id+" .inputAll");
                    input.removeAttr('active');
                    obj.list.total=0;
                    obj.list.selected={};
                    input.removeClass('tay_check').removeClass('tay_notcheck');
                    input.addClass('tay_notcheck');
                    if (obj.list.data.length==0) {
                              $("."+obj.id+" .allItems").hide();
                    }else{
                               $("."+obj.id+" .allItems").show();
                    }
          },
          
          requestList : function(params){
                    var obj=this;
                    var spinner = $(".spinner_search");
                    var clase='hidden';
                    var valid = false;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                //var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        switch (params.action) {
                                                  case 'get':
                                                            obj.list.data=json.data;
                                                            if ((json.data)&&(json.data.length>0)) {
                                                                      $("#"+obj.id+" .tools").show();
                                                                      $("#"+obj.id+" .msgError").hide();
                                                                      obj.fillTable(json.data);
                                                                      obj.restatInputAll();
                                                            }else{
                                                                      $("#"+obj.id+" .tools").hide();
                                                                      $("#"+obj.id+" .msgError").show();
                                                                      $('#'+obj.id+' .list_data').html('');
                                                            }
                                                            
                                                  break;
                                                  case 'delete':
                                                            setTimeout(function(){features.updatePredios(true);structure.updateListPredios();structure.updateUniverse();},100);
                                                            $('body').notification({data:['Se ha eliminado la carga seleccionada con &eacute;xito']});
                                                  break;
                                                  case 'download':
                                                            
                                                  break;
                                                  case "getSeed":
                                                            setTimeout(function(){
                                                                      var source=connections.polygons.download.url;
                                                                      var r = $.extend(r, source);
                                                                      var path = r.url+'&filename=poligonos&id='+json.data+'&currentyear='+obj.options.data.year;
                                                                      window.open(path);
                                                            },100);
                                                            break;
                                        }
                                         
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    obj.showMessage(msg);
                                    $("#"+obj.id+" .tools").hide();
                                    $("#"+obj.id+" .msgError").show();
                                }
                            },
                            beforeSend: function(xhr) {
                                        obj.showSpinner();
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                //obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                              
                                if ((valid)&&(params.action=='delete')) {
                                        obj.requestList({action:'get',currentyear:obj.options.data.year,type:obj.options.data.type});
                                }
                                obj.hideSpinner();
                            }
                    };
                    var source =null;
                    switch (params.action){
                              case 'get':
                                        source = (obj.options.data.type=='polygons')?connections.polygons.get: connections.zones.get;
                                        break;
                              case 'delete':
                                        source = (obj.options.data.type=='polygons')?connections.polygons.remove: connections.zones.remove;
                                        break;
                              case 'getSeed':
                                        source = connections.polygons.download.getSeed;
                                        break;
                    }
                    
                    r = $.extend(r, source);
                    if (params.action=='get') {
                              r.data = params;
                    }else{
                              for(var x in params){
                                        r.url+='&'+x+'='+params[x];
                              }
                    }
                    $.ajax(r);
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
                                                  this.options.data=value;
                                                  this.update();
                                        break;
                                        
                              }
		    }
	  }
);
});