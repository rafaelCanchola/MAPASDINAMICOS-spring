package com.siap.dti.mapasdinamicos.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.siap.dti.mapasdinamicos.models.dao.IUsuarioDao;
import com.siap.dti.mapasdinamicos.models.entity.Usuario;

@Service
public class UsuarioServiceImpl implements IUsuarioService{
	
	@Autowired
	private IUsuarioDao usuarioDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Usuario> findAll() {
		return (List<Usuario>) usuarioDao.findAll();
	}

	@Override
	@Transactional
	public Usuario save(Usuario usuario) {
		return usuarioDao.save(usuario);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		usuarioDao.deleteById(id);
		
	}

	@Override
	@Transactional(readOnly = true)
	public Usuario findById(Long id) {
		return usuarioDao.findById(id).get();
	}
	
	@Override
	@Transactional(readOnly = true)
	public Usuario findByUsername(String username) {
		return usuarioDao.findByUsername(username);
	}

	

}
