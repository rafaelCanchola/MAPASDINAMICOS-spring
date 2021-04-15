package com.siap.dti.mapasdinamicos.models.services;


import java.util.List;

import com.siap.dti.mapasdinamicos.models.entity.Shape;

public interface IShapeService {
	
	public List<Shape> findAll();
	
	public Shape save(Shape shape);
	
	public void delete(Long id);
	
	public Shape findById(Long id);
	

}
