package com.siap.dti.mapasdinamicos.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siap.dti.mapasdinamicos.models.entity.Ejercicio;

public interface IEjercicioDao extends JpaRepository<Ejercicio, Long> {

}
