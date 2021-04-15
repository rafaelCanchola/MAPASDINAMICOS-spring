package com.siap.dti.mapasdinamicos.models.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.siap.dti.mapasdinamicos.models.entity.Shape;

public interface IShapeDao extends JpaRepository<Shape, Long>{
	
	//@Query("select p.id, p.anio, astext(ST_POINT(p.x,p.y)) as wkt from Poligono p where p.anio = ?1 and intersects(ST_POINT(p.x = ?2,p.y = ?3),envelope(?4, ?5, ?6, ?7,4326))")
	//List<Poligono> findXAndYAndAnio(Integer anio,Double x, Double y,Double xmin,Double ymin,Double xmax,Double ymax);

}
