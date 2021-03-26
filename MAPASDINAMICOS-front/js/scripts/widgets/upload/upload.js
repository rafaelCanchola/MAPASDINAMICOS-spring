/**
 * Permite la carga de archivos al servidor, mediante el empledo de tres bloques para subir archivos
 */
define(["validator","connections","structure","Alert","features"], function(validator,connections,structure,Alert,features){
$.widget( "custom.upload", {
	  id:'custom_upload',
          countSpinner:0,
          typeSelected:null,
          options:{
                 info:null,//tipo de informacion a cargar
                 userActive:null,
                 dataFile:null,
                 data:{
                              user:null,
                              width:300,
                              height:180
                    }
          },
	  _init:function(){
                    
	  },
          getBlocker :function(){
                    var obj = this;
                    var label = (obj.typeSelected=='csv')?"universo":"carga";
                    var chain = '<div class="blocker">'+
                                        '<div class="veil"></div>'+
                                        '<div class="loader" align="center">'+
                                                  '<img src="img/loader.gif">'+
                                                  '<div class="label">Enviando '+label+'</div>'+
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
                    if (this.options.info=='user') {
                              var title = 'Subir carga de trabajo para '+o.user.username;
                    }else{
                              var title = 'Subir carga para el ejercicio '+this.options.data.year;
                    }
                    chain+=   '<div class="header_upload" style="width:'+o.width+'px">'+
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
                                                  ((obj.options.info=='user')?
                                                  '<div class="sectionTabs">'+
                                                            '<div id="up_questionnaire" status="close" class="item_head_upload" type="questionnaire" align="center">'+
                                                                      '<div class="border_head"></div>'+
                                                                      '<div class="icon_head">'+
                                                                          '<div class="template_upload tu_questionnaire"></div>'+
                                                                      '</div>'+
                                                                      '<div class="label_head3">Cuestionario</div>'+
                                                            '</div>'+
                                                            '<div id="up_images" status="close" class="item_head_upload" type="images" align="center">'+
                                                                      '<div class="border_head"></div>'+
                                                                      '<div class="icon_head">'+
                                                                          '<div class="template_upload tu_images"></div>'+
                                                                      '</div>'+
                                                                      '<div class="label_head3">Imagenes</div>'+
                                                            '</div>'+
                                                            '<div id="up_tracklog" status="close" class="item_head_upload" type="tracklog" align="center">'+
                                                                      '<div class="border_head"></div>'+
                                                                      '<div class="icon_head">'+
                                                                          '<div class="template_upload tu_tracklog"></div>'+
                                                                      '</div>'+
                                                                      '<div class="label_head3">Recorrido</div>'+
                                                            '</div>'+
                                                            '<div id="up_charge" status="close" class="item_head_upload" type="charge" align="center">'+
                                                                      '<div class="border_head"></div>'+
                                                                      '<div class="icon_head">'+
                                                                          '<div class="template_upload tu_charge"></div>'+
                                                                      '</div>'+
                                                                      '<div class="label_head3">Carga de trabajo</div>'+
                                                            '</div>'+
                                                            
                                                  '</div>'
                                                  :'<div class="sectionTabs">'+
                                                            '<div id="up_csv" status="close" class="item_head_upload" type="csv" align="center">'+
                                                                      '<div class="border_head"></div>'+
                                                                      '<div class="icon_head">'+
                                                                          '<div class="template_upload tu_charge"></div>'+
                                                                      '</div>'+
                                                                      '<div class="label_head2">Universo</div>'+
                                                            '</div>'+
                                                            '<div id="up_charge" status="close" class="item_head_upload" type="charge" align="center">'+
                                                                      '<div class="border_head"></div>'+
                                                                      '<div class="icon_head">'+
                                                                          '<div class="template_upload tu_charge"></div>'+
                                                                      '</div>'+
                                                                      '<div class="label_head2">Muestra</div>'+
                                                            '</div>'+
                                                            
                                                  '</div>'
                                                  )+
                                                  '<div class="addFileContainer">'+
                                                            '<div class="icon"><div class="template_upload tu_plus"></div></div>'+
                                                            '<div class="label">De clic para seleccionar el archivo</div>'+
                                                  '</div>'+
                                                  '<div class="fileSelected">'+
                                                            '<div class="icon"><div class="template_upload tu_zip"></div></div>'+
                                                            '<div class="label"></div>'+
                                                            '<div class="close"><div class="template_upload tu_close"></div></div>'+
                                                  '</div>'+
                                                  '<div class="buttons_section" align="center">'+
                                                            
                                                            '<button id="btnLogingSend" class="textButton">Enviar</button>'+
                                                            '<button id="btnUploadCancel" class="textButton">Cancelar</button>'+
                                                  '</div>'+
                                                  '<div class="msgErrorUpload">'+
                                                            '<label></label>'+
                                                  '</div>'+
                                                  obj.getBlocker()+
                                        '</div>'+
                              '</div>';
                    return chain;
          },
	  buildStructure:function(){
                    var obj = this;
                    var chain='<div class="'+obj.id+'">'+
                                        '<center>'+
                                        '<div class="veil_upload"></div>'+
                                        '<div class="modal_upload">'+
                                                  obj.getContentModal()+
                                        '</div>'+
                                        '</center>'+
                                       
                              '</div>';
                    $("."+this.id).remove();
                    this.element.append(chain);
	  },
          showFileSelected:function(name){
                    var obj = this;
                    var total = 25;
                    var nameToShow = (name.length>total)? name.substring(0,total)+'...':name;
                    $(".addFileContainer").hide();
                    $(".fileSelected").show();
                    $(".fileSelected .icon").children().removeAttr('class').addClass('template_upload tu_'+obj.getValidFormat());
                    $(".fileSelected .label").html(nameToShow);
                    $("#btnLogingSend").show();
          },
          showAddFile:function(){
                    $(".addFileContainer").show();
                    $(".fileSelected").hide();
                    $(".fileSelected .label").html('');
                    $("#btnLogingSend").hide();
          },
          showError:function(text){
                    var item = $(".msgErrorUpload");
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
          getValidFormat:function(){
                    var obj = this;
                    //var format = (obj.typeSelected=='csv')?'csv':'zip';
                    var format = 'zip';
                    return format;
          },
          events:function(){
                    var obj=this;
                    obj.selectOption('up_charge');
                    obj.typeSelected = 'charge';
                    if (obj.options.info=='user') {
                              var currentYear = (obj.options.userActive)?obj.options.userActive.currentyear:obj.options.data.user.currentyear;
                    }else{
                              var currentYear = obj.options.data.year;
                    }
                    
                    var o = obj.options;
                    $("."+obj.id+' .blocker').hide();
                    $(".fileSelected,.msgErrorUpload").hide();
                    $("#btnLogingSend").hide();
                    var serviceUpload = (obj.options.info=='user')?connections.charge.upload.url:connections.years.upload.url;
                    var idForm = 'file';
                    $("#"+idForm).remove();
                    var chain = '<input type="file" name="'+idForm+'" id="'+idForm+'" data-url="" style="display:none"/>';
                    this.element.append(chain);
                    $('#'+idForm).fileupload({
                        formData: {
                              user: o.data.user.id,
                              type: obj.typeSelected,
                              currentyear: currentYear,
                              useractive:obj.options.userActive
                        },      
                        dataType: (obj.options.info=='user')?connections.charge.upload.dataType:connections.years.upload.dataType,
                        //contentType: "application/json; charset=utf-8",
                        add: function (e, data) {
                            
                            var d = data.files[0];
                            var nameFile = (typeof(d.name)!="undefined")?d.name:d.fileName;
                            var nameFileLower = nameFile.toLowerCase();
                            var format = obj.getValidFormat();
                            var valid = (nameFileLower.indexOf('.'+format)!=-1)?true:false;
                            if ((format=='csv')&&(!valid)) {
                                valid = (nameFileLower.indexOf('.zip')!=-1)?true:false;
                            }
                            if(valid){
                                data.url=serviceUpload;
                                o.dataFile = data;
                                obj.showFileSelected(nameFile);
                            }else{
                                o.dataFile = null;
                                obj.showError('Archivo no valido');
                            }
                        }
                    });
                     
                    $('#'+idForm).bind('fileuploadsend', function (e, data) {
                       obj.showSpinner();
                    });
                    $('#'+idForm).bind('fileuploaddone', function (e, data) {
                        obj.hideSpinner();      
                        var r = data.result;
                        if(r.response.sucessfull){
                              obj.hide();
                              if (obj.options.info=='user') {
                                        features.updatePredios();
                                        $(".app_left_section").deliveredCharge({userActive:obj.options.userActive,data:{active:obj.options.data.user}});
                              }else{
                                        features.updatePredios();
                                        $('.app_left_section_years').years('update');
                                        structure.updateListPredios(true);
                                        structure.updateUniverse();
                              }
                              var typeMessage = (r.response.error)?'error':'notification';
                              var label = (obj.typeSelected=='csv')?"El universo ha sido guardado":"La carga ha sido guardada";
                              var messages = [label+' satisfactoriamente'];
                              if (typeMessage=='error') {
                                       messages=[];
                                       messages = r.response.error;
                                       messages.unshift(r.response.message);
                              }
                              Alert.show({
                                        title:'Notificaci&oacute;n',
                                        type:typeMessage,
                                        messages:messages,
                                        content:chain,
                                        buttons:[{label:'Cerrar'}]
                              });
                              
                            
                        }else{
                              obj.showError(r.response.message);
                              /*
                              var messages=[];
                              messages = r.response.error;
                              messages.unshift(r.response.message);
                              
                              Alert.show({
                                        title:'Notificaci&oacute;n',
                                        type:'error',
                                        messages:messages,
                                        content:chain,
                                        buttons:[{label:'Cerrar'}]
                              });
                              */
                        }
                        
                    });
                    
                    $(".fileSelected .close").click(function(){
                              obj.showAddFile();
                    });
                    $(".addFileContainer").click(function(){
                              $("#"+idForm).click();
                    });
                    $("#btnLogingSend").click(function(){
                              o.dataFile.formData = {
                                        user: o.data.user.id,
                                        type: obj.typeSelected,
                                        currentyear: currentYear,
                                        useractive:obj.options.userActive
                              };
                              
                              o.dataFile.submit();
                    });
                    $("#btnUploadCancel").click(function(){
                              obj.hide();
                    });
                   /****************/
                    $(".item_head_upload").each(function(){
                              $(this).click(function(){
                                        var id  = $(this).attr('id');
                                        obj.selectOption(id);
                              });
                    });
                    
          },
          
          selectOption:function(id){
                   var obj = this;
                   obj.typeSelected = $("#"+id).attr('type');
                   var clase ='item_head_upload_selected';
                   $('.'+clase).removeClass(clase);
                   $("#"+id).addClass(clase);
                   var msg = '';
                   switch (obj.typeSelected) {
                              case 'charge': msg='De clic para seleccionar el archivo de carga';
                                        break;
                              case 'images':msg='De clic para seleccionar el archivo de imagenes';
                                        break;
                              case 'tracklog':msg='De clic para seleccionar el archivo de recorrido';
                                        break;
                              case 'csv':msg='De clic para seleccionar el archivo zip';
                                        break;
                              case 'questionnaire':msg='De clic para seleccionar el archivo del cuestionario';
                                        break;
                   }
                   $('.addFileContainer .label').html(msg);
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