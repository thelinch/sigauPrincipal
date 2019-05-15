import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { requisito } from '../../Models/Requisito';
import { Inject, Injectable } from '@angular/core';
import { VISIBILITY_FILTER } from '../../filter/filterRequisito.model';

export interface requisitoState extends EntityState<requisito>,ActiveState {
    filter: VISIBILITY_FILTER
}
const initialState = {
    filter: VISIBILITY_FILTER.MOSTRAR_TODO
}
@Injectable({ providedIn: "root" })
@StoreConfig({ name: "requisitos" })
export class requisitoStore extends EntityStore<requisitoState, requisito>{
    constructor() {
        super(initialState);
    }
}