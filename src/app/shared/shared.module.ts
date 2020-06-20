import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Pipes
import { PipesModule } from '../pipes/pipes.module';



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
        BreadcrumbsComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        NopagesfoundComponent,
        BreadcrumbsComponent
    ]

})

export class SharedModule{}
