package com.siap.dti.mapasdinamicos.controllers;

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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.siap.dti.mapasdinamicos.models.entity.Poligono;
import com.siap.dti.mapasdinamicos.models.entity.Punto;
import com.siap.dti.mapasdinamicos.models.entity.Usuario;
import com.siap.dti.mapasdinamicos.models.services.IPoligonoService;
import com.siap.dti.mapasdinamicos.models.services.IPuntoService;
import com.siap.dti.mapasdinamicos.models.services.IUsuarioService;
import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryFactory;

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
	
	private GeometryFactory gf = new GeometryFactory();
	
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
	
	@GetMapping("/predios")
	public ResponseEntity<Poligono> predios(@RequestParam String filter, @RequestParam String user, @RequestParam Double xmin,@RequestParam Double xmax, @RequestParam Double ymin, @RequestParam Double ymax){
		
		return null;
	}
	
	@PostMapping("/insertpoli")
	public ResponseEntity<Punto> insertPoli(@RequestBody Poligono poligono){
		
		Poligono jpaPoligono = poligonoService.save(poligono);
		Punto nuevoPunto = new Punto();
		nuevoPunto.setThe_geom(gf.createPoint(new Coordinate(Double.parseDouble(poligono.getX().toString()),Double.parseDouble(poligono.getY().toString()))));
		nuevoPunto.setPoligono(jpaPoligono);
		Punto jpaPunto = puntoService.save(nuevoPunto);
		return ResponseEntity.ok(jpaPunto);
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
