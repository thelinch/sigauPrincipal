import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { obuServicios } from '../../Models/obuServicios';
import { servicioSolicitadoStore, servicioSolicitadoState } from '../store/ServicioSolicitado.store';
@Injectable({ providedIn: "root" })
export class servicioSolicitadoQuery extends QueryEntity<servicioSolicitadoState, obuServicios>{

    constructor(protected store: servicioSolicitadoStore) {
        super(store)
    }



}