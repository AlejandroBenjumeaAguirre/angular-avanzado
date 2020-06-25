import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSethingsComponent } from './account-sethings/account-sethings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

// Guard
import { LoginGuardGuard } from '../service/guards/login-guard.guard';
import { AdminGuard } from '../service/service.index';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard', descripcion: 'Pagina de inicio'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progres', descripcion: 'Pagina con la barra de progreso dinamico'} },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas', descripcion: 'Pagina con graficas'}  },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas', descripcion: 'Pagina con las promesas'}  },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs', descripcion: 'Pagina con observables y ejemplos de operadores de rxjs'}  },
            { path: 'accountsethings', component: AccountSethingsComponent, data: { titulo: 'Ajustes del tema', descripcion: 'Pagina con los diferentes temas a aplicar a la pagina'}  },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Busqueda global', descripcion: 'pagina que realiza una busqueda global a partir de un termino'}  },

            // Opciones de usuarios, medicos y hospitales
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [ AdminGuard ],
                data: { titulo: 'Opciones del usuario', descripcion: 'Pagina para mantenimiento de los usuarios'}
            },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Opciones de medicos', descripcion: 'Pagina para mantenimiento de los medicos'} },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Opciones del medico', descripcion: 'Pagina para mantenimiento del medico'} },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Opciones del Hospital', descripcion: 'Pagina que me muestra los hospitales y sus opciones de modificacion y eleminacion'} },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil del usuario', descripcion: 'Paginacon el perfil de los usuairos'}  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
