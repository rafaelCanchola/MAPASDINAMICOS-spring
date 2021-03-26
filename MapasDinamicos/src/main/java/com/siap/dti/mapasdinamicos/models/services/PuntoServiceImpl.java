package com.siap.dti.mapasdinamicos.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.siap.dti.mapasdinamicos.models.dao.IPuntoDao;
import com.siap.dti.mapasdinamicos.models.entity.Punto;

@Service
public class PuntoServiceImpl implements IPuntoService{

	@Autowired
	private IPuntoDao puntoDao;
	
	@Override
	@Transactional
	public Punto save(Punto punto) {
		return puntoDao.save(punto);
	}

}
