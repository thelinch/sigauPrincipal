import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './componentAdmin/principal/principal.component';
import { BusquedaComponent } from './componentAdmin/busqueda/busqueda.component';
import { TitulosRoutingModule } from './titulos.routing.module';
import { TitulosComponent } from './titulos.component';

@NgModule({
  declarations: [PrincipalComponent, BusquedaComponent,TitulosComponent],
  imports: [CommonModule,TitulosRoutingModule],
  exports: [],
  providers: [],
})
export class TitulosModule { }
