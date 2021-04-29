package com.siap.dti.mapasdinamicos.models.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.locationtech.jts.geom.Geometry;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="estados_3857")
public class Estado implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Setter @Getter
	private Long gid;

    @Column(columnDefinition="text")
	@Setter @Getter
	private String cve_ent;

    @Column(columnDefinition="text")
    @Setter @Getter
	private String nom_ent;
    
    @Column(columnDefinition="geometry(MultiPolygon,3857)")
	private Geometry geom;
    
    @Setter @Getter
	private boolean mapas;
	

}
