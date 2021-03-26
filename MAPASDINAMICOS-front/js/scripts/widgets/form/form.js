/**
 * Permite la visualización y asignacion de valores a los datos que seran asociados a un nuevo usuario, consulta, eliminación o edición de la informacion perteneciente a un usuario
 */
define(["validator","connections","restrictions","structure","Alert"], function(validator,connections,restrictions,structure,Alert){
$.widget( "custom.customForm", {
	  options:{
                    data:{},
                    addExecutive:false,
                    action:'',
                    fields:[
						      {label:'Usuario',id:'fm_add_user',type:'edit',holder:'Alias del usuario',field:'username'},
						      //{label:'Rol',id:'fm_add_rol',type:'select',holder:'Rol',field:'roleId'},
						      {label:'Nombre',id:'fm_add_name',type:'edit',holder:'Nombre',field:'firstname'},
						      {label:'Apellidos',id:'fm_add_fname',type:'edit',holder:'Apellido paterno',field:'lastname',maxlenght:100},
						      {label:'Direcci&oacute;n',id:'fm_add_address',type:'edit',holder:'Direcci&oacute;n',field:'address',maxlenght:255},
						      {label:'Tel&eacute;fono',id:'fm_add_phone',type:'edit',holder:'Tel&eacute;fono',field:'phone'},
						      {label:'Correo electr&oacute;nico',id:'fm_add_mail',type:'edit',holder:'Correo electr&oacute;nico',field:'email'},
						      {label:'Empresa',id:'fm_add_enterprice',type:'edit',holder:'Empresa',field:'company',maxlenght:150},
						      {label:'Cargo',id:'fm_add_charge',type:'edit',holder:'Cargo',field:'jobtitle',maxlenght:150},
						      {label:'CURP',id:'fm_add_curp',type:'edit',holder:'CURP',field:'curp'},
						      {label:'RFC',id:'fm_add_rfc',type:'edit',holder:'RFC',field:'rfc'},
                                                      {label:'Estado',id:'fm_add_state',type:'select',holder:'',field:'state'},
						      {label:'Contrase&ntilde;a',id:'fm_add_password',type:'password',holder:'Contrase&ntilde;a',field:'password'},
						      {label:'Confirmar contrase&ntilde;a',id:'fm_add_c_password',type:'password',holder:'Confirmar contrase&ntilde;a'}
						      
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
                    var user = this.options.userActive;
                    var chain='<select class="selectInput" id="'+id+'" field="'+i.field+'">';
                    var states = restrictions.states;
                    var selected = ' selected="selected" ';
                    chain+='<option value="-1" '+((idSelected)?'':selected)+' >Seleccione una opci&oacute;n</option>';
                    for(var x in states){
                              var i = states[x];
                              if (i.active) {
                                        var value = x.replace('e','');
                                        chain+='<option value="'+value+'" '+((idSelected==value)?selected:'')+'>'+i.label+'</option>';
                              }
                             
                    }
                    /*
                    var r = restrictions.roles;
                    var exclude = (r['r'+user.roleId].admonUsers.exclude)?r['r'+user.roleId].admonUsers.exclude:null;
                    
                    
                    chain+='<option value="-1" '+((idSelected)?'':selected)+' >Seleccione una opci&oacute;n</option>';
                    for(var x in r){
                              var i = r[x];
                              var add=true;
                              var role = parseInt(x.replace('r',''));
                              if (exclude) {
                                        if (exclude.indexOf(role)!=-1) {
                                                  add=false;
                                        }
                              }
                              if (add) {
                                        chain+='<option value="'+role+'" '+((idSelected==role)?selected:'')+'>'+i.label+'</option>';
                              }    
                    }
                    */
                    chain+='</select>';
                    return chain;
          },
          getInput:function(i){
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
                    if ((action=='consult')&&(i.id=='fm_add_password')) {
                             i.type='edit';
                    }
                    
                    var id = ' id="'+i.id+'"';
                    var type = ' type="'+i.type+'"';
                    var field = ' field="'+i.field+'"';
                    var maxlength = (i.maxlenght)?' maxlength="'+i.maxlenght+'" ':''
                    var clase =' class="textInput"';
                    if ((readOnly!='')&&(i.type=='select')) {
                          //var value = ' value="'+r['r'+this.options.userActive.roleId].label+'"';
                          if ((!data[i.field])||(data[i.field]=='')) {
                              var value = '';
                          }else{
                              var value = ' value="'+restrictions.states['e'+data[i.field]].label +'"';
                          }
                    }else{
                          var value = ' value="'+((data[i.field])?data[i.field]:'')+'"';    
                    }
          
                    var holder = ' placeholder="'+i.holder+'"';
                    var data = id+field+type+value+holder+clase+readOnly+maxlength;
                    
                    var input = '';
                    if ((i.type=='select')&&(readOnly=='')) {
                              input = this.getSelect(i.id,data[i.field],i);
                    }else{
                              input = '<input '+data+' />';
                    }
                    
                    var chain = '<div class="Field"><div class="label">'+i.label+'</div>'+input+'</div>';
                    if ((action=='consult')&&(i.id=='fm_add_c_password')) {
                              chain='';
                    }
                    //if (((obj.options.userActive.roleId<2)||(obj.options.userActive.roleId>5))&&(i.id=='fm_add_state')) {
                    //          chain=='';
                    //}
                    
                    return chain;
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
                              chain+= obj.getInput(o.fields[x]);
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
          
          request : function(params){
                    
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
                                                            //obj.showMessage(['Usuario eliminado satisfactoriamente'],'info');
                                                            Alert.show({
                                                                      title:'Notificaci&oacute;n',
                                                                      type:'notification',
                                                                      messages:['Usuario eliminado satisfactoriamente'],
                                                                      buttons:[{label:'Cerrar',event:function(){$(".custom_menu").hide()}}]
                                                            });
                                                            //mostrar ventana y cerrar formulario
                                                            
                                                            break;
                                                  case 'new':
                                                            //obj.showMessage(['El usuario se ha agregado satisfactoriamente'],'info');
                                                            Alert.show({
                                                                      title:'Notificaci&oacute;n',
                                                                      type:'notification',
                                                                      messages:['El usuario se ha agregado satisfactoriamente'],
                                                                      buttons:[{label:'Cerrar',event:function(){$(".custom_menu").hide()}}]
                                                            });
                                                            //mostrar ventana y cerrar formulario
                                                           
                                                            break;
                                                            
                                                  case 'edit':
                                                            //obj.showMessage(['El usuario ha sido editado satisfactoriamente'],'info');
                                                            Alert.show({
                                                                      title:'Notificaci&oacute;n',
                                                                      type:'notification',
                                                                      messages:['El usuario ha sido editado satisfactoriamente'],
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
                                    //obj.showMessage([msg],'error');
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                                }
                                
                            },
                            beforeSend: function(xhr) {
                                //xhr.withCredentials = true;
                                //$(aditional.btn).addClass(clase);
                                //$(aditional.spinner).removeClass(clase);
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                        //obj.showMessage([msg],'error');
                                         Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:[msg],
                                                  buttons:[{label:'Cerrar'}]
                                        });
                            },
                            complete: function(solicitudAJAX,estatus) {
                                //$(aditional.btn).removeClass(clase);
                                //$(aditional.spinner).addClass(clase)
                                setTimeout(function(){
                                        $('.app_left_section').userbranch({reload:true});
                                        },100);
                                obj.activeTransaction=false;
                                
                            }
                            };
                    var source='';
                    switch (action) {
                              case 'new':source = connections.users.add;
                                        r = $.extend(r, source);
                                        break;
                              case 'edit':source=connections.users.edit;
                                        r = $.extend(r, source);
                                        break;
                              case 'delete':
                                        source=connections.users.del;
                                        r = $.extend(r, source);
                                        r.data = params;
                                        //r.url=r.url+'/'+obj.options.data.id;
                                        break;
                    }
                    /*
                    r.xhrFields= {withCredentials: true};	    
                    r.crossDomain= true;
                    r.username=dataUsers.username;
                    r.password=dataUsers.password;
                    */
                    if (action!='delete') {
                              r.data=JSON.stringify(params);
                    }
                   
                    $.ajax(r);
            },
          activeTransaction:false,  
          events:function(){
                    var obj = this;
                    if (obj.options.action=='new') {
                          var roleSelected = (obj.options.addExecutive)?6:obj.options.userActive.roleId+1;
                    }else{
                          var roleSelected = obj.options.data.roleId;
                    }
                    if ((roleSelected>=3)&&(roleSelected<=5)) {
                              
                    }else{
                              $("#fm_add_state").parent().hide();
                    }
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
                                        var a = obj.validateAddUser();
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
                                                  
                                                  //obj.showMessage(a.messages,'error');
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
                    //$("#fm_add_rol").selectmenu();
          },
          validateAddUser : function(){
                    var obj=this;
                    var params={};
                    var valid=true;
                    var msg=[];
                    $(".background_form .textInput").each(function(){
                        var item = $(this);
                        var id=item.attr('id');
                        var field=item.attr('field');
                        var value = item.val();
                        if (validator.isEmpty(value)) {
                            valid=false;
                            item.addClass('badInput');
                        }else{
                            switch (field) {
                                case 'phone':
                                    if (!validator.isPhoneLada(value)) {
                                        msg.push('Tel&eacute;fono no v&aacute;lido');
                                        item.addClass('badInput');
                                        
                                    }
                                    break;
                                case 'email':
                                    if (!validator.isEmail(value)) {
                                        msg.push('Correo electr&oacute;nico no v&aacute;lido');
                                        item.addClass('badInput');
                                    }
                                    break;
                                
                            }
                            params[field]=value;
                        }
                    });
                    //var roleSelected = $("#fm_add_rol option:selected").val();
                    if (obj.options.action=='new') {
                          var roleSelected = (obj.options.addExecutive)?6:obj.options.userActive.roleId+1;
                    }else{
                          var roleSelected = obj.options.data.roleId;
                    }
                    if ((obj.options.action=='new')||(obj.options.action=='edit')) {
                              var stateSelected = $("#fm_add_state option:selected").val();
                              
                              if ((roleSelected>=3)&&(roleSelected<=5)) {
                                        if (stateSelected=='-1') {
                                                  $("#fm_add_state").addClass('badInput');
                                                  valid=false;
                                        }else{
                                                  params['state']=stateSelected;
                                        }
                              }else{
                                        params['state']="";
                              }
                    }
                    //params['state']="";//agregado fake
                    if (roleSelected=='-1'){
                              valid=false;
                              $("#fm_add_rol").addClass('badInput');
                    }
                    params['roleId']=roleSelected;
                    if (!valid) {
                        msg.push("Llene los campos faltantes");
                    }
                    if ($("#fm_add_password").val()!=$("#fm_add_c_password").val()) {
                        $("#fm_add_password,#fm_add_c_password").addClass('badInput');
                        msg.push('Las contrase&ntilde;as no corresponde a la confirmaci&oacute;n');
                    }
                    params.enabled=true;
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