import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalRoutingModule } from './principal.rounting.module';
import { PrincipalModulosComponent } from './principal-modulos.component';
import { ModulosComponent } from './modulos/modulos.component';
import { NavegacionDirective } from '../global/directives/navegacion.directive';
import { MaterialModule } from '../global/global.module';

@NgModule({

  declarations: [PrincipalModulosComponent, ModulosComponent, NavegacionDirective],
  imports: [CommonModule, PrincipalRoutingModule, MaterialModule],
  exports: [PrincipalModulosComponent],
  providers: [],
})
export class PrincipalModule { }
