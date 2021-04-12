package com.siap.dti.mapasdinamicos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class MapasDinamicosApplication {

	public static void main(String[] args) {
		SpringApplication.run(MapasDinamicosApplication.class, args);
	}
	
	@Autowired
	private Environment env;
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/login").allowedOrigins(env.getProperty("app.cross.origins"));
				registry.addMapping("/api/usuarios").allowedOrigins(env.getProperty("app.cross.origins"));
				registry.addMapping("/api/years").allowedOrigins(env.getProperty("app.cross.origins"));
				registry.addMapping("/api/predios").allowedOrigins(env.getProperty("app.cross.origins"));
				registry.addMapping("/api/poliall").allowedOrigins(env.getProperty("app.cross.origins"));
				registry.addMapping("/api/uploadcharge").allowedOrigins(env.getProperty("app.cross.origins"));
				registry.addMapping("/api/predioidentify").allowedOrigins(env.getProperty("app.cross.origins"));
				
				
			}
		};
	}

}
