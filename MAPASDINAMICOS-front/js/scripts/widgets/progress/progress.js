/**
 * Despliega la informaci�n asociada al ejecutivo, mediante el uso de distintos bloques de informaci�n
 */
define(["connections","validator","Alert","structure","map"], function(connections,validator,Alert,structure,Map){
$.widget( "custom.progress", {
          id:'custom_progress',
          enable:true,
          mapLoaded:false,
          countSpinner:0,
          clockFilter:null,
          dataCustomGraph:null,
          dataFiltered:{},
          dataSelected:{},
          dataSelectedTotals:{},
          dataFilteredTables:{},
          dataSelectedTables:{},
          dataSelectedTotalsTables:{},
          activePositionAccordion:0,
          activePositionAccordionTables:0,
          dates:null,
          options:{
                    data:{
                              resume:[
                                        {width:'70',height:'60',measure:'%',typeData:'container',id:'cp_graph',clear:true,tools:{print:true}},
                                        {width:'30',height:'12',measure:'%',typeData:'container',id:'cp_total',clear:true,title:'Meta actualizada'},
                                        //{width:'30',height:'10',measure:'%',typeData:'container2',id:'cp_na',clear:true,title:'Predios asignados'},
                                        {width:'30',height:'12',measure:'%',typeData:'container2',id:'cp_a',clear:true,title:'Cuestionarios entregados'},
                                        {width:'30',height:'12',measure:'%',typeData:'container2',id:'cp_v',clear:true,title:'Cuestionarios validados'},
                                        {width:'30',height:'12',measure:'%',typeData:'container2',id:'cp_d',clear:true,title:'Brigadistas'},
                                        {width:'30',height:'12',measure:'%',typeData:'container',id:'cp_progress',clear:true,title:'Avance'},
                                        {width:'100',height:'40',measure:'%',typeData:'container',id:'cp_table',clear:true,title:'',tools:{print:false}}
                              ],
                              tabulate:[
                                        {width:'30',height:'100',measure:'%',typeData:'container',id:'cp_fields',clear:true,title:'',tools:{print:false}},
                                        {width:'70',height:'60',measure:'%',typeData:'container',id:'cp_customGraph',clear:true,title:'',tools:{print:true}},
                                        {width:'70',height:'40',measure:'%',typeData:'container',id:'cp_customTabular',clear:true,title:'',tools:{print:true}}
                                        
                              ],
                              tables:[
                                        
                                        {width:'30',height:'100',measure:'%',typeData:'container',id:'cp_fieldsTables',clear:true,title:'',tools:{print:false}},
                                        //{width:'70',height:'60',measure:'%',typeData:'container',id:'cp_customTables',clear:true,title:'',tools:{print:true}},
                                        {width:'70',height:'100',measure:'%',typeData:'container',id:'cp_customTabularTables',clear:true,title:'',tools:{print:false}}
                                        
                              ],
                              brigadist:[
                                        
                                        {width:'100',height:'50',measure:'%',typeData:'container',id:'cp_brigTab',clear:false,title:'',tools:{print:true}},
                                        {width:'100',height:'50',measure:'%',typeData:'container',id:'cp_brigGraph',clear:true,title:'',tools:{print:true}}
                              ],
                              map:[
                                        {width:'100',height:'500',typeData:'container',id:'cp_map',clear:false,title:''}
                              ],
                              columns:[
                                   
                              ],
                              user:null,
                              params:{},
                              file:'nacional',
                              type:'Entidad',
                              label:'',
                              event:function(){}
                    },
                    path:'data/geojson/'
          },
          getHeaderTable:function(data){
                    var obj=this;
                 var chain='';
                    chain+='<div class="progress_table_results">';
                    chain+='<div class="Heading">'+
                              '<div class="Cell borderHeading" style="width:16%;">'+
                                  '<p>'+obj.options.data.type+'</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:14%;">'+
                                  '<p>Total de cuestionarios</p>'+
                              '</div>'+
                              //'<div class="Cell borderHeading borderRow" style="width:14%;">'+
                              //    '<p>Total de predios asignados</p>'+
                              //'</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:14%;">'+
                                  '<p>Cuestionarios entregados</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:14%;">'+
                                  '<p>Cuestionarios validados</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:14%;">'+
                                  '<p>Porcentaje de avance total</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:14%;">'+
                                  '<p>N&uacute;mero de brigadistas</p>'+
                              '</div>'+
                          '</div>';
                    return chain;
          },
          getTable:function(data){
                    var obj=this;
                    var chain='';
                    chain+=obj.getHeaderTable(data);
                    
                    var clase = 'rowFilled';
                    for(var x in data){
                              var i = data[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                              var avance = (i.validated>0)?((i.validated*100)/i.totals):i.validated;
                              avance = (avance)?avance:0;
                              avance = avance.toFixed(1);
                              avance = (avance==100)?100:avance;
                              avance+="%";
                              chain+='<div class="Row">'+
                                        '<div class="Cell '+clase+' " style="width:16%;">'+
                                            '<p>'+i.label+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow Tac '+clase+'" style="width:14%;">'+
                                            '<p>'+validator.getFormatNumber(i.totals)+'</p>'+
                                        '</div>'+
                                        //'<div class="Cell borderRow Tac '+clase+'" style="width:14%;">'+
                                        //    '<p>'+validator.getFormatNumber(i.assigned)+'</p>'+
                                        //'</div>'+
                                        '<div class="Cell borderRow Tac '+clase+'" style="width:14%;">'+
                                            '<p>'+validator.getFormatNumber(i.delivered)+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow Tac '+clase+'" style="width:14%;">'+
                                            '<p>'+validator.getFormatNumber(i.validated)+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow Tac '+clase+'" align="center" style="width:14%;">'+
                                            avance+
                                        '</div>'+
                                        '<div class="Cell borderRow Tac '+clase+'" align="center" style="width:14%;">'+
                                            i.brigadist+
                                        '</div>'+
                                    '</div>';
                                  
                    }
                    chain+='</div>';
                    return chain;
          },
          getHeaderActionLine:function(data){
                    var obj=this;
                 var chain='';
                    chain+='<div class="progress_table_results">';
                    chain+='<div class="Heading">'+
                              '<div class="Cell borderHeading" style="width:16%;">'+
                                  '<p>'+obj.options.data.type+' (estrato)</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:28%;padding-left: 0px;padding-right: 0px;">'+
                                            '<div class="headerTable borderTable">'+
                                                  '<div class="RowTable">'+
                                                            '<div class="CellTable">Cuestionarios a validar</div>'+
                                                  '</div>'+
                                            '</div>'+
                                            '<div class="headerTable">'+
                                                  '<div class="RowTable">'+
                                                            '<div class="CellTable wt50">L2</div>'+
                                                            '<div class="CellTable borderLeftTable wt50">L3</div>'+
                                                  '</div>'+
                                            '</div>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:28%;padding-left: 0px;padding-right: 0px;">'+
                                            '<div class="headerTable borderTable">'+
                                                  '<div class="RowTable">'+
                                                            '<div class="CellTable">Cuestionarios validados</div>'+
                                                  '</div>'+
                                            '</div>'+
                                            '<div class="headerTable">'+
                                                  '<div class="RowTable">'+
                                                            '<div class="CellTable wt50">L2</div>'+
                                                            '<div class="CellTable borderLeftTable wt50">L3</div>'+
                                                  '</div>'+
                                            '</div>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:28%;padding-left: 0px;padding-right: 0px;">'+
                                            '<div class="headerTable borderTable">'+
                                                  '<div class="RowTable">'+
                                                            '<div class="CellTable">Total</div>'+
                                                  '</div>'+
                                            '</div>'+
                                            '<div class="headerTable">'+
                                                  '<div class="RowTable">'+
                                                            '<div class="CellTable wt50">Por validar</div>'+
                                                            '<div class="CellTable borderLeftTable wt50">Validados</div>'+
                                                  '</div>'+
                                            '</div>'+
                              '</div>'+
                          '</div>';
                    return chain;
          },
          getTableActionLine:function(data){
                    var obj=this;
                    var chain='';
                    chain+=obj.getHeaderActionLine(data);
                    var footer = {state:'Totales',notValidated:{a:0,b:0},validated:{a:0,b:0},totals:{a:0,b:0}};
                    var clase = 'rowFilled';
                    for(var x in data){
                              var i = data[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                              chain+='<div class="Row">'+
                                        '<div class="Cell '+clase+'" style="width:16%;">'+
                                            '<p>'+validator.getFormatNumber(i.label)+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+'" style="width:28%;padding-left: 0px;padding-right: 0px;">'+
                                            '<div class="headerTable">'+
                                                  '<div class="RowTable">'+
                                                            '<div class="CellTable wt50 Tac" ><p>'+validator.getFormatNumber(i.assigned.line2)+'</p></div>'+
                                                            '<div class="CellTable borderLeftTable wt50 Tac"><p>'+validator.getFormatNumber(i.assigned.line3)+'</p></div>'+
                                                  '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+'" style="width:28%;padding-left: 0px;padding-right: 0px;">'+
                                            '<div class="headerTable">'+
                                                  '<div class="RowTable">'+
                                                            '<div class="CellTable wt50 Tac" ><p>'+validator.getFormatNumber(i.delivered.line2)+'</p></div>'+
                                                            '<div class="CellTable borderLeftTable wt50 Tac"><p>'+validator.getFormatNumber(i.delivered.line3)+'</p></div>'+
                                                  '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+'" style="width:28%;padding-left: 0px;padding-right: 0px;">'+
                                            '<div class="headerTable">'+
                                                  '<div class="RowTable">'+
                                                            '<div class="CellTable wt50 Tac" ><p>'+validator.getFormatNumber(i.total.assigned)+'</p></div>'+
                                                            '<div class="CellTable borderLeftTable wt50 Tac"><p>'+validator.getFormatNumber(i.total.delivered)+'</p></div>'+
                                                  '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';
                              footer.notValidated.a+=i.assigned.line2;
                              footer.notValidated.b+=i.assigned.line3;
                              footer.validated.a+=i.delivered.line2;
                              footer.validated.b+=i.delivered.line3;
                              footer.totals.a+=i.total.assigned;
                              footer.totals.b+=i.total.delivered;  
                    }
                    
                    chain+='<div class="Heading" style="font-size: 115% !important;">';
                    for(var y in footer){
                              var i = footer[y];
                              
                              if(y == 'state'){
                                 chain+='<div class="Cell borderHeading" style="width:16%;">'+
                                            '<p>'+i+'</p>'+
                                        '</div>';
                              }else{
                                 chain+='<div class="Cell borderHeading borderRow" style="width:28%;padding-left: 0px;padding-right: 0px;">'+
                                            '<div class="headerTable">'+
                                                  '<div class="RowTable">'+
                                                            '<div class="CellTable wt50" ><p>'+validator.getFormatNumber(i.a)+'</p></div>'+
                                                            '<div class="CellTable borderLeftTable wt50"><p>'+validator.getFormatNumber(i.b)+'</p></div>'+
                                                  '</div>'+
                                            '</div>'+
                                        '</div>';
                              }
                    }
                    chain+='</div>';
                    chain+='</div>';
                    obj.buildGraphicActionLine(footer,'cp_lineGraph');
                    obj.buildGraphicActionLine(footer,'report_cp_lineGraph');
                    return chain;
          },
          buildGraphicActionLine:function(data,id){
                    $('#'+id).html('');
                    $('#'+id).highcharts({
                              chart: {
                                  type: 'column'
                              },
                              credits:{
                                      enabled:false	
                              },
                              colors: ['#434348','#006BA7'],
                              title: {
                                  text: 'Avance nacional de cuestionarios validados',
                                  style:{ "color": "#787878", "fontSize": "120%","font-weight":"bold"}
                              },
                              subtitle: {
                                  text: ''
                              },
                              xAxis: {
                                  categories: [
                                      'L2',
                                      'L3',
                                      'Total'
                                  ],
                                  crosshair: true
                              },
                              yAxis: {
                                  labels: {
                                        formatter: function () {
                                            return this.value;
                                        }
                                  },            
                                  min: 0,
                                  title: {
                                      text: ''
                                  }
                              },
                              tooltip: {
                                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                      '<td style="padding:0"><b>{point.y}</b></td></tr>',
                                  footerFormat: '</table>',
                                  shared: true,
                                  useHTML: true
                              },
                              plotOptions: {
                                  column: {
                                      pointPadding: 0.2,
                                      borderWidth: 0
                                  }
                              },
                              series: [{
                                  name: 'Sin validar',
                                  data: [data.notValidated.a,data.notValidated.b,data.totals.a]
                      
                              }, {
                                  name: 'Validados',
                                  data: [data.validated.a,data.validated.b,data.totals.b]
                      
                              }]
                    });        
          },
          
          getHeaderActionLine2:function(data){
                    var obj=this;
                 var chain='';
                    chain+='<div class="progress_table_results">';
                    chain+='<div class="Heading">'+
                              '<div class="Cell borderHeading" style="width:20%;">'+
                                  '<p>'+obj.options.data.type+'</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:16%;padding-left:0px;padding-right: 0px;">'+
                                        '<div class="headerTable borderTable">'+
                                                  '<div class="RowTable">'+
                                                            '<div class="CellTable">Predios L2</div>'+
                                                  '</div>'+
                                        '</div>'+
                                        '<div class="headerTable">'+
                                                  '<div class="RowTable">'+
                                                            '<div class="CellTable wt100">Muestra</div>'+
                                                  '</div>'+
                                        '</div>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:16%;padding-left:0px;padding-right: 0px;">'+
                                        '<div class="headerTable borderTable">'+
                                                  '<div class="RowTable">'+
                                                            '<div class="CellTable">Predios L3</div>'+
                                                  '</div>'+
                                        '</div>'+
                                        '<div class="headerTable">'+
                                                  '<div class="RowTable">'+
                                                            '<div class="CellTable wt100">Muestra</div>'+
                                                  '</div>'+
                                        '</div>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:16%;">'+
                                  '<p>Meta actualizada</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:16%;">'+
                                  '<p>Avance</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:16%;">'+
                                  '<p>Avance (%)</p>'+
                              '</div>'+
                              
                          '</div>';
                    return chain;
          },
         

          getTableActionLine2:function(data){
                    var obj=this;
                    var chain='';
                    chain+=obj.getHeaderActionLine2(data);
                    var footer = {state:'Totales',l2:0,l3:0,goal:0,progress:0,percentage:0};
                    var infoGraph=[];
                    var clase = 'rowFilled';
                    for(var x in data){
                              var i = data[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                              chain+='<div class="Row">'+
                                        '<div class="Cell '+clase+'" style="width:20%;">'+
                                            '<p>'+i.label+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow Tac '+clase+'" style="width:16%;">'+
                                            '<p>'+validator.getFormatNumber(i.sample_line2)+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow Tac '+clase+'" style="width:16%;">'+
                                            '<p>'+validator.getFormatNumber(i.sample_line3)+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow Tac '+clase+'" style="width:16%;">'+
                                            '<p>'+validator.getFormatNumber(i.goal)+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow Tac '+clase+'" style="width:16%;">'+
                                            '<p>'+validator.getFormatNumber(i.progress)+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow Tac '+clase+'" style="width:16%;">'+
                                            '<p>'+validator.getFormatNumber(i.progress_percentage)+'</p>'+
                                        '</div>'+
                                    '</div>';
                              footer.l2+=i.sample_line2;
                              footer.l3+=i.sample_line3;
                              footer.goal+=i.goal;
                              footer.progress+=i.progress;
                              footer.percentage+=i.progress_percentage;
                              infoGraph.push([i.label,i.progress_percentage]);
                    }
                    footer.percentage = (footer.percentage>0)?(footer.percentage/data.length):footer.percentage;
                    footer.percentage = (footer.percentage)?footer.percentage:0;
                    footer.percentage = footer.percentage.toFixed(1);
                    footer.percentage = (footer.percentage==100)?100:footer.percentage;
                    
                    chain+='<div class="Heading" style="font-size: 115% !important;">';
                    for(var y in footer){
                              var i = footer[y];
                              var width = (i=='state')?'20':'16';
                              chain+=   '<div class="Cell borderHeading borderRow" style="width:'+width+'%;">'+
                                            '<p>'+validator.getFormatNumber(i)+'</p>'+
                                        '</div>';
                    }
                    chain+='</div>';
                    chain+='</div>';
                    obj.buildGraphicActionLine2(infoGraph,'cp_lineGraph2');
                    obj.buildGraphicActionLine2(infoGraph,'report_cp_lineGraph2');
                    return chain;
          },
          buildGraphicActionLine2:function(data,id){
                    $('#'+id).html('');
                    $('#'+id).highcharts({
                          chart: {
                              type: 'column'
                          },
                          colors: ['#006BA7'],
                          credits:{
                                      enabled:false	
                              },
                          title: {
                                  text: 'Porcentaje de avance por entidad',
                                  style:{ "color": "#787878", "fontSize": "120%","font-weight":"bold"}
                          },
                          subtitle: {
                              text: ''
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
                                  text: 'Porcentaje (%)'
                              }
                          },
                          legend: {
                              enabled: false
                          },
                          tooltip: {
                              pointFormat: '<b>{point.y}%</b>'
                          },
                          series: [{
                              name: 'percentage',
                              data: data/*,/*
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
                              }*/
                          }]
                    });        
          },
          getHeaderBrigadist:function(data){
                    var obj=this;
                    var chain='';
                    chain+='<div class="progress_table_results">';
                    chain+='<div class="Heading">'+
                              '<div class="Cell borderHeading" style="width:20%;">'+
                                        '<p>Usuario</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:20%;">'+
                                  '<p>Estado</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:20%;">'+
                                  '<p>Puesto</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:20%;">'+
                                  '<p>Asignados</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:20%;">'+
                                  '<p>Entregados</p>'+
                              '</div>'+
                          '</div>';
                    return chain;
          },

          getTableBrigadist:function(data){
                    var obj=this;
                    var chain='';
                    chain+=obj.getHeaderBrigadist(data);
                    var infoGraph=[];
                    var clase = 'rowFilled';
                    for(var x in data){
                              var i = data[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                              chain+='<div class="Row">'+
                                        '<div class="Cell '+clase+'" style="width:20%;">'+
                                            '<p>'+i.usuario+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+' Tac" style="width:20%;">'+
                                            '<p>'+i.estado+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+' Tac" style="width:20%;">'+
                                            '<p>'+i.puesto+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+' Tac" style="width:20%;">'+
                                            '<p>'+validator.getFormatNumber(i.assigned)+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+' Tac" style="width:20%;">'+
                                            '<p>'+validator.getFormatNumber(i.delivered)+'</p>'+
                                        '</div>'+
                                    '</div>';
                    }
                    chain+='</div>';
                    
                    obj.buildGraphicBrigadist(data,'cp_brigGraph');
                    obj.buildGraphicBrigadist(data,'report_cp_brigGraph');
                    return chain;
          },
          buildGraphicBrigadist:function(data,id){
                    var categories = [];
                    var assigned =[];
                    var delivered =[];
                    for(var x in data){
                              var i = data[x];
                              categories.push(i.usuario);
                              assigned.push(i.assigned);
                              delivered.push(i.delivered);
                    }
                    $('#'+id).html('');
                    $('#'+id).highcharts({
                              chart: {
                                  type: 'column'
                              },
                              credits:{
                                      enabled:false	
                              },
                              colors: ['#C5002E','#FFB620'],
                              title: {
                                  text: 'Avance por brigadista',
                                  style:{ "color": "#787878", "fontSize": "120%","font-weight":"bold"}
                              },
                              subtitle: {
                                  text: ''
                              },
                              xAxis: {
                                  categories: categories,
                                  crosshair: true,
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
                                      text: ''
                                  }
                              },
                              tooltip: {
                                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                      '<td style="padding:0"><b>{point.y}</b></td></tr>',
                                  footerFormat: '</table>',
                                  shared: true,
                                  useHTML: true
                              },
                              plotOptions: {
                                  column: {
                                      pointPadding: 0.2,
                                      borderWidth: 0
                                  }
                              },
                              series: [{
                                  name: 'Asignados',
                                  data: assigned
                      
                              }, {
                                  name: 'Entregados',
                                  data: delivered
                      
                              }]
                    });        
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
          loadNational:function(){
                    var obj = this;
                    if (obj.enable) {
                              obj.options.data.file = 'nacional';
                              obj.options.data.type='Entidad';
                              obj.options.data.params.cve="00";
                              obj.loadFile(obj.options.data.file);
                              obj.dates=null;
                              //obj.loadCustomGraph('00','Nacional');
                    }
                    
          },
          getHeaderTableCader:function(){
                    var chain='';
                    chain+='<div class="progress_table_results">';
                    chain+='<div class="Heading">'+
                              '<div class="Cell borderHeading" style="width:25%;">'+
                                  '<p>CADER</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:25%;">'+
                                  '<p>Cuestionarios a validar</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:25%;">'+
                                  '<p>Cuestionarios validados</p>'+
                              '</div>'+
                              '<div class="Cell borderHeading borderRow" style="width:25%;">'+
                                  '<p>Porcentaje de avance</p>'+
                              '</div>'+
                          '</div>';
                    return chain;
          },
          getTableCader:function(data){
                    var obj=this;
                    var chain='';
                    chain+=obj.getHeaderTableCader();
                    var clase = 'rowFilled';
                    for(var x in data){
                              var i = data[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                              //var avance = ((i.delivered*100)/i.assigned);
                              var avance = (i.validated>0)?((i.totals*100)/i.validated):i.validated;
                              avance = (avance)?avance:0;
                              avance = avance.toFixed(1);
                              avance = (avance==100)?100:avance;
                              avance+="%";
                              chain+='<div class="Row">'+
                                        '<div class="Cell '+clase+'" style="width:25%;">'+
                                            '<p>'+i.label+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+'" style="width:25%;">'+
                                            '<p>'+validator.getFormatNumber(i.totals)+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+'" style="width:25%;">'+
                                            '<p>'+validator.getFormatNumber(i.validated)+'</p>'+
                                        '</div>'+
                                        '<div class="Cell borderRow '+clase+'" align="center" style="width:25%;">'+
                                            avance+
                                        '</div>'+
                                    '</div>';
                    }
                    chain+='</div>';
                    return chain;
          },
          getColumns:function(section){
                    var obj = this;
                    var c = obj.options.data[section];
                    var chain='';
                    for(var x in c){
                              var i = c[x];
                              chain+='<div id="colum_'+i.id+'" class="column w'+i.width+'" style="height:'+i.height+i.measure+';">'+
                                        '<div class="'+i.typeData+'">'+
                                                  ((i.title)?'<div class="title">'+i.title+'</div>':'')+
                                                  ((i.tools)?'<div class="tools">'+
                                                                      ((i.tools.print)?'<div class="itemTool"><div ref="print_'+i.id+'" class="template_progress tpg_print"></div></div>':'')+
                                                            '</div>':
                                                  '')+
                                                  '<div class="'+((i.tools)?'data_min':'data')+'" id="'+i.id+'"></div>'+
                                        '</div>'+
                                '</div>';
                    }
                    
                    return chain;
          },
          
          update:function(data){
                   this.buildStructure();
                   this.events();
          },
          clearPrintReport:function(){
                    $(".PrintReport").html('');        
          },
          addToPrintReport:function(chain){
                    chain+=chain+'<div style="width:100%;height:50px;"></div>';
                    $(".PrintReport").append(chain);
          },    
          buildStructure:function(){
                    var obj=this;
                    obj.clearColumns('resume');
                    obj.clearColumns('tabulate');
                    obj.clearColumns('tables');
                    obj.clearColumns('brigadist');
                    obj.clearColumns('map');
                   
                    var chain='<div class="'+obj.id+'" id="'+obj.id+'">'+
                                        '<div class="section_tab section_tab_resume">'+
                                                  obj.getColumns('resume')+
                                        '</div>'+
                                        '<div class="section_tab section_tab_tabulate">'+
                                                  obj.getColumns('tabulate')+
                                        '</div>'+
                                        '<div class="section_tab section_tab_tables">'+
                                                  obj.getColumns('tables')+
                                        '</div>'+
                                        '<div class="section_tab section_tab_brigadist">'+
                                                  obj.getColumns('brigadist')+
                                        '</div>'+
                                        '<div class="section_tab section_tab_map">'+
                                                  //obj.getColumns('map')+
                                        '</div>'+
                                        
                                        obj.getBlocker();
                              '</div>';
                              
                    $(obj.element).append(chain);
                    $(".report_print").remove();
                    $("body").append('<div class="report_print"></div>');
                    $(".report_print").hide();
                    
	  },
          clearColumns:function(section){
                    var obj = this;
                    var o = obj.options.data[section];
                    for(var x in o){
                              var i = o[x];
                              $("#"+i.id).html('');
                    }
          },
          loadCustomGraph : function(zone,labelZone){
                    var obj = this;
                    var o = obj.options.data.params;
                    obj.requestCustomGraph({user:o.user,currentyear:o.currentyear,zone:((zone=='00')?zone:'Estado:'+zone)},'getFields');
                    //var customParams = {"fields":[{"field":"state_delivered_info","label":"Entregados"},{"field":"state_validated_info","label":"Validados"},{"field":"state_notassigned_info","label":"Disponibles"},{"field":"state_totals_info","label":"Totales"}],"states":[{"field":zone+'',"label":labelZone}],"currentyear":o.currentyear+''};
                    var customParams = {"fields":[{"field":"state_delivered_info","label":"Entregados"},{"field":"state_validated_info","label":"Validados"},{"field":"state_notassigned_info","label":"Disponibles"}],"states":[{"field":zone+'',"label":labelZone}],"currentyear":o.currentyear+''};
                    //customParams.currentyear=o.currentyear+'';
                    obj.requestCustomGraph(customParams,'getGraph');
          },
          loadCustomTables : function(zone,labelZone){
                    var obj = this;
                    var o = obj.options.data.params;
                    obj.requestCustomTables({user:o.user,currentyear:o.currentyear,zone:((zone=='00')?zone:'Estado:'+zone)},'getFields');
                    //var customParams = {"fields":[{"field":"state_assignated_info","label":"Asignados"},{"field":"state_delivered_info","label":"Entregados"},{"field":"state_validated_info","label":"Validados"},{"field":"state_notassigned_info","label":"Disponibles"},{"field":"state_totals_info","label":"Totales"}],"states":[{"field":zone+'',"label":labelZone}],"currentyear":o.currentyear+''};
                    //customParams.currentyear=o.currentyear+'';
                    //var customParams = {"columns":[{"field":"variedad","label":"Entidad"},{"field":"marco","label":"Marco"},{"field":"modalidad","label":"Modalidad"},{"field":"uso","label":"Uso"}],"rows":[{"field":"variedad","label":"Variedad"},{"field":"marco","label":"Marco"},{"field":"modalidad","label":"Modalidad"},{"field":"uso","label":"Uso"}],"currentyear":o.currentyear+''};
                    var customParams = {"columns":[{"field":"edo,cuestionario_bienestar1,folio","label":"Entidad"},{"field":"mun,cuestionario_bienestar1,folio","label":"Municipio"}],"rows":[{"field":"edo","label":"Entidad"},{"field":"mun","label":"Municipio"}],"currentyear":o.currentyear+''};
                    obj.requestCustomTables(customParams,'getTables');
          },
          events:function(){
                    var obj=this;
                    var o = obj.options.data.params;
                    $("."+obj.id +" .blocker").hide();
                    obj.loadFile(obj.options.data.file);
                    //obj.loadCustomGraph('00','Nacional');
                    obj.selectTab('resume');
                    $(".tpg_print").each(function(){
                              $(this).click(function(){
                                        var id = $(this).attr('ref');
                                        obj.printSection(id);
                              });
                    });
          },
          showProgress:function(data){
                    
                    var total = data.totals;
                    var obj=this;
                    obj.clearPrintReport();
                    obj.showMapGraph(data.data,'cp_graph');
                    obj.showBarGraph(data.data,'cp_bar');
                    obj.showPieGraph(data.totals,'cp_pie');
					//var avance = ((total.validatedarea*100)/total.metaarea);
                    var avance = ((total.validated*100)/total.delivered);
                    avance = avance.toFixed(1);
                    avance = (avance==100)?100:avance;
                    avance+="%";
					
                    //$("#cp_na").html('<div>'+validator.getFormatNumber(total.assigned)+ '</div>');
                    $("#cp_a").html('<div>'+validator.getFormatNumber(total.delivered)+' </div>');
                    $("#cp_d").html('<div>'+validator.getFormatNumber(total.brigadist)+'</div>');
                    $("#cp_v").html('<div>'+validator.getFormatNumber(total.validated)+'</div>');
                    $("#cp_total").html('<div>'+ validator.getFormatNumber(total.metaarea)+'</div>');       // JAGO
                    $("#cp_progress").html('<div>'+avance+'</div>');
                    
                    var cp_table = obj.getTable(data.data);
                    var cp_tcader = '';
                    $("#header_cp_table").remove();
                    $("#cp_table").parent().append('<div id="header_cp_table" class="section_progress_header_table">'+obj.getHeaderTable(data.data)+'</div>');
                    $("#cp_table").html(cp_table);
                    if($('#cp_table').hasScrollBar()){
                              $("#header_cp_table").css('right','20px');
                    }
                    if (data.caders) {
                              $("#header_cp_tcader").remove();
                              $("#cp_tcader").parent().append('<div id="header_cp_tcader" class="section_progress_header_table">'+obj.getHeaderTableCader()+'</div>');
                              cp_tcader = obj.getTableCader(data.caders);
                              $("#cp_tcader").html(cp_tcader);
                              setTimeout(function(){
                                        if($('#cp_tcader').hasScrollBar()){
                                                  $("#header_cp_tcader").css('right','20px');
                                        }
                              },500);
                              
                              obj.showBarGraphCaders(data.caders,'cp_gcader');
                              $("#colum_cp_tcader,#colum_cp_gcader").show();
                    }else{
                              $("#colum_cp_tcader,#colum_cp_gcader").hide();
                    }
                    
                    if(!obj.mapLoaded){
                              var chainMap=''+       
                                        '<div class="app_left_section"></div>'+
                                        '<div class="app_left_section_information"></div>'+
                                        '<div class="app_right_section">'+
                                            '<div class="app_center_section">'+
                                                '<div id="map" class="app_map_section"></div>'+
                                                '<div class="app_tool_section noPrint"></div>'+
                                            '</div>'+
                                            '<div class="app_bottom_section">'+
                                                  '<div class="app_bottom_section_predios"></div>'+
                                                  '<div class="app_bottom_section_universe"></div>'+
                                                  '<div class="app_bottom_section_universe_replace"></div>'+
                                                  '<div class="app_bottom_section_questionnaire"></div>'+
                                                          //'<div class="barGraph"></div>'+
                                                          //'<div class="pieGraph"></div>'+
                                            '</div>'+
                                        '</div>';
                                        
                              //$("#cp_map").html(chainMap);
                              $(".section_tab_map").html(chainMap);
                              $(".app_left_section_information").hide();
                              obj.mapLoaded=true;
                              obj.options.data.event();
                             
                    }
                    
                    //build report
                    
                    var chainReport =   
                                        '<div id="print_cp_graph" class="section_print">'+
                                                  '<center style="width:100%;">'+
                                                            '<div id="report_cp_graph" class="reportGraph"></div>'+
                                                  '</center>'+
                                        '</div>'+
                                        '<div id="print_cp_table" class="progress_table_results" >'+cp_table+'</div>'+
                                        '<div id="print_cp_pie" class="section_print">'+
                                                  '<center>'+
                                                            '<div id="report_cp_pie" class="reportGraph"></div>'+
                                                  '</center>'+
                                        '</div>'+
                                        /*
                                        '<div id="print_cp_bar" class="section_print">'+
                                                  '<center style="width:100%;">'+
                                                            '<div id="report_cp_bar" class="reportGraph"></div>'+
                                                  '</center>'+
                                        '</div>'+
                                        
                                        '<div id="print_cp_tcader" class="progress_table_results">'+cp_tcader+'</div>'+
                                        '<div id="print_cp_gcader" class="section_print">'+
                                                  '<center style="width:100%;">'+
                                                            '<div id="report_cp_gcader" class="reportGraph"></div>'+
                                                  '</center>'+
                                        '</div>'+
                                        */
                                        
                                        '<div id="print_cp_customGraph" class="section_print">'+
                                                  '<center style="width:100%;">'+
                                                            '<div id="report_cp_customGraph" class="reportGraph"></div>'+
                                                  '</center>'+
                                        '</div>'+
                                        '<div id="print_cp_customTabular" class="progress_table_results"></div>'+
                                        '<div id="print_cp_customTabularTables" class="progress_table_results"></div>'+
                                        
                                        '<div id="print_cp_lineTab" class="progress_table_results"></div>'+
                                        '<div id="print_cp_lineGraph" class="section_print">'+
                                                  '<center style="width:100%;">'+
                                                            '<div id="report_cp_lineGraph" class="reportGraph"></div>'+
                                                  '</center>'+
                                        '</div>'+
                                        
                                        '<div id="print_cp_lineGraph2" class="section_print">'+
                                                  '<center style="width:100%;">'+
                                                            '<div id="report_cp_lineGraph2" class="reportGraph"></div>'+
                                                  '</center>'+
                                        '</div>'+
                                        '<div id="print_cp_lineTab2" class="progress_table_results"></div>'+
                                        
                                        '<div id="print_cp_brigGraph" class="section_print">'+
                                                  '<center style="width:100%;">'+
                                                            '<div id="report_cp_brigGraph" class="reportGraph"></div>'+
                                                  '</center>'+
                                        '</div>'+
                                        '<div id="print_cp_brigTab" class="progress_table_results"></div>';
                                        
                                        
                                        
                    $('.report_print').html(chainReport);
                    obj.showMapGraph(data.data,'report_cp_graph');
                    obj.showBarGraph(data.data,'report_cp_bar');
                    obj.showPieGraph(data.totals,'report_cp_pie');
                    if (data.caders) {
                              obj.showBarGraphCaders(data.caders,'report_cp_gcader');
                    }
                    setTimeout(function(){
                              $(window).resize();
                    },500)
          },
          showActionLine2:function(data){
                    var obj = this;
                    var cp_lineTab2 = obj.getTableActionLine2(data.data);
                    $("#header_cp_lineTab2").remove();
                    $("#cp_lineTab2").parent().append('<div id="header_cp_lineTab2" class="section_progress_header_table">'+obj.getHeaderActionLine2(data.data)+'</div>');
                    $("#cp_lineTab2").html(cp_lineTab2);
                    if($('#cp_lineTab2').hasScrollBar()){
                              $("#header_cp_lineTab2").css('right','20px');
                    }
                    $("#print_cp_lineTab2").html(cp_lineTab2);
          },
          showActionLine:function(data){
                    var obj = this;
                    var cp_lineTab = obj.getTableActionLine(data.data);
                    $("#header_cp_lineTab").remove();
                    $("#cp_lineTab").parent().append('<div id="header_cp_lineTab" class="section_progress_header_table">'+obj.getHeaderActionLine(data.data)+'</div>');
                    $("#cp_lineTab").html(cp_lineTab);
                    if($('#cp_lineTab').hasScrollBar()){
                              $("#header_cp_lineTab").css('right','20px');
                    }
                    $("#print_cp_lineTab").html(cp_lineTab);
          },
          showBrigadist:function(data){
                    //data.date = {maxdate:'20/05/2016',mindate:'10/05/2016'}
                    var maxDate = data.date.maxdate;
                    var minDate = data.date.mindate;
                    var obj = this;
                    var cp_brigTab = obj.getTableBrigadist(data.data);
                    $("#header_cp_brigTab").remove();
                    $("#cp_brigTab").parent().append('<div id="header_cp_brigTab" class="section_progress_header_table">'+obj.getHeaderBrigadist(data.data)+'</div>');
                    $("#cp_brigTab").html(cp_brigTab);
                    if($('#cp_brigTab').hasScrollBar()){
                              $("#header_cp_brigTab").css('right','20px');
                    }
                    $("#print_cp_brigTab").html(cp_brigTab);
                    var chainDate = obj.getDateBrigadist();
                    $("#colum_cp_brigGraph .tools .Dates").remove();
                    $("#colum_cp_brigGraph .tools").append(chainDate);
                    var MinDate = (obj.dates!=null)?obj.dates.minDate:minDate;
                    var MaxDate = (obj.dates!=null)?obj.dates.maxDate:maxDate;
                    var initialDate = $("#colum_cp_brigGraph .initialDate");
                    var lastDate = $("#colum_cp_brigGraph .lastDate");
                    initialDate.datepicker({minDate:minDate,maxDate:maxDate});
                    lastDate.datepicker({minDate:MinDate,maxDate:maxDate});
                    
                    initialDate.datepicker( "setDate", MinDate );
                    
                    lastDate.datepicker( "setDate", MaxDate );
                    
                    if (obj.dates==null) {
                              obj.dates={minDate:MinDate,maxDate:MaxDate};
                    }
                    initialDate.change(function(){
                              var id = initialDate.datepicker("getDate");
                              var ld = lastDate.datepicker("getDate");
                              if (id>ld) {
                                        lastDate.datepicker( "setDate", id );
                                        ld = id;
                                        

                              }
                              lastDate.datepicker( "option", "minDate", id );
                              obj.dates = {minDate:id,maxDate:ld};
                              var newParams = $.extend({}, {mindate:initialDate.val(),maxdate:lastDate.val()}, obj.options.data.params);
                              obj.requestBrigadist(newParams,true);
                              
                    });
                    lastDate.change(function(){
                              var id = initialDate.datepicker("getDate");
                              var ld = lastDate.datepicker("getDate");
                              obj.dates = {minDate:id,maxDate:ld};
                              var newParams = $.extend({}, {mindate:initialDate.val(),maxdate:lastDate.val()}, obj.options.data.params);
                              obj.requestBrigadist(newParams,true);
                    });
                    
                    $("#colum_cp_brigGraph #initialDate").click(function(){
                              $("#colum_cp_brigGraph .initial .datepicker").click();
                    });
                    $("#colum_cp_brigGraph #lastDate").click(function(){
                              $("#colum_cp_brigGraph .final .datepicker").click();
                    });
                    $("#colum_cp_brigGraph .datepicker").each(function(){
                              var id = $(this).attr('id');
                              var field = $(this).attr('field');
                              $(this).bind("keypress", function(evt) {
                                                  return false;
                              }).bind("paste",function(event){
                                        return false;
                                        
                              }).bind("keyup", function(evt) {
                                        return false;
                                        
                              });
                    });
          },
          getDateBrigadist:function(){
                    var obj = this;
                    var chain='<div class="Dates">'+
                                        '<div class="initial">'+
                                                  '<div class="label">Fecha inicial:</div>'+
                                                  '<input type="text" value="01/01/2016" class="datepicker initialDate">'+
                                        '</div>'+
                                        '<div class="final">'+
                                                  '<div class="label">Fecha final:</div>'+
                                                  '<input type="text" value="07/05/2016" class="datepicker lastDate">'+
                                        '</div>'+
                              '</div>';
                    return chain;
          },
          showPieGraph:function(info,id){
                    
                    $('#'+id).highcharts({
                              chart: {
                                  plotBackgroundColor: null,
                                  plotBorderWidth: null,
                                  plotShadow: false
                              },
                              colors: ['#006BA7','#434348'],
                              title: {
                                  text: 'Resumen de avance',
                                  style:{ "color": "#787878", "fontSize": "120%","font-weight":"bold"}
                              },
                              tooltip: {
                                  pointFormat: '<b>{point.percentage:.1f}%</b>'
                              },
                              plotOptions: {
                                  pie: {
                                      allowPointSelect: true,
                                      cursor: 'pointer',
                                      dataLabels: {
                                          enabled: false
                                      },
                                      showInLegend: true
                                  }
                              },
                              credits:{
                                      enabled:false	
                              },
                              series: [{
                                  type: 'pie',
                                  name: 'Avance',
                                  data: [
                                      ['Cuestionarios validados',   info.validated],//info.delivered
                                      ['Cuestionarios faltantes',    info.totals-info.validated]//info.assigned-info.delivered
                                  ]
                              }]
                    });
                    
          },
          
          printSection:function(id){
                    $("#print_cp_graph").hide();
                     $("#print_cp_table").hide();
                     $("#print_cp_pie").hide();
                     $("#print_cp_bar").hide();
                     $("#print_cp_tcader").hide();
                     $("#print_cp_gcader").hide();
                     $("#print_cp_lineTab").hide();
                     $("#print_cp_lineGraph").hide();
                     $("#print_cp_lineGraph2").hide();
                     $("#print_cp_lineTab2").hide();
                     $("#print_cp_brigGraph").hide();
                     $("#print_cp_brigTab").hide();
                     $("#print_cp_customGraph").hide();
                     $("#print_cp_customTabular").hide();
                     $("#print_cp_customTables").hide();
                     $("#print_cp_customTabularTables").hide();
                     $("#"+id).show();
                     $(".report_print").show();
                     $(".section_title_system").addClass('headerForPrint');
                     window.print();
                    $(".section_title_system").removeClass('headerForPrint');
                    $(".report_print").hide();
                     
          },
          printActualTab:function(){
                    var obj = this;
                    var actual = $(".progress_tab_selected").attr('section');
                     $("#print_cp_graph").hide();
                     $("#print_cp_table").hide();
                     $("#print_cp_pie").hide();
                     $("#print_cp_bar").hide();
                     $("#print_cp_tcader").hide();
                     $("#print_cp_gcader").hide();
                     $("#print_cp_lineTab").hide();
                     $("#print_cp_lineGraph").hide();
                     $("#print_cp_lineGraph2").hide();
                     $("#print_cp_lineTab2").hide();
                     $("#print_cp_brigGraph").hide();
                     $("#print_cp_brigTab").hide();
                     $("#print_cp_customTables").hide();
                     $("#print_cp_customTabularTables").hide();
                     
                    switch (actual) {
                              case 'tabulate':
                                        $(".report_print").show();
                                        /*
                                        $("#print_cp_pie").show();
                                        $("#print_cp_bar").show();
                                        $("#print_cp_tcader").show();
                                        $("#print_cp_gcader").show();
                                        */
                                        $("#print_cp_customGraph").show();
                                        $("#print_cp_customTabular").show();
                                        $(".section_title_system").addClass('headerForPrint');
                                        window.print();
                                        $(".section_title_system").removeClass('headerForPrint');
                                        $(".report_print").hide();
                                        
                              break;
                              case 'resume':
                                         $(".report_print").show();
                                       $("#print_cp_graph").show();
                                        $("#print_cp_table").show();
                                        $(".section_title_system").addClass('headerForPrint');
                                        window.print();
                                        $(".section_title_system").removeClass('headerForPrint');
                                        $(".report_print").hide();
                                      
                              break;
                              case 'map':
                                        $(".app_content").removeClass('app_content_min');
                                       $(".app_right_section").css('left','0px');
                                        $(".app_map_section").css('right','0px');
                                        //map.updateSize();
                                        $(".section_title_system").addClass('headerForPrint');
                                        window.print();
                                        $(".section_title_system").removeClass('headerForPrint');
                                        $(".app_content").addClass('app_content_min');
                                        $(".app_right_section").css('left','300px');
                                        $(".app_map_section").css('right','40px');
                              break;
                              case 'tables':
                                        $(".report_print").show();
                                        /*
                                        $("#print_cp_pie").show();
                                        $("#print_cp_bar").show();
                                        $("#print_cp_tcader").show();
                                        $("#print_cp_gcader").show();
                                        */
                                        $("#print_cp_customTables").show();
                                        $("#print_cp_customTabularTables").show();
                                        $(".section_title_system").addClass('headerForPrint');
                                        window.print();
                                        $(".section_title_system").removeClass('headerForPrint');
                                        $(".report_print").hide();
                              break;
                              case 'brigadist':
                                        $(".report_print").show();
                                        $("#print_cp_brigGraph").show();
                                        $("#print_cp_brigTab").show();
                                        $(".section_title_system").addClass('headerForPrint');
                                        window.print();
                                        $(".section_title_system").removeClass('headerForPrint');
                                        $(".report_print").hide();
                              break;
                    }
                    
                    
                    
          },
          showBarGraphCaders:function(info,id){
                    var programado=[];
                    var entregado=[];
                    var categorias = [];
                    for(var x in info){
                              var i = info[x];
                              categorias.push(i.label);
                              programado.push(i.totals);//programado.push(i.assigned);
                              entregado.push(i.validated);//entregado.push(i.delivered)
                    }
                    
                      $('#'+id).highcharts({
                              chart: {
                                  type: 'column'
                              },
			      colors: ['#434348','#006BA7'],
                              title: {
                                  text: 'Resumen de avance por CADER',
                                  style:{ "color": "#787878", "fontSize": "120%","font-weight":"bold"}
                              },
                              subtitle: {
                                  text: ''
                              },
                              xAxis: {
                                  categories: categorias,
                                  crosshair: true
                              },
                              yAxis: {
                                  min: 0,
                                  title: {
                                      text: 'Predios'
                                  }
                              },
                              credits:{
                                      enabled:false	
                              },
                              tooltip: {
                                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                      '<td style="padding:0"><b>{point.y:.1f} predios</b></td></tr>',
                                  footerFormat: '</table>',
                                  shared: true,
                                  useHTML: true
                              },
                              plotOptions: {
                                  column: {
                                      pointPadding: 0.2,
                                      borderWidth: 0
                                  }
                              },
                              series: [{
                                  name: 'Total de cuestionarios a validar',
                                  data: programado
                      
                              }, {
                                  name: 'Cuestionarios validados',
                                  data: entregado
                      
                              }]
                    });
          },
          showBarGraph:function(info,id){
                    var programado=[];
                    var entregado=[];
                    var categorias = [];
                    for(var x in info){
                              var i = info[x];
                              categorias.push(i.label);
                              programado.push(i.totals);//programado.push(i.assigned);
                              entregado.push(i.validated);//entregado.push(i.delivered);
                    }
                    
                      $('#'+id).highcharts({
                              chart: {
                                  type: 'column'
                              },
                              colors: ['#434348','#006BA7'],
                              title: {
                                  text: 'Programado vs Validado',
                                  style:{ "color": "#787878", "fontSize": "120%","font-weight":"bold"}
                              },
                              subtitle: {
                                  text: ''
                              },
                              xAxis: {
                                  categories: categorias,
                                  crosshair: true
                              },
                              credits:{
                                      enabled:false	
                              },
                              yAxis: {
                                  min: 0,
                                  title: {
                                      text: 'Predios'
                                  }
                              },
                              tooltip: {
                                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                      '<td style="padding:0"><b>{point.y:.1f} predios</b></td></tr>',
                                  footerFormat: '</table>',
                                  shared: true,
                                  useHTML: true
                              },
                              plotOptions: {
                                  column: {
                                      pointPadding: 0.2,
                                      borderWidth: 0
                                  }
                              },
                              series: [{
                                  name: 'Programado',
                                  data: programado
                      
                              }, {
                                  name: 'Validado',
                                  data: entregado
                      
                              }]
                    });
          },
          showMapGraph:function(info,id){
                    var obj = this;
                    var data = [];
                    var onlyZero = true;
                    for(var x in info){
                              data.push({"CVE_ENT":info[x].cve_ent,"value":info[x].validated});
                              if (info[x].validated>0) {
                                        onlyZero=false;
                              }
                    }
                    $('#'+id).html('');
                    
                    $('#'+id).highcharts('Map', {

                              title : {
                                  text : (obj.options.data.file=='nacional')?'Mapa nacional de avance de trabajo':'Mapa de avance de trabajo de '+obj.options.data.label,
                                  style:{ "color": "#787878", "fontSize": "120%","font-weight":"bold"}
                              },
                      
                              subtitle : {
                                  text : ''
                              },
                      
                              mapNavigation: {
                                  enabled: true,
                                  buttonOptions: {
                                      verticalAlign: 'top'
                                  }
                              },
                              colorAxis: {
                                        min: 0,
                                        minColor: '#E6E7E8',
                                        maxColor: ((onlyZero)?'#E6E7E8':'#005645')
                              },
                              credits:{
                                      enabled:false	
                              },
                              plotOptions: {
                                      series: {
                                          cursor: 'pointer',
                                          point: {
                                              events: {
                                                  click: function() {
                                                      if (this.properties.CVE_ENT.length<=2) {
                                                            obj.options.data.file = this.properties.FILE;
                                                            obj.options.data.type='Municipio';
                                                            obj.options.data.label=this.properties.NOM_MUN;
                                                            obj.options.data.params.cve=this.properties.CVE_ENT;
                                                            obj.loadFile(obj.options.data.file,this.properties);
                                                            //obj.loadCustomGraph(this.properties.CVE_ENT,this.properties.NOM_MUN);
                                                      }
                                                      
                                                  }
                                              }
                                          }
                                      }
                              },
                              tooltip: {
                                        
                                        headerFormat: '',
                                        pointFormat: obj.options.data.type+': <b>{point.properties.NOM_MUN}</b><br/>'+
                                                     'Cuestionarios validados: '+'<b>{point.value}</b>'
                                        /*
                                        formatter: function() {
                                                  // If you want to see what is available in the formatter, you can
                                                  // examine the `this` variable.
                                                  //     console.log(this);
                                                  var nombre = validator.getFormatHtml2(this.point.properties.NOM_MUN);
                                                  nombre = validator.convertToHtml(nombre);
                                                  console.log(nombre);
                                                  return '<b>'+ this.y +'</b><br/>'+
                                                      'in year: '+ this.point.name;
                                        }
                                        */
                              },
                              series : [{
                                  data : data,
                                  mapData: Highcharts.maps[obj.options.path+obj.options.data.file],
                                  joinBy: 'CVE_ENT',
                                  name: obj.options.data.type,
                                  states: {
                                      hover: {
                                          color: '#BADA55'
                                      }
                                  },
                                  dataLabels: {
                                      enabled: false,
                                      format: '{point.properties.NOM_MUN}'
                                  }
                              }]
                    });
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
          loadFile : function(file,infoGeo){
                    var obj=this;
                    obj.enable = false;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                        Highcharts.maps=null;
                                        Highcharts.maps={};
                                        Highcharts.maps[obj.options.path+obj.options.data.file]=json;
                                        //console.log(json);
                                        
                            },
                            beforeSend: function(xhr) {
                                        obj.showSpinner();                        
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                //obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                              obj.requestProgress(obj.options.data.params,infoGeo); 
                            }
                    };
                    r = $.extend(r, connections.progress.data);
                    r.url=obj.options.path+file+'.js';
                    $.ajax(r);
          },
          requestProgress : function(params,infoGeo){
                    var obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                        
                                       obj.showProgress(json);
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    //obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {
                              var activeSection = $(".progress_tab_selected").attr('section');
                              if (params.cve=='00') {
                                        
                                        $( "div[section='actionLine']" ).show();
                                        $( "div[section='brigadist']" ).hide();
                                        if (activeSection=='brigadist') {
                                                  obj.selectTab('resume');      //code
                                        }
                              }else{
                                        $( "div[section='actionLine']" ).hide();
                                        $( "div[section='brigadist']" ).show();
                              }                                  
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                //obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                              if (params.cve=='00') {
                                        obj.requestActionLine(obj.options.data.params);
                                        setTimeout(function(){
                                                  obj.loadCustomGraph('00','Nacional');
                                        },100);
                                        setTimeout(function(){
                                                  obj.loadCustomTables('00','Nacional');
                                        },100);
                              }else{
                                        obj.requestBrigadist(obj.options.data.params);
                                        setTimeout(function(){
                                                  obj.loadCustomGraph(infoGeo.CVE_ENT,infoGeo.NOM_MUN);
                                        },100);
                                        setTimeout(function(){
                                                  obj.loadCustomTables(infoGeo.CVE_ENT,infoGeo.NOM_MUN);
                                        },100);
                              }
                              
                            }
                    };
                    r = $.extend(r, connections.progress.data);
                    r.data = params;
                    $.ajax(r);
          },
          requestActionLine : function(params){
                    var obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                       obj.showActionLine(json);
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    //obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {
                                                                
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                //obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                              obj.requestActionLine2(obj.options.data.params);
                            }
                    };
                    r = $.extend(r, connections.progress.actionLine);
                    r.data = params;
                    $.ajax(r);
          },
          requestActionLine2 : function(params){
                    var obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                       obj.showActionLine2(json);
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    //obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {
                                                                
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                //obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                              obj.enable=true;
                              obj.hideSpinner();
                              //obj.requestBrigadist(obj.options.data.params);
                            }
                    };
                    r = $.extend(r, connections.progress.actionLine2);
                    r.data = params;
                    $.ajax(r);
          },
          requestBrigadist : function(params,showSpinner){
                    var obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                
                                if (json){
                                    if (json.response.sucessfull){
                                       obj.showBrigadist(json);
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    //obj.showMessage(msg);
                                }
                            },
                            beforeSend: function(xhr) {
                                        if (showSpinner) {
                                                  obj.showSpinner();   
                                        }
                                                             
                            },
                            error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
                                //obj.showMessage(msg);
                            },
                            complete: function(solicitudAJAX,estatus) {
                              obj.enable=true;
                              obj.hideSpinner();
                            }
                    };
                    r = $.extend(r, connections.progress.brigadist);
                    r.data = params;
                    $.ajax(r);
          },
          requestCustomGraph : function(params,action){
                    var obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                if (json){
                                    if (json.response.sucessfull){
                                       switch (action) {
                                                  case 'getFields':
                                                            obj.dataCustomGraph=json.data;
                                                            obj.showFieldsCustomGraph(json.data,params);
                                                            break;
                                                  case 'getGraph':
                                                            obj.buildCustomGraph(json.data,params);
                                                            break;
                                       }
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    //obj.showMessage(msg);
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
                    switch (action) {
                              case 'getFields':
                                        r = $.extend(r, connections.progress.customGraph);
                                        r.data = params;
                                    break;
                              case 'getGraph':
                                        r = $.extend(r, connections.progress.customGraphResult);
                                        r.data = JSON.stringify(params);
                                   break;
                    }
                    
                    $.ajax(r);
          },
          requestCustomTables : function(params,action){
                    var obj=this;
                    var msg = 'Servicio no disponible intente m&aacute;s tarde';
                    var r= {
                            success:function(json,estatus){
                                var valid=false;
                                if (json){
                                    if (json.response.sucessfull){
                                       switch (action) {
                                                  case 'getFields':
                                                            obj.dataCustomTables=json.data;
                                                            obj.showFieldsCustomTables(json.data,params);
                                                            break;
                                                  case 'getTables':
                                                            obj.buildCustomTables(json.data,params);
                                                            break;
                                       }
                                    }else{
                                        msg=json.response.message;
                                    }
                                }
                                if (!valid) {
                                    //obj.showMessage(msg);
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
                    switch (action) {
                              case 'getFields':
                                        r = $.extend(r, connections.progress.customTables);
                                        r.data = params;
                                    break;
                              case 'getTables':
                                        r = $.extend(r, connections.progress.customTablesResult);
                                        r.data = JSON.stringify(params);
                                   break;
                    }
                    
                    $.ajax(r);
          },
          getZones:function(item,initialParams){
                    var obj = this;
                    var data = obj.dataCustomGraph['zones'];
                    var chain = '<select class="selectorZones" id="'+obj.id+'_select'+item.attibute+'">';
                    
                    for(var x in data){
                              var i = data[x];
                              var selected = (i.id==initialParams.zone)?'Selected':'';
                              chain+='<option value="'+i.id+'" '+selected+'>'+i.label+'</option>';
                    }
                    chain+='</select>';
                    return chain;
          },
          getZonesTables:function(item,initialParams){
                    var obj = this;
                    var data = obj.dataCustomTables['zones'];
                    var chain = '<select class="selectorZonesTables" id="'+obj.id+'_select'+item.attibute+'">';
                    
                    for(var x in data){
                              var i = data[x];
                              var selected = (i.id==initialParams.zone)?'Selected':'';
                              chain+='<option value="'+i.id+'" '+selected+'>'+i.label+'</option>';
                    }
                    chain+='</select>';
                    return chain;
          },
          getList:function(data,item,initialParams){
                    var obj = this;
                    var chain='';
                    if (item.attibute=='states') {
                              chain+= obj.getZones(item,initialParams);
                    }
                       chain+='<div class="filterContainer" id="filter_'+item.attibute+'">'+
                                        '<input class="input" id="input_'+item.attibute+'" typeItem="'+item.type+'" placeholder="Texto a buscar" field="'+item.attibute+'">'+
                                        '<div class="icon"><div class="template_information ti_search"></div></div>'+
                                        '<div class="iconClose" field="'+item.attibute+'"><div class="template_userbranch tub_delete"></div></div>'+
                                        
                              '</div>';
                    chain+= '<div class="custom_table_progress" field="'+item.attibute+'">';
                    var additionalText = (((initialParams.zone=='year')&&(item.attibute=='states'))||(item.attibute=='currentyear'))?'Ejercicio ':'';
                    for(var x in data){
                              var i = data[x];
                              var id = obj.id+'_item'+item.attibute+x;
                              switch (item.type) {
                                        case 'checkbox':
                                                  chain+=''+
                                                  '<div id="'+id+'" field="'+item.attibute+'" class="Row" prop="'+x+'">'+
                                                            '<div class="Cell text_center borderRow" style="width:35px;">'+
                                                                      '<div id="'+id+'_input" class="icon_input template_actionYears tay_notcheck"></div>'+
                                                            '</div>'+
                                                            '<div class="Cell borderRow">'+additionalText+i.label+'</div>'+
                                                  '</div>';
                                                  break;
                                        case 'list':
                                                  var clase='';
                                                  if ((item.attibute=='currentyear')&&(initialParams.currentyear == i)) {
                                                            clase = 'selectedList';
                                                            obj.dataSelected[item.attibute]=i+'';
                                                  }
                                                  chain+=''+
                                                  '<div id="'+id+'" field="'+item.attibute+'" class="RowList '+clase+'" prop="'+x+'">'+
                                                            '<div class="Cell borderRowList">'+additionalText+i+'</div>'+
                                                  '</div>';
                                                  break;
                              }
                    }
                    chain+='</div>';
                    return chain;
          },
          getListTables:function(data,item,initialParams){
                    var obj = this;
                    var chain='';
                    if (item.attibute=='states') {
                              chain+= obj.getZonesTables(item,initialParams);
                    }
                       chain+='<div class="filterContainerTables" id="filter_'+item.attibute+'">'+
                                        '<input class="input" id="input_'+item.attibute+'" typeItem="'+item.type+'" placeholder="Texto a buscar" field="'+item.attibute+'">'+
                                        '<div class="icon"><div class="template_information ti_search"></div></div>'+
                                        '<div class="iconClose" field="'+item.attibute+'"><div class="template_userbranch tub_delete"></div></div>'+
                                        
                              '</div>';
                    chain+= '<div class="custom_table_progress" field="'+item.attibute+'">';
                    var additionalText = (((initialParams.zone=='year')&&(item.attibute=='states'))||(item.attibute=='currentyear'))?'Ejercicio ':'';
                    for(var x in data){
                              var i = data[x];
                              var id = obj.id+'_itemTables'+item.attibute+x;
                              switch (item.type) {
                                        case 'checkbox':
                                                  chain+=''+
                                                  '<div id="'+id+'" field="'+item.attibute+'" class="Row" prop="'+x+'">'+
                                                            '<div class="Cell text_center borderRow" style="width:35px;">'+
                                                                      '<div id="'+id+'_input" class="icon_input template_actionYears tay_notcheck"></div>'+
                                                            '</div>'+
                                                            '<div class="Cell borderRow">'+additionalText+i.label+'</div>'+
                                                  '</div>';
                                                  break;
                                        case 'list':
                                                  var clase='';
                                                  if ((item.attibute=='currentyear')&&(initialParams.currentyear == i)) {
                                                            clase = 'selectedList';
                                                            obj.dataSelectedTables[item.attibute]=i+'';
                                                  }
                                                  chain+=''+
                                                  '<div id="'+id+'" field="'+item.attibute+'" class="RowList '+clase+'" prop="'+x+'">'+
                                                            '<div class="Cell borderRowList">'+additionalText+i+'</div>'+
                                                  '</div>';
                                                  break;
                              }
                    }
                    chain+='</div>';
                    return chain;
          },
          showFieldsCustomGraph:function(data,initialParams){
                    var obj = this;
                    var items = [
                              {label:'Ejercicio',attibute:'currentyear',type:'list'},
                              {label:'Ubicaci&oacute;n (Eje X)',attibute:'states',type:'checkbox'},
                              {label:'Campos (Eje Y)',attibute:'fields',type:'checkbox'}
                    ];
                    if (initialParams.zone=='year') {
                        items.shift();
                        items[0].label='Ejercicios (Eje X)';
                    }
                    
                    var chain = '<div id="accordion">';
                    for(var x in items){
                              var i = items[x];
                              obj.dataFiltered[i.attibute]=[];
                              obj.dataSelected[i.attibute]={};
                              obj.dataSelectedTotals[i.attibute]=0;
                              chain+='<h3>'+i.label+'<div id="'+obj.id+'_deleteAll'+i.attibute+'" field="'+i.attibute+'" class="deleteItems"><div class="template_years ty_deleteCgarge"></div></div></h3>';
                              chain+='<div id="container'+x+'" class="container_customReport" style="overflow-x: hidden;">';
                              chain+=   obj.getList(data[i.attibute],i,initialParams);
                              chain+='</div>';
                    }
                    chain+='</div">';
                    
                    $("."+obj.id+" #cp_fields").html(chain);
                    $("."+obj.id+" #accordion").accordion({
                              animate:false,
                              heightStyle: "content",
                              activate: function( event, ui ) {
                                        obj.activePositionAccordion =  $("."+obj.id+" #accordion").accordion( "option", "active" );
                              }
                    });
                    
                    var chainTool = obj.getButtonApply();
                    $("."+obj.id+" #colum_cp_fields .tools").html(chainTool);
                    obj.addEventsCustomGraph();
                    $( "#accordion" ).accordion( "option", "active", obj.activePositionAccordion );
                    $( "#accordion" ).accordion( "option", "animate", 200 );
          },
          showFieldsCustomTables:function(data,initialParams){
                    var obj = this;
                    var items = [
                              {label:'Ejercicio',attibute:'currentyear',type:'list'},
                              {label:'Campos',attibute:'columns',type:'checkbox'}//,
                              //{label:'Filas (Eje Y)',attibute:'rows',type:'checkbox'}
                    ];
                    if (initialParams.zone=='year') {
                        items.shift();
                        items[0].label='Ejercicios (Eje X)';
                    }
                    
                    var chain = '<div id="accordionTables">';
                    for(var x in items){
                              var i = items[x];
                              obj.dataFilteredTables[i.attibute]=[];
                              obj.dataSelectedTables[i.attibute]={};
                              obj.dataSelectedTotalsTables[i.attibute]=0;
                              chain+='<h3>'+i.label+'<div id="'+obj.id+'_deleteAllTables'+i.attibute+'" field="'+i.attibute+'" class="deleteItems"><div class="template_years ty_deleteCgarge"></div></div></h3>';
                              chain+='<div id="container'+x+'" class="container_customReportTables" style="overflow-x: hidden;">';
                              chain+=   obj.getListTables(data[i.attibute],i,initialParams);
                              chain+='</div>';
                    }
                    chain+='</div">';
                    
                    $("."+obj.id+" #cp_fieldsTables").html(chain);
                    $("."+obj.id+" #accordionTables").accordion({
                              animate:false,
                              heightStyle: "content",
                              activate: function( event, ui ) {
                                        obj.activePositionAccordionTables =  $("."+obj.id+" #accordionTables").accordion( "option", "active" );
                              }
                    });
                    
                    var chainTool = obj.getButtonApplyTables();
                    $("."+obj.id+" #colum_cp_fieldsTables .tools").html(chainTool);
                    obj.addEventsCustomTables();
                    $( "#accordionTables" ).accordion( "option", "active", obj.activePositionAccordionTables );
                    $( "#accordionTables" ).accordion( "option", "animate", 200 );
          },
          getButtonApply:function(){
                    var obj = this;
                    var chain='<div class="applyGraph">'+
                                        '<div class=label>Generar</div>'+
                                        '<div class="icon"><div class="template_reports trep_row_rightBig"></div></div>'+
                              '</div>';
                    return chain;
          },
          getButtonApplyTables:function(){
                    var obj = this;
                    var chain='<div class="applyGraphTables">'+
                                        '<div class=label>Generar</div>'+
                                        '<div class="icon"><div class="template_reports trep_row_rightBig"></div></div>'+
                              '</div>';
                    return chain;
          },
          addEventsCustomGraph:function(){
                    var obj = this;
                    var o = obj.options.data.params;
                    $("."+obj.id+ " .filterContainer .input").each(function(){
                              var id = $(this).attr('id');
                              var field = $(this).attr('field');
                              $(this).bind("keypress", function(evt) {
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
                                                  var field = item.attr('field');
                                                  var type = item.attr('typeItem');
                                                  if (!result) {
                                                        item.val('');
                                                  }else{
                                                            if (value!='') {
                                                                      obj.runFilter(value,field,type);
                                                            }
                                                        
                                                  }
                                                  
                                        },100);
                                        
                              }).bind("keyup", function(evt) {
                                        var item = $(this);
                                        var field = item.attr('field');
                                        var type = item.attr('typeItem');
                                        var value = item.val();
                                        if (value!='') {
                                                 $("#filter_"+field+" .iconClose").show();
                                                 obj.runFilter(value,field,type);
                                        }else{
                                                 $("#filter_"+field+" .iconClose").hide();
                                        }
                                        
                                        
                              });
                    });
                    $("."+obj.id+" .filterContainer .iconClose").each(function(){
                              $(this).click(function(){
                                        var field = $(this).attr('field');
                                        obj.clearFilter(field);
                                        $("."+obj.id+" #input_"+field).val('');
                                        $(this).hide();
                              });
                    });
                    $("."+obj.id+" #accordion .Row").each(function(){
                             $(this).click(function(){
                                        var item = $(this);
                                        var id = item.attr('id');
                                        var field = item.attr('field');
                                        var prop = parseInt(item.attr('prop'));
                                        var input = $("#"+id+'_input');
                                        var active = (input.attr('active'))?true:false;
                                        
                                        if (active) {
                                                  input.removeAttr('active');
                                                  obj.dataSelectedTotals[field]-=1;
                                                  input.removeClass('tay_check').addClass('tay_notcheck');
                                                  delete obj.dataSelected[field]['i'+prop];
                                                  
                                        }else{
                                                  input.attr('active','true');
                                                  obj.dataSelectedTotals[field]+=1;
                                                  input.removeClass('tay_notcheck').addClass('tay_check');
                                                  obj.dataSelected[field]['i'+prop]=obj.dataCustomGraph[field][prop];
                                        }
                                        var removeAll = $("#"+obj.id+"_deleteAll"+field);
                                        
                                        if (obj.dataSelectedTotals[field]>0) {
                                                  removeAll.show();
                                        }else{
                                                  removeAll.hide();
                                        }
                              });
                    });
                    $("."+obj.id+" #accordion .deleteItems").each(function(){
                              $(this).click(function(event){
                                        var item = $(this);
                                        var field = item.attr('field');
                                        item.hide();
                                        obj.dataSelectedTotals[field]=0;
                                        obj.changeStatusInput(false,field);
                                        event.stopPropagation();
                                        
                              });
                    });
                    $("."+obj.id+" #accordion .RowList").each(function(){
                              $(this).click(function(){
                                        var prop = parseInt($(this).attr('prop'));
                                        var field = $(this).attr('field');
                                        var year = obj.dataCustomGraph[field][prop];
                                        var zone = $("."+obj.id+" .selectorZones").val();
                                        obj.dataSelected[field]=year+'';
                                        obj.requestCustomGraph({user:o.user,currentyear:year,zone:zone},'getFields');
                              });
                    });
                    $("."+obj.id+" .selectorZones").change(function(){
                             var id = $(this).attr('id');
                             var zone = $("#"+id+" option:selected").val();
                             var year = obj.dataSelected['currentyear'];
                             obj.requestCustomGraph({user:o.user,currentyear:year,zone:zone},'getFields');
                    });
                    $("."+obj.id+" .applyGraph").click(function(){
                              obj.validateCustomGraph();
                    });
                    
                   var evento = function(){
                              var heightBlock = $("."+obj.id+" #colum_cp_fields .data_min").height();
                              var heightSectionTab = heightBlock-(35*3);
                              $("."+obj.id+" .container_customReport").css('height',heightSectionTab+'px');
                   }
                    evento();
                    $( window ).resize(function() {
                              evento();
                    });
                    
          },
          addEventsCustomTables:function(){
                    var obj = this;
                    var o = obj.options.data.params;
                    $("."+obj.id+ " .filterContainerTables .input").each(function(){
                              var id = $(this).attr('id');
                              var field = $(this).attr('field');
                              $(this).bind("keypress", function(evt) {
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
                                                  var field = item.attr('field');
                                                  var type = item.attr('typeItem');
                                                  if (!result) {
                                                        item.val('');
                                                  }else{
                                                            if (value!='') {
                                                                      obj.runFilterTables(value,field,type);
                                                            }
                                                        
                                                  }
                                                  
                                        },100);
                                        
                              }).bind("keyup", function(evt) {
                                        var item = $(this);
                                        var field = item.attr('field');
                                        var type = item.attr('typeItem');
                                        var value = item.val();
                                        if (value!='') {
                                                 $("#filter_"+field+" .iconClose").show();
                                                 obj.runFilterTables(value,field,type);
                                        }else{
                                                 $("#filter_"+field+" .iconClose").hide();
                                        }
                                        
                                        
                              });
                    });
                    $("."+obj.id+" .filterContainerTables .iconClose").each(function(){
                              $(this).click(function(){
                                        var field = $(this).attr('field');
                                        obj.clearFilterTables(field);
                                        $("."+obj.id+" #input_"+field).val('');
                                        $(this).hide();
                              });
                    });
                    $("."+obj.id+" #accordionTables .Row").each(function(){
                             $(this).click(function(){
                                        var item = $(this);
                                        var id = item.attr('id');
                                        var field = item.attr('field');
                                        var prop = parseInt(item.attr('prop'));
                                        var input = $("#"+id+'_input');
                                        var active = (input.attr('active'))?true:false;
                                        
                                        if (active) {
                                                  input.removeAttr('active');
                                                  obj.dataSelectedTotalsTables[field]-=1;
                                                  input.removeClass('tay_check').addClass('tay_notcheck');
                                                  delete obj.dataSelectedTables[field]['i'+prop];
                                                  
                                        }else{
                                                  input.attr('active','true');
                                                  obj.dataSelectedTotalsTables[field]+=1;
                                                  input.removeClass('tay_notcheck').addClass('tay_check');
                                                  obj.dataSelectedTables[field]['i'+prop]=obj.dataCustomTables[field][prop];
                                        }
                                        var removeAll = $("#"+obj.id+"_deleteAllTables"+field);
                                        
                                        if (obj.dataSelectedTotalsTables[field]>0) {
                                                  removeAll.show();
                                        }else{
                                                  removeAll.hide();
                                        }
                              });
                    });
                    $("."+obj.id+" #accordionTables .deleteItems").each(function(){
                              $(this).click(function(event){
                                        var item = $(this);
                                        var field = item.attr('field');
                                        item.hide();
                                        obj.dataSelectedTotalsTables[field]=0;
                                        obj.changeStatusInputTables(false,field);
                                        event.stopPropagation();
                                        
                              });
                    });
                    $("."+obj.id+" #accordionTables .RowList").each(function(){
                              $(this).click(function(){
                                        var prop = parseInt($(this).attr('prop'));
                                        var field = $(this).attr('field');
                                        var year = obj.dataCustomTables[field][prop];
                                        var zone = $("."+obj.id+" .selectorZonesTables").val();
                                        obj.dataSelectedTables[field]=year+'';
                                        obj.requestCustomTables({user:o.user,currentyear:year,zone:zone},'getFields');
                              });
                    });
                    $("."+obj.id+" .selectorZonesTables").change(function(){
                             var id = $(this).attr('id');
                             var zone = $("#"+id+" option:selected").val();
                             var year = obj.dataSelectedTables['currentyear'];
                             obj.requestCustomTables({user:o.user,currentyear:year,zone:zone},'getFields');
                    });
                    $("."+obj.id+" .applyGraphTables").click(function(){
                              obj.validateCustomTables();
                    });
                    
                   var evento = function(){
                              var heightBlock = $("."+obj.id+" #colum_cp_fieldsTables .data_min").height();
                              var heightSectionTab = heightBlock-(35*2);
                              $("."+obj.id+" .container_customReportTables").css('height',heightSectionTab+'px');
                   }
                    evento();
                    $( window ).resize(function() {
                              evento();
                    });
                    
          },
          validateCustomGraph:function(){
                    var obj = this;
                    var messages = [];
                    var data = obj.dataSelected;
                    var totalFields = 0;
                    for (var x in data.fields){
                              totalFields+=1;
                    }
                    var totalStates = 0;
                    for (var x in data.states){
                              totalStates+=1;
                    }
                    if (totalFields==0) {
                              messages.push('Debe seleccionar por lo menos un campo');
                    }
                    if (totalStates ==0) {
                              messages.push('Debe seleccionar por lo menos una ubicaci&oacute;n');
                    }
                    if (messages.length>0) {
                                        Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:messages,
                                                  buttons:[                          
                                                            {label:'Cerrar'}
                                                  ]
                                        });
                    }else{
                              //console.log(obj.dataSelected);
                              var params={fields:[],states:[],currentyear:obj.dataSelected.currentyear};
                              for (var x in obj.dataSelected.fields) {
                                        var i = obj.dataSelected.fields[x];
                                        params.fields.push(i);
                              }
                              for (var x in obj.dataSelected.states) {
                                        var i = obj.dataSelected.states[x];
                                        params.states.push(i);
                              }
                              
                              obj.requestCustomGraph(params,'getGraph');
                    }
                    
          },
          validateCustomTables:function(){
                    var obj = this;
                    var messages = [];
                    var data = obj.dataSelectedTables;
                    var totalFields = 0;
                    for (var x in data.rows){
                              totalFields+=1;
                    }
                    var totalStates = 0;
                    for (var x in data.columns){
                              totalStates+=1;
                    }
                    /*
                    if (totalFields==0) {
                              messages.push('Debe seleccionar por lo menos un campo');
                    }*/
                    if (totalStates ==0) {
                              messages.push('Debe seleccionar por lo menos un campo');
                    }
                    if (messages.length>0) {
                                        Alert.show({
                                                  title:'Notificaci&oacute;n',
                                                  type:'error',
                                                  messages:messages,
                                                  buttons:[                          
                                                            {label:'Cerrar'}
                                                  ]
                                        });
                    }else{
                              //console.log(obj.dataSelected);
                              var params={columns:[],rows:[],currentyear:obj.dataSelectedTables.currentyear};
                              /*
                              for (var x in obj.dataSelectedTables.rows) {
                                        var i = obj.dataSelectedTables.rows[x];
                                        params.rows.push(i);
                              }*/
                              for (var x in obj.dataSelectedTables.columns) {
                                        var i = obj.dataSelectedTables.columns[x];
                                        params.columns.push(i);
                                        params.rows.push(i);
                              }
                              
                              obj.requestCustomTables(params,'getTables');
                    }
                    
          },
          getHeaderTableCustom:function(data){
                    var obj=this;
                    var chain='';
                    chain+='<div class="progress_table_results">';
                    chain+='<div class="Heading">';
                    var width = (data.length<6)?(100/data.length)+'%':'200px';
                    for (var x in data) {
                              var i = data[x];
                              chain+='<div class="Cell borderHeading borderRow" style="width:'+width+';">'+
                                                  '<p>'+i.label+'</p>'+
                                     '</div>';
                    }          
                    chain+='</div>';
                    return chain;
          },
          getHeaderTableCustomTables:function(data){
                    var obj=this;
                    var chain='';
                    chain+='<div class="progress_table_results">';
                    chain+='<div class="Heading">';
                    var width = (data.length<6)?(100/data.length)+'%':'200px';
                    for (var x in data) {
                              var i = data[x];
                              chain+='<div class="Cell borderHeading borderRow" style="width:'+width+';">'+
                                                  '<p>'+i.label+'</p>'+
                                     '</div>';
                    }          
                    chain+='</div>';
                    return chain;
          },
          existException:function(data){
                    var obj = this;
                    var exist = false;
                    var exceptions=['00'];
                    for(var x in data){
                              var i = data[x].field;
                              if(exceptions.indexOf(i)!=-1){
                                      exist=true;
                                      break;
                              }
                    }
                    return exist;
          },
          existExceptionTables:function(data){
                    var obj = this;
                    var exist = false;
                    var exceptions=['00'];
                    for(var x in data){
                              var i = data[x].field;
                              if(exceptions.indexOf(i)!=-1){
                                      exist=true;
                                      break;
                              }
                    }
                    return exist;
          },
          getTableCustom:function(data,initialParams){
                    var obj=this;
                    var chain='';
                    chain+=obj.getHeaderTableCustom(data.headers);
                    var existException = obj.existException(initialParams.states);
                    var clase = 'rowFilled';
                    var width = (data.length<6)?(100/data.length)+'%':'200px';
                    var footer={};
                    
                    for(var x in data.rows){
                              var i = data.rows[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                              chain+='<div class="Row">';
                                        for (var y in data.headers) {
                                                  var h = data.headers[y];
                                                  var c = h.field+'';
                                                  var additionalText = ((initialParams.zone=='year')&&(c.indexOf('year_')==-1)&&(c=='zone'))?'Ejercicio ':'';
                                                  var additionalClase = (h.field!='zone')?'Tac':'';
                                                  var label = i[h.field];
                                                  if (c!='zone') {
                                                    label = (validator.isText(label))?label:validator.getFormatNumber(label);
                                                  }
                                                  
                                                  chain+='<div class="Cell borderRow '+clase+' '+additionalClase+'" style="width:'+width+';">'+
                                                            '<p>'+additionalText+label+'</p>'+
                                                         '</div>';
                                                  if(!footer[h.field]){
                                                            footer[h.field]=0;
                                                  }
                                                  footer[h.field]+=i[h.field];
                                        }
                              chain+='</div>';
                              
                    }
                    if (!existException) {
                    
                              chain+='<div class="Heading" style="font-size: 115% !important;">';
                                        chain+='<div class="Cell borderHeading" style="width:'+width+';">'+
                                                                '<p>Total</p>'+
                                                            '</div>';
                              var pos=0;
                              for(var y in data.headers){
                                        if(pos>0){
                                                 
                                                  var i = data.headers[y];
                                                  chain+='<div class="Cell borderHeading borderRow" style="width:'+width+';padding-left: 0px;padding-right: 0px;">'+
                                                             '<p>'+validator.getFormatNumber(footer[i.field])+'</p>'+
                                                         '</div>';
                                        }
                                        pos+=1;
                                        
                              }
                              chain+='</div>';
                    }
                    chain+='</div>';
                    return chain;
          },
          getTableCustomTables:function(data,initialParams){
                    var obj=this;
                    var chain='';
                    chain+=obj.getHeaderTableCustomTables(data.headers);
                    var existException = obj.existExceptionTables(initialParams.states);
                    var clase = 'rowFilled';
                    var width = (data.length<6)?(100/data.length)+'%':'200px';
                    var footer={};
                    
                    for(var x in data.rows){
                              var i = data.rows[x];
                              if (clase.length>0) {
                                        clase='';
                              }else{
                                        clase='rowFilled';
                              }
                              chain+='<div class="Row">';
                                        for (var y in data.headers) {
                                                  var h = data.headers[y];
                                                  var c = h.field+'';
                                                  var additionalText = ((initialParams.zone=='year')&&(c.indexOf('year_')==-1)&&(c=='zone'))?'Ejercicio ':'';
                                                  var additionalClase = (h.field!='zone')?'Tac':'';
                                                  var label = i[h.field];
                                                  if (c!='zone') {
                                                    label = (validator.isText(label))?label:label;
                                                  }
                                                  
                                                  chain+='<div class="Cell borderRow '+clase+' '+additionalClase+'" style="width:'+width+';">'+
                                                            '<p>'+additionalText+label+'</p>'+
                                                         '</div>';
                                                  if(!footer[h.field]){
                                                            footer[h.field]=0;
                                                  }
                                                  footer[h.field]+=i[h.field];
                                        }
                              chain+='</div>';
                              
                    }
                    /*
                    if (!existException) {
                    
                              chain+='<div class="Heading" style="font-size: 115% !important;">';
                                        chain+='<div class="Cell borderHeading" style="width:'+width+';">'+
                                                                '<p>Total</p>'+
                                                            '</div>';
                              var pos=0;
                              for(var y in data.headers){
                                        if(pos>0){
                                                 
                                                  var i = data.headers[y];
                                                  chain+='<div class="Cell borderHeading borderRow" style="width:'+width+';padding-left: 0px;padding-right: 0px;">'+
                                                             '<p>'+validator.getFormatNumber(footer[i.field])+'</p>'+
                                                         '</div>';
                                        }
                                        pos+=1;
                                        
                              }
                              chain+='</div>';
                    }
                    chain+='</div>';
                    */
                    return chain;
          },
          buildCustomGraph:function(data,initialParams){
                    var obj = this;
                    var id = 'cp_customTabular';
                    $("#header_"+id).remove();
                    $("#"+id).parent().append('<div id="header_'+id+'" class="section_progress_header_table">'+obj.getHeaderTableCustom(data.headers)+'</div>');
                    var chain = obj.getTableCustom(data,initialParams);
                    $("#"+id).html(chain);
                    $("#print_cp_customTabular").html(chain);
                    //setTimeout(function(){
                    //          if($('#'+id).hasScrollBar()){
                    //                    $("#header_"+id).css('right','20px');
                    //          }
                    //          $('#'+obj.id+' .progress_table_results').scroll(function(){
                    //                    var position =  $('#'+obj.id+' .progress_table_results').scrollLeft();
                    //                    $("#"+obj.id+" .section_progress_header_table").scrollLeft(position);
                    //           });
                    //},500);
                              
                    obj.showGraphCustom(data,'cp_customGraph');
                    obj.showGraphCustom(data,'report_cp_customGraph');
          },
          buildCustomTables:function(data,initialParams){
                    var obj = this;
                    var id = 'cp_customTabularTables';
                    $("#header_"+id).remove();
                    $("#"+id).parent().append('<div id="header_'+id+'" class="section_progress_header_table">'+obj.getHeaderTableCustom(data.headers)+'</div>');
                    var chain = obj.getTableCustomTables(data,initialParams);
                    $("#"+id).html(chain);
                    $("#print_cp_customTabularTables").html(chain);
                    //jago1
                    //setTimeout(function(){
                    //          if($('#'+id).hasScrollBar()){
                    //                    $("#header_"+id).css('right','20px');
                    //          }
                    //          $('#'+obj.id+' .progress_table_results').scroll(function(){
                    //                    var position =  $('#'+obj.id+' .progress_table_results').scrollLeft();
                    //                    $("#"+obj.id+" .section_progress_header_table").scrollLeft(position);
                    //           });
                    //},500);
                              
                    //obj.showGraphTables(data,'cp_customTables');
                    //obj.showGraphTables(data,'report_cp_customTables');
          },
          getRandomColor:function() {
                    var letters = '0123456789ABCDEF'.split('');
                    var color = '#';
                    for (var i = 0; i < 6; i++ ) {
                        color += letters[Math.floor(Math.random() * 16)];
                    }
                    return color;
          },
          getColors:function(info){
                    var obj = this;
                    var attributes=[
                              {field:'assignated',color:'#C5002E'},//'asignados'
                              {field:'delivered',color:'#FFB620'},//entregados
                              {field:'validated',color:'#006BA7'},//validados
                              {field:'notassigned',color:'#007836'}//disponibles
                    ];
                    var colors=[];
                    var h = info.headers;
                    for(var x in h){
                              var f=h[x].field.toLowerCase();
                              if (x>0) {
                                        var color='';
                                        for(var y in attributes){
                                                  var a = attributes[y];
                                                  if (f.indexOf(a.field)!=-1) {
                                                            color=a.color;
                                                            break;
                                                  }
                                        }
                                        if (color=='') {
                                                  color=obj.getRandomColor();
                                        }
                                        colors.push(color);
                              }
                    }
                    return colors;
          },
          showGraphCustom:function(info,id){
                    var obj=this;
                    var series=[];
                    var categorias = [];
                    for(var x in info.rows){
                              var i = info.rows[x];
                              categorias.push(i.zone);
                              for (var y in info.headers) {
                                        var e = info.headers[y];
                                        if (!series[y]) {
                                             series[y]={name:e.label,data:[]};
                                        }
                                        series[y].data.push(i[e.field]);
                              }
                    }
                    series.shift();
                    var colors = obj.getColors(info);
                      $('#'+id).highcharts({
                              chart: {
                                  type: 'column'
                              },
                              colors: colors,
                              title: {
                                  text: '',
                                  style:{ "color": "#787878", "fontSize": "120%","font-weight":"bold"}
                              },
                              subtitle: {
                                  text: ''
                              },
                              xAxis: {
                                  categories: categorias,
                                  crosshair: true
                              },
                              credits:{
                                      enabled:false	
                              },
                              
                              yAxis: {
                                  min: 0,
                                  title: {
                                      text: ''
                                  },
                                  labels: {
                                        formatter: function () {
                                                return this.value;
                                        }
                                  }
                              },
                              tooltip: {
                                  headerFormat: '<span>{point.key}</span><table>',
                                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                      '<td style="padding:0"><b>{point.y} </b></td></tr>',
                                  footerFormat: '</table>',
                                  shared: true,
                                  useHTML: true
                              },
                              plotOptions: {
                                  column: {
                                      pointPadding: 0.2,
                                      borderWidth: 0
                                  }
                              },
                              series: series
                    });
          },
          showGraphTables:function(info,id){
                    var obj=this;
                    var series=[];
                    var categorias = [];
                    for(var x in info.rows){
                              var i = info.rows[x];
                              categorias.push(i.zone);
                              for (var y in info.headers) {
                                        var e = info.headers[y];
                                        if (!series[y]) {
                                             series[y]={name:e.label,data:[]};
                                        }
                                        series[y].data.push(i[e.field]);
                              }
                    }
                    series.shift();
                    var colors = obj.getColors(info);
                      $('#'+id).highcharts({
                              chart: {
                                  type: 'column'
                              },
                              colors: colors,
                              title: {
                                  text: '',
                                  style:{ "color": "#787878", "fontSize": "120%","font-weight":"bold"}
                              },
                              subtitle: {
                                  text: ''
                              },
                              xAxis: {
                                  categories: categorias,
                                  crosshair: true
                              },
                              credits:{
                                      enabled:false	
                              },
                              
                              yAxis: {
                                  min: 0,
                                  title: {
                                      text: ''
                                  },
                                  labels: {
                                        formatter: function () {
                                                return this.value;
                                        }
                                  }
                              },
                              tooltip: {
                                  headerFormat: '<span>{point.key}</span><table>',
                                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                      '<td style="padding:0"><b>{point.y} </b></td></tr>',
                                  footerFormat: '</table>',
                                  shared: true,
                                  useHTML: true
                              },
                              plotOptions: {
                                  column: {
                                      pointPadding: 0.2,
                                      borderWidth: 0
                                  }
                              },
                              series: series
                    });
          },
          changeStatusInput: function(active,field){
                    var obj = this;
                    for(var x in obj.dataSelected[field]){
                              var prop = parseInt(x.replace('i',''));
                              var idInput = obj.id+'_item'+field+prop+'_input';
                              var input = $("#"+idInput);
                              input.removeClass('tay_check').removeClass('tay_notcheck');
                              if (active) {
                                        input.addClass('tay_check');
                                        input.attr('active','true');
                                        obj.dataSelected[field]['i'+prop]=obj.dataCustomGraph[field][prop];
                                        
                              }else{
                                        input.addClass('tay_notcheck');
                                        input.removeAttr('active');
                                        delete obj.dataSelected[field]['i'+prop];
                              }
                    }
                    
          },
          changeStatusInputTables: function(active,field){
                    var obj = this;
                    for(var x in obj.dataSelectedTables[field]){
                              var prop = parseInt(x.replace('i',''));
                              var idInput = obj.id+'_itemTables'+field+prop+'_input';
                              var input = $("#"+idInput);
                              input.removeClass('tay_check').removeClass('tay_notcheck');
                              if (active) {
                                        input.addClass('tay_check');
                                        input.attr('active','true');
                                        obj.dataSelectedTables[field]['i'+prop]=obj.dataCustomTables[field][prop];
                                        
                              }else{
                                        input.addClass('tay_notcheck');
                                        input.removeAttr('active');
                                        delete obj.dataSelectedTables[field]['i'+prop];
                              }
                    }
                    
          },
          
          clearFilter:function(field){
                    var obj = this;
                    var items = obj.dataFiltered[field];
                    for(var x in items){
                      var i = items[x];
                      $("#"+obj.id+'_item'+field+i).show();
                    }
                    items=null;
                    items=[];
          },
          clearFilterTables:function(field){
                    var obj = this;
                    var items = obj.dataFilteredTables[field];
                    for(var x in items){
                      var i = items[x];
                      $("#"+obj.id+'_itemTables'+field+i).show();
                    }
                    items=null;
                    items=[];
          },
          runFilter:function(text,field,type){
                    var obj = this;
                    if (obj.clockFilter) {
                              clearTimeout(obj.clockFilter);
                              obj.clockFilter = null;
                    }
                    obj.clockFilter = setTimeout(function(){
                              obj.filterByText(text,field,type);
                    },500);
          },
          runFilterTables:function(text,field,type){
                    var obj = this;
                    if (obj.clockFilterTables) {
                              clearTimeout(obj.clockFilterTables);
                              obj.clockFilterTables = null;
                    }
                    obj.clockFilterTables = setTimeout(function(){
                              obj.filterByTextTables(text,field,type);
                    },500);
          },
          filterByText:function(text,field,type){
                    var obj = this;
                    text = text.toUpperCase();
                    obj.clearFilter(field);
                    var data = obj.dataCustomGraph[field];
                    for(var x in data){
                              var i = data[x];
                              var info = (type=='list')?i:i.label;
                              info = info.toUpperCase();
                              if (info.indexOf(text)==-1) {
                                        $("#"+obj.id+'_item'+field+x).hide();
                                        obj.dataFiltered[field].push(x);
                              }
                    }
          },
          filterByTextTables:function(text,field,type){
                    var obj = this;
                    text = text.toUpperCase();
                    obj.clearFilterTables(field);
                    var data = obj.dataCustomTables[field];
                    for(var x in data){
                              var i = data[x];
                              var info = (type=='list')?i:i.label;
                              info = info.toUpperCase();
                              if (info.indexOf(text)==-1) {
                                        $("#"+obj.id+'_itemTables'+field+x).hide();
                                        obj.dataFilteredTables[field].push(x);
                              }
                    }
          },
           _init:function(){
                    
          },
          buildTabs:function(){
             var obj = this;
             var chain ='<div class="progress_tab" section="resume">'+
                              '<div class="section">'+
                                        '<div class="label">Resumen</div>'+
                              '</div>'+
                        '</div>'+
                        '<div class="progress_tab" section="tabulate">'+
                              '<div class="section leftBorder">'+
                                        '<div class="label">Gr&aacute;ficas din&aacute;micas</div>'+
                              '</div>'+
                        '</div>'+
						
						
		     '<div class="progress_tab" section="tables">'+
                              '<div class="section leftBorder">'+
                                        '<div class="label">Tablas din&aacute;micas</div>'+
                              '</div>'+
                        '</div>'+
						
		    '<div class="progress_tab" section="brigadist">'+
                              '<div class="section leftBorder">'+
                                        '<div class="label">Brigadistas</div>'+
                              '</div>'+
                        '</div>'+
                        '<div class="progress_tab" section="map">'+
                              '<div class="section leftBorder">'+
                                        '<div class="label">Mapa</div>'+
                              '</div>'+
                        '</div>';
                    $(".app_options_tabs").html(chain);
                    $(".progress_tab").each(function(){
                              $(this).click(function(){
                                        var section = $(this).attr('section');
                                        obj.selectTab(section);
                              });
                    });
                    
          },
          showSection:function(section){
                    var clase='section_tab_selected';
                    $("."+clase).removeClass(clase);
                    $(".section_tab_"+section).addClass(clase);
          },
          selectTab:function(section){
                    var obj=this;
                    var clase ='progress_tab_selected';
                    $('.'+clase).removeClass(clase);
                    $('div[section="'+section+'"]').addClass(clase);
                    obj.showSection(section);
                    if (section!='map') {
                              $('.app_left_section_layers').hide();
                    }
          },
          _create: function() {
                    (function($) {
                              $.fn.hasScrollBar = function() {
                                        try {
                                                 // return this.get(0).scrollHeight > this.height();
                                        }
                                        catch(err) {
                                                  //return this.scrollHeight > this.height();
                                        }
                                  
                              }
                    })(jQuery);
                    (function($) {
                              $.fn.hasScrollBarx = function() {
                                        try{
                                                  //return this.get(0).scrollWidth > this.width();
                                        }
                                        catch(err){
                                                  //return this.scrollWidth > this.width();
                                        }
                                  
                              }
                    })(jQuery);
                    
                    this.buildTabs();
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
                                                  this.options.data = value;
                                                  this.update();
                                        break;
                                                          
                              }
		    }
	  }
);
});