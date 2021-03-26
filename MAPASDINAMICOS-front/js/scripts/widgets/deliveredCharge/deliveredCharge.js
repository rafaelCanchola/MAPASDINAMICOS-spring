/**
 * Muesta el despliegue de listas de información asociada a predios entregados y por entregar, asi como da la opción para validar
 * los predios entregados por un brigadista
 */
define(["validator","connections","structure","map","features"], function(validator,connections,structure,map,features){
$.widget( "custom.deliveredCharge", {
          id:'custom_deliveredCharge',
          dataDelivered:null,
          dataValidated:null,
          countSpinner:0,
          idForm:'delivered_form',
	  options:{
                 firstLoad:true,
                 userActive:null,
                 userLogged:null,
                 data:{
                    active:null
                 }
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
                              if ((obj.options.data.active.phases)&&(obj.options.userLogged.roleId!=6)) {
                                       var validation = (obj.options.data.active.phases.btnValidateCharge)?true:false;
                              }else{
                                        var validation = false;
                              }
                              if (userActive!=null) {
                                        var userLogged = amplify.store( 'dataLoggingAGAVE' );
                                        if ((userLogged.roleId>5)&&(userLogged.roleId!=6)) {
                                                  validation = true;
                                        }
                              }
                              
                              chain+='<div class="item_user">'+
                                        
                                        '<div class="user_alias">'+nom+'</div>'+
                                        '<div class="user_role">('+role+')</div>'+

                                         ((obj.options.userActive)?
                                                  '<div class="user_back" id="back_deliveredCharge"><img src="img/back.png"></div>'
                                         :''
                                         )+
                                         '<div class="userTools">'+
                                                  (
                                                  ((!validation)&&(obj.options.userLogged.roleId!=6))?
                                                            '<div class="icon_upload">'+
                                                                      '<div class="template_deliveredCharge tdc_upload"></div>'+
                                                            '</div>'+
                                                            
                                                            '<div class="icon_download">'+
                                                                      '<div class="template_deliveredCharge tdc_download"></div>'+
                                                            '</div>'
                                                            :''
                                                  )+
                                         '</div>'+
                                         
                                     '</div>';
                                     
                    
                    return chain;
          },

          
          getDataBlocks:function(){
                    var obj=this;
                    if ((obj.options.data.active.phases)&&(obj.options.userLogged.roleId!=6)) {
                              var validation = obj.options.data.active.phases.btnValidateCharge;
                    }else{
                              var validation = false;
                    }
                    
                    var classValidation = (validation)?'rowsValidation':'';
                    //var classFilter = (!validation)?'rowsFilter':'';
                    var classFilter = 'rowsFilter';
                    var chain='<div class="data_blocks">'+
                                        '<div class="options">'+
                                                  '<div id="dataValidated" class="option_data" type="3">'+
                                                            '<div class="label">Validados</div>'+
                                                            '<div class="total"></div>'+
                                                 '</div>'+
                                                 '<div id="dataDelivered" class="option_data" type="1">'+
                                                            '<div class="label">Entregados</div>'+
                                                            '<div class="total"></div>'+
                                                 '</div>'+
                                                 '<div id="dataByDelivering" class="option_data" type="2">'+
                                                            '<div class="label">Por entregar</div>'+
                                                            '<div class="total"></div>'+
                                                 '</div>'+
                                        '</div>'+
                                        '<div class="list_data">'+
                                                  '<div class="filter">'+
                                                            '<input id="textFilter" class="textFilter" type="text" value="" placeholder="Predio a filtrar">'+
                                                            '<div class="buttonDelete">'+
                                                                      '<div class="template_userbranch tub_delete"></div>'+
                                                            '</div>'+
                                                            '<div class="buttonFilter">'+
                                                                      '<div class="icon">'+
                                                                                '<div class="template_information ti_search"></div>'+
                                                                      '</div>'+
                                                            '</div>'+
                                                  '</div>'+
                                                  '<div class="rows dataValidated_data"></div>'+
                                                  '<div class="rows dataDelivered_data '+classValidation+' '+ classFilter+'"></div>'+
                                                  '<div class="rows dataByDelivering_data"></div>'+
                                                  (
                                                            (validation)?
                                                            '<div class="dataDelivered_data_validation" align="center">'+
                                                                      '<button class="textButton" id="storeValidation">Guardar validaci&oacute;n</button>'+
                                                            '</div>'
                                                            : ''
                                                   )+
                                                  
                                        '</div>'+
                              '</div>';
                    return chain;
          },
          
          
          update:function(){
                   this.buildStructure();
                   this.events();
          },
	  buildStructure:function(){
                    var chain = '<div id="'+this.id+'" class="'+this.id+'">'+
                                        this.getTitle()+
                                        this.getDataBlocks()+
                                        this.getBlocker()+
                               '<div>';
                    $('.'+this.id).remove();
                    this.element.html(chain);
	  },
          selectOption:function(id){
                    var obj = this;
                    var clase = 'option_selected_delivered';
                    var idSelected = $("."+clase).attr('id');
                    $("."+idSelected+'_data').hide();
                    $("."+idSelected+'_data_validation').hide();
                    $("."+clase).removeClass(clase);
                    $("#"+id).addClass(clase);
                    $("."+id+'_data').show();
                    $("."+id+'_data_validation').show();
                    if (id=='dataDelivered') {
                              $("."+obj.id+' .filter').show();
                    }else{
                              $("."+obj.id+' .filter').hide();
                    }
                    
          },
         
          events:function(){
                    var obj=this;
                    $(".dataDelivered_data_validation").hide();
                    $("#"+obj.id+" .rows").each(function(){
                              $(this).hide();
                    });
                  $("#"+obj.id+" .option_data").each(function(){
                    
                              $(this).click(function(){
                                        var id = $(this).attr('id');
                                        obj.selectOption(id);
                              });
                    });
                  var btnToActive = 'dataByDelivering';
                  if ((obj.options.data.active.phases)&&(obj.options.userLogged.roleId!=6)) {
                    if (obj.options.data.active.phases.btnValidateCharge) {
                              btnToActive='dataDelivered';
                    }
                  }
                 
                  obj.selectOption(btnToActive);
                  obj.valid=null;
                  obj.valid={};
                  obj.updateMainList();
                  
                    $("#back_deliveredCharge").click(function(){
                              //features.clearPolygons();
                              features.clearTracklog();
                              $('.app_left_section').userbranch({reload:true});
                    });
                    
                    $("."+obj.id+' .icon_upload').click(function(){
                              $('body').upload({userActive:obj.options.userActive,info:'user',data:{user:obj.options.data.active,width:410,height:240}});
                    });
                    $("."+obj.id+' .icon_download').click(function(){
                              
                              //window.open(connections.charge.download.url+'user='+obj.options.data.active.id);
                              
                              $("#"+obj.id+" #"+obj.idForm).remove();
			      var cadena = '<form id="'+obj.idForm+'" action="'+connections.charge.download.url+'user='+obj.options.data.active.id+'&currentyear='+obj.options.userLogged.currentyear+'" method="POST" enctype="multipart/form-data" style="display:none">'+
                                                  '<input type="submit" value="Submit">'+
                                           '</form>';
			      $("#"+obj.id).append(cadena);
			      $("#"+obj.id+" #"+obj.idForm).submit();
			      
                    });
                    $("#storeValidation").click(function(){
                              var ids2 = obj.getInvalids();
                              var ids = obj.getValids();
                              
                              obj.requestList({action:'set',useractive:obj.options.userLogged.id,user:obj.options.data.active.id,valid:ids,invalid:ids2,currentyear:obj.options.userLogged.currentyear});
                              
                    });
                    $("."+obj.id +' .buttonFilter').click(function(){
                              var text = $("."+obj.id+" #textFilter").val();
                              obj.filterByText(text);
                    });
                    $("."+obj.id +' #textFilter').bind("keypress", function(evt) {
                                        var otherresult = 12;
                                        if(window.event != undefined){
                                              otherresult = window.event.keyCode;
                                        }
                                        var charCode = (evt.which) ? evt.which : otherresult;  
                                        var keyChar = String.fromCharCode(charCode);
                                        var keyChar2 = keyChar.toLowerCase();
                                        var re =   /^[a-z0-9]+$/i
                                        var result = re.test(keyChar2);
                                        return result;
                    }).bind("paste",function(event){
                              var item = $(this);
                              setTimeout(function(){
                                        var value = item.val();
                                        var re =   /^[a-z0-9]+$/i
                                        var result = re.test(value);
                                        if (!result) {
                                              item.val('');
                                        }else{
                                                  if (value!='') {
                                                            obj.runFilter(value);
                                                  }
                                              
                                        }
                                        
                              },100);
                              
                    }).bind("keyup", function(evt) {
                              var item = $(this);
                              var value = item.val();
                              if (value!='') {
                                       $("."+obj.id+" .filter .buttonDelete").show();
                                       obj.runFilter(value);
                              }else{
                                        $("."+obj.id+" .filter .buttonDelete").hide();
                              }
                              
                              
                    });
                    $("."+obj.id+" .filter .buttonDelete").click(function(){
                              obj.clearFilter();
                              $("."+obj.id+" #textFilter").val('');
                              $(this).hide();
                              
                    });
                    $("."+obj.id+" .filter .buttonDelete").hide();
          },
          clockFilter:null,
          runFilter:function(text){
                    var obj = this;
                    if (obj.clockFilter) {
                              clearTimeout(obj.clockFilter);
                              obj.clockFilter = null;
                    }
                    obj.clockFilter = setTimeout(function(){
                              obj.filterByText(text);
                    },500);
          },
          dataFiltered:[],
          clearFilter:function(){
                  var obj = this;
                  for(var x in obj.dataFiltered){
                    var i = obj.dataFiltered[x];
                    $(".dataDelivered_data #custom_deliveredChargeRow"+i).show();
                  }
                  obj.dataFiltered=null;
                  obj.dataFiltered=[];
          },
          filterByText:function(text){
                    var obj = this;
                    text = text.toUpperCase();
                    obj.clearFilter();
                    for(var x in obj.dataDelivered){
                              var i = obj.dataDelivered[x];
                              if (i.predio.indexOf(text)==-1) {
                                        $(".dataDelivered_data #custom_deliveredChargeRow"+i.id).hide();
                                        obj.dataFiltered.push(i.id);
                              }
                    }
          },
          updateMainList:function(){
                    var obj=this;
                    var tipoDelivered = 'delivered';
                    if ((obj.options.data.active.phases)&&(obj.options.userLogged.roleId!=6)){
                              if (obj.options.data.active.phases.btnValidateCharge) {
                                        tipoDelivered = 'validated';     
                              }
                    }
                    obj.requestList({action:'get',type:'validated',useractive:obj.options.userLogged.id,user:obj.options.data.active.id,currentyear:obj.options.userLogged.currentyear},'dataValidated');
                    obj.requestList({action:'get',type:tipoDelivered,useractive:obj.options.userLogged.id,user:obj.options.data.active.id,currentyear:obj.options.userLogged.currentyear},'dataDelivered');  
                    obj.requestList({action:'get',type:'notuploaded',useractive:obj.options.userLogged.id,user:obj.options.data.active.id,currentyear:obj.options.userLogged.currentyear},'dataByDelivering');
                   
          },
          getTotal:function(data){
                    var total = 0;
                    for(var x in data){
                              var i = data[x];
                              var p = i.predio.toLowerCase();
                              if (p.indexOf('_l')==-1) {
                                        total+=1;
                              }
                    }
                    return total;
          },
          fillTable:function(data,container){
                    var obj=this;
                    var chain='';
                    if (container=='dataDelivered') {
                             obj.dataDelivered=null;
                              obj.dataDelivered={};
                    }
                    if (container=='dataValidated') {
                             obj.dataValidated=null;
                             obj.dataValidated={};
                    }
                    
                    chain+='<div class="delivered_table_results">';
                    
                    var clase = 'rowFilled';
                    var total = obj.getTotal(data);
                    //$("#"+container +' .total').html('('+data.length+')');
                    $("#"+container +' .total').html('('+total+')');
                    var btnValidateCharge = false;
                    if ((this.options.data.active.phases)&&(obj.options.userLogged.roleId!=6)) {
                             btnValidateCharge = (this.options.data.active.phases.btnValidateCharge)?true:false;
                    }
                    
                    
                    for(var x in data){
                              var i = data[x];
                              var aditionalClase='';
                              var validateCharge ='';
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled ';
                              }
                              var idItem = obj.id+'Row'+i.id;
                              
                              var deleteOption ='';
                              var optionButtons='';
                              var wkt = i.wkt;
                              //i.tracklog=true;
                              //i.geometry='track';
                              //i.additionalLabel = 'nuevo';
                              var geometryIcon='';
                              var additionalLabel = (i.additionalLabel)?' <span class="additionalLabel"> ('+i.additionalLabel+')</span>':'';
                              //i.geometry='track';
                              if (i.geometry) {
                                        switch (i.geometry) {
                                                  case 'free':
                                                            var hint = validator.convertToHtml('Pol&iacute;gono a mano alzada');
                                                            
                                                            break;
                                                  case 'polygon':
                                                            var hint = validator.convertToHtml('Pol&iacute;gono');
                                                            
                                                            break;
                                                  case 'track':
                                                            var hint = validator.convertToHtml('Pol&iacute;gono levantado con recorrido')
                                                            
                                                            break;
                                                  case 'point':
                                                            var hint = 'Punto';
                                                                                                                       
                                                            break;
                                        }
                                        geometryIcon= '<div class="template_deliveredCharge tdc_'+i.geometry+'" title="'+hint+'"></div>';
                              }
                              
                              switch(container) {
                                        case 'dataDelivered':
                                                  optionButtons ='<div id="'+idItem+'_tracklog" item="'+i.id+'" class="optionTracklog" section="'+container+'">'+                            
                                                                                '<div class="template_deliveredCharge tdc_tracklog"></div>'+
                                                                 '</div>';
                                                  if(!i.tracklog){
                                                      optionButtons  = '';      
                                                  }       
                                                  
                                                  aditionalClase=' polygon';
                                                  //var claseItem = (i.valid)?'tdc_check':'tdc_notcheck';
                                                  //i.warning=1;
                                                  var claseItem = (i.warning)?'tdc_warning':'tdc_checkempty';
                                                  //var claseItem = 'tdc_checkempty';
                                                  var extraIcon = (i.warning)?'_warning':'';
                                                  validateCharge = ((btnValidateCharge)||(i.warning))?'<div item="'+i.id+'" class="icon_input'+extraIcon+' template_deliveredCharge '+claseItem+'"></div>':'';
                                                  validateCharge = (i.enabled)?validateCharge:'<div></div>';
                                                  /*
                                                  if (!i.valid) {
                                                            obj.valid['item'+i.id]=i.id;
                                                  }
                                                  */
                                                  obj.dataDelivered['item'+i.id]=i;
                                                  i.valid = null;
                                            break;
                                        case 'dataValidated':
                                                  optionButtons ='<div id="'+idItem+'_tracklog" item="'+i.id+'" class="optionTracklog" section="'+container+'">'+                            
                                                                                '<div class="template_deliveredCharge tdc_tracklog"></div>'+
                                                                 '</div>';
                                                  if(!i.tracklog){
                                                      optionButtons  = '';      
                                                  }       
                                                  
                                                  aditionalClase=' polygon';
                                                  validateCharge = '';
                                                  obj.dataValidated['item'+i.id]=i;
                                            break;
                                        default:
                                                  optionButtons ='<div id="'+idItem+'_RowSel" item="'+i.id+'" class="optionRow">'+                            
                                                                                '<div class="template_deliveredCharge tdc_row"></div>'+
                                                                 '</div>';
                                            
                              }
                              var altText = '';
                              if (i.warning) {
                                        switch (i.warning) {
                                                  
                                                  case 1:altText="Este folio require subir tracklogs para su validaci&oacute;n";
                                                            break;
                                                  case 2:altText="Este folio require subir imagenes para su validaci&oacute;n";
                                                            break;                                                
                                                  case 3:altText="Este folio require subir cuestionario para su validaci&oacute;n";
                                                            break;
                                                  case 4:altText="Este folio require subir tracklogs,imagenes y cuestionario para su validaci&oacute;n";
                                                            break;                                                
                                                  case 5:altText="Debe validar todos los lotes de este folio";
                                                            break;
												  case 6:altText="Debe revisar el cuestionario de este folio";
                                                            break;
                                        }
                              }
                              if (altText!='') {
                                        altText=' title="'+altText+'" alt="'+altText+'"';
                              }
                              
                              chain+='<div id="'+idItem+'" class="Row '+clase+aditionalClase+'" wkt="'+wkt+'" '+altText+'>'+
                                        '<div class="Cell text_center">'+
                                            (
                                             (validateCharge!='')?validateCharge:i.id
                                             )+
                                        '</div>'+
                                        '<div class="Cell borderRow">'+
                                            i.predio+
                                            additionalLabel+
                                            optionButtons+
                                            geometryIcon+
                                        '</div>'+
                                    '</div>';
                              
                    }
                    chain+='</div>';
                    
                    $('.'+container+'_data').html(chain);
                    $('.'+container+'_data .delivered_table_results .Row').each(function(){
                              $(this).click(function(){
                                        var wkt=$(this).attr('wkt');
                                        if (wkt.indexOf('POINT')!=-1) {
                                                  map.goPoint(wkt);
                                        }else{
                                                  map.goPolygon(wkt);
                                        }
                              });
                              
                    });
                    
                    $('.'+container+'_data .delivered_table_results .polygon').each(function(){
                              
                              $(this).mouseover(function(){
                                        var id = $(this).attr('id');
                                        var wkt=$(this).attr('wkt');
                                        if (wkt.indexOf('POLYGON')!=-1) {
                                                  id = id.replace(obj.id+'Row','');
                                                 features.selectPolygon(id);
                                        }
                              });
                              $(this).click(function(){
                                        var id = $(this).attr('id');
                                        var wkt=$(this).attr('wkt');
                                        if (wkt.indexOf('POLYGON')!=-1) {
                                                 map.goPolygon(wkt);
                                        }
                              });
                              
                    });
                    
                    $('.'+container+'_data .delivered_table_results .optionTracklog').each(function(){
                              $(this).click(function(event){
                                        var item = $(this).attr('item');
                                        var section = $(this).attr('section');
                                        var wkt = $("#custom_deliveredChargeRow"+item).attr('wkt');
                                        map.goPolygon(wkt);
                                        obj.drawTracklog(item,section);
                                        event.stopPropagation();
                              });
                              
                    });
                    if (container=='dataDelivered') {
                              //features.loadPolygons(data);
                              $('.'+container+'_data').mouseleave(function(){
                                        features.unselectPolygon();
                              });
                              $('.'+container+'_data .delivered_table_results .icon_input').each(function(){
                                        $(this).click(function(event){
                                                  var status = $(this).attr('active');
                                                  var clase='';
                                                  $(this).removeClass('tdc_checkempty');
                                                  $(this).removeClass('tdc_notcheck');
                                                  $(this).removeClass('tdc_check');
                                                  var id =$(this).attr('item');
                                                  if (status=='true') {
                                                            status = 'false';
                                                            clase='tdc_notcheck';
                                                            obj.addInvalid(id);
                                                  }else{
                                                            status = 'true';
                                                            clase='tdc_check';
                                                            obj.removeInvalid(id);
                                                  }
                                                  $(this).addClass(clase).attr('active',status);
                                                  event.stopPropagation();
                                        }).dblclick(function(event){
                                                  var id =$(this).attr('item');
                                                  $(this).removeClass('tdc_checkempty');
                                                  $(this).removeClass('tdc_notcheck');
                                                  $(this).removeClass('tdc_check');
                                                  $(this).addClass('tdc_checkempty');
                                                  $(this).removeAttr('active');
                                                  obj.removeInvalid(id);
                                                  obj.removeValid(id);
                                                  event.stopPropagation();
                                        }); 
                              });
                              
                             
                    }

          },
          addInvalid:function(id){
                    var obj = this;
                    //this.valid['item'+id]=id;
                    obj.dataDelivered['item'+id].valid=false;
          },
          removeInvalid:function(id){
                    var obj = this;
                    //delete this.valid['item'+id];
                    obj.dataDelivered['item'+id].valid=true;
          },
          removeValid:function(id){
                    var obj = this;
                    //delete this.valid['item'+id];
                    obj.dataDelivered['item'+id].valid=null;
          },
          /*
          getInvalids:function(){
                    var obj = this;
                    var response=[];
                    for(var x in obj.valid){
                              response.push(obj.valid[x]);
                    }
                    return response.join(',');
          },
          */
          getInvalids:function(){
                    var obj = this;
                    var response=[];
                    for(var x in obj.dataDelivered){
                              var i  = obj.dataDelivered[x];
                              if (i.valid==false) {
                                        response.push(i.id);
                              }
                    }
                    return response.join(',');
          },
          getValids:function(){
                    var obj = this;
                    var response=[];
                    for(var x in obj.dataDelivered){
                              var i = obj.dataDelivered[x];
                              if (i.valid==true) {
                                       response.push(i.id);
                              }
                              
                    }
                    return response.join(',');
          },
          drawTracklog:function(id,section){
                    var predio = this[section]['item'+id].predio;
                    features.loadTracklog(predio);
                    
                   
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
          showError:function(list){
                    
          },
          showMessage:function(){
                    
          },
          requestList : function(params,container){
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
                                                  obj.fillTable(json.data.list,container);
                                        }else{
                                                  $('body').notification({data:['Se ha guardado con &eacute;xito la validaci&oacute;n de predios']});
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
                              /*
                                if (obj.options.firstLoad) {
                                        features.loadPredios(obj.options.data.active);
                                        obj.options.firstLoad=false;
                                }
                                */
                                features.loadPredios(obj.options.data.active);
                                if (params.action=='set') {
                                        setTimeout(function(){
                                                  $(".app_left_section").deliveredCharge(obj.options);
                                                  features.loadPredios();
                                        },100);
                                }
                                obj.hideSpinner();
                            }
                    };
                    var source =null;
                    switch (params.action){
                              case 'get':
                                        source = connections.deliveredCharge.getDelivered;
                                        if (params.type=='notuploaded') {
                                                  source = connections.deliveredCharge.getByDelivering;
                                        }
                                        if (params.type=='validated') {
                                                  if (container=='dataDelivered') {
                                                            source = connections.validateCharge.get;
                                                  }else{
                                                            source = connections.deliveredCharge.getValidated;
                                                  }         
                                        }
                                        
                                        break;
                              case 'set':
                                        source = connections.validateCharge.set;
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
		this.buildStructure();
                this.events();
                structure.clearClockUserRequest();
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
                                        case "userActive":
                                                  this.options.userActive=value;
                                                  this.countSpinner=0;
                                        break;
                                        case "data":
                                                  this.options.data=value;
                                                  this.update();
                                                  structure.clearClockUserRequest();
                                                  
                                        break;
                                        
                                        case "reload":
                                                  //structure.getUsersRequest(obj.options.userActive);
                                                  structure.getUsersRequest({action:'getnodes',id:this.options.userActive.id,currentyear:obj.options.userLogged.currentyear});
                                                  
                                        break; 
                              }
                              
		    }
	  }
);
});