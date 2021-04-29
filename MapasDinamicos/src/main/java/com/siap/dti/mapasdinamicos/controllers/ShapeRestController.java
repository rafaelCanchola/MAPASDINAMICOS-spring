package com.siap.dti.mapasdinamicos.controllers;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.Envelope;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.siap.dti.mapasdinamicos.models.dto.PuntoHash;
import com.siap.dti.mapasdinamicos.models.dto.PuntoJson;
import com.siap.dti.mapasdinamicos.models.entity.Shape;
import com.siap.dti.mapasdinamicos.models.entity.Poligono;
import com.siap.dti.mapasdinamicos.models.entity.Punto;
import com.siap.dti.mapasdinamicos.models.services.IShapeService;
import com.siap.dti.mapasdinamicos.models.services.IPoligonoService;
import com.siap.dti.mapasdinamicos.models.services.IPuntoService;
import com.siap.dti.mapasdinamicos.utilities.ShapeFileUtils;
import com.siap.dti.mapasdinamicos.utilities.UncompressorZIP;
import com.siap.dti.mapasdinamicos.utilities.Utils;

@RestController
@RequestMapping("/api")
public class ShapeRestController {
	
	@Autowired
	private IPoligonoService poligonoService;
	@Autowired
	private IShapeService shapeService;
	@Autowired
	private IPuntoService puntoService;
	@Autowired
	private Environment env;
	
	
	private GeometryFactory gf = new GeometryFactory(new PrecisionModel(PrecisionModel.FLOATING),3857);
	
	@GetMapping("/poligonos")
	public ResponseEntity<List<PuntoJson>> poligonos(@RequestParam Long filter, @RequestParam String user, @RequestParam Double xmin,@RequestParam Double xmax, @RequestParam Double ymin, @RequestParam Double ymax){
		Envelope en = new Envelope(xmin,xmax,ymin,ymax);
		List<Shape> fa = shapeService.findAll();
		List<PuntoJson> pj = new ArrayList<PuntoJson>();
		for(Shape p : fa) {
			if(p.getIdcultivo().equals(filter)) {
				if(en.intersects(p.getPunto().getThe_geom().getCoordinate().getX(),p.getPunto().getThe_geom().getCoordinate().getY())) {
					pj.add(new PuntoJson(p.getId(),p.getPoligono().getThe_geom().toString(),p.getIdcultivo(),p.getShid()));
				}
			}
		}
		return ResponseEntity.ok(pj);
	}
	
	@GetMapping("/predios")
	public ResponseEntity<List<PuntoJson>> predios(@RequestParam String filter, @RequestParam String user, @RequestParam Double xmin,@RequestParam Double xmax, @RequestParam Double ymin, @RequestParam Double ymax){
		Envelope en = new Envelope(xmin,xmax,ymin,ymax);
		List<Shape> fa = shapeService.findAll();
		List<PuntoJson> pj = new ArrayList<PuntoJson>();
		for(Shape p : fa) {
			if(en.intersects(p.getPunto().getThe_geom().getCoordinate().getX(),p.getPunto().getThe_geom().getCoordinate().getY())) {
				pj.add(new PuntoJson(p.getId(),p.getPunto().getThe_geom().toString(),p.getIdcultivo(),p.getShid()));
			}
		}
		return ResponseEntity.ok(pj);
	}
	
	@PostMapping("/predios")
	public ResponseEntity<List<PuntoJson>> prediosBusqueda(@RequestParam String ids){
		List<PuntoJson> pj = new ArrayList<PuntoJson>();
		for(String id: ids.split(",")) {
			Shape sh = shapeService.findById(Long.valueOf(id));
			pj.add(new PuntoJson(sh.getId(),sh.getPunto().getThe_geom().toString(),sh.getIdcultivo(),sh.getShid()));
		}
		return ResponseEntity.ok(pj);
	}
	/*
	@PostMapping("/insertpoli")
	public ResponseEntity<PuntoJson> InsertPoli(@RequestBody Poligono poligono){
		Poligono jpaPoligono = poligonoService.save(poligono);
		Punto nuevoPunto = new Punto();
		Point punto = gf.createPoint(new Coordinate(poligono.getX(),poligono.getY()));
		nuevoPunto.setThe_geom(punto);
		nuevoPunto.setPoligono(jpaPoligono);
		Punto jpaPunto = puntoService.save(nuevoPunto);
		return ResponseEntity.ok(new PuntoJson(jpaPunto.getId(),jpaPunto.getThe_geom().toString(),jpaPunto.getPoligono()));
	}
	*/
	@GetMapping("/poliall")
	public ResponseEntity<List<PuntoJson>> allPoints(){
		List<Shape> fa = shapeService.findAll();
		List<PuntoJson> pj = new ArrayList<PuntoJson>();
		for(Shape p : fa) {
			
			pj.add(new PuntoJson(p.getId(),p.getPunto().getThe_geom().toString(),p.getIdcultivo(),p.getShid()));
		}
		return ResponseEntity.ok(pj);
	}
	
	@GetMapping("/predioidentify")
	public ResponseEntity<List<PuntoHash>> encontrarPunto(@RequestParam Long id){
		Shape fa = shapeService.findById(id);
		return ResponseEntity.ok(fa.toListHash());
	}
	

	@PostMapping("/uploadcharge")
	public ResponseEntity<List<PuntoJson>> cargarPoligonos(@RequestParam Long user,@RequestParam String type,@RequestParam Integer currentyear,@RequestParam String useractive,@RequestParam MultipartFile file) throws IllegalStateException, IOException {
		TreeMap tm = new TreeMap();
		UncompressorZIP unzip = new UncompressorZIP();
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
		try {
			unzip.descomprimeZip(namePuntosDir+zipFileName, tm, nameTempDir+fileName);
			List<String> shapesNames = new ArrayList<>();
	        for (File fileTemp : fileTempDir.listFiles()) {
	            if (fileTemp.getName().toUpperCase().contains(".SHP")) {
	                shapesNames.add(fileTemp.getPath());
	            }
	        }
	        if(shapesNames.isEmpty()) {
				return ResponseEntity.status(409).build();
	        }else {
	        	List<Shape> shapeInsert = ShapeFileUtils.readShapeIntoObject(shapesNames);
	        	List<Poligono> poligonoInsert = ShapeFileUtils.readGeometryIntoPolygon(shapesNames);
	        	if(shapeInsert.isEmpty()) {
					return ResponseEntity.status(409).build();
	        	}else {
	        		for(int i = 0; i < shapeInsert.size();i++) {
	        			Poligono jpaPoligono = poligonoService.save(poligonoInsert.get(i));
	        			Punto nuevoPunto = new Punto();
	        			nuevoPunto.setThe_geom(gf.createPoint(new Coordinate(jpaPoligono.getThe_geom().getCentroid().getX(),jpaPoligono.getThe_geom().getCentroid().getY())));
	        			Punto jpaPunto = puntoService.save(nuevoPunto);
	        			shapeInsert.get(i).setPunto(jpaPunto);
	        			shapeInsert.get(i).setPoligono(jpaPoligono);
	        			//SET SHAPE
	        			Shape jpaShape = shapeService.save(shapeInsert.get(i));
	        			jpaShape.setShid(jpaShape.getIdcultivo().toString()+jpaShape.getAnio().toString()+String.format("%03d", jpaShape.getId()));
	        			jpaShape = shapeService.save(jpaShape);
	        		
	        		}
	        		return allPoints();	
	        	}
	        }
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(409).build();
			
		}
	}
	
}
