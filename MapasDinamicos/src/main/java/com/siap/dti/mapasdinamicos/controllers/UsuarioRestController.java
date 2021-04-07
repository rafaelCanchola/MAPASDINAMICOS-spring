package com.siap.dti.mapasdinamicos.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siap.dti.mapasdinamicos.models.entity.Usuario;
import com.siap.dti.mapasdinamicos.models.services.IUsuarioService;

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
