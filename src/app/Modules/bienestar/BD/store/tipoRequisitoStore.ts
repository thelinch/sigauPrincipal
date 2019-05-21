import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { tipoRequisito } from '../../Models/tipoRequisito';
import { Injectable } from '@angular/core';
export interface tipoRequisitoState extends EntityState<tipoRequisito>, ActiveState {
}
@Injectable({ providedIn: "root" })
@StoreConfig({ name: "tipoRequisitos" })
export class tipoRequisitoStore extends EntityStore<tipoRequisitoState, tipoRequisito>{
    constructor() {
        super();
    }
}