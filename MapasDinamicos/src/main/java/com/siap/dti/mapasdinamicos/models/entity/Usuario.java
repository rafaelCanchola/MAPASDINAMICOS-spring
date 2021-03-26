package com.siap.dti.mapasdinamicos.models.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="usuarios")
public class Usuario implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Setter @Getter
	private Long id;
	
	@Setter @Getter
	private String nombre;
	
	@Setter @Getter
	private String apellido;
	
	@Setter @Getter
	private String email;
	
	@Setter @Getter
	private String username;
	
	@Setter @Getter
	private String password;
	
	@Setter @Getter
	private Boolean enabled;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@OneToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="rol_id")
	@Setter @Getter
	private Rol rol;
	
	@OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
	@Setter @Getter
	private List<Usuario> subordinados;
		
	
}
