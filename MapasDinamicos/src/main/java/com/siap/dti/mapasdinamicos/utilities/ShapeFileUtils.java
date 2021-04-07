package com.siap.dti.mapasdinamicos.utilities;

import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.geotools.data.DataStore;
import org.geotools.data.DataStoreFinder;
import org.geotools.data.FeatureSource;
import org.geotools.feature.FeatureCollection;
import org.geotools.feature.FeatureIterator;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;

import com.siap.dti.mapasdinamicos.models.entity.Poligono;

public class ShapeFileUtils {
	public static List<Poligono> ReadShapeIntoPoligono(List<String> shapesNames) throws IOException{
		List<Poligono> poligonoIterator = new ArrayList<>();
        
		for (String shapeName : shapesNames) {
        	URL shapeURL = new File(shapeName).toURI().toURL();
        	Map<String, Serializable> params = new HashMap<>();
            params.put("url", shapeURL);
            
            DataStore dataStore = DataStoreFinder.getDataStore(params);
            String typeName = dataStore.getTypeNames()[0];
        	FeatureSource<SimpleFeatureType, SimpleFeature> source = dataStore.getFeatureSource(typeName);
        	
            FeatureCollection<SimpleFeatureType, SimpleFeature> featureCollection = source.getFeatures();
            FeatureIterator<SimpleFeature> featureIterator = featureCollection.features();
            
            while (featureIterator.hasNext()) {
            	SimpleFeature feature = featureIterator.next();
                Poligono poligono = new Poligono();
                poligono.setObjectid((Long)feature.getAttribute("OBJECTID"));
                poligono.setAnio((Long)feature.getAttribute("Anio"));
                poligono.setIdestado(Long.valueOf((String)feature.getAttribute("Idestado")));
                poligono.setNomestado(new String(((String)feature.getAttribute("Nomestado")).getBytes(),StandardCharsets.UTF_8));
                poligono.setIdddr((Long)feature.getAttribute("Idddr"));
                poligono.setNomddr(new String(((String)feature.getAttribute("Nomddr")).getBytes(),StandardCharsets.UTF_8));
                poligono.setIdcader((Long)feature.getAttribute("Idcader"));
                poligono.setNomcader(new String(((String)feature.getAttribute("Nomcader")).getBytes(),StandardCharsets.UTF_8));
                poligono.setIdmunicipio(Long.valueOf((String)feature.getAttribute("Idmunicipi")));
                poligono.setNommunicip(new String(((String)feature.getAttribute("Nommunicip")).getBytes(),StandardCharsets.UTF_8));
                poligono.setConcate(Long.valueOf((String)feature.getAttribute("Concate")));
                poligono.setIdciclo((Long)feature.getAttribute("Idciclo"));
                poligono.setNomcliclopr((String)feature.getAttribute("Nomciclopr"));
                poligono.setIdmodalida((Long)feature.getAttribute("Idmodalida"));
                poligono.setNommodalid((String)feature.getAttribute("Nommodalid"));
                poligono.setIdunidadme((Long)feature.getAttribute("Idunidadme"));
                poligono.setNomunidad((String)feature.getAttribute("Nomunidad"));
                poligono.setIdcultivo((Long)feature.getAttribute("Idcultivo"));
                poligono.setNomcultivo((String)feature.getAttribute("Nomcultivo"));
                poligono.setSembrada((Double)feature.getAttribute("Sembrada"));
                poligono.setCosechada((Double)feature.getAttribute("Cosechada"));
                poligono.setSiniestrad((Double)feature.getAttribute("Siniestrad"));
                poligono.setVolumenpro((Double)feature.getAttribute("Volumenpro"));
                poligono.setRendimient((Double)feature.getAttribute("Rendimient"));
                poligono.setPrecio((Double)feature.getAttribute("Precio"));
                poligono.setValorprodu((Double)feature.getAttribute("Valorprodu"));
                poligono.setCveent((String)feature.getAttribute("CVE_ENT"));
                poligono.setNoment(new String(((String)feature.getAttribute("NOM_ENT")).getBytes(),StandardCharsets.UTF_8));
                poligono.setCvemun((String)feature.getAttribute("CVE_MUN"));
                poligono.setNomgeo(new String(((String)feature.getAttribute("NOMGEO")).getBytes(),StandardCharsets.UTF_8));
                poligono.setCvegeo((String)feature.getAttribute("CVEGEO"));
                poligono.setX((Double)feature.getAttribute("X"));
                poligono.setY((Double)feature.getAttribute("Y"));
                poligono.setShapeleng((Double)feature.getAttribute("Shape_leng"));
                poligono.setShapearea((Double)feature.getAttribute("Shape_area"));
                
                poligonoIterator.add(poligono);
                }
            }
		return poligonoIterator;
		}
	
	}