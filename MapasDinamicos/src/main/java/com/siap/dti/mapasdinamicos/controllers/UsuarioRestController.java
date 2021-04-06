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

}
