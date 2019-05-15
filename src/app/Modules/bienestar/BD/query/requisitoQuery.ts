import { Injectable } from '@angular/core';
import { requisito } from '../../Models/Requisito';
import { QueryEntity } from '@datorama/akita';
import { requisitoState, requisitoStore } from '../store/Requisito.store';
import { combineLatest } from 'rxjs';
import { VISIBILITY_FILTER } from '../../filter/filterRequisito.model';
@Injectable({ providedIn: "root" })
export class requisitoQuery extends QueryEntity<requisitoState, requisito>{
    selectVisibleFilter$ = this.select(state => state.filter)
    selectVisibleTodos$ = combineLatest(this.selectVisibleFilter$, this.selectAll(), this.getVisibleRequisito)
    constructor(protected requisitoStore: requisitoStore) {
        super(requisitoStore);
    }
    private getVisibleRequisito(filter, requisitos: requisito[]) {
        switch (filter) {
            case VISIBILITY_FILTER.MOSTRAR_PRIORITARIOS:
                console.log("entro")
                return requisitos.filter(r => r.prioridad);
            case VISIBILITY_FILTER.MOSTRAR_REQUERIDOS:
                return requisitos.filter(r => r.requerido);
            default:
                return requisitos;
        }
    }
}