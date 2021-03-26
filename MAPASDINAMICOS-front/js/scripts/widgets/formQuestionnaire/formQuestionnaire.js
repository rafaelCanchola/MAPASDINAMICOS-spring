/**
 * Permite la visualización y asignacion de valores a los datos que seran asociados a un nuevo usuario, consulta, eliminación o edición de la informacion perteneciente a un usuario
 */
define(["validator","connections","restrictions","structure","Alert"], function(validator,connections,restrictions,structure,Alert){
$.widget( "custom.formQuestionnaire", {
	  options:{
                    data:{},
                    action:'',
                    remove:false
          },
          idSubForm:'subFormQuestionnaire',
          counterSubForm:0,
          info:null,
          countSpinner:0,
          infoSub:null,
          eventsItems:{},
          numForm:0,
	  _init:function(){
                    
	  },
          getTitle:function(opc){
                    var obj = this;
                    var title = '';
                    switch (opc) {
                              case 'new':title='Nuevo cuestionario';
                                        break;
                              case 'delete':title='Eliminar cuestionario';
                                        break;
                              case 'edit':title=(obj.options.data.action=='get')?'Editar cuestionario':'Editar subformulario';
                                        break;
                              case 'consult':title='Consulta de cuestionario';
                                        break;
                              
                    }
                    return title;
          },
          buildStructure:function(){
                          var obj=this;
                          var o = obj.options;
                          obj.id = 'formQuestionnaire';
                          var id = obj.id+'_'+this.element.attr('id');
                          obj._id=this.element.attr('id');
                          var chain = ''+
                                        '<div class="'+obj.id+' '+id+'" id="'+id+'">'+
                                                  '<div class="fq_header">'+
                                                            '<div class="custom_header_image"></div>'+
                                                  '</div>'+
                                                  '<div class="fq_section" style="">'+
                                                            '<div class="option_item_back_q">'+
                                                                      '<div class="icon_q">'+
                                                                                '<div class="custom_menu_back_q"></div>'+
                                                                      '</div>'+
                                                            '</div>'+
                                                            '<div class="option_item_title_q">'+obj.getTitle(o.action)+'</div>'+
                                                  '</div>'+
                                                  '<div class="container_q" style="">'+
                                                            '<div class="tabs_options"></div>'+
                                                            '<div class="background_form_q"></div>'+
                                                            '<div class="ButtonSection" align="center">'+
                                                                      obj.getButtonPartial(o.action)+
                                                                      obj.getButton(o.action)+
                                                            '</div>'+
                                                  '</div>'+
                                                  obj.getBlocker()+
                                        '</div>';
                          
                          $("#"+id).remove();
                          this.element.append(chain);
                          this.element.fadeIn();
                          obj.request(obj.options.data);
          },
          getFields:function(segment){
                    var obj = this;
                    for (var x in data.info) {
                              chain+=obj.getItems(data.info[x]);
                    }
                    return chain;
          },
          showMsg:function(type,messages){
                    Alert.show({
                              title:'Notificaci&oacute;n',
                              type:type,
                              messages:messages,
                              buttons:[{label: ((type=='error')?'Cerrar':'Aceptar')}]
                    });
          },
          saveInformation:function(validateRestricted){
                    var obj = this;
                    var i = obj.info;
                    var result = {};
                    var restrictedNotFilled=0;
                    for (var x in i){
                              var tab = x;
                              for(var y in i[x]){
                                        var item = i[x][y];
                                        var id = tab+'_'+item.id;
                                        var format = $("#"+obj._id+" #"+id).attr('format');
                                        var e = $("#"+obj._id+" #"+id);
                                        switch (item.type) {
                                                  case 'text':
                                                  case 'textarea':
                                                            var value = e.val();
                                                            var readonly = e.attr('readonly');
                                                            var clear = e.attr('clear');
                                                            readonly = ((readonly=='readonly')||(readonly=''))?true:false;
                                                            clear = (clear=='true')?true:false;
                                                            e.removeClass('badInput');
															//console.log("id: " + id);
                                                            if ((validator.isEmpty(value))&&(item.restricted)&&(!readonly)&&(validateRestricted)) {
                                                                restrictedNotFilled+=1;
                                                                $("#"+obj._id+" #"+id+"[restricted='true']").addClass('badInput');
                                                            }else{
                                                                  item.value = e.val();
                                                                  if ((format=='curp')||(format=='fisica')||(format=='moral')) {
                                                                      item.value = item.value.toUpperCase();
                                                                  }
                                                            }
                                                            if ((!readonly)||(clear)) {
                                                                      if(!result[tab]){result[tab]=[]};
                                                                      result[tab].push(item);
                                                            }
                                                            break;
                                                  case 'select':
                                                            item.value = $("#"+obj._id+" #"+id+" option:selected").text();
                                                            
                                                            if(!result[tab]){result[tab]=[]};
                                                            result[tab].push(item);
                                                            
                                                            break;
                                                  case 'check':
                                                  case 'radio':
                                                            //e.removeClass('badInput');
                                                            var selected=[];
                                                            var readonly = false;
                                                            var clear = false;
                                                            $("#"+item.listname+tab+"_"+item.id).removeClass('badInput');
                                                            $("#"+item.listname+tab+"_"+item.id+" input").each(function(){
                                                                      readonly = $(this).attr('disabled');
                                                                      readonly = ((readonly=='disabled')||(readonly=''))?true:false;
                                                                      clear = $(this).attr('clear');
                                                                      clear = (clear=='true')?true:false;
                                                            });
                                                            $("#"+item.listname+tab+"_"+item.id+" input:checked").each(function(){
                                                                      selected.push($(this).next().text());
                                                            });
                                                            item.value = (selected.length==0)?'':item.value;
                                                            if ((selected.length>0)&&(!readonly)) {
                                                                //e.removeClass('badInput');
                                                                item.value = selected.join(',');
                                                            }else{
                                                                      if ((item.restricted)&&(!readonly)&&(validateRestricted)) {
                                                                               $("#"+item.listname+tab+"_"+item.id).addClass('badInput');
                                                                                restrictedNotFilled+=1;
                                                                      }
                                                                  
                                                            }
                                                            if ((!readonly)||(clear)) {
                                                                      if(!result[tab]){result[tab]=[]};
                                                                      result[tab].push(item);
                                                            }
                                                            break;
                                        }
                                        
                              }
                    }
                    if (restrictedNotFilled>0) {
                        obj.showMsg('error',['Debe llenar todos los campos obligatorios']);
                    }else{
                        var response = obj.validateFields();
                        if (response.messages.length>0) {
                            obj.showMsg('error',response.messages);
                        }else{
                              var params = $.extend({json:JSON.stringify(result)},obj.options.data,{action:((validateRestricted)?'set':'save')});
                              //console.log(result);
                              obj.request(params);
                        }
                    }
                    
          },
          events:function(){
                    var obj = this;
                    var o = this.options.data;
                    var id = this.element.attr('id');
                    $("#"+id +" .option_item_back_q").click(function(){
                              obj.hide();
                              
                              setTimeout(function(){
                                        if (obj.options.remove) {
                                                 $("#"+id).remove();
                                        }
                              },200);
                              if (!obj.options.remove) {
                                        try {
                                                  var display = $('.app_left_section_information').css('display');
                                                  if ((display!="none")&&(display)) {
                                                      $('.app_left_section_information').information('update');
                                                  }
                                        }catch(e){}
                                        try {
                                                  var display = $('#custom_deliveredCharge').css('display');
                                                  if ((display!="none")&&(display)) {
                                                      $(".app_left_section").deliveredCharge('update');
                                                  }
                                        }catch(e){}
                              }
                              
                    });
                    $("#"+id+" #edit_form_q_partial").click(function(){
                              obj.saveInformation(false);
                    });
                    $("#"+id+" #edit_form_q").click(function(){
                              obj.saveInformation(true);
                    });
                    
                    $("#new_form,#edit_form").click(function(){
                              
                                       
                                        var a = obj.validateFields();
                                        if (a.messages.length==0) {
                                                  if (obj.options.action=='new') {
                                                            a.params['parent']=obj.options.userActive.id;
                                                  }
                                                  if (obj.options.action=='edit') {
                                                            a.params['id']=obj.options.data.id;
                                                  }
                                                  a.params['currentyear']=obj.options.userActive.currentyear;
                                                  obj.request(a.params);
                                        }else{
                                                  obj.showMsg('error',a.messages);
                                        }
                              
                    });
                    
          },
          getSelect:function(tab,i){
                    var obj = this;
                    var textSelected = '';
                    var id=tab+'_'+i.id;
                    var readonly = (i.enabled)?'':' disabled="disabled" ';
                    var chain='<select class="selectInput" id="'+id+'" field="'+i.id+'" '+readonly+'>';
                    var selected = ' selected="selected" ';
                    
                    for(var x in i.list){
                              var item = i.list[x];
                              if (item.value==item.value) {
                                        textSelected=item.label;
                              }
                              chain+='<option '+readonly+' value="'+item.value+'" '+((i.value==item.value)?selected:'')+'>'+item.label+'</option>';
                    }
                    chain+='</select>';
                    
                    chain =   '<div class="Field">'+
                                        '<div class="label">'+i.label+'</div>'+
                                        chain+
                              '</div>';
                    obj.info[tab].push({type:'select',id:i.id,value:textSelected,listname:i.listname,tablename:i.tablename});
                    return chain;
          },
          getButtonPartial:function(action){
                    var obj = this;
                    return '<button class="buttonCircle" id="'+obj.options.action+'_form_q_partial">Guardar</button>';
          },
          getButton:function(action){
                    var obj = this;
                    return '<button class="buttonCircle" id="'+obj.options.action+'_form_q">Finalizar</button>';
          },
      
          remove:function(){
                    $(".form_message").remove();        
          },
          showMessage:function(msg,type,event){
                    var obj=this;
                    var typeMessage='type_'+type;
                    
                    var messages='';
                    for(var x in msg){
                              messages+='<div class="item_error">'+msg[x]+'</div>';
                    }
                    var chain = '<div class="form_message_veil"></div>'+
                                '<div class="form_message">'+
                                        '<div class="header '+typeMessage+'">'+
                                                  '<div class="close"><div class="template_custom_form_close" type="'+type+'"></div></div>'+
                                                  '<div class="label">Mensaje</div>'+
                                        '</div>'+
                                        '<div class="container">'+
                                                  messages+
                                        '</div>'+
                                        
                              '</div>';
                    $(".form_message").remove();
                    $("body").append(chain);
                    $(".form_message .close").click(function(){
                              if (type=="info") {
                                        $(".icon_search").click();
                                        obj.hide();
                              }
                              $(".form_message,.form_message_veil").remove();
                    })
          },
          getRestricted:function(i){
                  var chain = (i.restricted)?' restricted="true" ':'';
                  return chain;
          },
          getInput:function(tab,i){
                    var obj = this;
                    var id=tab+'_'+i.id;
                    var readOnly = (i.enabled)?'':' readonly ';
                    var maxLength = (i.maxlength)?' maxlength="'+i.maxlength+'" ':'';
                    var placeHolder = (i.placeholder)?' placeholder="'+i.placeholder+'" ':'';
                    var value = (i.value)?' value="'+i.value+'" ':'';
                    var restricted = obj.getRestricted(i);
                    var title = (i.title)?i.title:'';
                    var validate = '';
                    switch (i.format) {
                        case 'email':
                        case 'phone':
                        case 'phonelada':
                        case 'curp':
                        case 'fisica':
                        case 'moral':
                              validate=' validate="true" ';
                              break;
                    }
                    var chain = '<div class="Field">'+
                                        '<div class="label">'+i.label+'</div>'+
                                        '<input class="textInput" titleAtt="'+title+'" format="'+i.format+'" '+restricted+' '+validate+' '+' field="'+i.id+'" id="'+id+'" '+readOnly+' '+maxLength+' '+placeHolder+' '+value+'>'+
                                 '</div>';
                    obj.info[tab].push({type:'text',id:i.id,value:i.value,tablename:i.tablename,restricted:i.restricted});
                    return chain;
          },
          getSubtitle:function(data){
                    return '<div class="subtitle_q">'+data.label+'</div>';
          },
          getCheck:function(tab,i){
                    var obj = this;
                    var id=i.listname+tab+'_'+i.id;
                    var readOnly = (i.enabled)?'':' disabled ';
                    var chain='';
                    var items = '';
                    var value = (i.value)?i.value:'';
                    value = value.split(',');
                    for(var x in i.list){
                              var e = i.list[x];
                              var checked = (value.indexOf(e.value)!=-1)?' checked ':'';
                              items+='<input check="'+id+'" class="checkboxInput" type="checkbox" '+checked+' id="'+id+'_'+e.value+'" '+readOnly+' value="'+e.value+'"><label for="'+id+'_'+e.value+'">'+e.label+'</label>';
                    }
                    var chain = '<div class="Field">'+
                                        '<div class="label">'+i.label+'</div>'+
                                        '<div class="containercheckbox" id="'+id+'">'+
                                                  items+
                                        '</div>'+
                                 '</div>';
                    obj.info[tab].push({type:'check',id:i.id,value:i.value,listname:i.listname,tablename:i.tablename,restricted:i.restricted});
                    return chain;
          },
          getRadio:function(tab,i){
                    var obj = this;
                    var id=i.listname+tab+'_'+i.id;
                    var readOnly = (i.enabled)?'':' disabled ';
                    var chain='';
                    var items = '';
                    var value = (i.value)?i.value:'';
                    value.split(',');
                    for(var x in i.list){
                              var e = i.list[x];
                              var checked = (value.indexOf(e.value)!=-1)?' checked ':'';
                              items+='<input class="radioInput" name="'+id+'" type="radio" '+checked+' id="'+id+'_'+e.value+'" '+readOnly+' value="'+e.value+'"><label for="'+id+'_'+e.value+'">'+e.label+'</label>';
                    }
                    var chain = '<div class="Field">'+
                                        '<div class="label">'+i.label+'</div>'+
                                        '<div class="containerRadio" id="'+id+'">'+
                                                  items+
                                        '</div>'+
                                 '</div>';
                    obj.info[tab].push({type:'radio',id:i.id,value:i.value,listname:i.listname,tablename:i.tablename,restricted:i.restricted});
                    return chain;
          },
          getTextArea:function(tab,i){
                    var obj = this;
                    var id=tab+'_'+i.id;
                    var readOnly = (i.enabled)?'':' readonly ';
                    var maxLength = (i.maxlength)?' maxlength="'+i.maxlength+'" ':'';
                    var placeHolder = (i.placeholder)?' placeholder="'+i.placeholder+'" ':'';
                    var value = (i.value)?' value="'+i.value+'" ':'';
                    var restricted = obj.getRestricted(i);
                    var title = (i.title)?i.title:'';
                    var chain = '<div class="Field">'+
                                        '<div class="label">'+i.label+'</div>'+
                                        '<textarea class="textAreaInput" titleAtt="'+title+'" format="'+i.format+'" '+restricted+' field="'+i.id+'" id="'+id+'" '+readOnly+' '+maxLength+' '+placeHolder+' >'+value+'</textarea>'+
                                 '</div>';
                    obj.info[tab].push({type:'textarea',id:i.id,value:i.value,tablename:i.tablename,restricted:i.restricted});
                    return chain;
          },
          getNumberForm:function(){
                    var obj = this;
                    obj.numForm+=1;
                    return obj.numForm;
          },
          getForm:function(tab,i,idForm){
                  var obj = this;
                  var chain = '';
                  var list = '';
                  var numForm = (idForm)?idForm:'f'+obj.getNumberForm();
                  var readOnly = (i.enabled)?'':' readonly="readonly" ';
                  for(var x in i.list){
                        var e = i.list[x];
                        
                        if (!obj.infoSub[tab]) {
                            obj.infoSub[tab]={};
                        }
                        obj.infoSub[tab][numForm]={value:e.label,columname:i.id,tablename:i.tablename,currentyear:obj.options.data.currentyear,id:e.value};
                        
                        list+='<div class="itemForm" ref="'+e.value+'">'+
                                    '<div class="labelForm">'+e.label+'</div>'+
                                    '<div class="iconForm" parent="'+numForm+'" title="Editar" ref="'+e.value+'" tab="'+tab+'" alt="Editar"><div class="template_formQ tfq_edit"></div></div>'+
                              '</div>';
                  }
                  if (i.list.length==0) {
                        list+='<div class="itemForm">'+
                                    '<div class="labelForm">Sin informaci&oacute;n</div>'+
                              '</div>';
                  }
                  var chain = ((idForm)?'':'<div class="Field" id="'+numForm+'">')+
                                        '<div class="label">'+i.label+'</div>'+
                                        '<div class="formItems" id="'+tab+'_'+i.id+'" '+readOnly+'>'+list+'</div>'+
                                 ((idForm)?'':'</div>');
                  return chain;
          },
          getItem:function(tab,data){
                    var obj = this;
                    var chain='';
                    switch (data.type) {
                              case 'text':
                                        chain=obj.getInput(tab,data);
                                        break;
                              case 'select':
                                        chain=obj.getSelect(tab,data);
                                        break;
                              case 'textarea':
                                        chain=obj.getTextArea(tab,data);
                                        break;
                              case 'radio':
                                        chain=obj.getRadio(tab,data);
                                        break;
                              case 'check':
                                        chain=obj.getCheck(tab,data);
                                        break;
                              case 'subtitle':
                                        chain=obj.getSubtitle(data);
                                        break;
                              case 'form':
                                        chain=obj.getForm(tab,data);
                                        break;
                    }
                    return chain;
          },
          showInformation:function(data){
                   var obj = this;
                   var chain='';
                   var chainTabs ='';
                   var count =1;
                   obj.info = {};
                   obj.infoSub={};
                   for(var x in data){
                              var enableBtnEdit = ((parseInt(x)==(data.length-1))||(data.length==1))?' enableBtn="true" ':'';
                              var tab = data[x].id;
                              var items = data[x].info;
                              obj.info[tab]=[];
                              var active = (count==1)?'active':'';
                              chainTabs +='<div '+enableBtnEdit+' class="tabOption '+active+'" ref="'+tab+'">'+data[x].label+'</div>';
                              chain+='<div class="'+active+' tabContainer tabContainer_'+tab+'">';
                              for(var y in items ){
                                        chain+=obj.getItem(tab,items[y]);
                              }
                              chain+='</div>';
                              count++;
                   }
                   if (data.length==1) {
                    $("#"+obj._id+" #edit_form_q").show();
                   }
                   $("#"+obj._id+" .tabs_options").html(chainTabs);
                   $("#"+obj._id +" .background_form_q").html(chain);
                   $("#"+obj._id+" .tabOption").click(function(){
                              var tab = $(this).attr('ref');
                              $("#"+obj._id+" .tabOption.active").removeClass('active');
                              $("#"+obj._id+" .tabContainer.active").removeClass('active');
                              $(this).addClass('active');
                              $("#"+obj._id+" .tabContainer_"+tab).addClass('active');
                              var showEditButton = $(this).attr('enableBtn');
                              if (showEditButton){
                                    $("#"+obj._id+" #edit_form_q").show();
                              }else{
                                    $("#"+obj._id+" #edit_form_q").hide();
                              }
                    });
                   $("#"+obj._id+" .iconForm").click(function(){
                        var tab = $(this).attr('tab');
                        var parent = $(this).attr('parent');
                        var value = $(this).prev().text();
                        var params = $.extend({}, obj.infoSub[tab][parent]);
                        params.action = 'getSub';
                        params.user = obj.options.data.user;
                        params.id = $(this).attr('ref');
                        params.value = value;
                        obj.counterSubForm+=1;
                        var idSubForm = obj.idSubForm+obj.counterSubForm;
                        $('body').append('<div id="'+idSubForm+'" class="'+obj.idSubForm+'"></div>');
                        $('#'+idSubForm).formQuestionnaire({data:params,action:'edit',parent:parent,tab:tab,remove:true});
                   });
                   $('#'+obj._id+' .Field .textInput').each(function(){
                              $(this).focus(function(){
                                        $(this).removeClass('badInput');
                              });
                    });
                    $('#'+obj._id+' .Field .selectInput').each(function(){
                              $(this).change(function(){
                                        $(this).removeClass('badInput');
                              });
                    });
                     $('#'+obj._id+' .Field .textAreaInput').each(function(){
                              $(this).change(function(){
                                        $(this).removeClass('badInput');
                              });
                    });
                    
                     $('#'+obj._id+' .Field [format="phone"]').each(function(){
                               $(this).keypress(function(event){
                                          var reg =/^\d+$/;
                                          var value = $(this).val();
                                          if(!reg.test(value+event.key)){
                                                event.preventDefault();
                                          }   
                              }); 
                     });
                     $('#'+obj._id+' .Field [format="phonelada"]').each(function(){
                               $(this).keypress(function(event){
                                          var reg =/^\d+$/;
                                          var value = $(this).val();
                                          if(!reg.test(value+event.key)){
                                                event.preventDefault();
                                          }   
                              }); 
                     });
                     $('#'+obj._id+' .Field [format="numeric"]').each(function(){
                               $(this).keypress(function(event){
                                          var reg =/^\d+$/;
                                          var value = $(this).val();
                                          if(!reg.test(value+event.key)){
                                                event.preventDefault();
                                          }   
                              }); 
                     });
                   $('#'+obj._id+' .Field [format="real"]').each(function(){
                              $(this).keypress(function(event){
                                  var reg =/^-?\d*(\.\d+)?$/;
                                  var hasPoint = (event.key=='.')?true:false; 
                                  var value = $(this).val();
                                  if (!reg.test(value+event.key)) {
                                        if ((hasPoint)&&(value.indexOf(event.key)==-1)) {
                                          
                                        }else{
                                              event.preventDefault();
                                        }
                                  }
                               });
                    });
                    $('#'+obj._id+' .containercheckbox').each(function(){
                              $(this).click(function(event){
                                  $(this).removeClass('badInput');
                               });
                    });
                    $('#'+obj._id+' .containerRadio').each(function(){
                              $(this).click(function(event){
                                  $(this).removeClass('badInput');
                               });
                    });
                    
                     
          },
          getBlocker :function(){
                    var chain = '<div class="blocker">'+
                                        '<div class="veil"></div>'+
                                        '<div class="loader" align="center">'+
                                                  '<img src="img/loader.GIF">'+
                                                  '<div class="label">Procesando</div>'+
                                        '</div>'+
                                '</div>';
                    return chain;
          },
          showSpinner:function(){
                    var obj=this;
                    if (obj.countSpinner==0) {
                              $("#"+obj._id +" .blocker").show();
                    }
                    obj.countSpinner+=1;
                   
          },
          hideSpinner:function(){
                    var obj=this;
                    obj.countSpinner-=1;
                    if (obj.countSpinner==0) {
                              $("#"+obj._id +" .blocker").hide();
                    }
          },
          updateSubForm:function(data){
                    var obj = this;
                    var o = obj.options;
                    var tab = o.tab;
                    var chain = obj.getForm(tab,data,o.parent);
                    $(".tabContainer_"+tab+" #"+o.parent).prev().next().html(chain);
                    $('.tabContainer_'+tab+' #'+o.parent+" .iconForm").click(function(){
                        var tab = $(this).attr('tab');
                        var parent = $(this).attr('parent');
                        var value = 'r'+$(this).attr('ref');
                        var params = obj.infoSub[tab][parent];
                        params.action = 'getSub';
                        params.user = obj.options.data.user;
                        params.id = $(this).attr('ref');
                        $('#subFormQuestionnaire').formQuestionnaire({data:params,action:'edit',parent:parent,tab:tab});
                   });
          },
          request : function(params){
                    obj=this;
                    var clase='hidden';
                    var msg = ['Servicio no disponible intente m&aacute;s tarde'];
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        switch (params.action) {
                                                  case 'getSub':
                                                  case 'get':
                                                            obj.showInformation(json.data.tabs);
                                                            obj.eventsTabs(json.data.tabs);
                                                            break;
                                                  case 'set':
                                                  case 'save':
                                                           obj.showMsg('notification',['El registro ha sido guardado satisfactoriamente']);
                                                           
                                                           if(params.tablename){
                                                                      obj.updateSubForm(json.form);
                                                           }
                                                           
                                                            break;
                                        }
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                        obj.showMsg('error',msg);
                                        if (((params.action=='set')||(params.action=='save'))&&(json.data)) {
                                                  obj.markField(json.data);
                                        }
                                }
                                
                            },
                            beforeSend: function(xhr) {
                                obj.showSpinner();
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        obj.showMsg('error',[msg]);
                            },
                            complete: function(solicitudAJAX,estatus) {
                                
                              setTimeout(function(){
                                       structure.updateListQuestionnaire(true);
                              },100);
                              obj.hideSpinner();
                            }
                    };
                    var source=connections.questionnaire[params.action];
                    r = $.extend(r, source);
                    r.data=params;
                    $.ajax(r);
          },
          markField:function(data){
                    var obj = this;
                    for(var x in data.tabs){
                              var tab = data.tabs[x].id;
                              var Tab = data.tabs[x];
                              for(var e in Tab.info){
                                        var i = Tab.info[e];
                                        switch (i.type) {
                                                  case 'text':
                                                            $("#"+tab+'_'+i.id).removeClass('badInput');
                                                            $("#"+tab+'_'+i.id).addClass('badInput');
                                                            break;
                                                  case 'radio':
                                                            $("#"+i.listname+tab+'_'+i.id).removeClass('badInput');
                                                            $("#"+i.listname+tab+'_'+i.id).addClass('badInput');
                                                            
                                                            break;
                                                  case 'check':
                                                            $("#"+i.listname+tab+'_'+i.id).removeClass('badInput');
                                                            $("#"+i.listname+tab+'_'+i.id).addClass('badInput');
                                                             break;
                                        }
                              }
                    }
          },
          enableItems:function(status,id){
                    var obj = this;
                    var item = obj.eventsItems[id];     
                    for(var x in item.enable){
                                        var i = item.enable[x];
                                        switch (i.type) {
                                                  case 'text':
                                                            $("#"+item.tab+'_'+i.id).removeAttr('readonly','').removeClass('badInput');
                                                            if (!status) {
                                                                     $("#"+item.tab+'_'+i.id).attr('readonly','');
                                                                     if (i.clear) {
                                                                                $("#"+item.tab+'_'+i.id).attr('clear','true').val('');
                                                                     }
                                                            }
                                                            
                                                            break;
                                                  case 'radio':
                                                            $("#"+i.listname+item.tab+'_'+i.id).removeClass('badInput');
                                                            $('input[name="'+i.listname+item.tab+'_'+i.id+'"]').removeAttr('disabled','');
                                                            if (!status) {
                                                                      $('input[name="'+i.listname+item.tab+'_'+i.id+'"]').attr('disabled','');
                                                                      if (i.clear) {
                                                                                $('input[name="'+i.listname+item.tab+'_'+i.id+'"]').attr('clear','true').prop('checked', false);
                                                                      }
                                                            }
                                                            break;
                                                  case 'check':
                                                            $("#"+i.listname+item.tab+'_'+i.id).removeClass('badInput');
                                                            $('input[check="'+i.listname+item.tab+'_'+i.id+'"]').removeAttr('disabled','');
                                                            if (!status) {
                                                                      $('input[check="'+i.listname+item.tab+'_'+i.id+'"]').attr('disabled','');
                                                                      if (i.clear) {
                                                                                $('input[check="'+i.listname+item.tab+'_'+i.id+'"]').attr('clear','true').prop('checked', false);
                                                                      }
                                                            }
                                                            break;
                                                  case 'select':
                                                             $("#"+item.tab+'_'+i.id).removeAttr('disabled','');
                                                            if (!status) {
                                                                  $("#"+item.tab+'_'+i.id).attr('disabled','');
                                                                  $("#"+item.tab+'_'+i.id).children('option').each(function(){
                                                                        $(this).attr('disabled','');
                                                                  });
                                                                  if (i.clear) {
                                                                    $("#"+item.tab+'_'+i.id).val($("#"+item.tab+'_'+i.id+" option:first").val());
                                                                  }
                                                            }else{
                                                                  $("#"+item.tab+'_'+i.id).children('option').each(function(){
                                                                        $(this).removeAttr('disabled','');
                                                                  });
                                                            }
                                                            break;
                                                  case 'form':{
                                                            $("#"+item.tab+'_'+i.id).removeAttr('readonly','');
                                                            if (!status) {
                                                                     $("#"+item.tab+'_'+i.id).attr('readonly','');
                                                            }
                                                            break;
                                                  }
                                        }
                                                  
                    }
                    
                    
          },
          eventsTabs:function(data){
                    var obj = this;
                    obj.eventsItems={};
                    for(var x in data){
                              var tab = data[x].id;
                              var actions = data[x].actions;
                              for(var y in actions ){
                                        var i = actions[y];
                                        
                                        switch (i.type){
                                                  case 'radio':
                                                            obj.eventsItems[i.listname+tab+'_'+i.id]=$.extend({}, {tab:tab}, i);
                                                            $("#"+i.listname+tab+'_'+i.id+'_'+i.item.value).attr("action","true");
                                                            $("input[name='"+i.listname+tab+'_'+i.id+"']").each(function(){
                                                                      $(this).click(function(){
                                                                                var action = $(this).attr('action');
                                                                                var idRadio = $(this).attr('name');
                                                                                if (action) {
                                                                                          obj.enableItems(true,idRadio);
                                                                                }else{
                                                                                          obj.enableItems(false,idRadio);
                                                                                }
                                                                      });
                                                            });
                                                            break;
                                                  case 'check':
                                                            obj.eventsItems[i.listname+tab+'_'+i.id+'_'+i.item.value]=$.extend({}, {tab:tab}, i);
                                                            $("#"+i.listname+tab+'_'+i.id+'_'+i.item.value).click(function(){
                                                                      var checked = $(this).is(':checked');
                                                                      var idCheck = $(this).attr('id');
                                                                      if (checked) {
                                                                                obj.enableItems(true,idCheck);
                                                                      }else{
                                                                                obj.enableItems(false,idCheck);
                                                                      }
                                                            });
                                                            break;
                                                  case 'text':
                                                            obj.eventsItems[tab+'_'+i.id]=$.extend({}, {tab:tab}, i);
                                                            $("#"+tab+'_'+i.id).keyup(function(){
                                                                      var value =$(this).val();
                                                                      value = (value=='')?0:value;
                                                                      var idText = $(this).attr('id');
                                                                      var valid = false;
                                                                      switch (i.operator) {
                                                                              case '=':valid = (value==0)?true:false; break;
                                                                              case '>':valid = (value>0)?true:false; break;
                                                                      }
                                                                      if (valid) {
                                                                                
                                                                                obj.enableItems(true,idText);
                                                                      }else{
                                                                                obj.enableItems(false,idText);
                                                                      }
                                                            });
                                                            break;
                                                  case 'select':
                                                            obj.eventsItems[tab+'_'+i.id]=$.extend({}, {tab:tab}, i);
                                                            $("#"+tab+'_'+i.id).change(function(){
                                                                      var id = $(this).attr('id');
                                                                      var value = $("#"+id+" option:selected").val();
                                                                      if(obj.eventsItems[id].item.value == value){
                                                                                obj.enableItems(true,id);
                                                                      }else{
                                                                                obj.enableItems(false,id);
                                                                      }
                                                            });
                                                            break;
                                       }
                              }
                   }
          },
          
          validateFields : function(){
                    var obj=this;
                    var msg=[];
                    $('#'+obj._id+' .Field [validate="true"]').each(function(){
                              var item = $(this);
                              var id=item.attr('id');
                              var value = item.val();
                              var format = item.attr('format');
                              var title = item.attr('titleAtt');
                              var sections = title.split('-');
                              var msgError = (sections.length>1)?'El campo '+sections[0] + ' de la secci&oacute;n '+ sections[1] +' no es v&aacute;lido':'El campo '+sections[0]+' no es v&aacute;lido';
                              var valido = true;
                              item.removeClass('badInput');
                              if (!validator.isEmpty(value)) {
                                    switch (format) {
                                        case 'email':
                                                      if (!validator.isEmail(value)) {
                                                          msg.push(msgError);
                                                          valido=false;
                                                      }
                                                break;
                                          case 'moral':
                                                      if (!validator.isRFC(value,true)) {
                                                          msg.push(msgError);
                                                          valido=false;
                                                      }
                                                break;
                                          case 'fisica':
                                                      if (!validator.isRFC(value,false)) {
                                                          msg.push(msgError);
                                                          valido=false;
                                                      }
                                                break;
                                          case 'curp':
                                                      if (!validator.isCURP(value)) {
                                                          msg.push(msgError);
                                                          valido=false;
                                                      }
                                                break;
                                          case 'phonelada':
                                                      if (!validator.isPhoneLada(value)) {
                                                          msg.push(msgError);
                                                          valido=false;
                                                      }
                                                break;
                                          case 'phone':
                                                      if (!validator.isPhone(value)) {
                                                          msg.push(msgError);
                                                          valido=false;
                                                      }
                                                break;
                                    }
                              }
                              if (!valido) {
                                    item.addClass('badInput');
                              }
                    });
                    
                    return {messages:msg};
          },
          
          
          hide:function(){
                  var obj = this;
                  var id = this.element.attr('id');
                     $("#"+id).fadeOut();
          },
          update:function(){
                   this.buildStructure();
                   this.events();
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
                              this.options.addExecutive=false;
                              switch(key){
                                        case "action":
                                                  this.options.action=value;
                                                  break;
                                        case "data":
                                                  this.options.data = value;
                                                  this.update();
                                                  break;
                                        case "parent":
                                                  this.options.parent=value;
                                                  break;
                                        case "tab":
                                                  this.options.tab=value;
                                                  break;
                                                          
                              }
		    }
	  }
);
});