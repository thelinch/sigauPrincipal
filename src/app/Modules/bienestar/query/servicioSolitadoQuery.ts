import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { servicioSolicitados } from '../Models/servicioSolicitados';
import { servicioSolicitadoStore, servicioSolicitadoState } from '../store/ServicioSolicitado.store';
@Injectable({ providedIn: "root" })
export class servicioSolicitadoQuery extends QueryEntity<servicioSolicitadoState, servicioSolicitados>{

    constructor(protected store: servicioSolicitadoStore) {
        super(store)
    }



}