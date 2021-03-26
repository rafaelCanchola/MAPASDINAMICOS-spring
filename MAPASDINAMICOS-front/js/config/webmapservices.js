/**
 * Definici�n de las capas bases y capas vectoriales que empleara el mapa
 * @returns {Object} regresa un objeto con cada una de las capas base y capas vectoriales
 * @param {Object} bases - corresponde a un objeto con cada una de las capas base, su ruta de acceso, formato de imagen y capas a encender
 * @param {Object} overlays - corresponde a un objeto con cada una de las capas vectoriales, su ruta de acceso, formato de imagen y capas a encender
 */
define([], function(){
        return {
            bases:{
                
               
                b1:{
                        type:'WMS',
                        label:'Base Vector',
                        path:'http://187.191.53.158/cgi-bin/mapserv?map=/var/www/maps/siisec.map',
                        img:'vectorial.png',
                        data:{
                                layers:'mares2',
                                format:'jpeg'
                        }
                        
                        
                },
                b2:{
                        type:'Bing',
                        label:'Bing Maps',
                        img:'bing.png',
                        key:'At-Y-dJe-yHOoSMPmSuTJD5rRE_oltqeTmSYpMrLLYv-ni4moE-Fe1y8OWiNwZVT',
                        data:{
                                type: "Aerial"
                        }
                },
                /*
                b3:{
                        type:'OSM',
                        label:'Open Street Map',
                        img:'osm.png'
                },
                */
                b3:{
                        type:'WMS',
                        label:'ERMEX/SIAP',
                        path:'http://187.191.14.5/ermex2/XIV_CNv1.exe',
                        img:'ermex.png',
                        data:{
                                layers:'ORTOIMAXIV',
                                format:'png'
                        }
                        
                        
                },
                b4:{
                        type:'Google',
                        label:'Google maps',
                        img:'google.png',
                        data:{
                                type: "google.maps.MapTypeId.SATELLITE"
                        }
                },
                b5:{
                        type:'WMS',
                        label:'ERMEX RESOLUCION',
                        path:'http://187.191.53.158/cgi-bin/mapserv?map=/var/www/maps/siisec.map',
                        img:'ermex_resolucion.png',
                        data:{
                                layers:'mares2',
                                format:'jpeg'
                        }
                        
                        
                }
                
            },
            overlays:{
                g1:{
                        label:'Capas de Referencia',
                        path:'http://187.191.53.158/cgi-bin/mapserv?map=/var/www/maps/siisec.map',
                        type:'WMS',
                        projection:'EPSG:3857',
                        tiled:true,
                        layers:{
                                municipios_bienestar:{
                                        label:'Municipios',
                                        active:true
                                },
                                municipios_bienestar_textos:{
                                        label:'Municipios (etiquetas)',
                                        active:false
                                },
                                estados_bienestar:{
                                        label:'Estados',
                                        active:true
                                },
                                estados_bienestar_textos:{
                                        label:'Estados (etiquetas)',
                                        active:true
                                },
                                zonasutm_google:{
                                        label:'Zonas UTM',
                                        active:true
                                },
                                textosutm_google:{
                                        label:'Zonas UTM (etiquetas)',
                                        active:true
                                },
                                limites_costeros:{
                                        label:'Limites costeros',
                                        active:false
                                }
                        }                        
                }                
            }
        }
});