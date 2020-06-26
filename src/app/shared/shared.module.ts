import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Pipes
import { PipesModule } from '../pipes/pipes.module';
import { ModalUpdateComponent } from '../components/modal-update/modal-update.component';



@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        NopagesfoundComponent,
        BreadcrumbsComponent,
        ModalUpdateComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        NopagesfoundComponent,
        BreadcrumbsComponent,
        ModalUpdateComponent
    ]

})

export class SharedModule{}
