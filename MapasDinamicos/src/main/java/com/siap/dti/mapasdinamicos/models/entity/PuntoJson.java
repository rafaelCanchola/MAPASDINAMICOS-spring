package com.siap.dti.mapasdinamicos.models.entity;


import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

public class PuntoJson implements Serializable{
	
	private static final long serialVersionUID = 1L;

	
	public PuntoJson(Long id, String geo, Poligono pol){
		this.id = id;
		this.the_geom = geo;
		this.poligono = pol;
	}
	
	@Setter @Getter
	private Long id;
	
	@Setter @Getter
    private String the_geom;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@Setter @Getter
	private Poligono poligono;
    

}
