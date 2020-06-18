import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../service/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
              // tslint:disable-next-line:variable-name
              public _serviceUsuario: UsuarioService,
              public router: Router
  ) { }

  sonIguales( campo1: string, campo2: string ){

    return ( group: FormGroup ) => {

      const pass1: string = group.controls[campo1].value;
      const pass2: string = group.controls[campo2].value;

      if ( pass1 === pass2 ){
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

  ngOnInit(): void {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      apellido: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email ] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales( 'password', 'password2' )});

    this.forma.setValue({
      nombre: 'Test',
      apellido: 'a',
      correo: 'test1@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario(){

    if ( this.forma.invalid ){
      return;
    }

    if ( !this.forma.value.condiciones ){
      Swal.fire ({
        icon: 'warning',
        title: 'Importante',
        text: 'Debe de aceptar las condiciones'
        });
      return;
    }

    // tslint:disable-next-line:prefer-const
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.correo,
      this.forma.value.password,

    );

    this._serviceUsuario.crearUsuario(usuario)
    .subscribe( res => this.router.navigate(['/login']));
  }

}
