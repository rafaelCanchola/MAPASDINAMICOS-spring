/**
 * Comprende funciones que permiten la generaci�n de cada uno de las estructuras basicas de elementos en DOOM,
 * mediante los cuales se desplegara el mapa y cada uno de los componentes donde se desplegara infomraci�n
 */
define(["map","validator","restrictions","connections"], function(map,validator,restrictions,connections){
    
    
    var getHeader=function(a){
	var r = restrictions.roles;
	var title = 'Mapas Din&aacute;micos';
	console.log(a);
	//var year = '2019';
	/*
	if (a.roleId==1) {
	    year='';
	}*/
	var chain = ''+
		    '<div class="section_header">'+
	    		'<div class="section_logo"><div class="template_logo"></div></div>'+
			'<div class="section_title_system_logged">'+title+'</div>'+
			'<div class="section_short_cuts noPrint">'+
			    '<div id="user_active" status="close" class="item_head" align="center">'+
				'<div class="border_head"></div>'+
				'<div class="icon_head">'+
				    '<div class="template_structue tst_user"></div>'+
				'</div>'+
				'<div class="label_head2 label_user">'+a.username+'</div>'+
			    '</div>'+
                
			    getButtonsList(a)+
                
			    ((a.rol.id==6)?
			    '<div id="print_executive" class="item_head" align="center">'+
				'<div  class="border_head"></div>'+
				'<div class="icon_head">'+
				    '<div class="template_structue tst_print"></div>'+
				'</div>'+    
				'<div class="label_head2">Imprimir</div>'+
			    '</div>':'')+
			    ((a.rol.id==2)?//(((a.roleId==2)||(a.roleId==4))?
			    '<div id="list_validated" class="item_head" align="center">'+
				'<div  class="border_head"></div>'+
				'<div class="icon_head">'+
				    '<div class="template_structue tst_list_validated"></div>'+
				'</div>'+    
				'<div class="label_head">Descarga de validados</div>'+
			    '</div>':'')+
                
			    
                
			    ((r['r'+a.rol.id].admonUsers)?
			    '<div id="admon_users" class="item_head" align="center">'+
				'<div  class="border_head"></div>'+
				'<div class="icon_head">'+
				    '<div class="template_structue tst_admon_users"></div>'+
				'</div>'+    
				'<div class="label_head">Administrar usuarios</div>'+
			    '</div>':
			    '')+
			    ((a.rol.id==6)?
			     /*
			    '<div id="view_report" class="item_head" align="center">'+
				'<div class="border_head"></div>'+
				'<div class="icon_head">'+
				    '<div class="template_structue tst_report"></div>'+
				    '</div>'+
				'<div class="label_head2">Avance</div>'+
			    '</div>'+
			    */
			    '<div id="view_national" class="item_head" align="center">'+
				'<div class="border_head"></div>'+
				'<div class="icon_head">'+
				    '<div class="template_structue tst_national"></div>'+
				    '</div>'+
				'<div class="label_head2">Ver nacional</div>'+
			    '</div>'
			    :'')+
			    
			    '<div id="admin_layers" class="item_head" align="center">'+
				'<div class="border_head"></div>'+
				'<div class="icon_head">'+
				    '<div class="template_structue tst_layers"></div>'+
				    '</div>'+
				'<div class="label_head2">Capas</div>'+
			    '</div>'+
			    ((a.rol.id==1)?
			    '<div id="admin_years" class="item_head" align="center">'+
				'<div class="border_head"></div>'+
				'<div class="icon_head">'+
				    '<div class="template_structue tst_exercises"></div>'+
				    '</div>'+
				'<div class="label_head2">Ejercicios</div>'+
			    '</div>'
			    :'')+
			    '<div class="tooltip_user_active">'+
                    '<div class="Tooltip top">'+
                        '<div class="user_label"></div>'+
                        '<button class="user_btn">Cerrar sesi&oacute;n</button>'+
                    '</div>'+
			    '</div>'+
			'</div>'+
		    '</div>';
	return chain;
    };
    var getButtonsList=function(a){
       /*
        var chain=''+
                (((a.roleId==1)||(a.roleId==2)||(a.roleId==6))?
			    '<div id="list_universe" class="item_head" align="center">'+
                    '<div  class="border_head"></div>'+
                    '<div class="icon_head">'+
                        '<div class="template_structue tst_list_predios"></div>'+
                    '</div>'+    
                    '<div class="label_head">Universo</div>'+
			    '</div>':'')+
			    
			    '<div id="list_predios" class="item_head" align="center">'+
                    '<div  class="border_head"></div>'+
                    '<div class="icon_head">'+
                        '<div class="template_structue tst_list_predios"></div>'+
                    '</div>'+    
                    '<div class="label_head">Listado de predios</div>'+
			    '</div>'+
			    
                '<div id="list_questionnaire" class="item_head" align="center">'+
                    '<div  class="border_head"></div>'+
                    '<div class="icon_head">'+
                        '<div class="template_structue tst_list_predios"></div>'+
                    '</div>'+    
                    '<div class="label_head">Cuestionarios</div>'+
			    '</div>';
        return chain;
        */
        var chain =''+
                '<div id="list_total" status="close" class="item_head" align="center">'+
                    '<div  class="border_head"></div>'+
                    '<div class="icon_head">'+
                        '<div class="template_structue tst_list_predios"></div>'+
                    '</div>'+    
                    '<div class="label_head2">Listados</div>'+
			    '</div>';
        var list = [{label:'Predios',id:'list_predios'}];
        /*
	if (((a.roleId==1)||(a.roleId==2)||(a.roleId==6))) {
            list.push({label:'Universo',id:'list_universe'});
        }
	*/
	//if (a.roleId!=5) {
	    list.push({label:'Cuestionarios',id:'list_questionnaire'});
	//}
        var listChain = '';
        for(var x in list){
            listChain+='<div id="'+list[x].id+'" class="optionList">'+list[x].label+'</div>';
        }
        chain+='<div class="tooltip_list">'+
                    '<div class="Tooltip top">'+
                        '<div class="content"></div>'+
                        listChain+
                    '</div>'+
			    '</div>';
        return chain;
    };
    var builStructure = function(a){
	if (a.rol.id==6) {
	    var chain=  '<div class="app_header">'+getHeader(a)+'</div>'+
			'<div class="app_options_tabs noPrint"></div>'+
			'<div class="app_content app_content_min">'+
			'<div class="app_left_section_layers noPrint"></div>'+
			'</div>'+
            '<div id="FormQuestionnaire"></div>'+
			'<div id="subFormQuestionnaire"></div>';
	}else{
	    
	    var chain=  '<div class="app_header">'+getHeader(a)+'</div>'+
			//'<div class="app_faces"></div>'+
			'<div class="app_content">'+
			    '<div class="app_left_section noPrint"></div>'+
			    '<div class="app_left_section_years noPrint"></div>'+
			    '<div class="app_left_section_information noPrint"></div>'+
			    '<div class="app_left_section_notification noPrint"></div>'+
			    '<div class="app_left_section_layers noPrint"></div>'+
			    '<div class="app_right_section">'+
				'<div class="app_center_section">'+
				    '<div id="map" class="app_map_section '+((a.rol.id==6)?'mapForExecutive':'')+'"></div>'+
				    '<div class="app_tool_section noPrint"></div>'+
				'</div>'+
				'<div class="app_bottom_section '+((a.rol.id==6)?'bottomForExecutive':'')+'" >'+
				    '<div class="app_bottom_section_predios"></div>'+
				    '<div class="app_bottom_section_universe"></div>'+
				    '<div class="app_bottom_section_universe_replace"></div>'+
				    '<div class="app_bottom_section_questionnaire"></div>'+
				    //'<div class="barGraph"></div>'+
				    //'<div class="pieGraph"></div>'+
				'</div>'+
			    '</div>'+
			'</div>'+
			'<div id="FormQuestionnaire"></div>'+
			'<div id="subFormQuestionnaire"></div>';

	    
	}
	    $('body').html(chain);
	    $('.app_left_section_information').hide();
	    $('.app_left_section_notification').hide();
	    $('.app_left_section_layers').hide();
	    $('.app_left_section_years').hide();
    };
    var showUserActive=function(data){
	var chain = data.username+'<br>'+'('+validator.getRol(data.roleId)+')';
	$(".tooltip_user_active .user_label").html(chain);
    };
    var logoutRequest = function(){
	    reloadPage();
	    var msg = 'Servicio no disponible intente m&aacute;s tarde'
	    var r= {
		    success:function(json,estatus){
			var valid=false;
			if (json){
			    if (json.response.success){
				valid=true;
				amplify.store( 'dataLoggingAGAVE',null );
				reloadPage();
			    }else{
				msg=json.response.message;
			    }
			}
			if (!valid) {
			    
			}
			
		    },
		    beforeSend: function(solicitudAJAX) {
		    },
		    error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
		    },
		    complete: function(solicitudAJAX,estatus) {
		    }
	    };
	    r = $.extend(r, connections.users.logout);
	    $.ajax(r);
    };
    var clockUserRequest = null;
    defineClockUserRequest = function(params){
                    clearClockUserRequest();
                    clockUserRequest = setInterval(function(){
                              getUsersRequest(params);
                    },12000000);
    };
    var clearClockUserRequest = function(){
                    if(clockUserRequest){
                              clearInterval(clockUserRequest);
                    }        
    };
    var getUsersRequest = function(p){
	    
	    var msg = 'Servicio no disponible intente m&aacute;s tarde'
		var r= {
		    success:function(json,estatus){
			if (json){
			    if (json.response.sucessfull){
				var userActive = json.data.active;
				if (userActive.id == loggedUser.id) {
				    userActive.parent = null;
				}
				if ((userActive.roleId==1) &&(loggedUser.roleId==6)) {
				    userActive = loggedUser;
				    userActive.parent = null;
				}
				var params = {
				    data:{
					active:userActive,
					users:json.data.users
				    },
				    userActive:loggedUser
				};
			    
				$('.app_left_section').userbranch(params);
				
			    }else{
				msg=json.response.message;
			    }
			}
			
		    },
		    beforeSend: function(solicitudAJAX) {
		    },
		    error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
		    },
		    complete: function(solicitudAJAX,estatus) {
		    }
	    };

	    r = $.extend(r, connections.workTeams.actions);
	    r.data = p;
	    $.ajax(r);
    };
    var clockToolTipUser=null;
    var clockToolTipList=null;
    var clockUser=function(){
        var tooltip = $(".tooltip_user_active");
        clearClockUser();
        clockToolTipUser = setTimeout(function(){
            tooltip.hide();
            $("#user_active").attr('status','close');
        },3000);
    }
    var clockList=function(){
        var tooltipList = $(".tooltip_list");
        clearClockList();
        clockToolTipList = setTimeout(function(){
            tooltipList.hide();
            $("#list_total").attr('status','close');
        },3000);
    }
    var clearClockList = function(){
	
        if (clockToolTipList) {
            clearTimeout(clockToolTipList);
        }
    }
    var clearClockUser = function(){
	
        if (clockToolTipUser) {
            clearTimeout(clockToolTipUser);
        }
    }
    var clockToolTipMenu =null;
    var clockMenu=function(){
	var tooltipm = $(".tooltip_menu_options");
	clearClockMenu();
	clockToolTipMenu = setTimeout(function(){
	    tooltipm.hide();
	    $(".menu_options").attr('status','close');
	
	},3000);
    }
    var clearClockMenu = function(){
	
	if (clockToolTipMenu) {
	    clearTimeout(clockToolTipMenu);
	}
    }
    var clockExercises = null;
    var defineClockExercises = function(params){
                    clearClockExercises();
                    clockExercises = setTimeout(function(){
                              $('.app_left_section_years').years(params);
                    },300);
    };
    var clearClockExercises = function(){
                    if(clockExercises){
			      clearTimeout(clockExercises);
                    }        
    };
    var listUniverseOpen=false;
    var listUniverseCreated=false;
    var listPrediosOpen=false;
    var listPrediosCreated=false;
    var listQuestionnaireCreated = false;
    var listQuestionnaireOpen = false;
    var events=function(a){
	$("#print_executive").click(function(){
	     $(".app_content").progress('printActualTab');
	});
	$("#list_validated").click(function(){
	    $('.app_left_section_years').show();
	    $('.app_left_section_years').actionYears({data:{active:a,action:'download',year:a.currentyear,type:'charge',title:'Descarga de validados'}});
	});
	$("#list_universe").click(function(){
	    if (a.roleId==6) {
            $(".app_content").progress('selectTab','map');
        }
	    if (listUniverseOpen) {
		$("#map").removeClass('mapForExecutive');
		$(".app_bottom_section").hide();
		
		
	    }else{
		
		if (!listUniverseCreated) {
		    $(".app_bottom_section").addClass('bottomForExecutive');
		    $(".app_bottom_section_universe").reportsUniverse({data:{userActive:a,title:'Universo'}});
		    listUniverseCreated=true;
		}else{
		    updateUniverse();
		}
		$("#map").addClass('mapForExecutive');
		$(".app_bottom_section_predios,.app_bottom_section_universe_replace").hide();
		$(".app_bottom_section_questionnaire").hide();
        $(".app_bottom_section_universe").show();
		$(".app_bottom_section").show();
		
	    }
	    map.updateSize();
	    listPrediosOpen=false;
        listQuestionnaireOpen=false;
	    listUniverseOpen =!listUniverseOpen;
	    
	});
	$("#list_predios").click(function(){
	    if (a.roleId==6) {
            $(".app_content").progress('selectTab','map');
        }
	    if (listPrediosOpen) {
		$("#map").removeClass('mapForExecutive');
		$(".app_bottom_section").hide();
		
		
	    }else{
		if (!listPrediosCreated) {
		    $(".app_bottom_section").addClass('bottomForExecutive');
		    $(".app_bottom_section_predios").reports({data:{userActive:a}});
		    listPrediosCreated=true;
		}else{
		    updateListPredios(true);
		}
		$("#map").addClass('mapForExecutive');
		$(".app_bottom_section_universe").hide();
        $(".app_bottom_section_questionnaire").hide();
		$(".app_bottom_section_predios").show();
		$(".app_bottom_section").show();
	    }
	    map.updateSize();
	    listUniverseOpen=false;
        listQuestionnaireOpen=false;
	    listPrediosOpen =!listPrediosOpen;
	    
	});
    $("#list_questionnaire").click(function(){
	    if (a.roleId==6) {
            $(".app_content").progress('selectTab','map');
        }
	    if (listQuestionnaireOpen) {
            $("#map").removeClass('mapForExecutive');
            $(".app_bottom_section").hide();
	    }else{
            if (!listQuestionnaireCreated) {
                $(".app_bottom_section").addClass('bottomForExecutive');
                $(".app_bottom_section_questionnaire").reportsQuestionnaire({data:{userActive:a,title:'Cuestionarios'}});
                listQuestionnaireCreated=true;
            }else{
                updateListQuestionnaire(true);
            }
            $("#map").addClass('mapForExecutive');
            $(".app_bottom_section_universe").hide();
            $(".app_bottom_section_predios").hide();
            $(".app_bottom_section_questionnaire").show();
            $(".app_bottom_section").show();
	    }
	    map.updateSize();
	    listUniverseOpen=false;
        listPrediosOpen =false;
	    listQuestionnaireOpen =!listQuestionnaireOpen;
	    
	});
	if(a.roleId==6){
	    var eventoProgress = function(){
		buildMap(a);
	    }
	    $(".app_content").progress({data:{event:eventoProgress,user:a,params:{user:a.id,cve:"00",action:"get",currentyear:a.currentyear}}});
	}
	$("#view_national").click(function(){
	    $(".app_content").progress('loadNational');
	});
    var tooltipList = $(".tooltip_list")
	var tooltip = $(".tooltip_user_active");
	var tooltipm = $(".tooltip_menu_options");
	tooltipm.hide();
	tooltip.hide();
    tooltipList.hide();
    $("#list_total").click(function(){
        clearClockMenu();
	    clearClockUser();
        clearClockList();
        tooltip.hide();
	    tooltipm.hide();
        $("#user_active").attr('status','close');
        var status = $(this).attr('status');
	    if (status=='close') {
            tooltipList.show();
            clockList();
            status='open';
	    }else{
            tooltipList.hide();
            status='close';
	    }
	    $(this).attr('status',status);
    });
    tooltipList.mouseleave(function(){
        clockList();
    }).mouseenter(function(){
        clearClockList();
    });
	$("#user_active").click(function(){
	    clearClockMenu();
	    clearClockUser();
        clearClockList();
        tooltipList.hide();
	    tooltipm.hide();
	    $(".menu_options").attr('status','close');
	    var status = $(this).attr('status');
	    if (status=='close') {
            tooltip.show();
            clockUser();
            status='open';
	    }else{
            tooltip.hide();
            status='close';
	    }
	    $(this).attr('status',status);
	});
	tooltip.mouseenter(function(){
	   
	   clearClockUser();
	}).mouseleave(function(){
        clearClockUser();
	    clockUser();
	});
	
	$(".menu_options").click(function(){
	    clearClockMenu();
	    clearClockUser();
	    tooltip.hide();
	    $("#user_active").attr('status','close');
	    var status = $(this).attr('status');
	    if (status=='close') {
		tooltipm.show();
		status='open';
		clockMenu();
	    }else{
		tooltipm.hide();
		status='close';
	    }
	    $(this).attr('status',status);
	});
	
	tooltipm.mouseenter(function(){
	   clearClockMenu();
	}).mouseleave(function(){
	    
	    clockMenu();
	});
	
	$(".user_btn").click(function(){
	    logoutRequest();
	});
	/*
	var eventClear=function(){
	    $(".custom_baseLayer").hide();
	    $(".custom_overlays").hide();
	}
	*/
	$("#admin_layers").click(function(){
	    /*
	    var params={
		data:{
		    title:'Capas',
		    buttons:[
			{label:'Base',event:function(id){
			    eventClear();
			    $("#"+id).baseLayers();
			}},
			{label:'Vectorial',event:function(id){
			    eventClear();
			    $("#"+id).overlays();
			}}
		    ],
		    firstActive:true
		}
	    };
	    $("#admin_layers").customMenu(params);
	    */
	    $('.app_left_section_layers').layers({userActive:a});
	    $("div[section='map']").click();
	});
	$("#admin_years").click(function(){
	    
	    var edit = $(this).attr('edit');
	    if (edit) {
		$(this).removeAttr('edit');
		var process = 'administration';
		$("#admin_years .label_head2").html('Ejercicios');
	    }else{
		$(this).attr('edit','info');
		var process = 'consult';
		$("#admin_years .label_head2").html('Administrar ejercicios');
	    }
	    $(".app_left_section_information,.app_left_section_layers,.app_left_section_notification").hide();
	    defineClockExercises({process:process,userActive:a});
	    //$('.app_left_section_years').years({process:process,userActive:a});
	});
	$("#view_report").click(function(){
	    showReport();
	});
	$('#head_alets').click(function(){
	    //$('.app_left_section_notification').Actions('show');
	});
	showUserActive(a);
	addEventsToAdminWorkTeams(a);
	addEventsToAdminUsers(a);
	
	
	

	
	
	//$('.app_left_section_notification').Actions({data:{userActive:a}});
	//$('.app_left_section').assignCharge({userActive:a,data:{active:a}});getToolActive
	//$('.app_left_section_information').information();
	//getFace({action:'get',id:a.id});
	if (a.roleId!=6) {
	    buildMap(a);
	}
	$.datepicker.regional['es'] = {
                                        closeText: 'Cerrar',
                                        prevText: '<Ant',
                                        nextText: 'Sig>',
                                        currentText: 'Hoy',
                                        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                                        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
                                        dayNames: ['Domingo', 'Lunes', 'Martes', 'Mi&eacute;rcoles', 'Jueves', 'Viernes', 'S&aacute;bado'],
                                        dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
                                        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
                                        weekHeader: 'Sm',
                                        dateFormat: 'dd/mm/yy',
                                        firstDay: 1,
                                        isRTL: false,
                                        showMonthAfterYear: false,
                                        yearSuffix: ''
                              };
        $.datepicker.setDefaults($.datepicker.regional['es']);
    }
    var buildMap=function(a){
        var userId ='';
        var userId=(loggedUser.roleId==6)?1:a.id ;
        if (a.roleId==5) {
            $(".app_left_section").deliveredCharge({userActive:null,userLogged:a,data:{active:a}});
        }else{
            getUsersRequest({action:'getnodes',id:userId,useractive:loggedUser.id,currentyear:a.currentyear});
        }
        $(".app_tool_section").tools({userActive:a});
        $("#map").legend();
        
        map.init(a);
        
        buildMeasureTool();
    };
    var showReport = function(){
	hideReport();
	var chain='<div class="veil_report"></div>'+
		  '<div class="modal_report">'+
                        '<div class="content">'+
			    '<div class="closeFrame">'+
				'<div class="template_userbranch tub_delete"></div>'+
			    '</div>'+
			    '<div class="frame">'+
				'<iframe width="99%" height="99%" src="docs/progress.pdf"></iframe>'+
			    '</div>'+
			    
			'</div>'+
                  '</div>';
	$("body").append(chain);
	$(".closeFrame").click(function(){
	    hideReport();
	});
    };
    var showImage = function(src){
	hideReport();
	var chain='<div class="veil_report"></div>'+
		  '<div class="modal_report">'+
                        '<div class="content">'+
			    '<div class="closeFrame">'+
				'<div class="template_userbranch tub_delete"></div>'+
			    '</div>'+
			    '<div class="frame">'+
				'<img src="'+src+'" style="height:100%;">'+
			    '</div>'+
			    
			'</div>'+
                  '</div>';
	$("body").append(chain);
	$(".closeFrame").click(function(){
	    hideReport();
	});
    };
    var hideReport = function(){
	$('.veil_report').remove();
	$('.modal_report').remove();
    }
    var buildMeasureTool=function(){
	var chain='<div class="measure_tool"></div>';
	$("#map").append(chain);
	$(".measure_tool").hide();
    };
    var addEventsToAdminWorkTeams=function(user){
	
	$("#admon_teamworks").click(function(){
	   	var params={
		    data:{
			title:'Grupos de trabajo',
			buttons:[
			    {label:'Base',event:function(id){
				$("#"+id).workTeams({data:{user:user}});
			    }}
			],
			firstActive:true,
			showbuttons:false
		    }
		};
	    $(this).customMenu(params);
	});
    }
    var addEventsToAdminUsers=function(user){
	var eventClear=function(){
	    $(".background_form").css('display','none');
	    $(".custom_search").css('display','none');
	}
	$("#admon_users").click(function(){
	    var status = false;
	    var enabled = $(this).attr('enabled');
	    var process = 'administration';
	    var text = 'Finalizar administraci&oacute;n de usuarios';
	    if (enabled=="false") {
		status= true;
		process='consult';
		text = 'Administraci&oacute;n de usuarios';
	    }
	    $('#admon_users .label').html(text);
	    $('.app_left_section_information,.app_left_section_notification,.app_left_section_layers,.app_left_section_years').hide();
	    $('.app_left_section').userbranch({process:process});
	    $(this).attr('enabled',status);
	    
	    
	    
	});
    }
    var updateListQuestionnaire = function(hideReplace){
        try {
            $(".app_bottom_section_questionnaire").reportsQuestionnaire('buildReport');
            if (hideReplace) {
            $(".app_bottom_section_universe_replace").hide();
            }
        } catch(e) {
            
        }
    };
    var updateListPredios = function(hideReplace){
        try {
            $(".app_bottom_section_predios").reports('buildReport');
            if (hideReplace) {
            $(".app_bottom_section_universe_replace").hide();
            }
        } catch(e) { }
        try {
            var display = $('.app_left_section_information').css('display');
            if ((display!="none")&&(display)) {
                $('.app_left_section_information').information('update');
            }
        }catch(e){}
    }  
    var updateUniverse = function(){
	try {
	    $(".app_bottom_section_universe").reportsUniverse('buildReport');
	} catch(e) {
	    
	}
    };
    var reloadPage=function(){
	amplify.store( 'dataLoggingAGAVE',null );
	location.reload();
    };
    var init = function(a){
	builStructure(a);
	events(a);
    };
    var loggedUser;
    return {
	    init:function(userActive){
		loggedUser = userActive;
		$( document ).ready(function() {
		    init(userActive);
		});
	    },
	    reloadPage:reloadPage,
	    getUsersRequest:getUsersRequest,
	    clearClockUserRequest:clearClockUserRequest,
	    showImage:showImage,
	    updateListPredios:updateListPredios,
	    updateUniverse:updateUniverse,
	    buildMap:buildMap,
	    logoutRequest:logoutRequest,
	    updateListQuestionnaire:updateListQuestionnaire
    }
    
});