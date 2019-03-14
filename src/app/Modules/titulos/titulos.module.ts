import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './componentAdmin/principal/principal.component';
import { BusquedaComponent } from './componentAdmin/busqueda/busqueda.component';
import { TitulosRoutingModule } from './titulos.routing.module';
import { TitulosComponent } from './titulos.component';
import { MaterialModule } from 'src/app/global/global.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PrincipalComponent, BusquedaComponent,TitulosComponent],
  imports: [CommonModule,TitulosRoutingModule,MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [],
  providers: [],
})
export class TitulosModule { }
