import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScalafondComponent } from './scalafond.component';
import { PrincipalComponent } from '../../Modules/scalafond/componentAdmin/principal/principal.component';
import { RegistroareaComponent } from '../../Modules/scalafond/componentAdmin/registroarea/registroarea.component';
import { RegistrodocenteComponent } from './componentAdmin/registrodocente/registrodocente.component';
import { RegistraradministrativoComponent } from './componentAdmin/registraradministrativo/registraradministrativo.component';

const routes: Routes = [
    {
        path: "admin", component: ScalafondComponent, children: [
            { path: "principal", component: PrincipalComponent},
            { path: "registroarea", component: RegistroareaComponent},
            { path: "registrodocente", component: RegistrodocenteComponent},       
            { path: "registroadministrativo", component: RegistraradministrativoComponent},      
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
export class ScalafondRoutingModule { }
