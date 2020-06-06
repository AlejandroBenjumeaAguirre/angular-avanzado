import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// servicios
import { SettingsService } from '../../service/service.index';

@Component({
  selector: 'app-account-sethings',
  templateUrl: './account-sethings.component.html',
  styleUrls: ['./account-sethings.component.css']
})
export class AccountSethingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private documento,
               // tslint:disable-next-line:variable-name
               public _ajustes: SettingsService ) { }

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any) {

    console.log(link);
    this.aplicarcheck( link );

    this._ajustes.aplicatTema(tema);
 }

 aplicarcheck( link: any ) {
  // javascrip manilla--para menajer el elemento como javascrip tambien se puede hacer de estamenra.
  const selectores: any = document.getElementsByClassName('selector');

  for ( const ref of selectores ) {
    ref.classList.remove('working');
  }
  console.log(link);
  link.classList.add('working');
 }

 colocarCheck(){
  const selectores: any = document.getElementsByClassName('selector');
  const tema = this._ajustes.ajustes.tema;

  for ( const ref of selectores ) {
    if ( ref.getAttribute('data-theme') === tema ){
      ref.classList.add('working');
      break;
    }
  }
 }
}
