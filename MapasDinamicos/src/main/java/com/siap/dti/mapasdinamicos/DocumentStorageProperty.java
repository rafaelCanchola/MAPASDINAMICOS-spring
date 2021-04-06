package com.siap.dti.mapasdinamicos;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties(prefix="document")
public class DocumentStorageProperty {
	
	@Setter @Getter
	private String uploadDirectory;
}
