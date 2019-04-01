import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScalafondComponent } from './scalafond.component';
//  import {PrincipalComponent} from './'
import { PrincipalComponent } from '../../Modules/scalafond/componentAdmin/principal/principal.component';
const routes: Routes = [
    {
        path: "admin", component: ScalafondComponent, children: [
            { path: "principal", component: PrincipalComponent }
            // { path: "busqueda", component: BusquedaComponent },
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
