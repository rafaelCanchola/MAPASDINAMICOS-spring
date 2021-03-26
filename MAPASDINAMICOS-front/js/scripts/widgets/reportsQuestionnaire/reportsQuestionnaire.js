define(["connections","map","validator","Alert","features"], function(connections,map,validator,Alert,features){
$.widget( "custom.reportsQuestionnaire", {
          id:'custom_reportsQuestionnaire',
          countSpinner:0,
          fields:{},
          visible:false,
          counterFilter:0,
          pagination:{
                    pages:10,
                    currentPage:1,
                    totalPages:0,
                    reload:'true',
                    type:'more'
          },
          firstReport:true,
          totalRows:100,
          fieldToFilter:null,
          tabActive:'',
          graphLoaded:false,
          itemToEdit:null,
          modalReplace:null,
          temporalFilter:[],
          descriptionReplace:{},
          dataSend:{
                    fields:[],
                    order:{},
                    filter:[]
          },
          steps:{
                    /*
                    step1:{
                              label:'Selecci&oacute;n de campos',
                              number:'01',
                              valid:false
                    },*/
                    step2:{
                              label:'Ordenado y filtro',
                              number:'02',
                              valid:false
                    }/*,
                    step3:{
                              label:'Despliegue y titulo',
                              number:'03',
                              valid:false
                    }*/
          },
          options:{
                    data:{userActive:null},
                    controller:null
          },
          getFilter:function(){
                    var obj = this;
                    var params = $.extend({}, obj.dataSend);
                    delete params.fields;
                    if ((obj.dataSend.filter==[])||(obj.dataSend.filter==null)) {
                              delete params.filter;
                    }
                    if (obj.dataSend.order==null) {
                              delete params.order;
                    }
                    var hasChilds = false;
                    for(var x in params){
                              hasChilds=true;
                              break;
                    }
                    params= (hasChilds)?JSON.stringify(params.filter):"";
                    params= (this.visible)?params:"";
                    return params; 
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
          request : function(params,action,typeGraph){
                    var obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        valid=true;
                                        switch(action){
                                                  case "getFields":
                                                            obj.createFields(json.data,'fieldsToSelect',true);
                                                            obj.createFields(json.data,'fieldsSelected',false);
                                                            break;
                                                  case "getReport":
                                                            if (json.data.length>0) {
                                                                      obj.updatePagination(json.pageinfo);
                                                                      if (json.columns) {
                                                                                obj.dataSend.fields=json.columns;
                                                                      }
                                                                      //if ($("."+obj.id+" #displayColumns").prop('checked')) {
                                                                               obj.showReport(json.data);
                                                                      //}else{
                                                                      //          obj.showReportRows(json.data);
                                                                      //}
                                                            }else{
                                                                      obj.hideItemEdit();
                                                                      $("."+obj.id+" .pagination").html('');
                                                                      $("."+obj.id+" .results_table_filter").html("");
                                                                      $("."+obj.id+" .dataTabular").html('<div class="notFound">No se encontraron coincidencias</div>');
                                                            }
                                                            break;
                                                  case "getGraph":
                                                            obj.showGraph(typeGraph,json.data);
                                                            break;
                                                  case "getSeed":
                                                            setTimeout(function(){
                                                                      var source=connections.reportsQuestionnaire.downloadCvs;
                                                                      var r = $.extend(r, source);
                                                                      var path = r.url+'&filename=cuestionarios&id='+json.data+'&currentyear='+obj.options.data.userActive.currentyear;
                                                                      window.open(path);
                                                            },100);
                                                            break;
                                                  case "getSeedPdf":
                                                            setTimeout(function(){
                                                                      var source=connections.reportsQuestionnaire.downloadPdf;
                                                                      var r = $.extend(r, source);
                                                                      var path = r.url+'&filename=cuestionarios&id='+json.data+'&currentyear='+obj.options.data.userActive.currentyear;
                                                                      window.open(path);
                                                            },100);
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
                                obj.showSpinner();
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
                               obj.hideSpinner();
                            }
                            };
                    var source='';
                    
                    switch (action) {
                              case 'getFields':source = connections.reportsQuestionnaire.getFields;
                                        r = $.extend(r, source);
                                        r.data=params;
                                        break;
                              case 'getReport':source=connections.reportsQuestionnaire.getReport;
                                        r = $.extend(r, source);
                                        r.data={action:'getall',user:obj.options.data.userActive.id,rows:obj.totalRows,page:obj.pagination.currentPage,currentyear:obj.options.data.userActive.currentyear};
                                        if (params) {
                                                r.data.json = JSON.stringify(params);
                                        }
                                        //r.url=r.url+'&user='+obj.options.data.userActive.id+'&json='+JSON.stringify(params);
                                        break;
                              case 'getGraph':source=connections.reportsQuestionnaire.getGraph;
                                        
                                        r = $.extend(r, source);
                                        r.data={action:'get',user:obj.options.data.userActive.id,json:JSON.stringify(params),currentyear:obj.options.data.userActive.currentyear};
                                        //r.url=r.url+'&user='+obj.options.data.userActive.id+'&json='+JSON.stringify(params);
                                        break;
                              case 'getSeed':source=connections.reportsQuestionnaire.getSeed;
                                        r = $.extend(r, source);
                                        r.data={action:'get',user:obj.options.data.userActive.id,json:JSON.stringify(params),currentyear:obj.options.data.userActive.currentyear};
                                        //r.url=r.url+'&user='+obj.options.data.userActive.id+'&json='+JSON.stringify(params);
                                        break;
                              case 'getSeedPdf':source=connections.reportsQuestionnaire.getSeedPdf;
                                        r = $.extend(r, source);
                                        r.data={action:'get',user:obj.options.data.userActive.id,json:JSON.stringify(params),currentyear:obj.options.data.userActive.currentyear};
                                        //r.url=r.url+'&user='+obj.options.data.userActive.id+'&json='+JSON.stringify(params);
                                        break;
                                       
                    }
                    $.ajax(r);
          },
          addEventToFielsRow:function(block,visible){
                    var obj = this;
                    $("."+obj.id +" ."+block+" .itemFieldReport").each(function(){
                              $(this).click(function(){
                                        var clase = "itemFieldReport_selected";
                                        var status = $(this).attr('status');
                                        if (status=='') {
                                                  status = "true";
                                                  $(this).addClass(clase);
                                        }else{
                                                  status = '';
                                                  $(this).removeClass(clase);
                                        }
                                        $(this).attr('status',status);
                              }).dblclick(function(){
                                        var block = $(this).attr('block')
                                        var field = $(this).attr('ref');
                                        if (block=='fieldsToSelect') {
                                                  obj.fields[field].selected = true;
                                                  $(this).removeClass('itemFieldReport_selected');
                                                  $("."+obj.id+" .fieldsSelected #R"+field).show();
                                        }else{
                                                  
                                                  obj.fields[field].selected = false;
                                                  $(this).removeClass('itemFieldReport_selected');
                                                  $("."+obj.id+" .fieldsToSelect #R"+field).show();
                                        }
                                        $(this).hide();
                                        $(this).attr('status','');
                                        
                              }); 

                              
                    });
                    if (!visible) {
                              $("."+obj.id +" ."+block+" .itemFieldReport").each(function(){
                                        $(this).hide();
                              });
                    }
          },
          showGraph:function(tipo,data){
                    var obj = this;
                    tipo = parseInt(tipo);
                    $(".graphPrint").remove();
                    var chain = '<div class="title_report">'+$("#field_graph option:selected").val()+'</div>';
                    $("body").append('<div class="graphPrint" style="display:none">'+chain+'<center><div class="containerg"></div></center></div>');
                    if (tipo==1) {
                              obj.showBarGraph(data,'data_graph');
                              obj.showBarGraph(data,'containerg');
                    }else{
                              obj.showPieGraph(data,'data_graph');
                              obj.showPieGraph(data,'containerg');
                    }
          },
          showBarGraph:function(data,clase){
                    var source = [];
                    var field = $("#field_graph option:selected").val();
                    var etiqueta = obj.fields[field].label;
                    for(var x in data){
                              var i = data[x];
                              source.push([i.label,parseInt(i.value)]);
                    }
                    $('.'+obj.id+' .'+clase).html();
                    $('.'+obj.id+' .'+clase).highcharts({
                              chart: {
                                  type: 'column'
                              },
                              title: {
                                  text: ''
                              },
                              subtitle: {
                                  text: ''
                              },
                              credits:{
                                        enabled:false        
                              },
                              xAxis: {
                                  type: 'category',
                                  labels: {
                                      rotation: -45,
                                      style: {
                                          fontSize: '13px',
                                          fontFamily: 'Verdana, sans-serif'
                                      }
                                  }
                              },
                              yAxis: {
                                  min: 0,
                                  title: {
                                      text: etiqueta
                                  }
                              },
                              legend: {
                                  enabled: false
                              },
                              tooltip: {
                                  pointFormat: '{point.y}'
                              },
                              series: [{
                                  name: etiqueta,
                                  data: source,
                                  dataLabels: {
                                      enabled: true,
                                      rotation: -90,
                                      color: '#FFFFFF',
                                      align: 'right',
                                      format: '{point.y:.1f}', // one decimal
                                      y: 10, // 10 pixels down from the top
                                      style: {
                                          fontSize: '13px',
                                          fontFamily: 'Verdana, sans-serif'
                                      }
                                  }
                              }]
                          });
          },
          showPieGraph:function(data,clase){
                    var source = [];
                    var field = $("#field_graph option:selected").val();
                    var etiqueta = obj.fields[field].label;
                    for(var x in data){
                              var i = data[x];
                              source.push([i.label,parseInt(i.value)]);
                    }
                    $('.'+obj.id+' .'+clase).html();
                    $('.'+obj.id+' .'+clase).highcharts({
                              chart: {
                                  plotBackgroundColor: null,
                                  plotBorderWidth: null,
                                  plotShadow: false
                              },
                              title: {
                                  text: ''
                              },
                              credits:{
                                        enabled:false        
                              },
                              tooltip: {
                                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                              },
                              plotOptions: {
                                  pie: {
                                      allowPointSelect: true,
                                      cursor: 'pointer',
                                      dataLabels: {
                                          enabled: true,
                                          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                          style: {
                                              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                          }
                                      }
                                  }
                              },
                              series: [{
                                  type: 'pie',
                                  name: etiqueta,
                                  data: source
                              }]
                    });
          },
	  createFields:function(data,block,visible){
                    var chain='';
                    var obj = this;
                    for(var x in data){
                              var i = data[x];
                              i.selected=false;
                              obj.fields[i.field]=i;
                              chain+='<div class="itemFieldReport" id="R'+i.field+'" ref="'+i.field+'" status="" block="'+block+'">'+
                                        '<div class="label">'+i.label+'</div>'+
                                     '</div>';
                    }
                    $("."+obj.id +" ."+block+" .dataBlock").html('');
                    $("."+obj.id +" ."+block+" .dataBlock").append(chain);
                    obj.addEventToFielsRow(block,visible);
                    
                    
          },
          existFieldsSelected:function(){
                    var obj = this;
                    var exist = false;
                              for(var x in obj.fields){
                                        var i = obj.fields[x];
                                        if (i.selected) {
                                                  exist=true;
                                                  break;
                                        }
                              }
                    return exist;
          },
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          _init:function(){
                   this.show();
	  },
          _create: function() {
                    (function($) {
                              $.fn.hasScrollBar = function() {
                                  //return this.get(0).scrollHeight > this.height();
                              }
                    })(jQuery);
                    (function($) {
                              $.fn.hasScrollBarx = function() {
                                  return this.get(0).scrollWidth > this.width();
                              }
                    })(jQuery);
		this.update();
          },
          getSectionHeader:function(){
                    var chain='';
                    var obj=this;
                    for(var x in obj.steps){
                              var i = obj.steps[x];
                              chain+='<div class="step step'+parseInt(i.number)+'">'+
                                        '<div class="vignette">'+
                                                  '<div class="template_reports trep_vignette"></div>'+
                                                  '<div class="number">'+i.number+'</div>'+
                                        '</div>'+
                                        '<div class="label">'+i.label+'</div>'+
                                    '</div>';
                    }
                    return chain;
          },
          getSection1:function(){
                    var chain='<div class="section1 section">'+
                                        '<div class="row">'+
                                                  '<div class="col s12 m6">'+
                                                            '<div class="fieldsToSelect boxContainer">'+
                                                                      '<div class="titleBlock"><div class="label">Campos disponibles</div></div>'+
                                                                      '<div class="dataBlock"></div>'+
                                                                      '<div class="footerBlock">'+
                                                                                '<div class="label">Enviar</div>'+
                                                                                '<div class="icon">'+
                                                                                          '<div class="template_reports2 trep_row_right"></div>'+
                                                                                '</div>'+
                                                                      '</div>'+
                                                            '</div>'+
                                                  '</div>'+
                                                  '<div class="col s12 m6">'+
                                                            '<div class="fieldsSelected boxContainer">'+
                                                                      '<div class="titleBlock"><div class="label">Campos seleccionados</div></div>'+
                                                                      '<div class="dataBlock"></div>'+
                                                                      '<div class="footerBlock">'+
                                                                                
                                                                                '<div class="icon">'+
                                                                                          '<div class="template_reports2 trep_row_left"></div>'+
                                                                                '</div>'+
                                                                                '<div class="label">Enviar</div>'+
                                                                      '</div>'+
                                                            '</div>'+
                                                  '</div>'+
                                        '</div>'+
                                        '<div class="sectionButtons">'+
                                                  '<button class="textButton btnRight buttonReport btn waves-effect waves-light" id="btnStep1">'+
                                                            'Siguiente'+
                                                            '<i class="mdi-hardware-keyboard-arrow-right right"></i>'+
                                                  '</button>'+
                                        '</div>'+
                                        
                              '</div>';
                    return chain;
          },
          getSection2:function(){
                    var chain='<div class="section2 section">'+
                                        '<div class="row" style="position:relative;">'+
                                                  '<div id="filtering" class="col s12 m6">'+
                    
                                                  '</div>'+
                                        '</div>'+
                                        '<div class="sectionButtonsLeft">'+
                                                  '<div id="btnStep2Back">'+
                                                            '<div class="template_reports trep_row_leftBig"></div>'+
                                                            '<div class="label">Anterior</div>'+
                                                  '</div>'+
                                        '</div>'+
                                        '<div class="sectionFilters">'+
                                                  
                                        '</div>'+
                                        '<div class="sectionButtons">'+
                                                  '<div id="btnStep2Next">'+
                                                            '<div class="template_reports trep_row_rightBig"></div>'+
                                                            '<div class="label">Siguiente</div>'+
                                                  '</div>'+
                                        '</div>'+
                                        
                              '</div>';
                    return chain;
          },
          getSection3:function(){
                    
                    var chain='<div class="section3 section">'+
                                        '<div class="row">'+
                                                  '<div class="col s12 m6">'+
                                                            '<div id="displaying" class="boxContainer2">'+
                                                                      '<div class="titleSubsection">Despliegue</div>'+
                                                                      '<div class="row" style="margin-top: 40px;">'+
                                                                                '<div class="col s12 m6">'+
                                                                                          '<div class="col s12 m12">'+
                                                                                                    '<div class="template_reports trep_columns"></div>'+
                                                                                          '</div>'+
                                                                                          '<p>'+
                                                                                                    '<input name="group1" type="radio" id="displayColumns" checked="checked" />'+
                                                                                                    '<label for="displayColumns">Por columnas</label>'+
                                                                                          '</p>'+
                                                                                '</div>'+
                                                                                '<div class="col s12 m6">'+
                                                                                          '<div class="col s12 m12">'+
                                                                                                    '<center>'+
                                                                                                    '<div class="template_reports trep_rows"></div>'+
                                                                                                    '</center>'+
                                                                                          '</div>'+
                                                                                          '<p>'+
                                                                                                    '<input name="group1" type="radio" id="displayRows" />'+
                                                                                                    '<label for="displayRows">Por filas</label>'+
                                                                                          '</p>'+
                                                                                '</div>'+
                                                                      '</div>'+
                                                                      
                                                            '</div>'+
                                                  '</div>'+
                                                  '<div class="col s12 m6">'+
                                                            '<div id="TitleRep" class="boxContainer2" style="border-left: 1px solid #BBBBBB;">'+
                                                                      '<div class="titleSubsection">Titulo del reporte</div>'+
                                                                      '<div class="FieldReport">'+
                                                                                //'<div class="label">Titulo</div>'+
                                                                                   '<input id="name_report" type="text" class="textInput"/>'+
                                                                                
                                                                      '</div>'+
                                                            '</div>'+
                                                  '</div>'+
                                        '</div>'+
                                        '<div class="sectionButtons">'+
                                                  '<button class="textButton btnLeft buttonReport btn waves-effect waves-light" id="btnStep3Back">'+
                                                            'Anterior'+
                                                            '<i class="mdi-hardware-keyboard-arrow-left left"></i>'+
                                                  '</button>'+
                                                  '<button class="textButton btnRight buttonReport btn waves-effect waves-light" id="btnStep3Next">'+
                                                            'Generar reporte'+
                                                            '<i class="mdi-hardware-keyboard-arrow-right right"></i>'+
                                                  '</button>'+
                                        '</div>'+
                              '</div>';
                    return chain;
          },
          getSection4:function(){
                    var obj=this;
                    var chain='<div class="section4 section">'+
                                        obj.getBlocker()+
                                        '<div class="Header">'+
                                                  '<div class="title_report">Cuestionarios</div>'+
                                                  '<div class="exportOptions">'+
                                                            //'<div class="itemReport" title="Ver datos tabulares" alt="Ver datos tabulares"><div class="template_reports trep_tabular"></div></div>'+
                                                            //'<div class="itemReport" title="Ver datos gr&aacute;ficas" alt="Ver datos gr&aacute;ficas"><div class="template_reports trep_graph"></div></div>'+
                                                            '<div class="itemReport editFolio"><div class="template_reports trep_edit" title="Editar registro" alt="Editar registro" ></div></div>'+
                                                            '<div class="itemReport"><div class="template_reports trep_filter" title="Agregar filtro" alt="Agregar filtro" ></div></div>'+
                                                            '<div class="itemReport"><div class="template_reports trep_filter_clear" title="Limpiar filtro" alt="Limpiar filtro" ></div></div>'+
                                                            '<div class="itemReport"><div class="template_reports trep_csv"></div></div>'+
                                                            '<div class="itemReport"><div class="template_reports trep_pdf"></div></div>'+
                                                  '</div>'+
                                                  
                                        '</div>'+
                                        '<div class="headerTabular"></div>'+
                                        '<div class="dataTabular infoReport">'+
                                                  
                                        '</div>'+
                                        '<div class="pagination"></div>'+
                                        '<div class="dataGraph infoReport">'+
                                                  '<div class="option_graph"></div>'+
                                                  '<div class="data_graph"></div>'+
                                        '</div>'+
                                        

                              '</div>';
                    return chain;
          },
          getSection5:function(){
                    var chain='<div class="section5 section">'+
                                        '<div id="ordering">'+
                                                  
                                        '</div>'+
                                        '<div class="sectionButtons">'+
                                                  '<div id="btnBack2">'+
                                                            '<div class="template_reports trep_row_leftBig"></div>'+
                                                            '<div class="label">Anterior</div>'+
                                                  '</div>'+
                                        '</div>'+
                                        '<div class="bottomSection">'+
                                                  '<button class="textButton btnRight buttonReport btn waves-effect waves-light" id="btnProcessFilter">'+
                                                            'Aplicar'+
                                                            '<i class="mdi-hardware-keyboard-arrow-right right"></i>'+
                                                  '</button>'+
                                        '</div>'+
                                        
                              '</div>';
                    return chain;
          },
	  buildStructure:function(){
                    var obj=this;
                    obj.hide();
                    var o = obj.options.data;
                    var chain = ''+
                              '<div class="'+obj.id+'" align="center">'+
                                        //'<div class="HeaderSection">'+obj.getSectionHeader()+'</div>'+
                                        '<div class="dataSection">'+
                                                  obj.getSection1()+
                                                  obj.getSection2()+
                                                  obj.getSection3()+
                                                  obj.getSection4()+
                                                  obj.getSection5()+
                                        '</div>'+
                              '</div>';
                    this.element.html('');
                    this.element.append(chain);
	  },
         
          show:function(){
                 $("."+this.id).show();
                 this.visible=true;
          },
          
          hide:function(){
                 $("."+this.id).remove();
                 this.visible=false;
          },
          fillDataOrder:function(){
                    var obj = this;
                    obj.dataSend.fields=null;
                    obj.dataSend.fields=[];
                    var chain = '<div class="titleSubsection">Ordenado por campo</div>';
                    chain+='<div class="FieldReport">'+
                              '<div class="label">Campo</div>'+
                              '<select id="field_ordering" class="selectInput">';
                    for(var x in obj.fields){
                              var i = obj.fields[x];
                              //if (i.selected) {
                                        obj.dataSend.fields.push(i);
                                       chain+='<option value="'+i.field+'">'+i.label+'</option>';
                              //}
                              
                    }
                    chain+='</select></div>';
                    
                    chain+='<div class="FieldReport">'+
                           '<div class="label">Orden</div>'+
                              '<select id="type_ordering" class="selectInput">'+
                                        '<option value="1">Ascendente</option>'+
                                        '<option value="2">Descendente</option>'+
                              '</select>'+
                           '</div>';
                    
                    $("."+obj.id+" #ordering").html(chain);
                    
          },
          fillDataFilter :function(){
                    var obj = this;
                    var options='';          
                    for(var x in obj.fields){
                              var i = obj.fields[x];
                              options+='<option value="'+i.field+'">'+i.label+'</option>';
                              
                    }
                    var chain='<div class="option_fields">'+
                                        '<div class="FieldReport">'+
                                                  '<div class="label">Campo</div>'+
                                                  '<select id="field_filter" class="selectInput" >'+
                                                            options+
                                                  '</select>'+
                                        '</div>'+
                              '</div>'+
                              '<div class="option_operator"></div>'+
                              '<div class="option_filter"></div>';
                    
                    
                    $("."+obj.id+" #filtering").html(chain);
                    
                    $("."+obj.id+" #field_filter").change(function(){
                                                  var field = $("."+obj.id+" #field_filter option:selected").val();
                                                  obj.fieldToFilter = obj.fields[field];
                                                  obj.showOptionsFilter(obj.fields[field]);
                    });
                    $("."+obj.id+" #field_filter").change();
          },
          selectSection:function(section){
                    var obj = this;
                    
                    $("."+obj.id+"  .HeaderSection").show();
                    var claseVignette = 'activeVignette';
                    var clase = 'section_selected';
                    $("."+obj.id+" ."+clase).removeClass(clase).hide();
                    $("."+obj.id+" .section"+section).addClass(clase).show();
                    $("."+obj.id+" ."+claseVignette).removeClass(claseVignette);
                    $("."+obj.id+" .step"+section).addClass(claseVignette);
                    switch (section) {
                              case 1:
                                        //$(".custom_reports .dataSection").css('top','60px');
                                        break;
                              case 2:   //$(".custom_reports .dataSection").css('top','60px');
                                        /*comentados/********************
                                        obj.fillDataOrder();
                                        obj.fillDataFilter()
                                        */
                                        obj.fillDataFilter();
                                        break;
                              case 3:
                                        //obj.storefilterAndOrder();//comentado
                                        obj.fillDataOrder();
                                        
                                        break;
                              
                              case 4:
                                        obj.storeFilter();
                                        $("."+obj.id+"  .HeaderSection").hide();
                                        $("."+obj.id+"  .dataSection").css('top','0px');
                                        $("."+obj.id+" .dataTabular").show();
                                        $("."+obj.id+" .dataGraph").hide();
                                        //$(".trep_tabular").parent().hide();
                                        //$(".trep_graph").parent().show();
                                        obj.buildReport();
                                        //obj.buildSectionGraph();
                                        
                                        obj.graphLoaded=false;
                                        obj.tabActive='tabular';
                                        features.updatePredios();
                                        break;
                              case 5:
                                        //obj.storefilterAndOrder();//comentado
                                        obj.fillDataOrder();
                                        break;
                    }
                    
          },
          clearFilter:function(){
                    var obj = this;
                    obj.temporalFilter = [];
                    $("."+obj.id+" .sectionFilters").html('');
                    obj.hideItemReplace();
                    
          },
          buildSectionGraph:function(){
                    var chain='';
                    var valid = false;
                    chain='<div class="row">'+
                              '<div class="col s12 m6">'+
                                        '<div class="FieldReport">'+
                                                  '<div class="label">Campo</div>'+
                                                  '<select id="field_graph" class="selectInput">';
                                                  for(var x in obj.dataSend.fields){
                                                            var i = obj.dataSend.fields[x];
                                                            if (i.datatype=='numeric') {
                                                                      valid=true;
                                                                      chain+='<option value="'+i.field+'">'+i.label+'</option>';
                                                            }
                                                  }
                    chain+=                      '</select>'+
                                        '</div>'+
                              '</div>'+
                              '<div class="col s12 m6">'+
                                        '<div class="FieldReport">'+
                                                            '<div class="label">Tipo de grafica</div>'+
                                                            '<select id="type_graph" class="selectInput">'+
                                                                      '<option value="1">De barras</option>'+
                                                                      '<option value="2">De pastel</option>'+
                                                            '</select>'+
                                        '</div>'+
                              '</div>';
                    $(".option_graph").html(chain);
                    $("#field_graph").change(function(){
                              var tipo = $('#type_graph option:selected').val();
                              obj.loadGraph(tipo);
                    });
                    $("#type_graph").change(function(){
                              var tipo = $('#type_graph option:selected').val();
                              obj.loadGraph(tipo);
                    });
                    if (!valid) {
                             $(".trep_graph").parent().hide();
                    }
          },
          hasFolio:function(data){
                    var hasfield = false
                    for(var x in data){
                              var i = data[x];
                              if (i.field=='folio') {
                                        hasfield=true;
                                        break;
                              }
                    }
                    return hasfield;
          },
          buildReport:function(){
                    var obj = this;
                    if (obj.firstReport) {
                              obj.pagination.currentPage=1;
                              obj.pagination.reload='true';
                              obj.pagination.type='more';
                              obj.dataSend.order=null;
                              obj.temporalFilter=[];
                              obj.dataSend.filter=[];
                              obj.request(null,'getReport');
                              
                              obj.firstReport=false;
                    }else{
                              var params = $.extend({}, obj.dataSend);
                              if ((obj.dataSend.filter==null)||(obj.dataSend.filter==[])) {
                                        delete params.filter;
                              }
                              if (obj.dataSend.order==null) {
                                        delete params.order;
                              }
                              delete params.fields;
                              obj.request(params,'getReport');
                    }
          },
          //storefilterAndOrder:function(){
          storeOrder:function(){
                    var obj = this;
                    var fieldOrder = $("."+obj.id+" #field_ordering option:selected").val();
                    var typeOrder = $("."+obj.id+" #type_ordering option:selected").val();
                    obj.dataSend.order = {field:fieldOrder,value:typeOrder,dataType:obj.fields[fieldOrder].dataType};
          },
          getActualFilter:function(){
                    var obj = this;
                    var filter = {};
                    var label = '';
                    var typeOperator = '1';
                    var valueFilter='';
                    var field_filter = $("."+obj.id+" #field_filter option:selected").val();
                    
                    switch (obj.fieldToFilter.datatype) {
                              case 'numeric':
                              case 'real':
                                        typeOperator = $("."+obj.id+" #type_operator option:selected").val();
                                        valueFilter = $("."+obj.id+" #value_filter").val();
                                        break;
                              case 'list':
                                        typeOperator = $("."+obj.id+" #type_operator option:selected").val();
                                        valueFilter = $("."+obj.id+" #value_filter option:selected").val();
                                        if (valueFilter=='-1') {
                                                  valueFilter='';
                                        }
                                        break;
                                        
                              default:
                                        valueFilter = $("."+obj.id+" #value_filter").val();
                                        typeOperator = $("."+obj.id+" #type_operator option:selected").val();
                    }
                    if(validator.isEmpty(valueFilter)){
                              filter = null;
                    }else{
                              filter = {field:field_filter,operator:typeOperator,value:valueFilter,datatype:obj.fieldToFilter.datatype};
                              var field = $("."+obj.id+" #field_filter option:selected").text();
                              var operator = $("."+obj.id+" #type_operator option:selected").text();
                              operator = (operator=='')?'=':operator;
                              label = field+' '+operator+' '+valueFilter;
                    }
                    return {filter:filter,label:label};
          },
          sendToSelected:function(){
                    var obj = this;
                    $("."+obj.id+" .fieldsToSelect .itemFieldReport_selected").each(function(){
                              var field = $(this).attr('ref');
                              obj.fields[field].selected = true;
                              $(this).hide();
                              $(this).attr('status','');
                              $(this).removeClass('itemFieldReport_selected');
                              $("."+obj.id+" .fieldsSelected #R"+field).show();
                    });
                    
          },
          sendToAvailable:function(){
                    var obj = this;
                    $("."+obj.id+" .fieldsSelected .itemFieldReport_selected").each(function(){
                              var field = $(this).attr('ref');
                              obj.fields[field].selected = false;
                              $(this).hide();
                              $(this).attr('status','');
                              $(this).removeClass('itemFieldReport_selected');
                              $("."+obj.id+" .fieldsToSelect #R"+field).show();
                    });        
          },
          
          showOptionsFilter:function(data){
                    var obj = this;
                    var chain='';
                    var operator = '';
                    chain +='<div class="FieldReport">'+
                                        '<div class="label">Valor</div>';
                    switch (data.datatype) {
                              case 'string':
                                        operator+='<div class="FieldReport">'+
                                                            '<div class="label">Operador</div>'+
                                                            '<select id="type_operator" class="selectInput">'+
                                                                      '<option value="1">=</option>'+
                                                                      '<option value="4">< ></option>'+
                                                            '</select>'+
                                                  '</div>';
                                        chain+='<input id="value_filter" type="text" class="textInput"/>';
                              break;
                              case 'list':
                                        var opciones='';
                                        for(var x in data.list.list){
                                                  var i = data.list.list[x];
                                                  opciones+='<option value="'+i.value+'">'+i.label+'</option>';
                                        }
                                        operator+='<div class="FieldReport">'+
                                                            '<div class="label">Operador</div>'+
                                                            '<select id="type_operator" class="selectInput">'+
                                                                      '<option value="1">=</option>'+
                                                                      '<option value="4">< ></option>'+
                                                            '</select>'+
                                                  '</div>';
                                        chain+=  '<select id="value_filter" class="selectInput">'+
                                                            '<option value="-1">Cualquier valor</option>'+
                                                            opciones+ 
                                                  '</select>';
                              break;
                              case 'numeric':
                              case 'real':
                                        operator+='<div class="FieldReport">'+
                                                            '<div class="label">Operador</div>'+
                                                            '<select id="type_operator" class="selectInput">'+
                                                                      '<option value="1">=</option>'+
                                                                      '<option value="2">></option>'+
                                                                      '<option value="3"><</option>'+
                                                                      '<option value="4">< ></option>'+
                                                                      '<option value="5"><=</option>'+
                                                                      '<option value="6">>=</option>'+
                                                            '</select>'+
                                                  '</div>';
                                        chain+= '<input id="value_filter" type="text" class="textInput"/>';
                                                  
                              break;
                              case 'date':
                                        operator+='<div class="FieldReport">'+
                                                            '<div class="label">Operador</div>'+
                                                            '<select id="type_operator" class="selectInput">'+
                                                                      '<option value="1">=</option>'+
                                                                      '<option value="2">></option>'+
                                                                      '<option value="3"><</option>'+
                                                                      '<option value="4">< ></option>'+
                                                                      '<option value="5"><=</option>'+
                                                                      '<option value="6">>=</option>'+
                                                                      '<option value="3"><</option>'+
                                                            '</select>'+
                                                  '</div>';
                                        chain+= '<input id="value_filter" type="text" class="textInput"/>';
                              break;
                              case 'records':
                              break;
                    
                    }
                    chain+='<div class="addFilter">'+
                              '<div class="template_reports trep_plus"></div>'+
                           '</div>';
                    chain+='</div>';
                    if (operator=='') {
                          $("."+obj.id+" .option_fields").css("width","50%");
                          $("."+obj.id+" .option_operator").hide();
                          $("."+obj.id+" .option_filter").css("width","45%");
                    }else{
                          $("."+obj.id+" .option_fields").css("width","40%");
                          $("."+obj.id+" .option_operator").css("width","20%").show();
                          $("."+obj.id+" .option_filter").css("width","35%");
                    }
                    $("."+obj.id+" .option_operator").html(operator);
                    $("."+obj.id+" .option_filter").html(chain);
                    if (data.datatype=='numeric') {
                              $("."+obj.id+" #value_filter").keypress(function (e) {
                                        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                                                  return false;
                                       }
                              });
                    }
                    $("."+obj.id+" .addFilter").click(function(){
                              obj.addFilter();
                    });
          },
          addFilter:function(){
                    var obj = this;
                    obj.counterFilter+=1;
                    var id = 'Filter'+obj.counterFilter;
                    var a = obj.getActualFilter();
                    a.filter['id']=id;
                    if (a.filter) {
                              obj.temporalFilter.push(a.filter);
                              obj.showNewFilter(a);
                    }
                    
                    
          },
          showNewFilter:function(a){
                    var obj = this;
                    var id = a.filter.id;
                    var chain='<div class="itemFilter" id="'+id+'">'+
                                        '<div class="label">'+a.label+'</div>'+
                                        '<div class="icon" id="del'+id+'" parent="'+id+'"><div class="template_reports trep_remove"></div></div>'+
                              '</div>'
                    $("."+obj.id+" .sectionFilters").append(chain);
                    $("."+obj.id+" #del"+id).click(function(){
                              var parent = $(this).attr('parent');
                              $("."+obj.id+" #"+parent).remove();
                              obj.deleteFromTemporalFilter(parent);
                    });
          },
          deleteFromTemporalFilter:function(id){
                    var obj = this;
                    var f = obj.temporalFilter;
                    var position=null;
                    for(var x in f){
                              var i = f[x];
                              if (i.id==id) {
                                        position=x;
                                        break;
                              }
                    }
                    if (position) {
                              f.splice(position,1);
                    }
          },
          storeFilter:function(){
                    var obj = this;
                    obj.dataSend.filter = $.extend([], obj.temporalFilter);        
          },
          events:function(){
                    var obj=this;
                    $("."+obj.id+" .section").each(function(){
                              $(this).hide();
                    });
                    obj.selectSection(4);
                    
                    obj.request({action:'getcolumns',user:obj.options.data.userActive.id,currentyear:obj.options.data.userActive.currentyear},'getFields');
                    
                    
                    $("."+obj.id+" .fieldsToSelect .footerBlock").click(function(){
                              obj.sendToSelected();
                    });
                    $("."+obj.id+" .fieldsSelected .footerBlock").click(function(){
                              obj.sendToAvailable();
                    });
                    $("."+obj.id+" #btnStep1").click(function(){
                              var valid= obj.existFieldsSelected();
                              if (valid) {
                                        obj.selectSection(2);
                              }else{
                                        Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:['Debe seleccionar por lo menos un campo'],
                                                  buttons:[{label:'Cerrar'}]
                                        }); 
                              }
                              
                    });
                    $("."+obj.id+" #btnStep2Back").click(function(){
                              //obj.selectSection(1);
                              $("."+obj.id+" .HeaderSection").hide();
                              $("."+obj.id+" .dataSection").css('top','0px');
                              var clase = 'section_selected';
                              $("."+obj.id+" ."+clase).removeClass(clase).hide();
                              $("."+obj.id+" .section4").addClass(clase).show();
                    });
                    
                    $("."+obj.id+" #btnStep2Next").click(function(){
                              var valid = true;
                              /*
                              if (obj.fieldToFilter.datatype!='select') {
                                        if (validator.isEmpty($("#value_filter").val())) {
                                                  valid=false;
                                        }
                                       
                              }
                              */
                              if (valid) {
                                      obj.selectSection(5);
                              }else{
                                        Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:['Debe introducir un valor a filtrar'],
                                                  buttons:[{label:'Cerrar'}]
                                        }); 
                              }
                              
                    });
                    $("."+obj.id+" #btnStep3Back").click(function(){
                              obj.selectSection(2);
                    });
                    $("."+obj.id+" #btnStep3Next").click(function(){
                              var valid = true;
                              if (validator.isEmpty($("."+obj.id+" #name_report").val())) {
                                                  valid=false;
                              }
                              
                              if (valid) {
                                        obj.pagination.currentPage=1;
                                        obj.pagination.reload='true';
                                        obj.pagination.type='more';
                                       obj.selectSection(4);
                              }else{
                                        Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:['Introduzca un titulo'],
                                                  buttons:[{label:'Cerrar'}]
                                        }); 
                              }
                              
                    });
                    $("."+obj.id+" #btnBack2").click(function(){
                              obj.selectSection(2);
                    });
                    $("."+obj.id+" #btnProcessFilter").click(function(){
                              obj.storeOrder();
                              obj.pagination.currentPage=1;
                              obj.pagination.reload='true';
                              obj.pagination.type='more';
                              obj.selectSection(4);
                    });
                    /*
                    $(".trep_print").click(function(){
                              if (obj.tabActive=='tabular') {
                                        $(".reportPrint").css('display','');
                                        $(".section_info_user").hide();
                                        
                                        window.print();
                                         $(".reportPrint").css('display','none');
                                         $(".section_info_user").show();
                              }else{
                                         $(".graphPrint").css('display','');
                                        $(".section_info_user").hide();
                                        
                                        window.print();
                                         $(".graphPrint").css('display','none');
                                         $(".section_info_user").show();
                                        }
                             
                    });
                    */
                    $("."+obj.id+" .trep_filter").click(function(){
                              obj.selectSection(2);
                    });
                    $("."+obj.id+" .trep_edit").click(function(){
                              obj.showEditForm();
                    });
                    $("."+obj.id+" .trep_csv").click(function(){
                              var params = $.extend({}, obj.dataSend);
                              params['currentyear']=obj.options.data.userActive.currentyear;
                              if (obj.dataSend.filter==null) {
                                        delete params.filter;
                              }
                              obj.request(params,'getSeed');
                    });
                    $("."+obj.id+" .trep_filter_clear").click(function(){
                              obj.firstReport=true;
                              obj.buildReport();
                              features.updatePredios();
                              obj.clearFilter();
                    });
                    $("."+obj.id+" .trep_pdf").click(function(){
                            var params = $.extend({}, obj.dataSend);
                            params['currentyear']=obj.options.data.userActive.currentyear;
                              if (obj.dataSend.filter==null) {
                                        delete params.filter;
                              }
                              obj.request(params,'getSeedPdf');
                    });
                    $("."+obj.id+" .trep_tabular").parent().click(function(){
                              $("."+obj.id+" .trep_tabular").parent().hide();
                              $("."+obj.id+" .trep_graph").parent().show();
                              $("."+obj.id+" .dataTabular").show();
                              $("."+obj.id+" .dataGraph").hide();
                              obj.tabActive = 'tabular';
                    });
                    $("."+obj.id+" .trep_graph").parent().click(function(){
                              $("."+obj.id+" .trep_tabular").parent().show();
                              $("."+obj.id+" .trep_graph").parent().hide();
                              $("."+obj.id+" .dataTabular").hide();
                              $("."+obj.id+" .dataGraph").show();
                              if (!obj.graphLoaded) {
                                       obj.graphLoaded=true;
                                       obj.loadGraph('1');
                              }
                              obj.tabActive='graph';
                    });
                    
          },
          loadGraph:function(tipo){
                    var obj = this;
                    var field = $("."+obj.id+" #field_graph option:selected").val();
                    var params = $.extend({}, obj.dataSend);
                    params['currentyear']=obj.options.data.userActive.currentyear;
                    params.graph = {field:field};
                    obj.request(params,'getGraph',tipo);
          },
          showReport:function(data){
                    
                    var obj=this;
                    obj.descriptionReplace=[];
                    $("."+obj.id+" .title_report").html('Cuestionarios');
                    //var chain='<div class="title_report">'+$("."+obj.id+" #name_report").val()+'</div>';
                    var chain='';
                    chain+='<div class="results_table_filter">';
                    var header='<div class="Heading">';
                                        var clase = 'borderRow';
                                        var source = obj.dataSend.fields;
                                        for(var x in source){
                                                 var clase = (x==0)?'':'borderRow';
                                                 header+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p style="width:130px;">'+source[x].label+'</p>'+
                                                        '</div>';
                                        }
                    header+='</div>';
                    chain+=chain+header;
                    var clase = 'rowFilled';
                    for(var x in data){
                              var i = data[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                              //var enableEdit = (((obj.options.data.userActive.roleId>=1)&&(obj.options.data.userActive.roleId<6)&&(obj.options.data.userActive.roleId!=4)))?'edit="true"':'';
                              var enableEdit = (((obj.options.data.userActive.roleId>=1)&&(obj.options.data.userActive.roleId<=6)))?'edit="true"':'';
                              chain+='<div class="Row" '+enableEdit+' ref="'+i.wkt+'" feature="'+i.gid+'" folio="'+i.folio_predio+'">';
                              for(var f in source){
                                        var field = source[f].field;
                                        
                                        var valor = (field=='descripcion_reemplazo')? ((i[field]=='')?i[field]:'<button gid="'+i.gid+'" class="button description_replace">Ver</button>'):i[field];
                                        if (field=='descripcion_reemplazo') {
                                                  obj.descriptionReplace['d'+i.gid]=i[field];
                                        }
                                        
                                        chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p>'+valor+'</p>'+
                                               '</div>';
                              }
                              chain+='</div>';
                                  
                    }
                    chain+='</div>';
                    $("."+obj.id+" .dataTabular").html(chain);
                    //$(".dataTabular").append('<div class="headerTabular"><div class="results_table_filter">'+header+'</div></div>');
                    $("."+obj.id+" .headerTabular").html('<div class="results_table_filter">'+header+'</div>');
                    setTimeout(function(){
                                        if($('.'+obj.id+' .dataTabular').hasScrollBar()){
                                                  $("."+obj.id+" .headerTabular").css('right','16px');
                                        }
                                        $('.'+obj.id+' .dataTabular').scroll(function(){
                                                 var position =  $('.'+obj.id+' .dataTabular').scrollLeft();
                                                 $("."+obj.id+" .headerTabular").scrollLeft(position);
                                        });
                    },500);
                    $(".reportPrint").remove();
                    $("body").append('<div class="reportPrint" style="display:none">'+chain+'</div>');
                    $("."+obj.id+" .results_table_filter .Row").each(function(){
                              $(this).click(function(){
                                        var clase = 'Row_selected';
                                        var edit = $(this).attr('edit');
                                        var folio = $(this).attr('folio');
                                        var idfeature = $(this).attr('feature');
                                        obj.itemToEdit = folio;
                                        $("."+obj.id+" ."+clase).removeClass(clase);
                                        $(this).addClass(clase);
                                        var wkt = $(this).attr('ref');
                                        map.goPoint(wkt);
                                        features.selectFeature(idfeature);
                                        if (edit) {
                                                  obj.showItemEdit();
                                        }else{
                                                  obj.hideItemEdit();
                                        }
                              });
                    });
                    $("."+obj.id+" .description_replace").each(function(){
                              $(this).click(function(){
                                        var gid = $(this).attr('gid');
                                        obj.showDescription(gid);
                              });
                    });
                    obj.hideItemEdit();
          },
          showDescription:function(id){
                    var obj = this;
                    var description = obj.descriptionReplace['d'+id];
                    $("body").textArea({data:{label:'Descripci&oacute;n de remplazo',text:description,mode:'consult'}});
          },
          showEditForm:function(){
                    var obj = this;
                    var o = obj.options.data;
                    var params = {action:'get',currentyear:o.userActive.currentyear,id:obj.itemToEdit,user:o.userActive.id};
                    $('#FormQuestionnaire').formQuestionnaire({data:params,action:'edit'});
          },
          showItemEdit:function(){
                    var obj = this;
                    $("."+obj.id+" .editFolio").show();
          },
          hideItemEdit:function(){
                    var obj = this;
                    $("."+obj.id+" .editFolio").hide();
                    obj.itemToEdit=null;
          },
          updatePagination:function(data){
                    var obj = this;
                    obj.pagination.currentPage = data.currentpage;
                    obj.pagination.totalPages = data.totalpages;
                    
                    var tipo = obj.pagination.type;
                    if (obj.pagination.reload=='true') {
                              var initPag = (tipo=='more')?((obj.pagination.currentPage-1)):(obj.pagination.currentPage-obj.pagination.pages);
                              var isinLast=false;
                              var chain='<div class="blockPagination">';
                              chain+=(obj.pagination.currentPage<=obj.pagination.pages)?'':'<div class="page pageRow pageRowLeft" reload="true" type="less" page="'+((tipo=='more')?(obj.pagination.currentPage-1):(initPag))+'"><div class="template_reports trep_prev icon"></div><div class="label">Anterior</div></div>';
                              var page=0;
                              for(var x=1;x<=10;x++){
                                        page = initPag+=1;
                                        if (page<=obj.pagination.totalPages) {
                                                 chain+='<div class="page pageItem" reload="false" page="'+page+'"><div class="label">'+page+'</div></div>';
                                                 if (page==obj.pagination.totalPages) {
                                                  isinLast=true;
                                                 }
                                        }else{
                                                  
                                        }
                                        
                              }
                              chain+=(isinLast)?'':'<div class="page pageRow pageRowRight" reload="true" type="more" page="'+(page+1)+'"><div class="label">Siguiente</div><div class="template_reports trep_next icon"></div></div>';
                              chain+='</div>';
                              chain+='<div class="totalRows">'+validator.getFormatNumber(data.totalrows)+' Registros</div>';
                              $("."+obj.id+" .pagination").html(chain);
                              $("."+obj.id+" .pagination .page").each(function(){
                                        $(this).click(function(){
                                                  var page = parseInt($(this).attr('page'));
                                                  var reload = $(this).attr('reload');
                                                  if (reload=='true') {
                                                            var tipo = $(this).attr('type');
                                                            obj.pagination.type=tipo;
                                                  }
                                                  obj.pagination.currentPage=page;
                                                  obj.pagination.reload=reload;
                                                  
                                                  obj.buildReport();
                                        });
                              });
                    }
                    var clase = 'page_selected';
                    $("."+obj.id+" ."+clase).removeClass(clase);
                    $('.'+obj.id+' div[page="'+obj.pagination.currentPage+'"]').addClass(clase);
          },
          showReportRows:function(data){
                    
                    var obj=this;
                    var chain='<div class="title_report">'+$("."+obj.id+" #name_report").val()+'</div>';
                    chain+='<div class="results_table_filter">';
                    var source = obj.dataSend.fields;
                              
                    
                    var clase = 'rowFilled';
                    for(var x in data){
                              var i = data[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                             
                              
                              for(var f in source){
                                        var valor = i[source[f].field];
                                        chain+='<div class="Row">';
                                        chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p>'+source[f].label+'</p>'+
                                               '</div>';
                                        chain+='<div class="Cell borderHeading '+clase+'">'+
                                                            '<p>'+valor+'</p>'+
                                               '</div>';
                                        chain+='</div>';
                              }
                              
                                  
                    }
                    chain+='</div>';
                    $("."+obj.id+" .dataTabular").html(chain);
                    $(".reportPrint").remove();
                    $("body").append('<div class="reportPrint" style="display:none">'+chain+'</div>');
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
                                                  this.fields=[];
                                                  this.options.data = value;
                                                  this.update();
                                        break;
                                                          
                              }
		    }
	  }
);
});