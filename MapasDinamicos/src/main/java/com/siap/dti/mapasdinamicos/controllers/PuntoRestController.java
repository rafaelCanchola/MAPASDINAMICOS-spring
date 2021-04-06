package com.siap.dti.mapasdinamicos.controllers;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;

import org.geotools.data.DataStore;
import org.geotools.data.FeatureSource;
import org.geotools.data.shapefile.ShapefileDataStore;
import org.geotools.feature.FeatureCollection;
import org.geotools.feature.FeatureIterator;
import org.opengis.feature.simple.SimpleFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.siap.dti.mapasdinamicos.models.entity.Ejercicio;
import com.siap.dti.mapasdinamicos.models.entity.Poligono;
import com.siap.dti.mapasdinamicos.models.entity.Punto;
import com.siap.dti.mapasdinamicos.models.entity.PuntoJson;
import com.siap.dti.mapasdinamicos.models.entity.Usuario;
import com.siap.dti.mapasdinamicos.models.services.IEjercicioService;
import com.siap.dti.mapasdinamicos.models.services.IPoligonoService;
import com.siap.dti.mapasdinamicos.models.services.IPuntoService;
import com.siap.dti.mapasdinamicos.utilities.UncompressorZIP;
import com.siap.dti.mapasdinamicos.utilities.Utils;
import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Envelope;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.Point;
import com.vividsolutions.jts.geom.PrecisionModel;

@CrossOrigin(origins= {"http://localhost"})
@RestController
@RequestMapping("/api")
public class PuntoRestController {
	
	@Autowired
	private IPoligonoService poligonoService;
	@Autowired
	private IPuntoService puntoService;
	@Autowired
	private Environment env;
	
	
	private GeometryFactory gf = new GeometryFactory(new PrecisionModel(PrecisionModel.FLOATING),3857);
	
	@GetMapping("/Predios")
	public ResponseEntity<List<PuntoJson>> predios(@RequestParam String filter, @RequestParam String user, @RequestParam Double xmin,@RequestParam Double xmax, @RequestParam Double ymin, @RequestParam Double ymax){
		Envelope en = new Envelope(xmin,xmax,ymin,ymax);
		List<Punto> fa = puntoService.findAll();
		List<PuntoJson> pj = new ArrayList<PuntoJson>();
		for(Punto p : fa) {
			if(en.intersects(p.getPoligono().getX(),p.getPoligono().getY())) {
				System.out.println("Entering");
				pj.add(new PuntoJson(p.getId(),p.getThe_geom().toString(),p.getPoligono()));
			}else {
				System.out.println("Errorrrrrrrr");
			}
		}
		return ResponseEntity.ok(pj);
	}
	
	@PostMapping("/insertpoli")
	public ResponseEntity<PuntoJson> insertPoli(@RequestBody Poligono poligono){
		Poligono jpaPoligono = poligonoService.save(poligono);
		Punto nuevoPunto = new Punto();
		Point punto = gf.createPoint(new Coordinate(poligono.getX(),poligono.getY()));
		nuevoPunto.setThe_geom(punto);
		nuevoPunto.setPoligono(jpaPoligono);
		Punto jpaPunto = puntoService.save(nuevoPunto);
		return ResponseEntity.ok(new PuntoJson(jpaPunto.getId(),jpaPunto.getThe_geom().toString(),jpaPunto.getPoligono()));
	}
	
	@GetMapping("/poliall")
	public ResponseEntity<List<PuntoJson>> allpoints(){
		List<Punto> fa = puntoService.findAll();
		List<PuntoJson> pj = new ArrayList<PuntoJson>();
		for(Punto p : fa) {
			pj.add(new PuntoJson(p.getId(),p.getThe_geom().toString(),p.getPoligono()));
		}
		return ResponseEntity.ok(pj);
	}

