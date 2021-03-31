package com.siap.dti.mapasdinamicos.models.services;

import java.util.List;

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

	@Override
	@Transactional(readOnly = true)
	public List<Punto> findAll() {
		return (List<Punto>) puntoDao.findAll();
	}

}
