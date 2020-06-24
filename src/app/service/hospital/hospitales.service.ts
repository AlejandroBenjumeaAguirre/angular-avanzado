import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  hospital: Hospital;
  usuario: Usuario;

  constructor( public http: HttpClient,
               public router: Router,
               public usuarioService: UsuarioService
                ){               }

  cargarHospitales( desde: number ) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?desde=' + desde;

    return this.http.get(url);
  }

  eliminarHospitales( id: string ){

    let url = URL_SERVICIOS + '/hospital/' + id;
    url +=  '?token=' + this.usuarioService.token;

    return this.http.delete(url);
  }

  buscarHospital( termino: string ){

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;

    return this.http.get( url ).pipe( map( (resp: any) => resp.hospital ));
  }

  crearHospital( nombre: string ){

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.usuarioService.token;

    return this.http.post( url, { nombre } ).pipe(
      map( (resp: any) => {
        return resp.hospital;
      })
      );
  }

  actualizarHospital( hospital: Hospital ){

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.usuarioService.token;


    return this.http.put( url, hospital ).pipe( map( (resp: any) => resp.hospital ));
  }

  buscarHospitalporid( id: string ){

    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url ).pipe( map( (resp: any ) => {
      return resp.hospital; }) );
  }

  cargarTodos(){

    const url = URL_SERVICIOS + '/hospital/todos';

    return this.http.get(url);
  }
}
