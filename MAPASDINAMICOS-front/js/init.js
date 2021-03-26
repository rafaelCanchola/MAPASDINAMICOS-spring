/**
 * Configuración inicial para la carga de los archivos del modulo config
 * @param {string} urlArgs - indica que no espere para la carga de un archivo
 * @param {string} baseUrl - indica la ruta de descarga para el modulo config
 * @param {int} waitSeconds - indica que no espere para la carga de un archivo
 * @param {Object} paths - indica la ruta de descarga para el modulo config
 */
requirejs.config({
            urlArgs: "version=" + (new Date()).getTime(),
            baseUrl: 'js/',
            waitSeconds: 0,
            paths: {
		config:'config/init'
	    }
    });
/**
 * Carga del modulo config para el cual se requiere una configuración posterior para cargar los modulos lib y scripts
 */    
require(['config'],function () {
	    var v = 'version='+projectVersion;
	    requirejs.config({
			urlArgs: v,
			paths: {
                                    libs:'libs/init',
				    scripts:'scripts/init'
			},
			shim: {
				    scripts:{
					deps:['libs']   
				    }
			}
	    });
	    require(['scripts'],function (scripts) {});
    });

