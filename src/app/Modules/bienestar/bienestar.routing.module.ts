import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './componentAdmin/admin/admin.component';
import { ReportesComponent } from './componentAdmin/reportes/reportes.component';
import { PrincipalComponent } from './componentUsuario/principal/principal.component';
import { RequisitoComponent } from './componentAdmin/requisito/requisito.component';
import { ListaComponent } from './componentAdmin/lista/lista.component';
import { ListaServiciosComponent } from './componentUsuario/lista/lista.component';
import { ServiciosComponent } from './componentAdmin/servicios/servicios.component';



const routes: Routes = [
  {
    path: "alumno", component: PrincipalComponent, children: [
      { path: "lista", component: ListaServiciosComponent }
    ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: "lista", component: ListaComponent },
      { path: "reportes", component: ReportesComponent },
      { path: "requisito", component: RequisitoComponent },
      {
        path: "servicio", component: ServiciosComponent
      }
    ]
  }

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienestarRoutingModule { }
