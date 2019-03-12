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
    ReactiveFormsModule,
    MaterialModule, Select2Module],
  exports: [PrincipalComponent],
  providers: [RequisitoService, TipoRequisitoService,ServicioService],
})
export class BienestarModule { }
