import { EntityState, EntityStore, StoreConfig, ActiveState, getInitialEntitiesState } from '@datorama/akita';
import { servicio } from '../Models/servicio';
import { Injectable } from '@angular/core';
import { requisito } from '../Models/Requisito';


export interface servicioState extends EntityState<servicio>, ActiveState {
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "servicios" })
export class servicioStore extends EntityStore<servicioState, servicio>{
    constructor() {
        super();
    }
}