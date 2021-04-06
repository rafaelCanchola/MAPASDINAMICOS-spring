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
	private Integer objectid;
	
	@Setter @Getter
	private Integer anio;
	
	@Setter @Getter
	private Integer idestado;
	
	@Column(columnDefinition="text")
	@Setter @Getter
	private String nomestado;
	
	@Column(columnDefinition="text")
	@Setter @Getter
	private Integer idddr;
	
	@Column(columnDefinition="text")
	@Setter @Getter
	private String nomddr;

	@Setter @Getter
	private Integer idcader;
	
	@Column(columnDefinition="text")
	@Setter @Getter
    private String nomcader;
	
	@Setter @Getter
    private Integer idmunicipio;
    
    @Column(columnDefinition="text")
	@Setter @Getter
    private String nommunicip;
    
	@Setter @Getter
    private Integer concate;
	
	@Setter @Getter
    private Integer idciclo;
    
    @Column(columnDefinition="text")
	@Setter @Getter
    private String nomcliclopr;
    
	@Setter @Getter
    private Integer idmodalida;
    
    @Column(columnDefinition="text")

	@Setter @Getter
    private String nommodalid;
    
	@Setter @Getter
    private Integer idunidadme;
    
    @Column(columnDefinition="text")
	@Setter @Getter
    private String nomunidad;
    
	@Setter @Getter
    private Integer idcultivo;
    
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
    private Integer cveent;
    
    @Column(columnDefinition="text")

	@Setter @Getter
    private String noment;

	@Setter @Getter
    private Integer cvemun;
    
    @Column(columnDefinition="text")

	@Setter @Getter
    private String nomgeo;

	@Setter @Getter
    private Integer cvegeo;
    
    @Setter @Getter
    private Double x;
    
    @Setter @Getter
    private Double y;

	@Setter @Getter
    private Double shapeleng;

	@Setter @Getter
    private Double shapearea;

}
