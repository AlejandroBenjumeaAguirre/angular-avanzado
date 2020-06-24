import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../service/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-update/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  rol: string[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  noencontrado: boolean;

  constructor( public usuarioService: UsuarioService,
               public modalUpdateService: ModalUploadService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.modalUpdateService.notificacion.subscribe( resp => this.cargarUsuarios() );
  }

  cargarUsuarios(){

    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
              .subscribe( (resp: any ) => {

                console.log(resp.usuarios );

                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;
              });
  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ){

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      this.noencontrado = false;
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuarios(termino)
        .subscribe( (usuarios: Usuario[]) => {

                    if ( usuarios.length === 0 ){
                      this.noencontrado = true;
                      this.cargando = false;
                    } else {
                      this.totalRegistros = usuarios.length;
                      this.noencontrado = false;
                      this.usuarios = usuarios;
                      this.cargando = false;
                    }

                  });
  }


  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this.usuarioService.usuario._id ){
      Swal.fire({
        icon: 'error',
        title: 'Accion denegada',
        text: 'No puede eliminarse a usted mismo'
      });
      return;
    }

    Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta seguro de eliminar este usuario' + usuario.correo,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar el usuario!'
    }).then( borrar => {
      if (borrar.value) {
        this.usuarioService.borrarUsuario( usuario._id ).subscribe( resp => {
          console.log(resp);
          Swal.fire(
            'Eliminado!',
            'Usted a eliminado al usuario:',
            'success'
          );
        });
        this.cargarUsuarios();
      }else{
        return;
      }
    });

  }

  actualizarUsuario( usuario: Usuario ) {
    console.log(usuario);
    this.usuarioService.actualizarUsuario( usuario ).subscribe();
  }

  mostrarModel( id: string ){

      this.modalUpdateService.mostrarModal( 'usuarios', id );

  }

}
