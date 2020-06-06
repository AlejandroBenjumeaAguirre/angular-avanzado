import { Component } from '@angular/core';
import { SettingsService } from './service/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // tslint:disable-next-line:variable-name
  constructor( public _ajustes: SettingsService ) {

  }
}
