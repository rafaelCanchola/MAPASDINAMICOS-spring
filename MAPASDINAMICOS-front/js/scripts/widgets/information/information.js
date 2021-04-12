/**
 * Permite mostrar mediante listas de informaci�n los resultados de una busqueda de un predio, o identifiaci�n de los datos de un feature desplegada en el mapa
 */
define(["validator","connections","map","structure"], function(validator,connections,map,structure){
$.widget( "custom.information", {
	  id:'custom_information',
          countSpinner:0,
          options:{
                    userActive:null,
                    data:{
                              type:'search',
                              feature:'point',
                              title:'B&uacute;squeda',
                              showPrev:false,
                              ids:null
                    }
                    
          },

	  _init:function(){
                    this.show();
	  },
          
          update:function(){
                    var obj=this;
                    var type = obj.options.data.type;
                    var ids = obj.options.data.ids;
                    obj.enableType(type);
                    if (type=='identify') {
                              var params = {id:ids,currentyear:obj.options.userActive.currentyear};
                              obj.request(params,obj.options.data.feature);
                    }else{//search
                              if (ids!=null) {
                                        obj.request({action:'find',predio:ids,user:obj.options.userActive.id,currentyear:obj.options.userActive.currentyear},obj.options.data.feature);
                              }
                              
                    }

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
          getDataIdentify:function(clase,i,idItem){
                   var chain='';
                    
                    chain+='<div id="'+idItem+'" class="Row '+clase+'" wkt="'+i.wkt+'">'+
                                        '<div class="Cell text_center">'+
                                            i.alias+
                                        '</div>'+
                                        '<div class="Cell borderRow">'+
                                            i.value+
                                        '</div>'+
                              '</div>';
                    return chain;
          },
          getDataSearch:function(clase,i,idItem){
                    var chain='';
                    var infoOption ='<div id="'+idItem+'_info" item="'+i.id+'" class="optionInfo" folio="">'+                            
                                                  '<div class="template_information ti_info"></div>'+
                                              '</div>';
                    var colorStatus = validator.getColorStatus(i.status);                   
                    var boxStatus ='<div class="icon_status" style="background:'+colorStatus+'"></div>';                          
                    chain+='<div id="'+idItem+'" class="Row '+clase+'" wkt="'+i.wkt+'">'+
                                        '<div class="Cell text_center">'+
                                           'Folio de predio'+
                                        '</div>'+
                                        '<div class="Cell borderRow">'+
                                            boxStatus+
                                            '<div class="label_predio">'+i.fol_predio+'</div>'+
                                            infoOption+
                                        '</div>'+
                              '</div>';
                    return chain;
                    
          },
          fillTable:function(data,container,Feature){
                    var obj=this;
                    var chain='';
                    
                    chain+='<div class="table_information">';
                    var clase = 'rowFilled';
                    var productor = '';
                    var predio = '';
                    if (container!='search_results') {
                              for(var x in data){
                                        var i = data[x];
                                        if (i.alias.indexOf('Folio de productor')!=-1) {
                                                  productor = i.value;
                                        }
                                        if (i.alias.indexOf('Folio de predio')!=-1) {
                                                  predio = i.value;
                                        }
                              }
                    }
                    for(var x in data){
                              var i = data[x];
                              
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                              var idItem = obj.id+'Row'+i.id;
                              if (container=='search_results') {
                                        chain+=obj.getDataSearch(clase,i,idItem);
                              }else{
                                        
                                        var chain2='';
                                        if (typeof(i.value)=='object') {
                                                  for(var y in i.value ){
                                                            var clase2 =(y==0)?'':'hidden';
                                                            var e = i.value[y];
                                                            if (i.alias.includes('genes') && i.alias.length == 8) { 
                                                                      var path= connections.image.getImage.url+"folio="+predio+"&currentyear="+obj.options.userActive.currentyear+"&imagen="+e;
                                                                      chain2+='<img class="fancybox" style="width: 100px;border:2px solid #bbb;margin-bottom: 10px;" src="'+path+'"/>';
                                                            }else{
                                                                      //var path='docs/'+productor+'/'+predio+'/'+e;
                                                                      var path='docs/'+productor+'/'+e;
                                                                      chain2+='<a class="doctos '+clase2+'" rel="group_doctos" href="'+path+'">Ver documentos</a>';
                                                            }
                                                            
                                                  }
                                                  i.value=chain2;
                                        }
                                        chain+=obj.getDataIdentify(clase,i,idItem);
                              }
                              
                              
                    }
                    chain+='</div>';
                    $('.'+container).html(chain);
                    $('.table_information .Row').each(function(){
                              $(this).click(function(){
                                        var wkt=$(this).attr('wkt');
                                        map.goPoint(wkt);
                              });
                              
                    });
                    $('.optionInfo').each(function(){
                              $(this).click(function(event){
                                        var id = $(this).attr('item');
                                        obj.options.data.showPrev=true;
                                        obj.enableType('identify');
                                        obj.request({action:'identify',id:id,currentyear:obj.options.userActive.currentyear},Feature);
                                        event.stopPropagation();
                              });
                    });
                   
                    $(".doctos").fancybox();
                    $(".fancybox").each(function(){
                              $(this).click(function(){
                                        var path = $(this).attr('src');
                                        structure.showImage(path);
                              });
                    });
                    /*
                    $(".fancybox")
                              .attr('rel', 'gallery')
                              .fancybox({
                                        autoSize: false,
                                        autoDimensions: true,
                                        width: 630,
                                        height: 425,
                                        fitToView: false,
                                        padding: 0,
                                        title: this.title,
                                        href: $(this).attr('href'),
                                        type: 'iframe'
                                    });
                    
                    */
          },
          enableType:function(type){
                    if (type=='identify') {
                              $(".identify_results").show();
                              $(".search_results").hide();
                              $(".boxToSearch").hide();
                              $(".header_information .label").html(validator.getFormatHtml('Informaci&oacute;n detallada'));
                    }else{
                              $(".identify_results").hide();
                              $(".search_results").show();
                              $(".boxToSearch").show();
                              $(".header_information .label").html('B&uacute;squeda');
                    }
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
          request : function(params,Feature){
                   
                    var obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                        statusCode: {
                            200: function (json, estatus) {
                                if (params.action=='find') {//search
                                    obj.fillTable(json,'search_results',Feature);
                                }else{//identify
                                    obj.fillTable(json,'identify_results',Feature);
                                }
                            },
                            400: function () {
                                showMessage(msg);
                            },
                            403: function () {
                                showMessage('No hay información disponible');
                            }
                        },
                            beforeSend: function(xhr) {
                                        obj.showSpinner();
                                        $(".search_msgError").hide();
                               
                                
                            },
                            complete: function(solicitudAJAX,estatus) {
                                obj.hideSpinner();
                            }
                    };
                    var source=null;
                    if (params.action=='find') {
                              
                              source = connections.search.event;
                    }else{
                              source=(Feature=='point')?connections.identify.getPredio:connections.identify.getPolygon;
                    }
                    r = $.extend(r, source);
                    r.data=params;
                    $.ajax(r);
          },
          
          getHeader : function(){
                    var o = this.options.data;
                    var chain='';
                              chain+='<div class="header_information">'+
                                        
                                        '<div class="label">'+o.title+'</div>'+
                                         ((true)?
                                                  '<div class="back_info"><img src="img/back.png"></div>'
                                         :''
                                         )+
                                        
                                     '</div>';
                    return chain;
          },
	  buildStructure:function(){
                    var obj=this;
                    var o = obj.options.data;
                    var chain = ''+
                              '<div class="custom_information" align="center">'+
                                            obj.getBlocker()+
                                            obj.getHeader()+
                                            '<div class="boxToSearch">'+
                                                    '<input id="text_search" class="textInput" type="text" value="" placeholder="Texto a buscar"/>'+
                                                    '<div class="icon_search">'+
                                                        '<div class="icon">'+
                                                            '<div class="template_information ti_search"></div>'+
                                                        '</div>'+
                                                    '</div>'+
                                            '</div>'+
                                            
                                            '<div class="search_results">'+
                                            
                                            
                                            '</div>'+
                                            '<div class="identify_results">'+
                                            '<div  align="center" class="spinner_search hidden"><div class="spinner"></div></div>'+
                                            '<div class="search_msgError"><div class="label"></div></div>'+
                                            
                                        
                              '</div>'+
                    obj.hide();
                    this.element.append(chain);
                    obj.enableType(this.options.data.type);
	  },
          show:function(){
                 var obj = this;
                 this.element.show();
                 if (this.options.data.ids==null) {
                    $("."+obj.id +" .blocker").hide();
                 }
                 
                 $('.app_left_section_notification,.app_left_section_layers,.app_left_section_years').hide();
                 
          },
          hide:function(){
                 this.element.hide();
          },
          
          events:function(){
                    var obj=this;
                    $('.icon_search').click(function(){
                              var text = $('#text_search').val();
                              if (!validator.isEmpty(text)) {
                                        obj.request({action:'find',predio:text,user:obj.options.userActive.id,currentyear:obj.options.userActive.currentyear},obj.options.data.feature);
                              }
                    });
                    $('.back_info').click(function(){
                             
                              if (obj.options.data.showPrev) {
                                        
                                         obj.enableType('search');
                                         obj.options.data.showPrev=false;
                              }else{
                                        obj.hide();
                              }
                    });
          },
          
          _create: function() {
                    this.buildStructure();
                    this.events();
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
                                                  this.countSpinner=0;
                                                  this.options.data = value;
                                                  this.update();
                                                  
                                        break;
                                                          
                              }
		    }
	  }
);
});