import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
               public router: Router,
               public subirArchivo: SubirArchivoService ) {
    this.cargarLocalStorage();
  }

  estaLogueado(){
    return  (this.token.length > 5 ) ? true : false;
  }

  cargarLocalStorage(){
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  logout(){
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ){
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, {token} ).pipe(
      map( (resp: any) => {
        this.guardarLocalStorage( resp.token, resp.id, resp.usuario );
        return true;
      })
    );


  }

  guardarLocalStorage( token: string, id: string, usuario: Usuario ){

    localStorage.setItem( 'token', token );
    localStorage.setItem( 'id', id) ;
    localStorage.setItem( 'usuario', JSON.stringify( usuario ) );

    this.usuario = usuario;
    this.token = token;

  }

  login( usuario: Usuario, recordar: boolean ){

    if (recordar){
      localStorage.setItem('correo', usuario.correo);
    }else {
      localStorage.removeItem('correo');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
                        .pipe(
                           map( (resp: any) => {
                            this.guardarLocalStorage( resp.token, resp.id, resp.usuario );
                            return true;
                          })
                         );
  }

  crearUsuario( usuario: Usuario){

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario ).pipe(
      map( (resp: any) => {
        Swal.fire ({
          icon: 'success',
          title: 'Usuario creado',
          text: 'Usuario ' + usuario.correo + ' creado satisfactoriamente.'
          });
        return resp.usuario;
      })
    );
  }

  actualizarUsuario( usuario: Usuario ){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario ).pipe(
      map( (resp: any) => {

        if ( usuario._id === this.usuario._id ) {
          const usuarioDB = resp.usuario;
          this.guardarLocalStorage( this.token, usuarioDB._id, usuarioDB );
        }

        Swal.fire ({
          icon: 'success',
          title: 'Usuario Actualizado',
          text: 'Usuario ' + resp.usuario.correo + ' actualizado correctamente.'
          });

        return true;
      })
    );

  }

  cambiarImagen( archivo: File, id: string ){
    this.subirArchivo.subirArchivo( archivo, 'usuarios', id)
                .then( (resp: any ) => {

                  this.usuario.img = resp.usuario.img;

                  Swal.fire ({
                    icon: 'success',
                    title: 'Usuario Actualizado',
                    text: 'Usuario ' + resp.usuario.correo + ' actualizado correctamente.'
                    });

                  this.guardarLocalStorage( this.token, id, this.usuario );

                }).catch( resp => {
                  console.log(resp);
                });
  }

  cargarUsuarios( desde: number = 0 ){

    const url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url );

  }

  buscarUsuarios( termino: string ){

    const url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;

    return this.http.get(url).pipe( map( (resp: any) => resp.usuario));
  }

  borrarUsuario( id: string ) {

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url);
  }

}
