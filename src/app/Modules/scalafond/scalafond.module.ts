import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScalafondComponent } from './scalafond.component';
import {PrincipalComponent} from './componentAdmin/principal/principal.component';
import { ScalafondRoutingModule } from './scalafond.routing.module';
import { RegistroareaComponent } from './componentAdmin/registroarea/registroarea.component';
import { MaterialModule } from 'src/app/global/global.module';
import { RegistrodocenteComponent } from './componentAdmin/registrodocente/registrodocente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { RegistraradministrativoComponent } from './componentAdmin/registraradministrativo/registraradministrativo.component';


@NgModule({
  declarations: [ScalafondComponent,PrincipalComponent,RegistroareaComponent, RegistrodocenteComponent, RegistraradministrativoComponent],
  imports: [CommonModule,ScalafondRoutingModule,MaterialModule,FormsModule,ReactiveFormsModule,MatDividerModule],
  exports: [],
  providers: [],
})
export class ScalafondModule { }
