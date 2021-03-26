requirejs.config({
    paths: {
        Openlayers:'libs/Openlayers/OpenLayers',
        jquery:'libs/jquery/jquery',
        jqueryui:'libs/jquery/jquery-ui',
	fileupload_transport:'libs/upload/jquery.iframe-transport',
	fileupload:'libs/upload/jquery.fileupload',
	fileupload_widget:'libs/upload/jquery.ui.widget',
	highcharts:'libs/highcharts/highcharts',
	amplify:'libs/amplify/amplify',
	highmaps:'libs/highcharts/map',
	mouseweel:'libs/mouseweel/jquery.mousewheel-3.0.6.pack',
	fancybox:'libs/fancybox/jquery.fancybox'
    },
    waitSeconds: 0,
    shim: {
	
	fileupload:{
	    deps:['fileupload_transport']  
	},
	fileupload_transport:{
	    deps:['fileupload_widget']  
	},
        Openlayers: {
            deps:['jqueryui']
        },
        jqueryui:{
            deps:['highmaps']
        },
	highmaps:{
	    deps:['highcharts']
	},
	highcharts:{
            deps:['fancybox']
        },
	fancybox:{
	    deps:['mouseweel']
	},
	mouseweel:{
	    deps:['amplify']
	},
	amplify:{
            deps:['jquery']
        }
    }
});

define(["Openlayers","fileupload"], function(){
            var v = 'version='+projectVersion;
            $.when(
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/libs/jquery/jquery-ui.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'css/structure.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'css/map.css?'+v}).appendTo('head'),
            $('<link>', {rel: 'stylesheet',type: 'text/css',href:'css/loging.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'css/form.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'css/Alert.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/menuUsers/menuUsers.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/search/search.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/customMenu/customMenu.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/baseLayers/baseLayers.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/faces/faces.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/overlays/overlays.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/tools/tools.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/workTeams/workTeams.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/userbranch/userbranch.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/notification/notification.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/assignCharge/assignCharge.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/information/information.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/actions/actions.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/legend/legend.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/deliveredCharge/deliveredCharge.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/layers/layers.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/upload/upload.css?'+v}).appendTo('head'),
            $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/progress/progress.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/libs/fancybox/jquery.fancybox.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/reports/reports.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/years/years.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/formExercise/formExercise.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/actionYears/actionYears.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/download/download.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/reportsUniverse/reportsUniverse.css?'+v}).appendTo('head'),
            $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/reportsQuestionnaire/reportsQuestionnaire.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/textArea/textArea.css?'+v}).appendTo('head'),
		    $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/deleteCharge/deleteCharge.css?'+v}).appendTo('head'),
            $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/widgets/formQuestionnaire/formQuestionnaire.css?'+v}).appendTo('head'),
		    $.Deferred(function( deferred ){
			$( deferred.resolve );
		    })
		).done(function(){
	    });
});
