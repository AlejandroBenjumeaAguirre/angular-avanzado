import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';



@NgModule({
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
