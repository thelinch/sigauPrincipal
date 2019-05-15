import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListaServiciosComponent } from './components/componentUsuario/lista/lista.component';
import { PrincipalComponent } from './components/componentUsuario/principal/principal.component';
import { AdminComponent } from './components/componentAdmin/admin/admin.component';
import { ListaComponent } from './components/componentAdmin/lista/lista.component';
import { ReportesComponent } from './components/componentAdmin/reportes/reportes.component';
import { RequisitoComponent } from './components/componentAdmin/requisito/requisito.component';
import { ServiciosComponent } from './components/componentAdmin/servicios/servicios.component';



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
