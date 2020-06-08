import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, pipe, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcription: Subscription;

  constructor() {

    this.subcription = this.regresaObservable()
    .subscribe(
      numero => console.log( 'subs ', numero),
      error => console.warn('Error', error),
      () => console.log('Se ha completado el observable')
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

      return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador ++ ;

        const salida = {
          valor: contador
        };

        observer.next( salida );

       /*  if ( contador === 3 ){
          clearInterval( intervalo );
          observer.complete();
        } */

        /* if ( contador === 2 ) {
          // clearInterval( intervalo );
          observer.error('Se presento un error en el observable');
        } */

      }, 1000);

    }).pipe(
      // el operador map sirve para manipular la data y transformarla antes de emitirla,
      // como por ejemplo acontinuacion se pasa el dato y se transforma el string en numero
      map( resp => resp.valor),
      // el operador filter siempre resiven una funcion, y siempre debe de retornar un bolenao,
      // en la funcion siempre resive dos valores uno es el valor y el otro es el index el numero de veses que se llamara la condicion
      filter( ( valor, index) => {
        if ( (valor % 2) === 1 ){
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );
}
}
