package com.siap.dti.mapasdinamicos.models.services;

import java.util.List;

import com.siap.dti.mapasdinamicos.models.entity.Ejercicio;


public interface IEjercicioService {
	
	public List<Ejercicio> findAll();
	
	public Ejercicio save(Ejercicio ejercicio);
	
	public void delete(Long id);
	
	public Ejercicio findById(Long id);
	

}
