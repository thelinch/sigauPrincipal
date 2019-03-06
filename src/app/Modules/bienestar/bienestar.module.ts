import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from './componentAdmin/reportes/reportes.component';
import { BienestarRoutingModule } from './bienestar.routing.module';
import { PrincipalComponent } from './componentUsuario/principal/principal.component';
import { AdminComponent } from './componentAdmin/admin/admin.component';
import { RequisitoComponent } from './componentAdmin/requisito/requisito.component';
import { MaterialModule } from 'src/app/global/global.module';
import { ListaComponent } from './componentAdmin/lista/lista.component';


@NgModule({
  declarations: [ReportesComponent,
    PrincipalComponent,
    AdminComponent,
    RequisitoComponent,
    ListaComponent
  ],
  imports: [CommonModule,
    BienestarRoutingModule,
    MaterialModule],
  exports: [PrincipalComponent],
  providers: [],
})
export class BienestarModule { }
