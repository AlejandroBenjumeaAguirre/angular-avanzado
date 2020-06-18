import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
               public router: Router ) {
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
}
