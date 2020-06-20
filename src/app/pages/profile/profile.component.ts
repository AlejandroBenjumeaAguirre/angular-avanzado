import { Component, OnInit, ReflectiveInjector } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../service/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  subirImagen: File;

  imagenTemp: string | ArrayBuffer;

  constructor(
    public usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  guardar( usuario: Usuario ){

    this.usuario.nombre = usuario.nombre;
    this.usuario.apellido = usuario.apellido;
    if ( !this.usuario.google ){
      this.usuario.correo = usuario.correo;
    }


    this.usuarioService.actualizarUsuario( this.usuario )
                        .subscribe( );

  }

  seleccionImagen( archivo: File ){

    if ( !archivo ) {
      this.subirImagen = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Archivo no Valido',
        text: 'El archivo seleccionado no es una imagen valida'
      });
      this.subirImagen = null;
      return;
    }

    this.subirImagen = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen(){
    this.usuarioService.cambiarImagen( this.subirImagen, this.usuario._id );
  }

}
