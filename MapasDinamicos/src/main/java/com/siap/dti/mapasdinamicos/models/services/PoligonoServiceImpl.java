package com.siap.dti.mapasdinamicos.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.siap.dti.mapasdinamicos.models.dao.IPoligonoDao;
import com.siap.dti.mapasdinamicos.models.entity.Poligono;

@Service
public class PoligonoServiceImpl implements IPoligonoService{
	
	@Autowired
	private IPoligonoDao poligonoDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Poligono> findAll() {
		return (List<Poligono>) poligonoDao.findAll();
	}

	@Override
	@Transactional
	public Poligono save(Poligono poligono) {
		return poligonoDao.save(poligono);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		poligonoDao.deleteById(id);
		
	}

	@Override
	@Transactional(readOnly = true)
	public Poligono findById(Long id) {
		return poligonoDao.findById(id).get();
	}

}
