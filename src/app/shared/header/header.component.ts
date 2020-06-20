import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor( public usuarioService: UsuarioService ) { }

  ngOnInit(): void {

    this.usuario = this.usuarioService.usuario;
  }

}
