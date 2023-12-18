import express from 'express';
import {
	usuarioIndex,
	crearUsuarioView,
	crearUsuario,
	getUsuarioById,
	editarUsuario,
	borrarUsuario,
	listadousuarios,
	editarUsuarioView,
	

} from '../controllers/usuario.controller';

const usuarioRoutes = express.Router(); //aca esta el usuarioroutes, que falla en el server

usuarioRoutes.get('/', usuarioIndex); 
usuarioRoutes.get ('/by/:idUsuario', getUsuarioById); //graba el primer registro que es el id aleatorio

//listado usuarios
usuarioRoutes.get('/listado',listadousuarios);

//crearnoticia
usuarioRoutes.get('/crear', crearUsuarioView);
usuarioRoutes.post('/crear', crearUsuario);
//-------
usuarioRoutes.get('/editar/:iUsuario',editarUsuarioView); // me saca de la pagina web
usuarioRoutes.post('/editar/:idUsuario',editarUsuario);


usuarioRoutes.get('/borrar/:idUsuario',borrarUsuario);

export default usuarioRoutes;