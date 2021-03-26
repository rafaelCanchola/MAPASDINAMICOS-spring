/**
 * Permite el despliegue del map, la generacion de capas base, capas vectoriales, e invoca la generaci�n de poligonos, tracklogs y predios
 */
define(["Openlayers","connections","validator","mappingConfig","webmapservices","mappingControls","features","Alert"], function(Openlayers,connections,validator,mappingConfig,webmapservices,mappingControls,features,Alert){
    var dataUsers=null;
    var map;
    var baseLayers={};
    var overLays={};
    var activeBaseLayer;
    var vectorLayer;
    var featuresFile=[];
    var VtnModal = null;
    var VtnModalSelect = null;
    var Geometry=null;
    var mapProjection = 'EPSG:3857';
    var customControls=null;
    var userLoged=null;
    var actualUser=null;
    var mapEvents={
	wktToMercator:null,
	goPolygon:null
    };
    
    var defineRestictedExtent=function(newExtent){
	var config = mappingConfig;
        var cloneExtent = newExtent.clone();
        map.setOptions({restrictedExtent: cloneExtent.transform(config.displayProjection,mapProjection)});
    };
    var goExtent=function(newExtent){
	
	var config = mappingConfig;
        var cloneExtent = newExtent.clone();
	map.zoomToExtent(cloneExtent.transform(config.displayProjection,mapProjection));
    };
    var addBaseLayers = function(){
	var bases = webmapservices.bases;
	var layers=[];
	var ol=OpenLayers.Layer;
	for (var x in bases){ 
	    var layer = null;
	    var b = bases[x];
		switch (b.type) {
		    case  'Google':
			var params = b.data;
			params.type = eval(params.type);
			params.numZoomLevels=mappingConfig.zoomLevels;
			layer = new ol[b.type](x,params);
			break;
		    case 'Bing':
			var params = b.data;
			params.key=b.key;
			params.name=x;
			layer = new ol[b.type](params);
			break;
		    case 'OSM':
			layer = new ol[b.type](x);
			break;
		    case 'WMS':
			b.data.format = 'image/'+b.data.format;
			layer = new ol[b.type](b.label,b.path,b.data,{transitionEffect: 'resize',buffer:0});
			break;
		}
		layer.isBaseLayer=true;
		baseLayers[x]=layer;
		layers.push(layer);
	}
	map.addLayers(layers);
	activeBaseLayer=layers[3];
    };
    function initial(userActive){
	var config = mappingConfig;
	map = new OpenLayers.Map({
	    div: "map",
	    projection: new OpenLayers.Projection(mapProjection),
	    displayProjection: new OpenLayers.Projection(config.displayProjection),
	    controls:[
		    new OpenLayers.Control.Navigation({
			dragPanOptions: {
			    enableKinetic: true
			}
		    }),
		    new OpenLayers.Control.MousePosition({
			formatOutput: function(lonLat) {
			    var response = transformToUtm (lonLat.lon,lonLat.lat);
			    var newHtml = 
			    response.lon.toFixed(6)+
			    this.separator+
			    response.lat.toFixed(6)+' '+
			    'zona '+response.zone+
			    ' '+response.side;
			    return newHtml;
			}
		    }),
		    new OpenLayers.Control.ScaleLine()
	    ],
	    numZoomLevels: config.zoomLevels,
	    eventListeners:eventsMap()
	});
	var extent = new OpenLayers.Bounds(config.extent.lon[0],config.extent.lon[1], config.extent.lat[0],config.extent.lat[1]);
	defineRestictedExtent(extent);
	
	addBaseLayers();
	addOverlays();
	goExtent(extent);
	addCustomControls(userActive);
	features.init(map,userActive,mapEvents,userLoged);
	map.zoomTo(5);
    }
    var transformToUtm = function(lon,lat){
            var response = {lon:0,lat:0,zone:''};
            var xy = new Array(2);
            var zone = Math.floor ((lon + 180.0) / 6) + 1
            zone = LatLonToUTMXY (DegToRad (lat), DegToRad (lon), zone, xy);
            response.lon = xy[0],
            response.lat = xy[1];
            response.zone = zone;
            if (lat < 0)
                response.side = 'S';
            else
                response.side = 'N';
            return response;

    }
    var eventsMap = function(){
        
        var listeners = {
                
                "moveend": function(){
                    features.loadPredios();
                },
                "move":function(){
		    features.hidePredios();
                    
                },
                "zoomend": function(){
                    features.loadPredios();
                },
                "mousemove":function(e){
                    
                },
                "updatesize":function(){
                    
                }
            }
        return listeners;
    
    }
    var addCustomControls = function(userActive){
	customControls=mappingControls.getCustomControls(map,mapEvents);
	for(x in customControls) {
                map.addControl(customControls[x]);
        }
	mappingControls.setControls(customControls);

    }
    /*
    function transform(lon,lat){
	var proj = new OpenLayers.Projection("EPSG:32614");
	var point = new OpenLayers.LonLat(lon,lat).transform(proj,map.getProjectionObject());
	return {lon:point.lon,lat:point.lat};
    }
    */
    var activeControl = function(p){
	    $("#map").css('cursor','auto');
            p.control = (p.control=='none')?'none':p.control;
            for(x in customControls) {
                var control = customControls[x];
                if(p.control == x && p.active) {
		    if ((p.control!='squareSelector')||(p.control=='none')) {
			var action = $(".tool_selected").attr('action')
			$(".tool_selected .template_assignCharge").removeClass('deleteTool').removeClass('addTool');
                        $(".tool_selected .template_assignCharge").removeClass('deleteTool_active').removeClass('addTool_active');
			var classToSend = 'deleteTool';
			if (action=='add') {
			    classToSend = 'addTool';
			}
			$(".tool_selected .template_assignCharge").addClass(classToSend);
			$(".tool_selected").attr('active','false');
		    }
		    if ((p.control=='zoomIn')||(p.control=='zoomOut')) {
			$("#map").css('cursor','crosshair');
		    }
                    control.activate();
                } else {
                    control.deactivate();
                }   
            }
	    if ((p.control=='measureDistance')||(p.control=='measureArea')) {
		if (p.active) {
		   $(".measure_tool").show();
		   if (p.control=='measureDistance') {
			$(".measure_tool").html('Distancia :0');
		   }else{
			$(".measure_tool").html('&Aacute;rea :0');
		   }
		}else{
		    $(".measure_tool").hide();
		}
		
	    }else{
		$(".measure_tool").hide();
	    }
	    switch (p.control) {
		case 'extent':
		    locateExtent();
		    break;
		case 'print':
		    print('map');
		    break;
		case 'search':
		     var params={
				userActive:userLoged,
				data:{
					type:'search',
					feature:'point',
					title:'Busqueda',
					showPrev:false,
					ids:null
				}
			};
			$('.app_left_section_information').information(params);
		    break;
	    }
    };
    var wktToGepraphic =function(wkt){
	var config = mappingConfig;
	var response = getFeatureFromWKT(wkt);
	var wktMercator='';
	if (response.valid) {
	    var f = response.features[x];
	    var g = f.geometry.transform(mapProjection,config.displayProjection);
	    wktMercator = g+'';
	}
	return wktMercator;
    };
    mapEvents.wktToMercator = wktToGepraphic;
    var goPoint = function(wkt){
	var response = getFeatureFromWKT(wkt);
	var config = mappingConfig;
	if (response.valid) {
	    var f = response.features[0].geometry;
	    var lon =f.x;
	    var lat = f.y;
	    var punto = new OpenLayers.LonLat(lon,lat).transform(config.displayProjection,mapProjection);
	    map.setCenter(punto,18);
	}
	
    };
    var goPolygon = function(wkt){
	var response = getFeatureFromWKT(wkt);
	var config = mappingConfig;
	if (response.valid) {
	    var bounds=response.bounds.clone();
            map.zoomToExtent(bounds.transform(config.displayProjection,mapProjection));
	}
	
    };
    var goPolygon = function(wkt){
	var response = getFeatureFromWKT(wkt);
	var config = mappingConfig;
	if (response.valid) {
	    var bounds=response.bounds.clone();
            map.zoomToExtent(bounds.transform(config.displayProjection,mapProjection));
	}
	
    };
    mapEvents.goPolygon = goPolygon;
    var print=function(divName){
	$(".app_right_section").css('left','0px');
	$(".app_map_section").css('right','0px');
	//map.updateSize();
	window.print();
	$(".app_right_section").css('left','300px');
	$(".app_map_section").css('right','40px');
	//map.updateSize();
	/*
                    var printContents = document.getElementById(divName).innerHTML;
                    var originalContents = document.body.innerHTML;
                    document.body.innerHTML = printContents;
                    window.print();
                    document.body.innerHTML = originalContents;
                    */
                    
    };
    var locateExtent = function(){
	var config = mappingConfig;
	var extent = new OpenLayers.Bounds(config.extent.lon[0],config.extent.lon[1], config.extent.lat[0],config.extent.lat[1]);
	goExtent(extent);
	map.zoomTo(5);
    }
    var getLayer = function(l){
        var layer = (baseLayers[l])?baseLayers[l]:null;
	if (!layer) {
	    layer = (overLays[l])?overLays[l]:null;
	}
	return layer;
    };
    var getActiveBaseLayer = function(){
	return activeBaseLayer;
    };
    var setBaseLayer = function(name){
        var layer = getLayer(name);
        if(layer){
	    activeBaseLayer=layer;
            map.setBaseLayer(layer);
        }
    };
    var activeLayers = function(data){
	for(var x in data){
	    setParams(data[x]);
	}
	
    }
    var setParams = function(p){
        var layer = getLayer(p.layer);
        if(layer){
            var status = true;
            if(p.params.layers!=''){
		    if (layer.Reproject) {
			layer.layers=p.params.layers;
		    }
		    p.params['signature'] = ""+ Math.floor(Math.random()*11) + (Math.floor(Math.random()*101));
		    layer.mergeNewParams(p.params);
            }else{
                status=false;
            }
            layer.setVisibility(status);
        }
    };
    var addOverlays = function(){
	var groups = webmapservices.overlays;
	var layers=[];
	for(var x in groups){
	    var g = groups[x];
	    var layer = getOverlay(g,x);
	    layer.isBaseLayer=false;
	    overLays[x]=layer;
	    layers.push(layer);
	}
	map.addLayers(layers);
    };
    
    var getLayersFromOverlay = function(l){
	var layers =[];
	for(var x in l){
	    if (l[x].active) {
		layers.push(x+'');
	    }
	}
	return layers.join(',');
    }
    var updateSize=function(){
	map.updateSize();
    }
    var getOverlay = function(group,name){
	    var reproject = (group.projection==mapProjection)?false:true;
	    var layer = null;
	    var format = ((group.format)?group.format:'png');
	    var layers = getLayersFromOverlay(group.layers);
	    var opacity = ((group.opacity)?group.opacity:1);
	    var singleTile = ((group.tiled)?group.tiled:false);
	    if(reproject){
                    var bounds;
                    layer = new OpenLayers.Layer.TMS(name, group.path,
                                                {
                                                 layers: layers,
                                                 format: 'image/'+format,
                                                 type: format,
                                                 getURL: (singleTile)?getWmsRequestTiled:getWmsRequest,
                                                 opacity: opacity,
                                                 singleTile: singleTile,
                                                 deltaX: 0,
                                                 deltaY: 0
                                                },{
                                                 transitionEffect: 'resize',
                                                 buffer:0
                                                }
                                    );
                    layer['Reproject']=group.projection;
            }else{
                    layer = new OpenLayers.Layer[group.type]( name,group.path,{layers: layers,format:'image/'+format},{opacity:opacity,singleTile: singleTile,buffer:0,ratio:1} );
            }
	    if (layers=='') {
		layer.setVisibility(false);
	    }
	    return layer;
    
    };
    var getFeatureFromWKT = function(){
        var a = arguments;
        var projection = new OpenLayers.Projection(mappingConfig.displayProjection);
        var f = new OpenLayers.Format.WKT(projection).read(a[0]);
        var b;
        var v = false;
        if(f){
                if(f.constructor != Array) {
                    f = [f];
                }
                for(x in f){
                    if (!b) {
                        b = f[x].geometry.getBounds();
                    } else {
                        b.extend(f[x].geometry.getBounds());
                    }
                }
                v = true;
        }
        return {features:f,valid:v,bounds:b};
    };
    var getWmsRequest = function(bounds,srs) {
            
          // recalculate bounds from Google to WGS
            var proj = new OpenLayers.Projection(this.Reproject);
	    var auxBounds =  $.extend({}, bounds);
            bounds.transform(map.getProjectionObject(), proj);
	    var coordinates=null;
          // this is not necessary for most servers display overlay correctly,
          //but in my case the WMS  has been slightly shifted, so I had to correct this with this delta shift
          
            bounds.left += this.deltaX;
            bounds.right += this.deltaX;
            bounds.top += this.deltaY;
            bounds.bottom += this.deltaY;
	    
	    coordinates =(bounds.bottom<1)?auxBounds:bounds;
          
            var url = this.url;
            url += "&REQUEST=GetMap";
            url += "&SERVICE=WMS";
            url += "&VERSION=1.1.1";
            url += "&LAYERS=" + this.layers;
            url += "&FORMAT=" + this.format;
            url += "&TRANSPARENT=TRUE";
            url += "&SRS=" + "EPSG:4326";
            url += "&BBOX=" + coordinates.toBBOX();
            url += "&WIDTH=" + this.tileSize.w;
            url += "&HEIGHT=" + this.tileSize.h;
            return url;
        
    }
    var getWmsRequestTiled = function(bounds,srs) {
	
	    var proj = new OpenLayers.Projection(this.Reproject);
	    var auxBounds =  $.extend({}, bounds);
            bounds.transform(map.getProjectionObject(), proj);
	    var coordinates=null;
          
          // this is not necessary for most servers display overlay correctly,
          //but in my case the WMS  has been slightly shifted, so I had to correct this with this delta shift
            
            //coordinates =(.bottom<1)?auxBounds:bounds;
            
            var fixed = {
                        '5':0.815,
                        '6':0.19,//1.7
                        '7':0,
                        '8':0
            }
            var deltaY = 0;
            
            deltaY=0;
            //console.log("es " +  deltaY);
            bounds.left += this.deltaX;
            bounds.right += this.deltaX;
            bounds.top += deltaY; //this.deltaY;
            bounds.bottom += deltaY; //this.deltaY;
          
                      //construct WMS request
            //var r2 = map.baseLayer.getExtent();
            //var r= r2.clone();
            //r.transform(mercator,geographic);

           
            var url = this.url;
            url += "&REQUEST=GetMap";
            url += "&SERVICE=WMS";
            url += "&VERSION=1.1.1";
            url += "&LAYERS=" + this.layers;
            url += "&FORMAT=" + this.format;
            url += "&TRANSPARENT=TRUE";
            url += "&SRS=" + "EPSG:4326";
            url += "&BBOX=" + auxBounds.left+","+auxBounds.bottom+","+auxBounds.right+","+auxBounds.top;//r.left+","+r.bottom+","+r.right+","+r.top;
            
            //url += "&BBOX=" + cloneExtentMap.left+","+cloneExtentMap.bottom+","+cloneExtentMap.right+","+cloneExtentMap.top;
            url += "&WIDTH=" + this.tileSize.w;
            url += "&HEIGHT=" + this.tileSize.h;
            return url;

    }
    var getTotalFeaturesSelected = function(wkt){
        var response = getFeatureFromWKT(wkt);
        var F = response.features[0];
        var predios = features.get();
        var total = 0;
        var assigned = 0;
        var notAssigned = 0;
        var referenceAssigned = [2,4,5];
        var referenceNotAssigned = [1]
        for(var x in predios){
            var f = predios[x];
            if (f.cluster) {
                for(var y in f.cluster){
                    var i = f.cluster[y];
                    var p = new OpenLayers.Geometry.Point(i.geometry.x, i.geometry.y);
                    if (F.geometry.intersects(p)) {
                        if (referenceNotAssigned.indexOf(i.info.statusbk)!=-1) {
                            notAssigned+=1;
                        }
                        if (referenceAssigned.indexOf(i.info.statusbk)!=-1) {
                            assigned+=1;
                        }
                    }
                }
            }
        }
        return {assigned:assigned,notAssigned:notAssigned};
    }
    return {
	    init:function(userActive){
		actualUser = userActive;
		userLoged = $.extend( {}, userActive );
		initial(userActive);
	    },
	    setBaseLayer:setBaseLayer,
	    getActiveBaseLayer:getActiveBaseLayer,
	    activeLayers:activeLayers,
	    activeControl:activeControl,
	    goPoint:goPoint,
	    goPolygon:goPolygon,
	    wktToMercator:wktToGepraphic,
	    updateSize:updateSize,
        getTotalFeaturesSelected:getTotalFeaturesSelected
    }
    
});