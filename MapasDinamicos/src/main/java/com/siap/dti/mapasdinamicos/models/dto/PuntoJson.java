package com.siap.dti.mapasdinamicos.models.dto;


import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
public class PuntoJson implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Setter @Getter
	private Long id;
	
	@Setter @Getter
    private String the_geom;
	
	@Setter @Getter
	private Long idcultivo;
	/*
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@Setter @Getter
	private Poligono poligono;
	*/
    

}
