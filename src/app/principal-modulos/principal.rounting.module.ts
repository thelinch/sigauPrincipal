import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalModulosComponent } from './principal-modulos.component';


const routes: Routes = [
  {
    path: '', component: PrincipalModulosComponent, children: [
      { path: "bienestar", loadChildren: "../Modules/bienestar/bienestar.module#BienestarModule" },
      { path: "scalafond", loadChildren: "../Modules/scalafond/scalafond.module#ScalafondModule" },
      {
        path: "titulos", loadChildren: "../Modules/titulos/titulos.module#TitulosModule"
      },
      { path: "convenios", loadChildren: "../Modules/convenios/convenios.module#ConveniosModule" }]
  },

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
export class PrincipalRoutingModule { }
