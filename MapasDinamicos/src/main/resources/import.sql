INSERT INTO roles(rol) VALUES ('Administrador');
INSERT INTO roles(rol) VALUES ('Ejecutivo');
INSERT INTO ejercicios(anio, habilitado) VALUES (2019,true);

INSERT INTO usuarios(nombre,apellido,email,username,password,enabled,rol_id) VALUES ('Admin','Admin','admin@hotmail.com','admin2019','siisecA123',true,1);
INSERT INTO usuarios(nombre,apellido,email,username,password,enabled,rol_id) VALUES ('Ejecutivo','Ejecutivo','admin@hotmail.com','ejecutivo','1234',true,2);