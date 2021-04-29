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
import org.locationtech.jts.geom.Geometry;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;

import com.siap.dti.mapasdinamicos.models.entity.Poligono;
import com.siap.dti.mapasdinamicos.models.entity.Shape;

public class ShapeFileUtils {
	public static List<Shape> readShapeIntoObject(List<String> shapesNames) throws IOException{
		List<Shape> poligonoIterator = new ArrayList<>();
        
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
                Shape shape = new Shape();
                shape.setAnio((Long)feature.getAttribute("Anio"));
                shape.setIdestado(Long.valueOf((String)feature.getAttribute("Idestado")));
                shape.setNomestado(new String(((String)feature.getAttribute("Nomestado")).getBytes(),StandardCharsets.UTF_8));
                shape.setIdddr((Long)feature.getAttribute("Idddr"));
                shape.setNomddr(new String(((String)feature.getAttribute("Nomddr")).getBytes(),StandardCharsets.UTF_8));
                shape.setIdcader((Long)feature.getAttribute("Idcader"));
                shape.setNomcader(new String(((String)feature.getAttribute("Nomcader")).getBytes(),StandardCharsets.UTF_8));
                shape.setIdmunicipio(Long.valueOf((String)feature.getAttribute("Idmunicipi")));
                shape.setNommunicip(new String(((String)feature.getAttribute("Nommunicip")).getBytes(),StandardCharsets.UTF_8));
                shape.setConcate(Long.valueOf((String)feature.getAttribute("Concate")));
                shape.setIdciclo((Long)feature.getAttribute("Idciclo"));
                shape.setNomcliclopr((String)feature.getAttribute("Nomciclopr"));
                shape.setIdunidadme((Long)feature.getAttribute("Idunidadme"));
                shape.setNomunidad((String)feature.getAttribute("Nomunidad"));
                shape.setIdcultivo((Long)feature.getAttribute("Idcultivo"));
                shape.setNomcultivo((String)feature.getAttribute("Nomcultivo"));
                shape.setSembrada((Double)feature.getAttribute("Sembrada"));
                shape.setCosechada((Double)feature.getAttribute("Cosechada"));
                shape.setSiniestrad((Double)feature.getAttribute("Siniestrad"));
                shape.setVolumenpro((Double)feature.getAttribute("Volumenpro"));
                shape.setRendimient((Double)feature.getAttribute("Rendimient"));
                shape.setPrecio((Double)feature.getAttribute("Precio"));
                shape.setValorprodu((Double)feature.getAttribute("Valorprodu"));
                
                poligonoIterator.add(shape);
                }
            featureIterator.close();
            
            }
		return poligonoIterator;
		}
	
	public static List<Poligono> readGeometryIntoPolygon(List<String> shapesNames) throws IOException{
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
                poligono.setThe_geom((Geometry) feature.getDefaultGeometry());
                
                poligonoIterator.add(poligono);
            }
            featureIterator.close();
		}
        
       return poligonoIterator;
       }
	
	
	}