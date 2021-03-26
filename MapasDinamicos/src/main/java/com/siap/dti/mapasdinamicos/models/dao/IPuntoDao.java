package com.siap.dti.mapasdinamicos.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siap.dti.mapasdinamicos.models.entity.Punto;

public interface IPuntoDao extends JpaRepository<Punto, Long> {

}
