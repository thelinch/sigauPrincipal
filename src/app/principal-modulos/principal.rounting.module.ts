import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalModulosComponent } from './principal-modulos.component';
import { ModulosComponent } from './modulos/modulos.component';


const routes: Routes = [
  {
    path: '', component: PrincipalModulosComponent, children: [
      { path: "modulos", component: ModulosComponent },
      { path: "bienestar", loadChildren: () => import('../Modules/bienestar/bienestar.module').then(m => m.BienestarModule) },
      { path: "scalafond", loadChildren: () => import('../Modules/scalafond/scalafond.module').then(m => m.ScalafondModule) },
      {
        path: "titulos", loadChildren: () => import('../Modules/titulos/titulos.module').then(m => m.TitulosModule)
      },
      { path: "convenios", loadChildren: () => import('../Modules/convenios/convenios.module').then(m => m.ConveniosModule) }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
