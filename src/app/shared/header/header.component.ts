import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public usuarioService: UsuarioService ) { }

  ngOnInit(): void {
  }

}
