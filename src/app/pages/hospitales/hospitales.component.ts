import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../service/hospital/hospitales.service';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-update/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[];
  hospital: Hospital;
  total: number;
  cargando: boolean;
  desde: number = 0;
  noencontrado: boolean;

  constructor( public hospitalesService: HospitalesService,
               public modalUploadService: ModalUploadService
                ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.modalUploadService.notificacion.subscribe( () => this.cargarHospitales() );
  }

  cargarHospitales(){

    this.cargando = true;

    this.hospitalesService.cargarHospitales( this.desde )
      .subscribe( (resp: any) => {
        this.total = resp.total;
        this.hospitales = resp.hospitales;
        this.cargando = false;
    });

  }

  cambiarDesde( valor: number ){

    const desde = this.desde + valor;

    if ( desde >= this.total ){
      return;
    }

    if ( desde < 0 ){
      return;
    }

    this.desde += valor;
    this.cargarHospitales();

  }

  buscarHospital( termino: string ) {

    if ( termino.length <= 0  ){
      this.cargarHospitales();
      this.noencontrado = false;
      return;
    }
    this.cargando = true;

    this.hospitalesService.buscarHospital( termino )
          .subscribe(( hospitales: Hospital[] ) => {

            if ( hospitales.length === 0 ){
              this.noencontrado = true;
              this.cargando = false;
            } else {
              this.total = hospitales.length;
              this.noencontrado = false;
              this.hospitales = hospitales;
              this.cargando = false;
            }
            });
  }

  eliminarHospital( hospital: Hospital ){

    Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta seguro de eliminar este hospital ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar el hospital!'
    }).then( borrar => {
      if (borrar.value) {
          this.hospitalesService.eliminarHospitales( hospital._id ).subscribe(resp => {
            Swal.fire(
            'Eliminado!',
            'Usted a eliminado el hospital: ' + hospital.nombre,
            'success'
          );
        });
          this.cargarHospitales();
      }
    });
  }

  crearHospital( ){

    Swal.fire({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((valor: any) => {
      if (valor.value) {
        this.hospitalesService.crearHospital( valor.value ).subscribe();
        Swal.fire({
          title: 'Hospital creado',
          text: valor.value
        });
      }
      this.cargarHospitales();
    });

  }

  actualizarHospital( hospital: Hospital ){

    this.hospitalesService.actualizarHospital( hospital ).subscribe( (resp: any) => {
      console.log(resp);
      Swal.fire({
        icon: 'success',
        title: 'Hospital actualizado',
        text: 'Hospital ' + resp.nombre + ' actualizado correctamente.'
      });
    });

  }

  actualizarImagen( hospital: Hospital){

    this.modalUploadService.mostrarModal( 'hospitales', hospital._id );

  }

}
