package com.siap.dti.mapasdinamicos.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.siap.dti.mapasdinamicos.models.entity.Poligono;
import com.siap.dti.mapasdinamicos.models.entity.Punto;
import com.siap.dti.mapasdinamicos.models.entity.PuntoJson;
import com.siap.dti.mapasdinamicos.models.entity.Usuario;
import com.siap.dti.mapasdinamicos.models.services.IPoligonoService;
import com.siap.dti.mapasdinamicos.models.services.IPuntoService;
import com.siap.dti.mapasdinamicos.models.services.IUsuarioService;
import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Envelope;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.Point;
import com.vividsolutions.jts.geom.PrecisionModel;

@CrossOrigin(origins= {"http://localhost"})
@RestController
@RequestMapping("/api")
public class UsuarioRestController {
	
	@Autowired
	private IUsuarioService usuarioService;
	@Autowired
	private IPoligonoService poligonoService;
	@Autowired
	private IPuntoService puntoService;
	
	private GeometryFactory gf = new GeometryFactory(new PrecisionModel(PrecisionModel.FLOATING),3857);
	
	@GetMapping("/usuarios")
	public List<Usuario> index(){
		return usuarioService.findAll();
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<Usuario> login(@RequestBody Usuario login){
		Usuario foundUser = usuarioService.findByUsername(login.getUsername());
		if(foundUser == null) {
			return ResponseEntity.status(403).build();
		}
		else {
			if(login.getPassword().equals(foundUser.getPassword())) {
				foundUser.setPassword(null);
				foundUser.setEmail(null);
				return ResponseEntity.ok(foundUser);
			}
			else {
				return ResponseEntity.status(403).build();
			}
		}
	}
	
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
	@GetMapping("/Years")
	//public ResponseEntity<List<Usuario>> years(){
		//return ResponseEntity.notFound().build();
	//	return ResponseEntity.ok(usuarioService.findAll());
	//	
	//}	
	public ResponseEntity<Object> years(){
		//return ResponseEntity.notFound().build();
		return ResponseEntity.noContent().build();
		
	}


}
