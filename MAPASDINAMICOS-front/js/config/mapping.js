/**
 * Configuración inicial para la carga de los archivos correspondientes al modulo config
 * @returns {Object} regresa un objeto que sera empleado para el despliegue del mapa
 * @param {String} displayProjection - corresponde a la proyección que empleara el mapa para realizar trasformaciones entre coordenadas
 * @param {String} zoomLevels - cantidad de niveles de acercamiento
 * @param {Object} zoomLevels - contiene las cordendas minimas y maximas para el acercamiento inicial
 */
define([], function(){
        return {
            displayProjection:'EPSG:4326',
            zoomLevels:23,
            extent:{
                        lon:[-120.9103, 10.9999 ],
                        lat:[-83.3810,34.5985]
                }
        }
});