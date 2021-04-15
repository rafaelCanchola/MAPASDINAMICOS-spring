package com.siap.dti.mapasdinamicos.models.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.siap.dti.mapasdinamicos.models.dao.IShapeDao;
import com.siap.dti.mapasdinamicos.models.entity.Shape;

@Service
public class ShapeServiceImpl implements IShapeService{

	
	@Autowired
	private IShapeDao shapeDao;
	
	
	@Override
	@Transactional
	public Shape save(Shape poligono) {
		return shapeDao.save(poligono);
	}


	@Override
	@Transactional(readOnly = true)
	public List<Shape> findAll() {
		return shapeDao.findAll();
	}


	@Override
	@Transactional
	public void delete(Long id) {
		shapeDao.deleteById(id);
	}


	@Override
	@Transactional(readOnly = true)
	public Shape findById(Long id) {
		return shapeDao.findById(id).get();
	}
	
}
