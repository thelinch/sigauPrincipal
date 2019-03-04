import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalModulosComponent } from './principal-modulos.component';


const routes: Routes = [
  {
    path: '', component: PrincipalModulosComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
