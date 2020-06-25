import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-nopagesfound',
  templateUrl: './nopagesfound.component.html',
  styleUrls: ['./nopagesfound.component.css']
})
export class NopagesfoundComponent implements OnInit {

  anio: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
