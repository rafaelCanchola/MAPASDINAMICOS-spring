package com.siap.dti.mapasdinamicos.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siap.dti.mapasdinamicos.models.entity.Poligono;

public interface IPoligonoDao extends JpaRepository<Poligono, Long>{

}
