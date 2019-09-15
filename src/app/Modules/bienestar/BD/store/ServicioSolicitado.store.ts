import { Injectable } from '@angular/core'
import { StoreConfig, Store, EntityStore, EntityState } from '@datorama/akita';
import { obuServicios } from '../../Models/obuServicios';

export interface servicioSolicitadoState extends EntityState<obuServicios> { }
@Injectable({ providedIn: "root" })
@StoreConfig({ name: "servicioSolicitado" })
export class servicioSolicitadoStore extends EntityStore<servicioSolicitadoState, obuServicios>{
    constructor() {
        super();
    }
    setServicioSolicitado(serviciosSolicitados: obuServicios) {
        this.updateActive(serviciosSolicitados);
    }

}