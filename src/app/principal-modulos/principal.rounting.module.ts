import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalModulosComponent } from './principal-modulos.component';
import { ModulosComponent } from './modulos/modulos.component';


const routes: Routes = [
  {
    path: '', component: PrincipalModulosComponent, children: [
      { path: "modulos", component: ModulosComponent },
      { path: "bienestar", loadChildren: "../Modules/bienestar/bienestar.module#BienestarModule" },
      { path: "scalafond", loadChildren: "../Modules/scalafond/scalafond.module#ScalafondModule" },
      {
        path: "titulos", loadChildren: "../Modules/titulos/titulos.module#TitulosModule"
      },
      { path: "convenios", loadChildren: "../Modules/convenios/convenios.module#ConveniosModule" }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
