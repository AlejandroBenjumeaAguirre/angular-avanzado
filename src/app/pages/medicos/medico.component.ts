import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalesService } from '../../service/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-update/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('', '', '');
  medico: Medico = new Medico('', '', '', '');

  constructor(
    public medicoService: MedicoService,
    public hospitalService: HospitalesService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe( params => {

      const id = params.id;
      console.log(id);

      if ( id !== 'nuevo'){
        this.cargaMedico(id);
      }
    });
  }

  ngOnInit(): void {
    this.hospitalService.cargarTodos().subscribe( (resp: any) => this.hospitales = resp.hospitales );
    this.modalUploadService.notificacion
      .subscribe( resp => {
        console.log('notificacion', resp);
        this.medico.img = resp.medeico.img;
      });
  }

  cargaMedico( id: string ){
    this.medicoService.obternerMedico(id)
      .subscribe(medico => {
        console.log(medico);
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital( this.medico.hospital );
       });
  }

  guardarMedico( f: NgForm ){

    if ( f.invalid ){
      return;
    }

    this.medicoService.guardarMedico( this.medico ).subscribe( medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    } );

  }

  cambioHospital( id: string ){

    this.hospitalService.buscarHospitalporid( id ).subscribe( hospital =>  this.hospital = hospital );

  }

  cambiarImagen(){

    this.modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }
}
