package com.siap.dti.mapasdinamicos.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siap.dti.mapasdinamicos.models.entity.Ejercicio;
import com.siap.dti.mapasdinamicos.models.services.IEjercicioService;

@CrossOrigin(origins= {"http://localhost"})
@RestController
@RequestMapping("/api")
public class EjercicioRestController {
	
	@Autowired
	private IEjercicioService ejercicioService;
	
	@GetMapping("/years")
	public ResponseEntity<List<Ejercicio>> getAll(){
		return ResponseEntity.ok(ejercicioService.findAll());
	}
	
}
