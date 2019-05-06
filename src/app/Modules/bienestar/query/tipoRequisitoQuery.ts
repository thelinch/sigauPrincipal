import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { tipoRequisitoState, tipoRequisitoStore } from '../store/tipoRequesito.store';
import { tipoRequisito } from '../Models/tipoRequisito';
@Injectable({ providedIn: "root" })
export class tipoRequisitoQuery extends QueryEntity<tipoRequisitoState, tipoRequisito>{
    selectTipoRequisito$ = this.selectAll();
    constructor(protected tipoRequisitoStore: tipoRequisitoStore) {
        super(tipoRequisitoStore)
    }
}