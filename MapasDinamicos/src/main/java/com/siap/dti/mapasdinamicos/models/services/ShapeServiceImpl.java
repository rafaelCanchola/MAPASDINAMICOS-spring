package com.siap.dti.mapasdinamicos.models.services;


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
	@Transactional
	public Poligono save(Poligono poligono) {
		return poligonoDao.save(poligono);
	}
	
}
