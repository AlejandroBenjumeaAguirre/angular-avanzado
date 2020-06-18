import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../service/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo: string;
  recordar: boolean = false;

  auth2: any;

  constructor( public router: Router,
               // tslint:disable-next-line:variable-name
               public _serviceusuario: UsuarioService,
               // tslint:disable-next-line:variable-name
               public _ngZone: NgZone ) { }

  ngOnInit(): void {

    init_plugins();

    this.googleInit();

    this.correo = localStorage.getItem('correo') || '';
  }

  googleInit(){

    gapi.load( 'auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '377822500713-ub41l3qnuceq1pihrk14u9c17fub4rna.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile'
      });
      console.log('aqui');
      this.attachSingin( document.getElementById('btnGoogle') );

    });
  }

  attachSingin( element: HTMLElement ){

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      const token = googleUser.getAuthResponse().id_token;

      this._serviceusuario.loginGoogle(token)
                    .subscribe( () => this._ngZone.run( () => this.router.navigate(['/dashboard']) ) );
    });

  }

  ingresar( forma: NgForm ) {
    if ( forma.invalid ){
      return;
    }

    const usuario = new Usuario(null, null, forma.value.correo, forma.value.password );

    this._serviceusuario.login( usuario, forma.value.recordar )
                        .subscribe( resp => this.router.navigate(['/dashboard']));

  }

}
