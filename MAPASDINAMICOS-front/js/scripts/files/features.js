/**
 * Ejecuta el modulo features mediante el cual se admnistran los poligonos correspondientes a cada predio entregado, los tracklogs asociados a cada predio, asi como todos los predios y su representaci�n
 */
define(["Openlayers","connections","validator","mappingConfig"], function(Openlayers,connections,validator,mappingConfig){
    
    var Map=null;
    var mapEvents = null;
    var dataPredios=null;
    var userLoged=null;
    var dataPolygons=null;
    var polygonSelected=null;
    var activeUser =null;
    var strategy;
    var mapProjection = 'EPSG:900913';
    var Predios=null;
    var Polygons=null;
    var Tracklog=null;
    var dataSelected=null;
    var ctlSelectPredio=null;
 /**
 * Permite agregar la capa poligonos
 */
    var addLayerPolygons = function(){
	
	var style = new OpenLayers.Style({
                    pointRadius: 4,
                    fillColor: "${color}",
		    bkColor:"${color}",
                    fillOpacity:"${opacity}",
                    strokeColor: "#fff",
                    strokeWidth: 2,
                    strokeOpacity: 0.8,
		    //label : "${name}",
		    fontColor:"#fff"
                }, {
                    context: {
			color:function(feature){
			    var color='';
			    switch (feature.info.type) {
				case 'polygon':
				    color='#00264B';
				    break;
				case 'line':
				    break;
				case 'point':
				    break;
			    }
			    if (feature.info.active) {
				color="#006BA7";
			    }
			    
			    return color;
			},
			opacity:function(feature){
			    var opacity=0.5;
			    return opacity;
			}
			
                    }
        });
        
        Polygons = new OpenLayers.Layer.Vector("Polygons", {
                    styleMap: new OpenLayers.StyleMap({
                        "default": style,
                        "select": {
                            fillColor: "#8aeeef",
                            strokeColor: "#32a8a9"
                        }
                    })
        });
        Map.addLayers([Polygons]);
    };
 /**
 * Agrega un tracklog empleando un estilo definido
 */
    var addLayerTracklog = function(){
	
	var style = new OpenLayers.Style({
                    pointRadius: 4,
                    fillColor: "#006BA7",
                    fillOpacity:1,
                    strokeColor: "#006BA7",
                    strokeWidth: 2,
                    strokeOpacity: 1,
		    externalGraphic: "${image}",
                    graphicWidth: 28,
                    graphicHeight: 35,
		    graphicYOffset:-35,
		    graphicXOffset:-6,
		    //label : "${name}",
		    fontColor:"#fff"
                }, {
                    context: {
			image:function(feature){
			    var Image='';
			    switch (feature.info.type) {
				case 'point':
				    Image = (feature.info.image==1)?'img/marker/start.png':'img/marker/end.png';
				    break;
			    }
			    return Image;
			}
                    }
        });
        
        Tracklog = new OpenLayers.Layer.Vector("Tracklog", {
                    styleMap: new OpenLayers.StyleMap({
                        "default": style,
                        "select": {
                            fillColor: "#8aeeef",
                            strokeColor: "#32a8a9"
                        }
                    })
        });
        Map.addLayers([Tracklog]);
    };
    /**
    * Permite eliminar cada un de los features asociados a la capa poligonos
    */
    var clearPolygons=function(){
	dataPolygons = {};
	Polygons.removeFeatures(Polygons.features);
    };
    /**
    * Permite eliminar cada uno de los features asociados a un tracklog
    */
    var clearTracklog=function(){
	Tracklog.removeFeatures(Tracklog.features);
    };
    /**
    * Deselecciona un poligono activo
    */
    var unselectPolygon = function(){
	if (polygonSelected) {
	    polygonSelected.info.active=false;
	}
	Polygons.redraw();
    };
    /**
    * Selecciona un determinado poligono
    * @param {string} id - comprende el id del poligono que se desea seleccionar
    */
    var selectPolygon = function(id){
	if (polygonSelected) {
	    polygonSelected.info.active=false;
	}
	if (dataPolygons['Poly'+id+'i']) {
		polygonSelected = dataPolygons['Poly'+id+'i'];
		polygonSelected.info.active=true;
	}
	Polygons.redraw();
    };
    /**
    * Permite agregar la capa donde se crearan cada fature asociada a un tracklog
    */
    var addTracklogs = function(data){
	var features = [];
	var points = [];
	var flags=[];
	clearTracklog();
	var tipo =0;
	for(var x in data){
		var i = data[x];
		i.type='point';
		i.active=false;
		var f = new OpenLayers.Format.WKT('EPSG:4326').read(i.wkt);
		f.geometry = f.geometry.transform('EPSG:4326','EPSG:900913');
		points.push(new OpenLayers.Geometry.Point(f.geometry.x,f.geometry.y));
		if ((x==0)||(x==(data.length-1))) {
		    tipo+=1;
		    i.image=tipo+0;
		    f['info']=i;
		    flags.push(f);
		}
	}
	var line = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(points));
	line['info']={type:'line'};
	Tracklog.addFeatures([line]);
	Tracklog.addFeatures(flags);
	Tracklog.setVisibility(true);

    }
    /**
    * Permite agregar un grupo de poligonos tomando como base una respuesta
    * @param {object} data - comprende un conjunto de features a insertar
    */
    var addPolygons = function(data){
	var features = [];
	clearPolygons();
	for(var x in data){
		var i = data[x];
		i.type='polygon';
		i.active=false;
        try {
            var f = new OpenLayers.Format.WKT('EPSG:4326').read(i.wkt);
            f.geometry = f.geometry.transform('EPSG:4326','EPSG:900913');
            f['info']=i;
            dataPolygons['Poly'+i.id+'i']=f;
            features.push(f);
        } catch(e) {
        
        }
			    
	}
	Polygons.setVisibility(true);
	Polygons.addFeatures(features);
    }
    var addLayerPredios = function(){
		var style = new OpenLayers.Style({
                    pointRadius: "${radius}",
                    fillColor: "${color}",
		    bkColor:"${color}",
                    fillOpacity: 1,
                    strokeColor: "#fff",
                    strokeWidth: "${width}",
                    strokeOpacity: 0.8,
		    label : "${name}",
		    graphicName:"${graphic}",
		    fontColor:"#fff"
                }, {
                    context: {
			name:function(feature){
			    var name='';
			    if(feature.cluster) {
				if (feature.cluster.length>1) {
				    name = feature.attributes.count;
				}
                            }
                            return name
			},
			color:function(feature){
			    var color='#cc6633';
			    if (feature.cluster.length==1) {
				color = validator.getColorStatus(feature.cluster[0].info.status);
			    }
			    return color;
			},
                        width: function(feature) {
                            return (feature.cluster) ? 2 : 1;
                        },
                        radius: function(feature) {
                            var pix = 10;
                            if(feature.cluster) {
                                pix = Math.min(feature.attributes.count, 7) + 4;
                            }
                            return pix;
                        },
			graphic:function(feature){
			    var graphic='circle';
			    if (feature.cluster.length==1) {
				switch (feature.cluster[0].info.type) {
				    case 'upa':
				    case 'inexistente':
					graphic='triangle';
				    break;
				}
				//graphic = 'triangle';
			    }
			    return graphic;
			}
                    }
                });
                
                strategy = new OpenLayers.Strategy.Cluster();

                Predios = new OpenLayers.Layer.Vector("Clusters", {
                    strategies: [strategy],
                    styleMap: new OpenLayers.StyleMap({
                        "default": style,
                        "select": {
                            fillColor: "#8aeeef",
                            strokeColor: "#32a8a9"
                        }
                    })
                });
                Map.addLayers([Predios]);
		
		ctlSelectPredio = new OpenLayers.Control.SelectFeature(
                            [Predios,Polygons],
                            {
                                clickout: true,
                                toggle: false,
                                multiple: false,
                                hover: false,
                                box: false
                            }
                        );
		
                Map.addControl(ctlSelectPredio);
		ctlSelectPredio.activate();
		//Layer.events.on({"featureclick": showInfoFeature});

                
		
		Predios.events.on({
		    "featureselected": function(e) {
                        
			showInfoFeature(e.feature);
		    }
		});
		Polygons.events.on({
		    "featureselected": function(e) {
			showInfoPolygon(e.feature);
		    }
		});
    };
    var setVisivility=function(label,status){
	var layer=(label=='Predios')?Predios:Polygons;
	layer.setVisibility(status);
    };
    var addPredios = function(data){
	amplify.publish( "setDataSelected");
	var features = [];
	dataPredios = {};
	for(var x in data){
		var i = data[x];
		var f = new OpenLayers.Format.WKT('EPSG:3857').read(i.the_geom);

		f['info']=i;
		f['info'].statusbk= i.poligono.idcultivo;
		f['info'].status = ((dataSelected)&&(dataSelected['item'+i.id]))?6:i.status;

		dataPredios['P'+i.id+'i']=f;

		features.push(f);
	    
	}
	Predios.setVisibility(true);
	Predios.removeFeatures(Predios.features);
	Predios.addFeatures(features);
	selectFeature();
    }
    
    var updatePredios = function(data){
	for(var x in data){
		var i = data[x];
		dataPredios['P'+i.id+'i'].info.status = i.status;
	}
	Predios.redraw();
    }
    var getFeatures = function(){
        return Predios.features;
    }
    var showInfoPolygon = function(feature){
	var field='fol_predio';
	var params={
		    userActive:activeUser,
		    userLoged:userLoged,
		    data:{
			    type:'identify',
			    feature:'polygon',
                            title:'Informaci&oacute;n detallada',
                            showPrev:false,
                            ids:null
		    }
	    };
	params.data.ids = feature.info[field];
	
	$('.app_left_section_information').information(params);
    }
    var showInfoFeature = function(feature){
	var field='id';
	var params={
		    data:{
			    type:'identify',
			    feature:'point',
                            title:'Informaci&oacute;n detallada',
                            showPrev:false,
                            ids:null
		    }
	    };
	if (feature.cluster.length>1) {
	    field='fol_predio';
	    params={
		    userActive:activeUser,
		    data:{
			    type:'search',
			    feature:'point',
                            title:'Busqueda',
                            showPrev:false,
                            ids:null
		    }
	    };
	}
	var array = [];
	for(var x in feature.cluster){
	    array.push(feature.cluster[x].info[field]);
	}
	
	var ids = array.join(',');
	params.data.ids = ids;
	params.userActive = activeUser;
	$('.app_left_section_information').information(params);
    }
    var showMessage = function(msg){
	
    }
	var requestPredios = function(params,type) {
		var msg = 'Servicio no disponible intente m&aacute;s tarde'
		var r= {
			statusCode:{
				200: function (json,estatus){
					addPredios(json);
				},
				400: function(){
					showMessage(msg);
				},
				403: function (){
					showMessage('No hay información disponible');
				}
			},
		};
		r = $.extend(r, connections.features.getPredios);
		r.data = params;
		$.ajax(r);
    }

		var request = function(params,type){
	    var clase='hidden';
	    var msg = 'Servicio no disponible intente m&aacute;s tarde'
	    var r= {
		    success:function(json,estatus){
			var valid=false;
			
			if (json){
			    if (json.response.sucessfull){
				valid=true;
				switch (type) {
				    case 'predios':
					addPredios(json.data.features);
					break;
				    case 'polygons':
					addPolygons(json.data.features);
					break;
				    case 'tracklogs':
					addTracklogs(json.data.features);
					break;
				}
			    }else{
				msg=json.response.message;
			    }
			}
			if (!valid) {
			    showMessage(msg);
			}
			
		    },
		    beforeSend: function(solicitudAJAX) {
			
		    },
		    error: function(solicitudAJAX,errorDescripcion,errorExcepcion) {
			showMessage(msg);
		    },
		    complete: function(solicitudAJAX,estatus) {
			
		    }
		    };
		    switch (type) {
				    case 'predios':
					r = $.extend(r, connections.features.getPredios);
					break;
				    case 'polygons':
					r = $.extend(r, connections.features.getPolygons);
					break;
				    case 'tracklogs':
					r = $.extend(r, connections.tracklog.getTracklog);
					break;
		    }
	    
	    r.data = params;
	    $.ajax(r);
    };
    var clockPredios=null;
    var defineClockPredios = function(){
	clearClockPredios();
	clockPredios = setInterval(function(){
	    loadPredios();
	    },120000);
    }
    var clearClockPredios=function(){
	if (clockPredios) {
	    clearInterval(clockPredios);
	}
    }
    var loadTracklog = function(folio){
	var obj = this;
	request({action:'get',folio:folio,currentyear:activeUser.currentyear},'tracklogs');
    }
    var loadPolygons = function(){
	var config = mappingConfig;
        var e= Map.getExtent();
	var punto = new OpenLayers.LonLat(e.left,e.bottom).transform(mapProjection,config.displayProjection);
	var punto2 = new OpenLayers.LonLat(e.right,e.top).transform(mapProjection,config.displayProjection);
	try {
	    var filter = $(".app_bottom_section_predios").reports('getFilter');
	} catch(e) {
	    var filter = "";
	}
	filter = (typeof filter === 'object')?'':filter;
	request({action:'get',filter:filter,user:activeUser.id,xmin:punto.lon, xmax:punto2.lon, ymin:punto.lat, ymax:punto2.lat,currentyear:activeUser.currentyear,useractive:userLoged.id},'polygons');
    }
    var loadPredios = function(){
	
	var config = mappingConfig;
        var e= Map.getExtent();
	var punto = new OpenLayers.LonLat(e.left,e.bottom)//.transform(mapProjection,config.displayProjection);
	var punto2 = new OpenLayers.LonLat(e.right,e.top)//.transform(mapProjection,config.displayProjection);
	
	try {
	    var filter = $(".app_bottom_section_predios").reports('getFilter');
	} catch(e) {
	    var filter = "";
	}
	filter = (typeof filter === 'object')?'':filter;
	requestPredios({filter:filter,user:activeUser.id,xmin:punto.lon, xmax:punto2.lon, ymin:punto.lat, ymax:punto2.lat},'predios');
	//request({filter:filter,user:activeUser.id,xmin:punto.lon, xmax:punto2.lon, ymin:punto.lat, ymax:punto2.lat},'predios');
    }
    var clockPrediosForMap = null;
    
    var defineClockPrediosForMap = function(user){
	if (user) {
	    activeUser = user;
	}
	clearClockPrediosForMap();
	clockPrediosForMap = setTimeout(function(){
	    loadPredios();
	    loadPolygons();
	    defineClockPredios();
	    },1000);
    }
    var clearClockPrediosForMap=function(){
	if (clockPrediosForMap) {
	    clearTimeout(clockPrediosForMap);
	}
	hidePredios();
	hidePolygons();
    }
    var hidePredios = function(){
	if (Predios!=null) {
	    Predios.setVisibility(false);
	}
	
    }
    var hidePolygons = function(){
	if (Polygons!=null) {
	    Polygons.setVisibility(false);
	}
	
    }
    var selectPredios = function(predios){
	
	for(var x in predios){
	    var i = predios[x];
	    if (dataPredios['P'+i.id+'i']) {
		dataPredios['P'+i.id+'i'].info.status = 6;
	    }
	}
	Predios.redraw();
    }
    var unSelectPredios = function(predios){
	for(var x in predios){
	    var i = predios[x];
	    if (dataPredios['P'+i.id+'i']) {
		dataPredios['P'+i.id+'i'].info.status = (dataPredios['P'+i.id+'i'].info.statusbk)+0;
	    }
	    
	}
	Predios.redraw();
    }
    var setDataSelected = function(a){
	dataSelected = a;
    }
    var idFeatureToSelect=null;
    var storeFeatureToSelect=function(id){
	idFeatureToSelect=id;
    }
    var selectFeature = function(){
	if (idFeatureToSelect!=null) {
	    var feature = null;
	    for(var x in Predios.features){
		var f = Predios.features[x].cluster[0];
		if (f.info.id==idFeatureToSelect) {
		    feature = Predios.features[x];
		    break;
		}
	    }
	    if (feature!=null) {
		ctlSelectPredio.highlight(feature);
		idFeatureToSelect = null;
	    }
	}
    }
    return {
	    init:function(map,user,events,userloged){
		Map=map;
		mapEvents=events;
		userLoged = userloged;
		activeUser=user;
		addLayerPolygons();
		addLayerPredios();
		addLayerTracklog();
		loadPredios();
		//defineClockPredios();
	    },
	    load:loadPredios,
	    loadPredios:function(user){
		defineClockPrediosForMap(user);
	    },
	    updatePredios:function(){
		defineClockPredios();
		loadPredios();
		loadPolygons();
		
	    },
	    hidePredios:hidePredios,
	    loadPolygons:function(){},//addPolygons,
	    clearPolygons:clearPolygons,
	    selectPolygon:selectPolygon,
	    unselectPolygon:unselectPolygon,
	    selectPredios:selectPredios,
	    unSelectPredios:unSelectPredios,
	    setDataSelected:setDataSelected,
	    setVisivility:setVisivility,
	    loadTracklog:loadTracklog,
	    clearTracklog:clearTracklog,
	    selectFeature:storeFeatureToSelect,
        get:getFeatures
    }
    
});