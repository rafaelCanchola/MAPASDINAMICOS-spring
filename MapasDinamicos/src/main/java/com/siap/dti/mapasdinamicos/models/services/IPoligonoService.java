package com.siap.dti.mapasdinamicos.models.services;

import java.util.List;

import com.siap.dti.mapasdinamicos.models.entity.Poligono;

public interface IPoligonoService {
	
	public List<Poligono> findAll();
	
	public Poligono save(Poligono poligono);
	
	public void delete(Long id);
	
	public Poligono findById(Long id);
	

}
