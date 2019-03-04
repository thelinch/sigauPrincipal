import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: "principal/usuario/:id", loadChildren: './principal-modulos/principal.module#PrincipalModule' },
  { path: "bienestar", loadChildren: "./Modules/bienestar/bienestar.module#BienestarModule" },
  { path: "scalafond", loadChildren: "./Modules/scalafond/scalafond.module#ScalafondModule" },
  {
    path: "titulos", loadChildren: "./Modules/titulos/titulos.module#TitulosModule"
  },
  { path: "convenios", loadChildren: "./Modules/convenios/convenios.module#ConveniosModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
