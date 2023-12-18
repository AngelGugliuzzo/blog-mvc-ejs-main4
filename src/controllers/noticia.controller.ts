import { Request, Response } from 'express';
import logger from '../helpers/logger';

import { 
	Inoticias_create,
    Inoticias_update,
       } from '../interfaces/noticias/noticias.interfaces';

import { IsNull } from 'typeorm';
import { dbcontext } from '../db/dbcontext';
import { Noticia } from '../models/noticias.entity';




export const noticiasIndex = async (req: Request, res: Response) => {
	// Aca devolver todas las noticias ordenadas por fecha
	// ver documentacion de typeorm
	const noticiaRepository = dbcontext.getRepository(Noticia);

	const noticias = await noticiaRepository.find({
		order: { create_at: 'DESC' },
		take: 10,//toma 10
	});

	res.render('home/index_view_noticias', { noticias });
};



export const crearNoticiaView = (req: Request, res: Response) => {
	res.render('noticias/crear');
};


export const crearNoticia = async (req: Request, res: Response) => {
	const data: Inoticias_create = req.body;

	try {
		if (data.titulo.trim() === '' || data.contenido.trim() === '') {
			throw new Error('Esta vacio');
		}

		const noticiaRepository = dbcontext.getRepository(Noticia);

		const noticia = noticiaRepository.create({
			...data
		});

		const result = await noticiaRepository.save(noticia);
		res.status(200).redirect('/noticias');
	} catch (error) {
		console.error(error);
		res.status(500).render('shared/error');
	}
};




export const getNoticiaById = async (req: Request, res: Response) => {
	console.log(req.params);
	const noticiaRepository = dbcontext.getRepository(Noticia);
	const noticia = await noticiaRepository.findOneBy({
		id: req.params.idNoticia,
	});
	res.send({ noticia });
};




export const editarNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = dbcontext.getRepository(Noticia);
		const noticia = await noticiaRepository.exist({
			where: { id: req.params.idNoticia },
		});
		if (!noticia) {
			res.render('shared/error');
		}
		const editNoticia: Inoticias_create = {
			titulo: req.body.titulo,
			contenido: req.body.contenido,
		};
		await noticiaRepository.update(req.params.idNoticia, editNoticia);

		res.redirect('/noticias');
	} catch (error) {
		res.render('shared/error');
	}
};


export const editarNoticiaView = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = dbcontext.getRepository(Noticia);
		const noticia = await noticiaRepository.findOne({
			where: { id: req.params.idNoticia },
		});
		if (!noticia) {
			res.render('shared/error');
		}

		res.render('noticias/editar', { noticia });
	} catch (error) {
		res.render('shared/error');
	}
};


//no anda la lista revisar bien es igual al index ver video
export const listadoNoticias= async (req: Request, res:Response) => {
	
		const noticiaLista = dbcontext.getRepository(Noticia);

		const noticias = await noticiaLista.find({
			order: { create_at: 'DESC' },
			withDeleted	: true,
			
	    });
	 if (noticias.length > 0) {
		res.render('noticias/listado', { noticias });

	 }
		res.render('shared/error');
};

export const borrarNoticia = async (req:Request, res: Response) =>{
	const noticiaRepository = dbcontext.getRepository(Noticia);
	const  noticia = await noticiaRepository.findOne({
		where: {id: req.params.idNoticia },
	});
	if (!noticia){
		res.render('shared/error');
	}
	await noticiaRepository.softDelete(req.params.idNoticia);//en esta linea da error
	//at async borrarNoticia (C:\Users\usuario\Desktop\blog-mvc-ejs-main2\src\controllers\noticia.controller.ts:137:2
	res.redirect('/noticias/listado');
};



//para picar la targeta y ver las noticia completas, armamos en controler una ruttina como editar,
//una ruta get, ver como lo ponemos en index view, y vamos a tener que hacer 
//pantalla.ejs o algo por e estilo.
//
