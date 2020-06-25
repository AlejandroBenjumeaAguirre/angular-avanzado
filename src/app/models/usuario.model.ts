export class Usuario {

    constructor(

        public nombre: string,
        public apellido: string,
        public correo: string,
        public password: string,
        public img?: string,
        public rol?: string,
        public google?: boolean,
        // tslint:disable-next-line:variable-name
        public _id?: string

    ) {

    }
}
