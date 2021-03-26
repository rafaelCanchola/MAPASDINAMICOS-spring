/**
 * Permite la visualización y asignacion de valores a los datos que seran asociados a un nuevo usuario, consulta, eliminación o edición de la informacion perteneciente a un usuario
 */
define(["validator","connections","restrictions","structure","Alert"], function(validator,connections,restrictions,structure,Alert){
$.widget( "custom.customFormExercise", {
	  options:{
                    data:{},
                    action:'',
                    fields:[
			      {label:'Ejercicio',id:'fm_add_year',type:'edit',format:'numeric', holder:'A&ntilde;o del ejercicio',field:'year',maxlenght:4, mandatory:true},
                              {label:'Etapa',id:'fm_add_step',type:'select',field:'step',mandatory:false},
                              {label:'Fecha de inicio',id:'fm_add_start',type:'edit',format:'date',holder:'De clic para agregar',field:'startDate',mandatory:true},
			      {label:'Fecha de termino',id:'fm_add_end',type:'edit',format:'date',holder:'De clic para agregar',field:'endDate',maxlenght:100,mandatory:false},
                              {label:'Estatus',id:'fm_add_enabled',type:'select',field:'enabled',mandatory:false},
                              {label:'Descripci&oacute;n',id:'fm_add_description',type:'textArea',format:'text',holder:'Descripci&oacute;n',field:'description',maxlenght:255,mandatory:false}
		    ],
                    
          },
	  _init:function(){
                    
	  },
          getTitle:function(opc){
                    var title = '';
                    switch (opc) {
                              case 'new':title='Nuevo usuario';
                                        break;
                              case 'delete':title='Eliminar usuario';
                                        break;
                              case 'edit':title='Editar usuario';
                                        break;
                              case 'consult':title='Consulta de usuario';
                                        break;
                              
                    }
                    return title;
          },
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          getSelect:function(id,idSelected,i){
                    var values = (i.field=='step')?{'Etapa 1':1,'Etapa 2':2,'Etapa 3':3} : {'Habilitado':true,'Inhabilitado':false};
                    var chain='<select class="selectInput" id="'+id+'" field="'+i.field+'">';
                    var states = restrictions.states;
                    var selected = ' selected="selected" ';
                    //chain+='<option value="-1" '+((idSelected)?'':selected)+' >Seleccione una opci&oacute;n</option>';
                    for(var x in values){
                              var i = values[x];
                              var value = i;
                              chain+='<option value="'+value+'" '+((idSelected==value)?selected:'')+'>'+x+'</option>';
                    }
                    chain+='</select>';
                    return chain;
          },
          getItem:function(i){
                    var obj = this;
                    var r = restrictions.roles;
                    var action = this.options.action;
                    var data = this.options.data;
                    var readOnly='';
                    switch (action) {
                              case 'consult':
                              case 'delete':
                                        readOnly=' readonly ';
                                        break;
                    }
                    if ((action=='edit')&&(i.field=='year')) {
                              readOnly=' readonly ';
                    }
                    var id = ' id="'+i.id+'"';
                    var type = ' type="'+i.type+'"';
                    var field = ' field="'+i.field+'"';
                    var mandatory = ' mandatory="'+i.mandatory+'"';
                    var format = ' format="'+((i.format)?i.format:'')+'"';
                    var maxlength = (i.maxlenght)?' maxlength="'+i.maxlenght+'" ':''
                    var clase =' class="textInput"';
                    if ((readOnly!='')&&(i.type=='select')) {
                              var value = ' value="'+((data[i.field])?'Habilitado':'Inhabilitado')+'"';
                    }else{
                              var value = ' value="'+((data[i.field])?data[i.field]:'')+'"';
                    }
                    var holder = ' placeholder="'+i.holder+'"';
                    var data = id+field+type+value+holder+clase+readOnly+maxlength+format+mandatory;
                    
                    var input = '';
                    switch (i.type) {
                              case 'edit':
                                        input = '<input '+data+' />';
                              break;
                              case 'select':
                                        if (readOnly=='') {
                                                  input = this.getSelect(i.id,obj.options.data[i.field],i);
                                        }else{
                                                  input = '<input '+data+' />';  
                                        }
                              break;
                              case 'textArea':
                                        input = this.getTextArea(data,obj.options.data[i.field]);
                              break;
                                        
                    }
                    var chain = '<div class="Field"><div class="label">'+i.label+'</div>'+input+'</div>';
                    if ((action=='consult')&&(i.id=='fm_add_c_password')) {
                              chain='';
                    }
                    
                    return chain;
          },
          getTextArea:function(data,text){
                    return '<textarea class="textAreaInput" rows="4" cols="50" '+data+'>'+((text)?text:'')+'</textarea>';
          },
          getButton:function(action){
                    var buttons=[];
                    switch (action) {
                              case 'new':
                                        buttons=[
                                                 {label:'Aceptar',action:action},
                                                 {label:'Cancelar',action:'cancel'}
                                        ];
                                        break;
                              case 'delete':
                                        buttons=[
                                                 {label:'Aceptar',action:action},
                                                 {label:'Cancelar',action:'cancel'}
                                        ];
                                        break;
                              case 'edit':
                                        buttons=[
                                                 {label:'Aceptar',action:action},
                                                 {label:'Cancelar',action:'cancel'}
                                        ];
                                        break;
                              case 'consult':
                                        buttons=[
                                                 {label:'Aceptar',action:'cancel'}
                                        ];
                                        break;
                              
                    }
                    var chain='';
                    for(var x in buttons){
                              var b = buttons[x];
                              chain+= '<button class="textButton" id="'+b.action+'_form">'+b.label+'</button>';
                    }
                    
                    return chain;
          },
	  buildStructure:function(){
                    var obj=this;
                    var o = obj.options;
                    var chain='<div class="background_form">';
                    for(var x in o.fields){
                              chain+= obj.getItem(o.fields[x]);
                    }
                    chain+='<div class="ButtonSection" align="center">';
                    chain+=obj.getButton(o.action);
                    chain+='</div>';
                    chain+='</div>';
                    
                    $(".background_form").remove();
                    
                    this.element.append(chain);
	  },
          
          eventScrolling:function(){
                    $(window).scroll(function() {
                              if ($(this).scrollTop() > 0) {
                                  // apply effects and animations
                              }
                    });    
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
          
          request : function(params,Action){
                    
                    obj=this;
                    var action = obj.options.action;
                    var idDiv  = obj.element.attr('id'); 
                    params = (params)?params:{};
                    var clase='hidden';
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        switch (obj.options.action) {
                                                  case 'delete':
                                                            
                                                            Alert.show({
                                                                      title:'Notificaci&oacute;n',
                                                                      type:'notification',
                                                                      messages:['El ejercicio ha sido eliminado satisfactoriamente'],
                                                                      buttons:[{label:'Cerrar',event:function(){$(".custom_menu").hide()}}]
                                                            });
                                                            //mostrar ventana y cerrar formulario
                                                            
                                                            break;
                                                  case 'new':
                                                            
                                                            Alert.show({
                                                                      title:'Notificaci&oacute;n',
                                                                      type:'notification',
                                                                      messages:['El ejercicio se ha agregado satisfactoriamente'],
                                                                      buttons:[{label:'Cerrar',event:function(){$(".custom_menu").hide()}}]
                                                            });
                                                            //mostrar ventana y cerrar formulario
                                                           
                                                            break;
                                                            
                                                  case 'edit':
                                                            
                                                            Alert.show({
                                                                      title:'Notificaci&oacute;n',
                                                                      type:'notification',
                                                                      messages:['El ejercicio ha sido editado satisfactoriamente'],
                                                                      buttons:[{label:'Cerrar',event:function(){$(".custom_menu").hide()}}]
                                                            });
                                                           
                                                            //mostrar ventana y cerrar formulario
                                                            break;
                                                  
                                        }
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                                }
                                
                            },
                            beforeSend: function(xhr) {
                                
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                            },
                            complete: function(solicitudAJAX,estatus) {
                               
                                setTimeout(function(){
                                        $('.app_left_section_years').years('update');
                                        },100);
                                obj.activeTransaction=false;
                                
                            }
                            };
                    var source='';
                    switch (action) {
                              case 'new':source = connections.years.add;
                                        r = $.extend(r, source);
                                        break;
                              case 'edit':source=connections.years.edit;
                                        r = $.extend(r, source);
                                        break;
                              case 'delete':
                                        source=connections.years.del;
                                        r = $.extend(r, source);
                                        r.data = params;
                                        
                                        break;
                    }
                    r.data = {action:Action,json:JSON.stringify(params)};
                    $.ajax(r);
            },
          events:function(){
                    var obj = this;
                    var o = this.options.data;
                    for(var x in o.buttons){
                              var event = null;
                              if (x=='cancel') {
                                    event = obj.hide;    
                              }else{
                                    event = o.buttons[x].event;   
                              }
                              $("#"+x+"_form").click(function(){
                                        event();
                              });    
                    }
                    obj.eventScrolling();
                    $(".back_users").click(function(){
                              $(".background_form").remove();
                    });
                    $(".background_form .Field .textInput").each(function(){
                              $(this).focus(function(){
                                        $(this).removeClass('badInput');
                              });
                    });
                    $(".background_form .Field .textAreaInput").each(function(){
                              $(this).focus(function(){
                                        $(this).removeClass('badInput');
                              });
                    });
                    $(".background_form .Field .selectInput").each(function(){
                              $(this).change(function(){
                                        $(this).removeClass('badInput');
                              });
                    });
                    
                    $("#cancel_form").click(function(){
                              obj.hide();
                    });
                    $("#new_form,#edit_form").click(function(){
                              if (!obj.activeTransaction) {
                                        obj.activeTransaction=true;
                                        var a = obj.validateExercise();
                                        if (a.messages.length==0) {
                                                  if (obj.options.action=='new') {
                                                            a['action']='add';
                                                  }
                                                  if (obj.options.action=='edit') {
                                                            a.params['id']=obj.options.data.id;
                                                            a['action']='modify';
                                                  }
                                                  //params['currentyear']=obj.options.userActive.currentyear;
                                                  obj.request(a.params,a.action);
                                                  
                                        }else{
                                                   Alert.show({
                                                            title:'Notificaci&oacute;n',
                                                            type:'error',
                                                            messages:a.messages,
                                                            buttons:[{label:'Cerrar'}]
                                                  });
                                                  obj.activeTransaction=false;
                                        }
                              }
                    });
                    $("#delete_form").click(function(){
                               Alert.show({
                                        title:'Notificaci&oacute;n',
                                        type:'notification',
                                        messages:['&iquest;Realmente desea eliminar este usuario?'],
                                        buttons:[
                                                  
                                                  {label:'Si',event:function(){
                                                            obj.request({action:"delete",id:obj.options.data.id,currentyear:obj.options.userActive.currentyear});
                                                  }},
                                                  {label:'No'}
                                                  ]
                              });
                              
                    });
                    $(".background_form .selectInput").each(function(){
                              var field = $(this).attr('field');
                              
                              if ((typeof(obj.options.data[field])!='undefined')&&(obj.options.action!='new')) {
                                        var valor = parseInt(obj.options.data[field]);
                                        if (valor>0) {
                                                  $(this).val(obj.options.data[field]);
                                        }    
                              }
                             
                    });
                    if ((obj.options.action=='new')||(obj.options.action=='edit')) {
                              $(".background_form .textInput").each(function(){
                                        var id = $(this).attr('id');
                                        var format = $(this).attr('format');
                                        obj.addValidationFormat(id,format);
                              });
                    }
          },
          addValidationFormat:function(id,format){
                    
                    switch (format) {
                              case 'text':
                                       $("#"+id).bind("keypress", function(evt) {
                                                            var otherresult = 12;
                                                              if(window.event != undefined){
                                                                    otherresult = window.event.keyCode;
                                                              }
                                                              var charCode = (evt.which) ? evt.which : otherresult;  
                                                              var keyChar = String.fromCharCode(charCode);
                                                              var keyChar2 = keyChar.toLowerCase();
                                                              var re =   /^[a-z0-9 ]+$/i;
                                                              var result = re.test(keyChar2);
                                                              return result;                               
                                        }).bind("paste",function(event){
                                                    var item = $(this);
                                                    setTimeout(function(){
                                                              var value = item.val();
                                                              var re =  expression;
                                                              var result = re.test(value);
                                                              if (!result) {
                                                                    item.val('');
                                                              }
                                                    },100);
                                                    
                                        });
                              break;
                              case 'numeric':
                                        
                                        $("#"+id).bind("keypress", function(evt) {
                                                            var otherresult = 12;
                                                              if(window.event != undefined){
                                                                    otherresult = window.event.keyCode;
                                                              }
                                                              var charCode = (evt.which) ? evt.which : otherresult;  
                                                              var keyChar = String.fromCharCode(charCode);
                                                              var keyChar2 = keyChar.toLowerCase();
                                                              var re =   /^(-)?(\d*)$/;
                                                              var result = re.test(keyChar2);
                                                              return result;                               
                                        }).bind("paste",function(event){
                                                    var item = $(this);
                                                    setTimeout(function(){
                                                              var value = item.val();
                                                              var re =  expression;
                                                              var result = re.test(value);
                                                              if (!result) {
                                                                    item.val('');
                                                              }
                                                    },100);
                                                    
                                        });
                              break;
                              case 'date':
                                        $("#"+id).bind("keypress", function(evt) {
                                                  return false;
                                        }).bind("paste",function(event){
                                                  return false;
                                        }).datepicker({
                                            yearRange: "-120:+120",
                                            changeMonth: true,
                                            changeYear: true
                                        });
                              break;
                    }
                    
          },
          validateExercise : function(){
                    var obj=this;
                    var params={};
                    var valid=true;
                    var msg=[];
                    $(".background_form .textInput").each(function(){
                        var item = $(this);
                        var id=item.attr('id');
                        var mandatory = item.attr('mandatory');
                        var field=item.attr('field');
                        var value = item.val();
                        if ((validator.isEmpty(value))&&(mandatory=='true')) {
                            valid=false;
                            item.addClass('badInput');
                        }else{
                            switch (field) {
                                case 'year':
                                        var year = parseInt(value);
                                        if((year<2000)||(year>2050)){
                                                  msg.push('El ejercicio debe ser mayor al a&ntilde;o 2000 y menor o igual al a&ntilde;o 2050');
                                                  item.addClass('badInput');
                                        }
                                        break;
                                case 'startDate':
                                        if (!validator.isDate(value)) {
                                                  msg.push('Fecha de inicio no valida');
                                                  item.addClass('badInput');
                                                  
                                        }
                                        break;
                                case 'endDate':
                                        if (!validator.isDate(value)) {
                                                  msg.push('Fecha de termino no valida');
                                                  item.addClass('badInput');
                                                  
                                        }else{
                                                  var itemStartDate = $( "#fm_add_start" );
                                                  var startDate = itemStartDate.datepicker( "getDate" );
                                                  var endDate = item.datepicker( "getDate" );
                                                  if ((startDate>endDate)&&(endDate!='')) {
                                                            msg.push('Fecha de inicio no valida');
                                                            itemStartDate.addClass('badInput');
                                                  }
                                        }
                                        break;
                                case 'phone':
                                    if (!validator.isPhone(value)) {
                                        msg.push('Telefono no valido');
                                        item.addClass('badInput');
                                        
                                    }
                                    break;
                                case 'email':
                                    if (!validator.isEmail(value)) {
                                        msg.push('Email no valido');
                                        item.addClass('badInput');
                                    }
                                    break;
                                
                            }
                            params[field]=value;
                        }
                    });
                    $(".background_form .textAreaInput").each(function(){
                        var item = $(this);
                        var id=item.attr('id');
                        var field=item.attr('field');
                        var mandatory = item.attr('mandatory');
                        var value = item.val();
                        if ((validator.isEmpty(value))&&(mandatory=='true')) {
                            valid=false;
                            item.addClass('badInput');
                        }else{
                            params[field]=value;
                        }
                    });
                    
                    
                    if ((obj.options.action=='new')||(obj.options.action=='edit')) {
                              var enabled = $("#fm_add_enabled option:selected").val();
                              if (enabled=='-1') {
                                        $("#fm_add_enabled").addClass('badInput');
                                        valid=false;
                              }else{
                                        params['enabled']=enabled;
                              }
                              var step = $("#fm_add_step option:selected").val();
                              if (step=='-1') {
                                        $("#fm_add_step").addClass('badInput');
                                        valid=false;
                              }else{
                                        params['step']=step;
                              }
                    }
                    if (!valid) {
                        msg.push("Llene los campos faltantes");
                    }
                    return {params:params,messages:msg};
          },
          new_user:function(){
                    
          },
          delete_user:function(){
                    
          },
          edit_user:function(){
                    
          },
          hide:function(){
                     $(".background_form").remove();
                     $('.option_item_back').click();
          },
          _create: function() {
		this.buildStructure();
                this.events();
                //this.eventsToItems();
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
                                        case "addExecutive":
                                                  this.options.addExecutive=value;
                                                  break;
                                        case "action":
                                                  this.options.action=value;
                                                  break;
                                        case "data":
                                                  this.options.data = value;
                                                  this.update();
                                        break;
                                                          
                              }
		    }
	  }
);
});