import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard'},
        { titulo: 'Graficas', url: '/graficas1'},
        { titulo: 'ProgressBar', url: '/progress'},
        { titulo: 'Promesas', url: '/promesas'},
        { titulo: 'Rxjs', url: '/rxjs'}
      ]
    },
    {
      titulo: 'Opciones del usuario',
      icono: 'mdi mdi-account-circle',
      submenu: [
        { titulo: 'Usuarios', icono: 'mdi mdi-account', url: '/usuarios'},
        { titulo: 'Medicos', icono: 'mdi mdi-hospital', url: '/medicos'},
        { titulo: 'Hospitales', icono: 'mdi mdi-hospital-building', url: '/hospitales'}
      ]
    }
  ];

  constructor() { }
}
