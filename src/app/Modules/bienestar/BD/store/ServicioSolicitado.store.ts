import { Injectable } from '@angular/core'
import { StoreConfig, Store, EntityStore, EntityState } from '@datorama/akita';
import { servicioSolicitados } from '../../Models/servicioSolicitados';

export interface servicioSolicitadoState extends EntityState<servicioSolicitados> { }
@Injectable({ providedIn: "root" })
@StoreConfig({ name: "servicioSolicitado" })
export class servicioSolicitadoStore extends EntityStore<servicioSolicitadoState, servicioSolicitados>{
    constructor() {
        super();
    }
    setServicioSolicitado(serviciosSolicitados: servicioSolicitados) {
        this.updateActive(serviciosSolicitados);
    }

}