	@PostMapping("/uploadcharge")
	public ResponseEntity<List<PuntoJson>> cargarPoligonos(@RequestParam Long user,@RequestParam String type,@RequestParam Integer currentyear,@RequestParam String useractive,@RequestParam MultipartFile file) throws IllegalStateException, IOException {
		boolean validZip = false;
		String nameTempDir = env.getProperty("app.upload.dir")+env.getProperty("app.upload.mapas")+currentyear+env.getProperty("app.upload.mapas.temporal");
		String namePuntosDir = env.getProperty("app.upload.dir")+env.getProperty("app.upload.mapas")+currentyear+env.getProperty("app.upload.mapas.puntos");
		String fileName = Utils.getFileNameUpload(file.getOriginalFilename().split(".zip")[0],user.intValue());
		String zipFileName = fileName + ".zip";
		File chargeTempDir = new File(nameTempDir);
		File chargePuntosDir = new File(namePuntosDir);
		File fileTempDir = new File(nameTempDir+fileName);
		if(!chargeTempDir.exists()) {
			if(!chargeTempDir.mkdir()) {
				return ResponseEntity.status(400).build();
			}
		}
		if(!chargePuntosDir.exists()) {
			if(!chargePuntosDir.mkdir()) {
				return ResponseEntity.status(400).build();
			}
		}
		if(!fileTempDir.exists()) {
			if(!fileTempDir.mkdir()) {
				return ResponseEntity.status(400).build();
			}
		}
		file.transferTo(
				new File(namePuntosDir,zipFileName) 
		);
		TreeMap tm = new TreeMap();
        UncompressorZIP unzip = new UncompressorZIP();
        try {
			unzip.descomprimeZip(namePuntosDir+zipFileName, tm, nameTempDir+fileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        for (File fileTemp : fileTempDir.listFiles()) {
            if (fileTemp.getName().toUpperCase().contains(".SHP")) {
            	validZip = true;
                break;
            }
        }
        if(!validZip) {
			return ResponseEntity.status(409).build();
        }else {
        	ArrayList<String> shapesNames = new ArrayList();
            for (File fileTemp : fileTempDir.listFiles()) {
                if (fileTemp.getName().toUpperCase().contains(".SHP") ) {
                    shapesNames.add(fileTemp.getPath());
                }
            }
            for (String shapeName : shapesNames) {
            	URL shapeURL = new File(shapeName).toURI().toURL();
            	System.out.println(shapeURL.toString());
                ShapefileDataStore store = new ShapefileDataStore(shapeURL);
                String name = store.getTypeNames()[0];
                FeatureSource source = store.getFeatureSource(name);
                FeatureCollection featureCollection = source.getFeatures();
                FeatureIterator featureIterator = featureCollection.features();
                SimpleFeature feature;
                Poligono poligono;
                while (featureIterator.hasNext()) {
                    feature = (SimpleFeature) featureIterator.next();
                    poligono = new Poligono();
                    
                    poligono.setObjectid((Integer)feature.getAttribute("OBJECTID"));
                    poligono.setAnio((Integer)feature.getAttribute("Anio"));
                    poligono.setIdestado((Integer)feature.getAttribute("Idestado"));
                    poligono.setNomestado((String)feature.getAttribute("Nomestado"));
                    poligono.setIdddr((Integer)feature.getAttribute("Idddr"));
                    poligono.setNomddr((String)feature.getAttribute("Nomddr"));
                    poligono.setIdcader((Integer)feature.getAttribute("Idcader"));
                    poligono.setNomcader((String)feature.getAttribute("Nomcader"));
                    poligono.setIdmunicipio((Integer)feature.getAttribute("Idmunicipi"));
                    poligono.setNommunicip((String)feature.getAttribute("Nommunicip"));
                    poligono.setConcate((Integer)feature.getAttribute("Concate"));
                    poligono.setIdciclo((Integer)feature.getAttribute("Idciclo"));
                    poligono.setNomcliclopr((String)feature.getAttribute("Nomciclopr"));
                    poligono.setIdmodalida((Integer)feature.getAttribute("Idmodalida"));
                    poligono.setNommodalid((String)feature.getAttribute("Nommodalid"));
                    poligono.setIdunidadme((Integer)feature.getAttribute("Idunidadme"));
                    poligono.setNomunidad((String)feature.getAttribute("Nomunidad"));
                    poligono.setIdcultivo((Integer)feature.getAttribute("Idcultivo"));
                    poligono.setNomcultivo((String)feature.getAttribute("Nomcultivo"));
                    poligono.setSembrada((Double)feature.getAttribute("Sembrada"));
                    poligono.setCosechada((Double)feature.getAttribute("Cosechada"));
                    poligono.setSiniestrad((Double)feature.getAttribute("Siniestrad"));
                    poligono.setVolumenpro((Double)feature.getAttribute("Volumenpro"));
                    poligono.setRendimient((Double)feature.getAttribute("Rendimient"));
                    poligono.setPrecio((Double)feature.getAttribute("Precio"));
                    poligono.setValorprodu((Double)feature.getAttribute("Valorprodu"));
                    poligono.setCveent((Integer)feature.getAttribute("CVE_ENT"));
                    poligono.setNoment((String)feature.getAttribute("NOM_ENT"));
                    poligono.setCvemun((Integer)feature.getAttribute("CVE_MUN"));
                    poligono.setNomgeo((String)feature.getAttribute("NOMGEO"));
                    poligono.setCvegeo((Integer)feature.getAttribute("CVEGEO"));
                    poligono.setX((Double)feature.getAttribute("X"));
                    poligono.setY((Double)feature.getAttribute("Y"));
                    poligono.setShapeleng((Double)feature.getAttribute("Shape_leng"));
                    poligono.setShapearea((Double)feature.getAttribute("Shape_area"));
                    
                    Poligono jpaPoligono = poligonoService.save(poligono);
            		Punto nuevoPunto = new Punto();
            		Point punto = gf.createPoint(new Coordinate(poligono.getX(),poligono.getY()));
            		nuevoPunto.setThe_geom(punto);
            		nuevoPunto.setPoligono(jpaPoligono);
            		Punto jpaPunto = puntoService.save(nuevoPunto);
           
            }
        }
        
        return allpoints();
		}
	}
}
