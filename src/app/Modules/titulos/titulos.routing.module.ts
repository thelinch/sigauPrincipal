import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TitulosComponent } from './titulos.component';
import { PrincipalComponent } from './componentAdmin/principal/principal.component';
import { BusquedaComponent } from './componentAdmin/busqueda/busqueda.component';
import { RegistrosComponent } from './componentAdmin/registros/registros.component';
import { RegistrobachillerComponent } from './componentAdmin/registrobachiller/registrobachiller.component';
import { RegistrotituladoComponent } from './componentAdmin/registrotitulado/registrotitulado.component';
import { RegistromaestriaComponent } from './componentAdmin/registromaestria/registromaestria.component';
import { RegistrodoctoradoComponent } from './componentAdmin/registrodoctorado/registrodoctorado.component';


const routes: Routes = [
    {
        path: "admin", component: TitulosComponent, children: [
            { path: "principal", component: PrincipalComponent },
            { path: "busqueda", component: BusquedaComponent },
            { path: "registros", component: RegistrosComponent },
            { path: "registrobachiller", component: RegistrobachillerComponent},
            {path: "registrotitulado", component: RegistrotituladoComponent},
            {path: "registromaestria", component: RegistromaestriaComponent},
            {path: "registrodoctorado", component: RegistrodoctoradoComponent}]
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
export class TitulosRoutingModule { }
