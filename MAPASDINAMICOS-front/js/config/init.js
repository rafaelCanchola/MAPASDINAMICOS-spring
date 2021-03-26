/**
 * Configuración inicial para la carga de los archivos correspondientes al modulo config
 * @param {Object} paths - indica cada una de las rutas que emplea el modulo config
 */
requirejs.config({
    paths: {
        mappingConfig:'config/mapping',
        connections:'config/connections',
        version:'config/version',
        webmapservices:'config/webmapservices',
        restrictions:'config/restrictions',
        infofaces:'config/faces'
    }
});
/**
 * Carga cada uno de los archivos definidos el las rutas de carga considerando las dependencias
 */
define(["version","mappingConfig","connections","webmapservices","restrictions","infofaces"], function(){});
