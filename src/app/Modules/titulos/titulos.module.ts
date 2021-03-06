import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './componentAdmin/principal/principal.component';
import { BusquedaComponent } from './componentAdmin/busqueda/busqueda.component';
import { TitulosRoutingModule } from './titulos.routing.module';
import { TitulosComponent } from './titulos.component';
import { MaterialModule } from 'src/app/global/global.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrosComponent } from './componentAdmin/registros/registros.component';
import { RegistrobachillerComponent } from './componentAdmin/registrobachiller/registrobachiller.component';
import { RegistrotituladoComponent } from './componentAdmin/registrotitulado/registrotitulado.component';
import { RegistromaestriaComponent } from './componentAdmin/registromaestria/registromaestria.component';
import { RegistrodoctoradoComponent } from './componentAdmin/registrodoctorado/registrodoctorado.component';
import { BlockUIModule } from 'ng-block-ui';
import { DenominacionesService } from './services/denominaciones.service';
import { EmpresasService } from './services/empresas.service';
import {
  
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatTableModule
} from '@angular/material';
import {ExporterService} from './services/exporter.service';

import { from } from 'rxjs';

@NgModule({
  declarations: [PrincipalComponent, BusquedaComponent, TitulosComponent, RegistrosComponent, RegistrobachillerComponent, RegistrotituladoComponent, RegistromaestriaComponent, RegistrodoctoradoComponent],
  imports: [CommonModule,
    TitulosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule, BlockUIModule.forRoot(),
  
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule
  ],
  exports: [],
  providers: [DenominacionesService, EmpresasService, ExporterService],
})
export class TitulosModule { }
