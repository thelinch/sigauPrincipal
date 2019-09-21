import { PopupModule } from '@progress/kendo-angular-popup';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienestarRoutingModule } from './bienestar.routing.module';
import { MaterialModule } from 'src/app/global/global.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RequisitoService } from './services/requisito.service';
import { BlockUIModule } from 'ng-block-ui';
import { TipoRequisitoService } from './services/tipo-requisito.service';
import { ServicioService } from './services/servicio.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FilterEstadoActualPipe } from './pipes/filter-estado-actual.pipe';
import { NgxPopperModule } from 'ngx-popper';
import { ServicioSolicitadoService } from './services/servicio-solicitado.service';
import { ReportesComponent } from './components/componentAdmin/reportes/reportes.component';
import { PrincipalComponent } from './components/componentUsuario/principal/principal.component';
import { AdminComponent } from './components/componentAdmin/admin/admin.component';
import { ListaComponent } from './components/componentAdmin/lista/lista.component';
import { ListaServiciosComponent } from './components/componentUsuario/lista/lista.component';
import { ServiciosComponent } from './components/componentAdmin/servicios/servicios.component';
import { RequisitoComponent } from './components/componentAdmin/requisito/requisito.component';
import { JpImagePreloadModule } from '@jaspero/ng-image-preload';
import { ListaRequisitoComponent } from './partialsComponent/lista-requisito/lista-requisito.component';
import { SwiperModule } from 'angular2-useful-swiper';
import { obuSolicitudRequisitoArchivos } from './services/obuSolicitud-requisitos-archivos.service';
@NgModule({
  declarations: [ReportesComponent,
    PrincipalComponent,
    AdminComponent,
    RequisitoComponent,
    ListaComponent,
    ListaServiciosComponent,
    ServiciosComponent,
    FilterEstadoActualPipe,
    ListaRequisitoComponent
  ],
  imports: [CommonModule,
    SwiperModule,
    BienestarRoutingModule,
    FormsModule,
    BlockUIModule.forRoot(),
    HttpClientModule,
    JpImagePreloadModule.forRoot(),
    NgxPopperModule,
    DropzoneModule,
    PopupModule,
    ReactiveFormsModule,
    MaterialModule],
  exports: [PrincipalComponent],
  providers: [RequisitoService, TipoRequisitoService, obuSolicitudRequisitoArchivos,ServicioService, ServicioSolicitadoService],
})
export class BienestarModule { }
