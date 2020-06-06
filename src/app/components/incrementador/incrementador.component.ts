import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'leyenda';
  @Input() progreso: number = 50;

  @Output() cambiaValores: EventEmitter<number> = new EventEmitter();

  constructor() {   }

  ngOnInit(): void {  }

  // para evitar que en el input se pueda escribir un texto o un numero mayo a 0 o menoir a 0

  onChange( newValue: number ){

      /* const elemHTML: any = document.getElementsByName('progreso')[0]; */

      /* console.log( this.txtProgress ); */

      if ( newValue >= 100 ) {
        this.progreso = 100;
      } else if ( newValue <= 0 ) {
        this.progreso = 0;
      }else {
        this.progreso = newValue;
      }

      /* elemHTML.value = Number(this.progreso); */

      this.txtProgress.nativeElement.value = Number(this.progreso);

      this.cambiaValores.emit( this.progreso );
  }

  // Para cambiar el valor en en la barra de progreso por medio del @Input y @Output
  cambiarValor( valor: number ){

    if ( this.progreso >= 100 && valor > 0){
      this.progreso = 100;
      return;
    }
    if ( this.progreso <= 0 && valor < 0 ){
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;

    this.cambiaValores.emit( this.progreso );
  }


}
