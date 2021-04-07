package com.siap.dti.mapasdinamicos.models.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="poligonos")
public class Poligono implements Serializable{

private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Setter @Getter
	private Long id;
	
	@Column(columnDefinition="text")
	@Setter @Getter
	private String shid;
	
	@Setter @Getter
	private Long objectid;
	
	@Setter @Getter
	private Long anio;
	
	@Setter @Getter
	private Long idestado;
	
	@Column(columnDefinition="text")
	@Setter @Getter
	private String nomestado;
	
	@Column(columnDefinition="text")
	@Setter @Getter
	private Long idddr;
	
	@Column(columnDefinition="text")
	@Setter @Getter
	private String nomddr;

	@Setter @Getter
	private Long idcader;
	
	@Column(columnDefinition="text")
	@Setter @Getter
    private String nomcader;
	
	@Setter @Getter
    private Long idmunicipio;
    
    @Column(columnDefinition="text")
	@Setter @Getter
    private String nommunicip;
    
	@Setter @Getter
    private Long concate;
	
	@Setter @Getter
    private Long idciclo;
    
    @Column(columnDefinition="text")
	@Setter @Getter
    private String nomcliclopr;
    
	@Setter @Getter
    private Long idmodalida;
    
    @Column(columnDefinition="text")

	@Setter @Getter
    private String nommodalid;
    
	@Setter @Getter
    private Long idunidadme;
    
    @Column(columnDefinition="text")
	@Setter @Getter
    private String nomunidad;
    
	@Setter @Getter
    private Long idcultivo;
    
    @Column(columnDefinition="text")
	@Setter @Getter
    private String nomcultivo;

	@Setter @Getter
    private Double sembrada;

	@Setter @Getter
    private Double cosechada;

	@Setter @Getter
    private Double siniestrad;

	@Setter @Getter
    private Double volumenpro;

	@Setter @Getter
    private Double rendimient;

	@Setter @Getter
    private Double precio;

	@Setter @Getter
    private Double valorprodu;

	@Setter @Getter
    private Long cveent;
    
    @Column(columnDefinition="text")

	@Setter @Getter
    private String noment;

	@Setter @Getter
    private Long cvemun;
    
    @Column(columnDefinition="text")

	@Setter @Getter
    private String nomgeo;

	@Setter @Getter
    private Long cvegeo;
    
    @Setter @Getter
    private Double x;
    
    @Setter @Getter
    private Double y;

	@Setter @Getter
    private Double shapeleng;

	@Setter @Getter
    private Double shapearea;

}
