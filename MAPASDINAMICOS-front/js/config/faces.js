/**
 * Definici�n de modulos para su despliegue
 * @returns {Object} regresa un objeto con cada una de las faces y sus respectibas subfaces para su despliegue
 */
define([], function(){
    return {
	    f1:{
		label:'Creaci&oacute;n de usuarios'
    
	    },
	    f2:{
		label:'Generaci&oacute;n de usuarios',
		subfaces:{
		    s1:{
			label:'Creaci&oacute;n Grupos de Trabajo'
		    },
		    s2:{
			label:'Validaci&oacute;n de grupos de trabajo'
		    },
		}
	    },
	    f2:{
		label:'Asignaci&oacute;n de Cargas de Trabajo',
		subfaces:{
		    s1:{
			label:'Asiganaci&oacute;n de Cargas de Trabajo'
		    },
		    s2:{
			label:'Validaci&oacute;n de Cargas de Trabajo'
		    },
		    s3: {
			label:'Descarga de Cargas de Trabajo'
		    }
		}
	    },
	    f3:{
		label:'Entrega de Cargas de Trabajo',
		subfaces:{
		    s1:{
			label:'Carga de Informaci�n'
		    },
		    s2:{
			label:'Validaci�n de Informaci�n, Supervisor'
		    },
		    s3:{
			label:'Validaci�n de Informaci�n, Estatal'
		    },
		    s4:{
			label:'Validaci�n de Informaci�n, SIAP'
		    }
		    
		}
	    }
    }
    
});