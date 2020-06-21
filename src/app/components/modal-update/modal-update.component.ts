import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../service/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.css']
})
export class ModalUpdateComponent implements OnInit {

  subirImagen: File;
  imagenTemp: string | ArrayBuffer;


  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {  }

  cerrarModal(){
    this.subirImagen = null;
    this.imagenTemp = null;
    this.modalUploadService.ocultarModal();
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

  actualizarImagen(){

    this.subirArchivoService.subirArchivo( this.subirImagen, this.modalUploadService.tipo, this.modalUploadService.id )
      .then( resp => {

        console.log(resp);
        this.modalUploadService.notificacion.emit( resp );
        this.cerrarModal();

      })
      .catch(resp => {
        console.log('Error en la carga');
      });

  }

}
