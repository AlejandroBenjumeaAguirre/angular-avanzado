import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import servicios
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  SubirArchivoService,
  HospitalesService,
  MedicoService,
  LoginGuardGuard,
  AdminGuard,
  VerificaTokenGuard
} from './service.index';

import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-update/modal-upload.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [SettingsService,
              SidebarService,
              SharedService,
              UsuarioService,
              SubirArchivoService,
              ModalUploadService,
              HospitalesService,
              MedicoService,
              LoginGuardGuard,
              AdminGuard,
              VerificaTokenGuard
            ]
})
export class ServiceModule { }
