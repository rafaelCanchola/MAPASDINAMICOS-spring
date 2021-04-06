package com.siap.dti.mapasdinamicos.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.siap.dti.mapasdinamicos.models.dao.IEjercicioDao;
import com.siap.dti.mapasdinamicos.models.entity.Ejercicio;

@Service
public class EjercicioServiceImpl implements IEjercicioService{
	
	@Autowired
	private IEjercicioDao ejercicioDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Ejercicio> findAll() {
		return (List<Ejercicio>) ejercicioDao.findAll();
	}

	@Override
	@Transactional
	public Ejercicio save(Ejercicio ejercicio) {
		return ejercicioDao.save(ejercicio);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		ejercicioDao.deleteById(id);
		
	}

	@Override
	@Transactional(readOnly = true)
	public Ejercicio findById(Long id) {
		return ejercicioDao.findById(id).get();
	}
	
	

}
