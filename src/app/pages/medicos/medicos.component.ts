import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/service/service.index';
import { Medico } from '../../models/medico.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  total: number;
  medicos: Medico[] = [];
  desde: number = 0;
  cargando: boolean = false;
  noencontrado: boolean = false;

  constructor( public medicoService: MedicoService ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  buscarMedico( termino: string ){

    if ( termino.length <= 0  ){
      this.cargarMedicos();
      this.noencontrado = false;
      return;
    }
    this.cargando = true;

    this.medicoService.buscarmedico( termino ).subscribe( (medicos: Medico[] ) => {
      console.log(medicos);
      if ( medicos.length === 0 ){
        this.noencontrado = true;
        this.cargando = false;
      } else {
        this.total = medicos.length;
        this.medicos = medicos;
        this.noencontrado = false;
        this.cargando = false;
      }

    });

  }

  cargarMedicos(){

    this.cargando = true;

    this.medicoService.cargarMedicos( this.desde ).subscribe((resp: any) => {
      console.log(resp);
      this.total = resp.total;
      this.medicos = resp.medicos;
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
    this.cargarMedicos();

  }

  eliminarMedico( id: string ){
    console.log(id);

    Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta seguro de eliminar este medico',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar el usuario!'
    }).then( borrar => {
      if (borrar.value) {
        this.medicoService.eliminarMedico(id).subscribe( resp => {
          console.log(resp);
          Swal.fire(
            'Eliminado!',
            'Usted a eliminado al usuario:',
            'success'
          );
        });
        this.cargarMedicos();
      }else{
        return;
      }
    });

  }


}
