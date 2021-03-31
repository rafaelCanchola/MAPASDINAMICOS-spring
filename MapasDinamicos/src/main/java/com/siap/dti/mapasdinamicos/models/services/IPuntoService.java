package com.siap.dti.mapasdinamicos.models.services;

import java.util.List;

import com.siap.dti.mapasdinamicos.models.entity.Punto;

public interface IPuntoService {
	
	public Punto save(Punto punto);
	
	public List<Punto> findAll();
	

}
