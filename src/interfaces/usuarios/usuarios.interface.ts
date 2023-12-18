export interface Iusuario_create {
	email: string;
	pass: string;
    nombre:string;
    apellido:string;
}

export interface Iusuario_update extends Iusuario_create {}
