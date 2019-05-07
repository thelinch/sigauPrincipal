import { PopupModule } from '@progress/kendo-angular-popup';
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
import { ServiciosComponent } from './componentAdmin/servicios/servicios.component';
import { ServicioService } from './services/servicio.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FilterEstadoActualPipe } from './pipes/filter-estado-actual.pipe';
import { NgxPopperModule } from 'ngx-popper';
import { ServicioSolicitadoService } from './services/servicio-solicitado.service';
@NgModule({
  declarations: [ReportesComponent,
    PrincipalComponent,
    AdminComponent,
    RequisitoComponent,
    ListaComponent,
    ListaServiciosComponent,
    ServiciosComponent,
    FilterEstadoActualPipe
  ],
  imports: [CommonModule,
    BienestarRoutingModule,
    FormsModule,
    BlockUIModule.forRoot(),
    HttpClientModule,
    NgxPopperModule,
    DropzoneModule,
    PopupModule,
    ReactiveFormsModule,
    MaterialModule],
  exports: [PrincipalComponent],
  providers: [RequisitoService, TipoRequisitoService, ServicioService, ServicioSolicitadoService],
})
export class BienestarModule { }
