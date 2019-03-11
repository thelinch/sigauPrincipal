import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TitulosComponent } from './titulos.component';
import { PrincipalComponent } from './componentAdmin/principal/principal.component';
import { BusquedaComponent } from './componentAdmin/busqueda/busqueda.component';


const routes: Routes = [
        {path: "admin",component:TitulosComponent,children:[{path: "principal", component:PrincipalComponent},{path: "busqueda", component:BusquedaComponent }]}

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
export class TitulosRoutingModule {}
