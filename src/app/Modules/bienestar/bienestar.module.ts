import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from './componentAdmin/reportes/reportes.component';
import { BienestarRoutingModule } from './bienestar.routing.module';
import { PrincipalComponent } from './componentUsuario/principal/principal.component';
import { AdminComponent } from './componentAdmin/admin/admin.component';
import { RequisitoComponent } from './componentAdmin/requisito/requisito.component';
import { MaterialModule } from 'src/app/global/global.module';
import { ListaComponent } from './componentAdmin/lista/lista.component';
import { ListaServiciosComponent } from './componentUsuario/lista/lista.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RequisitoService } from './services/requisito.service';
import { BlockUIModule } from 'ng-block-ui';
import { TipoRequisitoService } from './services/tipo-requisito.service';
import { Select2Module } from 'ng2-select2';
import { ServiciosComponent } from './componentAdmin/servicios/servicios.component';
import { ServicioService } from './services/servicio.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  acceptedFiles: 'image/*,application/pdf',
  autoProcessQueue: false,
  addRemoveLinks: true,
  clickable: true,
  dictInvalidFileType: "El archivo no es Aceptado",
  dictRemoveFile: "Quitar Archivo",
  dictRemoveFileConfirmation: "¿Esta seguro de quitar el archivo?",
  maxFiles: 50,
  uploadMultiple:true,

};
@NgModule({
  declarations: [ReportesComponent,
    PrincipalComponent,
    AdminComponent,

    RequisitoComponent,
    ListaComponent,
    ListaServiciosComponent,
    ServiciosComponent
  ],
  imports: [CommonModule,
    BienestarRoutingModule,
    FormsModule,
    BlockUIModule.forRoot(),
    HttpClientModule,
    DropzoneModule,
    ReactiveFormsModule,
    MaterialModule, Select2Module],
  exports: [PrincipalComponent],
  providers: [RequisitoService, TipoRequisitoService, ServicioService, {
    provide: DROPZONE_CONFIG,
    useValue: DEFAULT_DROPZONE_CONFIG
  }],
})
export class BienestarModule { }
