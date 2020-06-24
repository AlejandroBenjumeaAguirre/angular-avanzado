import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( public http: HttpClient,
               public usuarioService: UsuarioService ) { }

  cargarMedicos( desde: number ){

      let url = URL_SERVICIOS + '/medico';
      url += '?desde=' + desde;

      return this.http.get( url );

  }

  buscarmedico( termino: string ){

    const url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;

    return this.http.get(url).pipe( map( (resp: any) => resp.medico));
  }

  eliminarMedico( id: string ){

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete( url );
  }

  guardarMedico( medico: Medico ){

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ){
      // Actualizar
    url += '/' + medico._id + '?token=' + this.usuarioService.token;

    return this.http.put( url, medico )
      .pipe(
        map( (resp: any) => {

              Swal.fire({
                icon: 'success',
                title: 'Medico Actualizado',
                text: 'Medico actualizado satisfactoriamente.'
              });
              return resp.medico; })
            );

    } else {
      // Crear
      url += '?token=' + this.usuarioService.token;

      return this.http.post( url, medico ).pipe( map( (resp: any) => {

      Swal.fire({
        icon: 'success',
        title: 'Medico creado',
        text: 'Medico ' + medico.nombre + ' creado satisfactoriamente.'
      });
      return resp.medico;
    }));

    }

  }

  obternerMedico( id: string ){

    const url = URL_SERVICIOS + '/medico/' + id;

    return  this.http.get( url ).pipe( map( (resp: any) => resp.medico ));
  }
}
