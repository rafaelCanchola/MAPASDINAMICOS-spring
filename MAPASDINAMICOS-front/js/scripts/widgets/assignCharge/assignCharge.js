/**
 * Permite el despliegue de listas y asignación de cargas para un determinado usuario
 */
define(["validator","connections","structure","map","features","Alert","restrictions"], function(validator,connections,structure,map,features,Alert,restrictions){
$.widget( "custom.assignCharge", {
          id:'custom_assignCharge',
          clockTool:null,
          dataSelected:null,
          countSpinner:0,
          totalCharge:0,
          counterFilter:0,
          fieldsFilter:{},
          dataFilter:{},
	  options:{
                 firstLoad:true,   
                 userActive:null,   
                 process:'assign',
                 data:{
                    active:null
                 },
                 action:'add'
          },
	  _init:function(){
                    
	  },
          
          getTitle:function(){
                    var chain='';
                              var obj=this;
                              var userActive = obj.options.userActive;
                              var user = this.options.data.active;
                              var charge = (user.charge)?user.charge:0;
                              var nom = user.username;
                              var role = validator.getRol(user.roleId);
                              chain+='<div class="item_user">'+
                                        
                                        '<div class="user_alias">'+nom+'</div>'+
                                        '<div class="user_role">('+role+')</div>'+

                                        //'<div class="user_charge">'+charge+'</div>'+
                                       
                                        //'<div class="user_progress" style="background:'+user.color+';"></div>'+
                                        //((user.id!=userActive.id)?
                                         ((true)?
                                                  '<div class="user_back" id="back_assignCharge"><img src="img/back.png"></div>'
                                         :''
                                         )+
                                        
                                     '</div>';
                                     
                    
                    return chain;
          },

          getFilter:function(){
                    var chain='<div class="data_filter">'+
                                        /*
                                        '<div class="boxToSearchFilter">'+
                                                  
                                                    '<input id="filter_search" class="textInput" type="text" value="" placeholder="Texto a buscar"/>'+
                                                    '<div id="autocomplete_search" class="icon_search">'+
                                                        '<div class="icon">'+
                                                            '<div class="customSearch_template_icon"></div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    
                                        '</div>'+
                                        '<div class="filter_results">'+
                                            '<div class="table_filter"></div>'+
                                        '</div>'+
                                        */
                              '</div>';
                    return chain;
          },
          getDataBlocks:function(){
                    var chain='<div class="data_blocks">'+
                                        '<div class="options">'+
                                                 '<div id="dataAssigned" class="option_data" type="1">'+
                                                            '<div class="label">Asignados</div>'+
                                                            '<div class="total"></div>'+
                                                 '</div>'+
                                                 '<div id="dataSelected" class="option_data" type="2">'+
                                                            '<div class="label">Seleccionados</div>'+
                                                            '<div class="total"></div>'+
                                                 '</div>'+
                                                 '<div id="dataNotAssigned" class="option_data" type="3">'+
                                                            '<div class="label">No Asignados</div>'+
                                                            '<div class="total"></div>'+
                                                 '</div>'+
                                        '</div>'+
                                        '<div class="list_data">'+
                                                  '<div class="rows dataAssigned_data"></div>'+
                                                  '<div class="rows dataSelected_data"></div>'+
                                                  '<div class="rows dataNotAssigned_data"></div>'+
                                        '</div>'+
                              '</div>';
                    return chain;
          },
          
          getTools:function(){
                    var chain='<div class="section_tools">'+
                                        '<div class="assignTools">'+
                                                  '<div class="selector">'+
                                                            '<div style="padding-top: 14px;margin-left:3px">'+
                                                                      '<div class="template_assignCharge ArrowDownTool"></div>'+
                                                            '</div>'+
                                                            
                                                  '</div>'+
                                                  '<div id="tool_selected" class="tool_selected" active="false" action="add">'+
                                                            '<div style="padding:2px;">'+
                                                                      '<div class="template_assignCharge addTool" title="Agregar predios disponibles" alt="Agregar predios disponibles"></div>'+
                                                            '</div>'+
                                                            
                                                
                                                  '</div>'+
                                                  '<div class="otherOptions">'+
                                                            '<div class="itemTool" action="add">'+
                                                                      '<div class="template_assignCharge addTool" title="Agregar predios disponibles" alt="Agregar predios disponibles"></div>'+
                                                            '</div>'+
                                                            '<div class="itemTool" action="delete">'+
                                                                      '<div class="template_assignCharge deleteTool" title="Remover predios asignados" alt="Remover predios asignados"></div>'+
                                                            '</div>'+
                                                            
                                                            
                                                  '</div>'+
                                        '</div>'+
                                        '<div class="cancelButton"><button class="button disabled" disabled>Limpiar selecci&oacute;n</button></div>'+
                                        '<div class="assingButton"><button class="button">Aplicar</button></div>'+
                              '</div>';
                    return chain;
          },
          update:function(){
                   this.buildStructure();
                   this.events();
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
	  buildStructure:function(){
                    var chain = '<div id="'+this.id+'" class="'+this.id+'">'+
                                        this.getTitle()+
                                        this.getFilter()+
                                        this.getDataBlocks()+
                                        this.getTools()+
                                        this.getBlocker()+
                               '<div>';
                    $('.'+this.id).remove();
                    this.element.html(chain);
	  },
          selectOption:function(id){
                    var clase = 'option_selected_assign';
                    var idSelected = $("."+clase).attr('id');
                    $("."+idSelected+'_data').hide();
                    $("."+clase).removeClass(clase);
                    $("#"+id).addClass(clase);
                    $("."+id+'_data').show();
                    
          },
          clearClockItemTools:function(){
                  if(this.clockTool){
                              clearTimeout(this.clockTool);
                  }        
          },
         executeClockItemTools:function(){
                 this.clearClockItemTools();
                 this.clockTool = setTimeout(function(){
                              $('.otherOptions').hide();
                    },2000);
                  
          },
          getToolActive:function(){
                 var action = $("#tool_selected").attr('action');
                 return action;
          },
          enableButtonUnselect:function(status){
                    var obj = this;
                    var item = $("."+obj.id+" .cancelButton .button");
                    var c = 'disabled';
                    if (status) {
                            item.removeAttr(c).removeClass(c);  
                    }else{
                              item.attr(c);
                              item.addClass(c);
                    }
          },
          events:function(){
                    var obj=this;
                    obj.dataSelected==null;
                    obj.dataSelected={};
                    obj.request({currentyear:obj.options.userActive.currentyear},'getFields');
                   $("#"+obj.id+" .rows").each(function(){
                              $(this).hide();
                    });
                   $('.otherOptions').hide(); 
                  $("#"+obj.id+" .option_data").each(function(){
                    
                              $(this).click(function(){
                                        var id = $(this).attr('id');
                                        obj.selectOption(id);
                              });
                    });
                  $("."+obj.id+" #autocomplete_search").click(function(){
                              var valor = $("#filter_search").val();
                              $("#filter_search").autocomplete( "search", valor );
                              
                    });
                  obj.selectOption('dataNotAssigned');
                  
                  $(".selector").click(function(){
                              obj.clearClockItemTools();
                             $('.otherOptions').show(); 
                    });
                  $("#tool_selected").click(function(){
                              var clase ='tool_selected_active';
                              var classToadd='';
                              var action = $(this).attr('action');
                              var status=$(this).attr('active');
                              var texto = '';
                              $(".tool_selected .template_assignCharge").removeClass('deleteTool_active').removeClass('addTool_active');
                              $(".tool_selected .template_assignCharge").removeClass('deleteTool').removeClass('addTool');
                              if (status=='true') {
                                        $(this).removeClass(clase);
                                        map.activeControl({control:'pan',active:true});
                                        status='false';
                                        classToadd = (action=='delete')?'deleteTool':'addTool';
                                        texto=(classToadd=='deleteTool')?'Remover predios asignados':'Agregar predios disponibles';
                                        
                              }else{
                                        $(this).addClass(clase);
                                        map.activeControl({control:'squareSelector',active:true});
                                        status='true';
                                        classToadd = (action=='delete')?'deleteTool_active':'addTool_active';
                                        texto=(classToadd=='deleteTool_active')?'Remover predios asignados':'Agregar predios disponibles';
                              }
                              $(".tool_selected .template_assignCharge").addClass(classToadd).attr("alt",texto).attr('title',texto);
                              $(this).attr('active',status);
                    });
                  $(".otherOptions,.tool_selected,.selector").mouseleave(function(){
                              obj.executeClockItemTools();
                    });
                  $(".itemTool").each(function(){
                              $(this).click(function(){
                                        var action = $(this).attr('action');
                                        obj.options.action=action;
                                        $(".tool_selected").attr('action',action);
                                        $(".tool_selected .template_assignCharge").removeClass('deleteTool').removeClass('addTool');
                                        $(".tool_selected .template_assignCharge").removeClass('deleteTool_active').removeClass('addTool_active');
                                        var active = $(".tool_selected").attr('active');
                                        var classToSend = (active=='true')?action+'Tool_active':action+'Tool';
                                        var texto=(action=='add')?'Agregar predios disponibles':'Remover predios asignados';
                                        $(".tool_selected .template_assignCharge").addClass(classToSend).attr("title",texto).attr("alt",texto);
                                        $(".otherOptions").hide();
                                        
                                        
                              });
                    });
                  $(".otherOptions").mouseenter(function(){
                              obj.clearClockItemTools();
                    });
                  obj.updateMainList();
                  
                  $('.assingButton').click(function(){
                              var user = obj.options.data.active;
                              var validCharge = true;
                              var maxCharge = (user.roleId==5)?restrictions.roles['r'+user.roleId].maxCharge:0;
                              var totalChargeSelected = obj.getTotalChargeSelected();
                              var acumulateCharge = obj.totalCharge+totalChargeSelected;
                              /*
                              if (maxCharge>0) {
                                        validCharge = (acumulateCharge>maxCharge)?false:true;
                              }
                              */
                              if (validCharge) {
                                        var action = obj.getToolActive();
                                        obj.sendSelected(action);
                                        obj.enableButtonUnselect(false);
                              }else{
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:['La carga seleccionada es de '+totalChargeSelected+' predios, y acumulada con la carga actual supera el l&iacute;mite de '+maxCharge +' predios permitidos'],
                                                  
                                                  buttons:[{label:'Cerrar'}]
                                        });
                              }
                    });
                  $('.cancelButton').click(function(){
                              obj.updateTotalNotAsigned();
                              obj.clearSelected();
                              features.updatePredios();
                              obj.enableButtonUnselect(false);
                              obj.showRownsHidden();
                    });
                    $("#back_assignCharge").click(function(){
                              $('.app_left_section').userbranch({reload:true});
                              var active = $(".tool_selected").attr('active');
                              if (active=='true') {
                                        map.activeControl({control:'pan',active:true});
                              }
                    });
                    
                    $("."+obj.id +" .blocker").hide();
                    
          },
          clearDataFilter:function(){
                    var obj = this;
                    obj.dataFilter=null;
                    obj.dataFilter={};
          },
          getTotalChargeSelected:function(){
                    var obj=this;
                    var contador=0;
                    for(var x in obj.dataSelected){
                              contador+=1;
                    }
                    return contador;
          },
          addItemFilter:function(item) {
                    var obj=this;
                    obj.counterFilter+=1;
                    obj.dataFilter['F'+obj.counterFilter]=item;
                    var buttonRemove =  '<div id="filter_'+obj.counterFilter+'_close" item="'+obj.counterFilter+'" class="optionRemoveFilter">'+                            
                                                                      '<div class="template_assignCharge delTool"></div>'+
                                        '</div>';
                   
                    var chain='<div id="filter_'+obj.counterFilter+'" class="Row" >'+
                                        '<div class="Cell rowBorderTop">'+
                                            item.alias+"="+item.value+
                                            buttonRemove+
                                        '</div>'+
                              '</div>';
                    
                    $(".table_filter").append(chain);
                    
                    $('.'+obj.id+' .table_filter .optionRemoveFilter:last').click(function(){
                             var cve = $(this).attr('item');
                             obj.removeItemFilter(cve);
                             obj.showFilter();
                             //obj.removeSelectionFromFilter(cve);
                    });
                    //obj.showSelectedByFilter(item);
          },
          removeItemFilter:function(item){
                    var obj = this;
                    $("#filter_"+item).remove();
                    delete obj.dataFilter['F'+item];
          },
          clearFilter:function(){
                    $(".table_filter").html('');
          },
          updateMainList:function(){
                    var obj=this;
                    obj.requestList({action:'get',type:'assigned',user:obj.options.data.active.id,currentyear:obj.options.userActive.currentyear},'dataAssigned');
                    obj.requestList({action:'get',type:'notassigned',user:obj.options.data.active.id,currentyear:obj.options.userActive.currentyear},'dataNotAssigned');
                   
          },
          addRow:function(row,container,action){
                    var obj=this;
                    var i = row;
                    var exitTable = false;
                    var total = obj.getTotalSelected();
                    var chain='';
                    var idItem = obj.id+'Row'+i.id;
                    var clase ='';
                    if ($('.'+container+'_data .assign_table_results').attr('class')) {
                              exitTable=true;
                    }
                    var modeAction = (action)?action:'add';
                    var root = (!exitTable)?'.'+container+'_data':'.'+container+'_data .assign_table_results';
                    chain+=(!exitTable)?'<div class="assign_table_results">':'';
                    
                    
                    $("#"+container +' .total').html('('+total+')');
                    var deleteOption =  '<div id="'+idItem+'_delete" item="'+i.id+'" class="optionDelete" mode="'+modeAction+'">'+                            
                                                                      '<div class="template_assignCharge delTool"></div>'+
                                        '</div>';
                    chain+=   '<div id="'+idItem+'" class="Row '+clase+'" wkt="'+i.point+'">'+
                                        '<div class="Cell w110 text_center rowBorderTop">'+
                                            i.predio+
                                        '</div>'+
                                        '<div class="Cell rowBorderTop">'+
                                            i.place+
                                            deleteOption+
                                        '</div>'+
                              '</div>';
                    chain+=(!exitTable)?'</div>':'';
                    $(root).append(chain);
                    $('.'+container+'_data .assign_table_results .Row:last').click(function(){
                              var wkt=$(this).attr('wkt');
                              map.goPoint(wkt);
                    });
                   
                    $('.'+container+'_data .assign_table_results .optionDelete:last').click(function(){//gordis
                              
                              var idParent = $(this).attr('id').replace('_delete','');
                              var mode = $(this).attr('mode');
                              if (mode=='add') {
                                      var total = (parseInt($("#dataNotAssigned"+' .total').attr('total')))+1;
                              }else{
                                      var total = (parseInt($("#dataAssigned"+' .total').attr('total')))+1;  
                              }
                              
                              
                              setTimeout(function(){
                                        $("#"+idParent).removeClass('rowHidden');
                                        if (mode=='add') {
                                                  $("#dataNotAssigned" +' .total').html('('+total+')').attr('total',total);
                                        }else{
                                                  $("#dataAssigned" +' .total').html('('+total+')').attr('total',total);
                                        }
                              },100);
                              
                              var item = $(this).attr('item');
                              
                              var Predio = {};
                              Predio['item'+i.id]=obj.dataSelected['item'+i.id];
                              features.unSelectPredios(Predio);
                              
                              obj.deleteItemSelected(item);
                              $(this).parent().parent().remove();
                              obj.getTotalSelected();
                              event.stopPropagation();
                    });
                    
          },
          showRownsHidden:function(){
                    var obj = this;
                    $("."+obj.id+' .rowHidden').removeClass("rowHidden");
          },
          clearRowsSelected:function(){
                    var obj = this;
                    var count =0;
                    $("."+obj.id+' .rowHidden').each(function(){
                              $(this).removeClass('rowHidden');
                              count+=1;
                    });
                    var total = (parseInt($("#dataNotAssigned"+' .total').attr('total')))+count;
                    $("#dataNotAssigned" +' .total').html('('+total+')').attr('total',total);
          },
          fillTable:function(data,container,action){
                    var obj=this;
                    var chain='';
                    
                    chain+='<div class="assign_table_results">';
                    /*
                    chain+='<div class="Heading">'+
                              '<div class="Cell borderHeading">'+
                                  '<p>Clave</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow">'+
                                  '<p>Predio</p>'+
                              '</div>'+
                          '</div>';
                          */
                    var clase = 'rowBorderTop';
                    $("#"+container +' .total').html('('+data.length+')').attr('total',data.length).attr('origin',data.length);
                    if (container=='dataSelected') {
                              features.unSelectPredios(obj.dataSelected);
                              obj.dataSelected==null;
                              obj.dataSelected={};
                    }
                    if (container=='dataSelected') {
                              obj.clearRowsSelected();
                              if (action=='delete') {
                                        var total = (parseInt($("#dataAssigned"+' .total').attr('origin')))-data.length;
                                        $("#dataAssigned" +' .total').html('('+total+')').attr('total',total);
                              }else{
                                        var total = (parseInt($("#dataNotAssigned"+' .total').attr('origin')))-data.length;
                                        $("#dataNotAssigned" +' .total').html('('+total+')').attr('total',total);
                              }
                              
                    }
                    for(var x in data){
                              var i = data[x];
                              var idItem = obj.id+'Row'+i.id;
                              var deleteOption ='';
                              var addOption='';
                              if (container=='dataSelected') {
                                        var modeAction = (action)?action:'add';
                                        var deleteOption ='<div id="'+idItem+'_delete" item="'+i.id+'" class="optionDelete" mode="'+modeAction+'">'+                            
                                                                      '<div class="template_assignCharge delTool"></div>'+
                                                            '</div>';
                                        obj.dataSelected['item'+i.id]=i;
                                        $("#"+idItem).addClass('rowHidden');
                              }
                              if (container=='dataAssigned') {
                                        var deleteOption ='<div id="'+idItem+'_delete" item="'+i.id+'" class="optionDeleteAssigned">'+                            
                                                                      '<div class="template_assignCharge delTool"></div>'+
                                                            '</div>';
                                        
                              }
                              if (container=='dataNotAssigned') {
                                        addOption = '<div class="addOption" item="'+i.id+'" place="'+i.place+'" predio="'+i.predio+'"><div class="template_assignCharge leftRow"></div></div>';
                              }
                              
                              chain+='<div id="'+idItem+'" class="Row" wkt="'+i.point+'">'+
                                        '<div class="Cell w110 text_center rowBorderTop">'+
                                            addOption+
                                            i.predio+
                                        '</div>'+
                                        '<div class="Cell rowBorderTop">'+
                                            i.place+
                                            deleteOption+
                                        '</div>'+
                                    '</div>';
                              
                    }
                    chain+='</div>';
                    $('.'+container+'_data').html(chain);
                    $('.'+container+'_data .assign_table_results .Row').each(function(){
                              $(this).click(function(){
                                        var wkt=$(this).attr('wkt');
                                        map.goPoint(wkt);
                              });
                              
                    });
                    $('.'+container+'_data .assign_table_results .optionDelete').each(function(){
                              $(this).click(function(event){
                                        
                                        var mode = $(this).attr('mode');
                                        if (mode=='add') {
                                                var total = (parseInt($("#dataNotAssigned"+' .total').attr('total')))+1;
                                                $("#dataNotAssigned" +' .total').html('('+total+')').attr('total',total);
                                        }else{
                                                var total = (parseInt($("#dataAssigned"+' .total').attr('total')))+1;
                                                $("#dataAssigned" +' .total').html('('+total+')').attr('total',total);
                                        }
                                        
                                        //var total = (parseInt($("#dataNotAssigned"+' .total').attr('total')))+1;
                                        //$("#dataNotAssigned" +' .total').html('('+total+')').attr('total',total);
                                        var idParent = $(this).attr('id').replace('_delete','');
                                        setTimeout(function(){
                                                  $("#"+idParent).removeClass('rowHidden');
                                        },100);
                                        
                                        var item = $(this).attr('item');
                                        var Predio = {};
                                        Predio['item'+item]=obj.dataSelected['item'+item];
                                        features.unSelectPredios(Predio);
                                        obj.deleteItemSelected(item);
                                        $(this).parent().parent().remove();
                                        obj.getTotalSelected();
                                        event.stopPropagation();
                              });
                              
                    });
                    $('.'+container+'_data .assign_table_results .optionDeleteAssigned').each(function(){
                              $(this).click(function(event){
                                        var item = $(this).attr('item');
                                        obj.requestList({action:'set',type:'delete',ids:item,user:obj.options.data.active.id,currentyear:obj.options.userActive.currentyear},'all');
                                        event.stopPropagation();
                              });
                              
                    });
                    
                    $('.'+container+'_data .addOption').each(function(){
                              $(this).click(function(event){
                                        
                                        if (obj.dataSelected==null) {
                                                  obj.dataSelected={};
                                        }
                                        var a = $(this);
                                        var id = a.attr('item');
                                        if (!obj.dataSelected['item'+id]) {
                                                  var total = (parseInt($("#"+container +' .total').attr('total')));
								  if(total>0){
									total = total-1;
								  }
                                                  $("#"+container +' .total').html('('+total+')').attr('total',total);
                                                  var parent = obj.id+'Row'+id;
                                                  $("#"+parent).addClass('rowHidden');
                                                  var predio = a.attr('predio');
                                                  var wkt = $("#custom_assignChargeRow"+id).attr('wkt');
                                                  var place = a.attr('place');
                                                  var data ={id: id, predio: predio, point: wkt,place:place};
                                                  obj.dataSelected['item'+id]=data;
                                                  obj.addRow(data,'dataSelected');
                                                  
                                                  var Predio = {};
                                                  Predio['item'+id]=obj.dataSelected['item'+id];
                                                  features.selectPredios(Predio);
                                        }
                                        obj.enableButtonUnselect(true);
                                        event.stopPropagation();
                              });
                    });
                    if (container=='dataSelected') {
                              features.selectPredios(obj.dataSelected);
                    }
                    if (container=='dataAssigned') {
                              obj.totalCharge=data.length;
                    }
          },
          removeSelectionFromFilter:function(cve){
                    var obj = this;
                    obj.showSpinner();
                    var Predios = {};
                    var contador =0;
                    for(var x in obj.dataSelected){
                              var i = obj.dataSelected[x];
                              var Cve = (cve.length==2)?i.ent:i.cve;
                              if (cve==Cve) {
                                        contador+=1;
                                        Predios['item'+i.id]=$.extend({}, i);
                                        $("#custom_assignChargeRow"+i.id).remove();
                                        obj.deleteItemSelected(i.id);
                              }
                    }
                    features.unSelectPredios(Predios);
                    var total = (parseInt($("#dataNotAssigned"+' .total').attr('total')))+contador;
                    $("#dataNotAssigned" +' .total').html('('+total+')').attr('total',total);
                    obj.hideSpinner();
          },
          deleteItemSelected:function(id){
                    delete this.dataSelected['item'+id];
                    var counter=0;
                    for(var x in this.dataSelected){
                              counter+=1;
                    }
                    $("#dataSelected .total").html('('+counter+')');
                   
          },
          showSelected:function(wkt,wkt2){
                    
                    var obj=this;
                    var total = map.getTotalFeaturesSelected(wkt2);
                    obj.selectOption('dataSelected');
                    var mode = obj.getToolActive();
                    try {
                              var filter = $(".app_bottom_section_predios").reports('getFilter');
                    } catch(e) {
                              var filter = "";
                    }
                    filter = (typeof filter === 'object')?'':filter;
                    var action = obj.getToolActive();
                    
                    var totalItems = (mode=='add')?total.notAssigned:total.assigned;
                    if (validator.validTotalPredios(totalItems)) {
                              obj.requestList({action:'get',type:'selected',mode:mode,wkt:wkt,user:obj.options.data.active.id,currentyear:obj.options.userActive.currentyear,filter:filter},'dataSelected',action);
                    }else{
                              $('body').notification({data:['Debe seleccionar un m&aacute;ximo de 700 predios '+((mode=='add')?'disponibles':'asignados')]});
                    }
                    obj.clearInfoFilter();
          },
          showSelectedByFilter:function(filter){
                    var obj = this;
                    obj.selectOption('dataSelected');
                    var mode = obj.getToolActive();
                    var response = {};
                    response.filters = filter;
                    obj.requestList({action:'get',type:'selected',mode:mode,json:JSON.stringify(response),user:obj.options.data.active.id,currentyear:obj.options.userActive.currentyear},'dataSelected');
          },
          getTotalSelected:function(){
                    var obj=this;
                    var s = obj.dataSelected;
                    var count=0;
                    for(var x in s){
                              count+=1;
                    }
                    if (count>0) {
                              obj.enableButtonUnselect(true);
                    }else{
                              obj.enableButtonUnselect(false);
                    }
                    return count;
          },
          getSelected:function(){
                    var obj=this;
                    var s = obj.dataSelected;
                    var array=[];
                    for(var x in s){
                              array.push(s[x].id);
                    }
                    return array.join(',');
          },
          sendSelected:function(action){
                    var obj=this;
                    if (this.dataSelected!=null) {
                               var ids=this.getSelected();
                               var event = (action=='delete')?'delete':'assigned';
                              obj.requestList({action:'set',type:event,ids:ids,user:obj.options.data.active.id,currentyear:obj.options.userActive.currentyear},'all');
                              
                    }
          },
          updateTotalNotAsigned:function(){
                    var total = $("#dataNotAssigned .total").attr('origin');
                    $("#dataNotAssigned .total").html('('+total+')');
                    var total = $("#dataAssigned .total").attr('origin');
                    $("#dataAssigned .total").html('('+total+')');
                    
          },
          clearSelected:function(){
                    $(".dataSelected_data").html('');
                    $("#dataSelected .total").html('(0)');
                    
                    this.dataSelected=null;
                    //this.clearFilter();
                    this.clearInfoFilter();
          },
          deleteItemSelected:function(id){
                    delete this.dataSelected['item'+id];
                    var counter=0;
                    for(var x in this.dataSelected){
                              counter+=1;
                    }
                    $("#dataSelected .total").html('('+counter+')');
                   
          },
          showError:function(list){
                    var customStyle=(list.length>5)?'height:100px;overflow:auto;':'';
                    var chain = '<div style="width:100%;font-size:110%;'+customStyle+'" align="center">';
                    var clase = '';
                    for(var x in list){
                              clase = (clase=='')?'rowFilledError':'';
                              chain+='<div class="rowError '+clase+'">'+list[x].fol_predio+'</div>';
                    }
                    chain+='</div>';
                    
                    Alert.show({
                              title:'Notificaci&oacute;n',
                              type:'error',
                              messages:['Los siguientes predios ya han sido asignados por otro usuario'],
                              content:chain,
                              buttons:[{label:'Cerrar'}]
                    });
          },
          buildSelectFilter:function(data){
                    var obj=this;
                    fieldsFilter=null;
                    fieldsFilter={};
                    dataFilter=null;
                    dataFilter=[];
                    var chainOptions='';
                    for (var x in data) {
                              var i = data[x];
                              obj.fieldsFilter[i.field]=i;
                              chainOptions+='<option value="'+i.field+'">'+i.alias+'</option>';
                    }
                    var chain=''+
                              '<div class="itemField">'+
                                        '<div class="Field">'+
                                                  '<div class="label">Campo</div>'+
                                                  '<select id="fieldsFilter" class="selectInput">'+
                                                            chainOptions+
                                                  '</select>'+
                                        '</div>'+
                              '</div>'+
                              '<div class="itemField">'+
                                        '<div class="Field">'+
                                                  '<div class="label">Valor</div>'+
                                                  '<input tyle="text" id="valueFilter" placeholder="Introduzca el valor" class="textInput">'+
                                                  
                                        '</div>'+
                              '</div>'+
                              '<div id="btnAddFilter"><div class="template_assignCharge addFilter"></div></div>'+
                              //'<div class="clearFilter"><button class="button" style="width:143px">Limpiar filtro</button></div>'+
                              //'<div class="applyFilter"><button class="button" style="width:143px">Aplicar filtro</button></div>'+
                              '<div class="filter_results">'+
                                            '<div class="table_filter"></div>'+
                              '</div>';
                    $("."+obj.id +" .data_filter").html(chain);
                    
                    $("."+obj.id +" #btnAddFilter").click(function(){
                              var value = $("."+obj.id +" #valueFilter").val();
                              if(!validator.isEmpty(value)){
                                        var field = $('.'+obj.id+' #fieldsFilter option:selected').val();
                                        var item = $.extend( true, {}, obj.fieldsFilter[field] );
                                        item.value = value;
                                        obj.addItemFilter(item);
                                        obj.showFilter();
                              }
                    });
                    /*
                    $("."+obj.id +" .applyFilter").click(function(){
                              var filter = [];
                              for(var x in obj.dataFilter){
                                       var i = obj.dataFilter[x];
                                       filter.push(i);
                              }
                              if (filter.length>0) {
                                       obj.showSelectedByFilter(filter);
                              }
                              
                    });
                    
                    $("."+obj.id +" .clearFilter").click(function(){
                              obj.clearFilter();
                              obj.clearDataFilter();
                    });
                    */
          },
          showFilter:function(){
                    var obj = this;
                    var filter = [];
                    for(var x in obj.dataFilter){
                              var i = obj.dataFilter[x];
                              filter.push(i);
                    }
                    if (filter.length>0) {
                              obj.showSelectedByFilter(filter);
                    }else{
                              obj.updateTotalNotAsigned();
                              obj.clearSelected();
                              features.updatePredios();
                              obj.showRownsHidden();
                    }
          },
          clearInfoFilter:function(){
                    var obj = this;
                    obj.clearFilter();
                    obj.clearDataFilter();
          },
          showMessage:function(){
                    
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
          request : function(params,action){
                    var obj=this;
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        obj.buildSelectFilter(json.data.filters);
                                        valid=true;
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
                    var source =null;
                    switch (action){
                              case 'getFields':
                                        source = connections.assignCharge.getFieldsToFilter;
                                        r = $.extend(r, source);
                                        r.data = params;
                                        break;
                    }
                    
                    $.ajax(r);
          },
          requestList : function(params,container,action){
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
                                        if (params.action=='get') {
                                                 obj.fillTable(json.data.list,container,action);
                                                 
                                        }else{
                                                  //$(".user_charge").html(json.data.charge);
                                                  if (json.data) {
                                                            if (json.data.list) {
                                                                      if (json.data.list.length>0) {
                                                                                obj.showError(json.data.list);
                                                                      }
                                                                      
                                                            }
                                                  }
                                                  
                                                  
                                        }
                                        obj.getTotalSelected();
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
                                if (params.action=='set') {
                                        obj.updateMainList();
                                        obj.clearSelected();
                                        features.updatePredios();
                                }/*
                                if (obj.options.firstLoad) {
                                        features.loadPredios(obj.options.data.active);
                                        obj.options.firstLoad=false;
                                }
                                */
                                obj.hideSpinner();
                            }
                    };
                    var source =null;
                    switch (params.action){
                              case 'get':
                                        source = connections.assignCharge.getList;
                                        break;
                              case 'set':
                                        source = connections.assignCharge.setList;
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
          
          _create: function() {
                var obj = this;
		this.buildStructure();
                this.events();
                structure.clearClockUserRequest();
                
                amplify.subscribe( "setDataSelected", function() {
                              features.setDataSelected(obj.dataSelected);
               });
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
                                        case "firstLoad":
                                                  this.options.firstLoad=value;
                                        break;
                                        case "data":
                                                  this.options.data=value;
                                                  this.update();
                                                  structure.clearClockUserRequest();
                                        break;
                                        case "process":
                                                  this.options.process=value;
                                                  this.update();
                                        break;
                                        case "reload":
                                                  //structure.getUsersRequest(obj.options.userActive);
                                                  structure.getUsersRequest({action:'getnodes',id:this.options.userActive.id,currentyear:obj.options.userActive.currentyear});
                                                  
                                        break; 
                              }
                              this.countSpinner=0;
		    }
	  }
);
});