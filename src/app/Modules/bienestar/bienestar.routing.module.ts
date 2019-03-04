import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './componentAdmin/admin/admin.component';
import { ReportesComponent } from './componentAdmin/reportes/reportes.component';
import { PrincipalComponent } from './componentUsuario/principal/principal.component';
import { RequisitoComponent } from './componentAdmin/requisito/requisito.component';



const routes: Routes = [
  { path: "alumno/:id", component: PrincipalComponent },
  {
    path: 'admin/:id', component: AdminComponent, children: [
      { path: "reportes", component: ReportesComponent },
      { path: "requisito", component: RequisitoComponent }
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
