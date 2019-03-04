import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalRoutingModule } from './principal.rounting.module';
import { PrincipalModulosComponent } from './principal-modulos.component';

@NgModule({
  declarations: [PrincipalModulosComponent],
  imports: [CommonModule, PrincipalRoutingModule],
  exports: [PrincipalModulosComponent],
  providers: [],
})
export class PrincipalModule { }
