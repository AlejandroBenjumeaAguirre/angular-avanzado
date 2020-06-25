import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../service/service.index';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  // tslint:disable-next-line:variable-name
  constructor( public _sidebar: SidebarService,
               public usuarioService: UsuarioService ) { }

  ngOnInit(): void {

    this.usuario = this.usuarioService.usuario;
    this._sidebar.cagarMenu();
  }

}
