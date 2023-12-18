import express from 'express';
import {
	noticiasIndex,
	crearNoticiaView,
	crearNoticia,
	getNoticiaById,
	editarNoticiaView,
	editarNoticia,
	listadoNoticias,
	borrarNoticia,
	
} from '../controllers/noticia.controller';

const noticiasRoutes = express.Router();

noticiasRoutes.get('/', noticiasIndex);
noticiasRoutes.get ('/by/:idNoticia', getNoticiaById);  //me saca la pantalla de crear, pone el id como primer campo

//listado noticias
noticiasRoutes.get('/listado',listadoNoticias);

//crearnoticia
noticiasRoutes.get('/crear', crearNoticiaView);
noticiasRoutes.post('/crear', crearNoticia);

//editar noticia
noticiasRoutes.get('/editar/:iNoticia',editarNoticiaView); // me saca de la pagina web
noticiasRoutes.post('/editar/:idNoticia',editarNoticia);

//delete noticia
noticiasRoutes.get('/borrar/:idNoticia',borrarNoticia);

export default noticiasRoutes;
