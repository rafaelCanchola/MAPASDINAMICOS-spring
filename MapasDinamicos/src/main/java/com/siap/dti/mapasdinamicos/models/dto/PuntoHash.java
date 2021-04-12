package com.siap.dti.mapasdinamicos.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
public class PuntoHash {
	
	@Setter @Getter
	private String alias;
	
	@Setter @Getter
	private Object value; 

}
