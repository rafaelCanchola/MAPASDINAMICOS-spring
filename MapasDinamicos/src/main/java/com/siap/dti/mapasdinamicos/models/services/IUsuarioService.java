package com.siap.dti.mapasdinamicos.models.services;

import java.util.List;

import com.siap.dti.mapasdinamicos.models.entity.Usuario;

public interface IUsuarioService {
	
	public List<Usuario> findAll();
	
	public Usuario save(Usuario usuario);
	
	public void delete(Long id);
	
	public Usuario findById(Long id);
	
	public Usuario findByUsername(String username);
	
}
