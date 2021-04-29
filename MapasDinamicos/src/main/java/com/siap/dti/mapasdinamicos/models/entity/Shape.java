package com.siap.dti.mapasdinamicos.models.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.siap.dti.mapasdinamicos.models.dto.PuntoHash;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="shapes")
public class Shape implements Serializable{

private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Setter @Getter
	private Long id;
	
	@Column(columnDefinition="text")
	@Setter @Getter
	private String shid;
	
	@Setter @Getter
	private Long anio;
	
	@Setter @Getter
	private Long idestado;
	
	@Column(columnDefinition="text")
	@Setter @Getter
	private String nomestado;
	
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
    	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@OneToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="punto_id")
	@Setter @Getter
	private Punto punto;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@OneToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="poligono_id")
	@Setter @Getter
	private Poligono poligono;
	
	
	public List<PuntoHash> toListHash() {
        List<PuntoHash> puntos = new ArrayList<>();
        puntos.add(new PuntoHash("Folio cultivo", this.getShid()));
        puntos.add(new PuntoHash("Año", this.getAnio()));
        puntos.add(new PuntoHash("Nombre cultivo", this.getNomcultivo()));
        puntos.add(new PuntoHash("Producción", this.getVolumenpro() + " "+ this.getNomunidad()));
        puntos.add(new PuntoHash("Ciclo", this.getNomcliclopr()));
        puntos.add(new PuntoHash("Cader", this.getNomcader()));
        puntos.add(new PuntoHash("DDR", this.getNomddr()));
        puntos.add(new PuntoHash("Estado", this.getNomestado()));
        puntos.add(new PuntoHash("Municipio", this.getNommunicip()));
        return puntos;
    }

}
