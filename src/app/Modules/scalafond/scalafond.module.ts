import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScalafondComponent } from './scalafond.component';
// import { PrincipalComponent } from '../../Modules/scalafond/componentAdmin/principal/principal.component';
import {PrincipalComponent} from './componentAdmin/principal/principal.component';
import { ScalafondRoutingModule } from './scalafond.routing.module';

@NgModule({
  declarations: [ScalafondComponent,PrincipalComponent],
  imports: [CommonModule,ScalafondRoutingModule],
  exports: [],
  providers: [],
})
export class ScalafondModule { }
