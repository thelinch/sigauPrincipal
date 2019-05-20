import { EntityState, EntityStore, StoreConfig, ActiveState, getInitialEntitiesState, EntityUIStore } from '@datorama/akita';
import { servicio, servicioUI } from '../../Models/servicio';
import { Injectable } from '@angular/core';
import { requisito } from '../../Models/Requisito';


export interface servicioState extends EntityState<servicio>, ActiveState {
    ui: {
        date: Date;
    };
}
export interface servicioUIState extends EntityState<servicioUI> {

}
const estadoInicial = {
    ui: {
        date: new Date()
    }
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "servicios" })
export class servicioStore extends EntityStore<servicioState, servicio>{
    ui: EntityUIStore<servicioUIState, servicioUI>;
    constructor() {
        super(estadoInicial);
        this.createUIStore().setInitialEntityState({ isLoading: false, isOpen: false, viewMode: { mode: "inicial" } });
    }
}