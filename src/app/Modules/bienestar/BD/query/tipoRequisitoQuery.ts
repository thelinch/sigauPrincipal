import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { tipoRequisito } from '../../Models/tipoRequisito';
import { tipoRequisitoStore, tipoRequisitoState } from '../store/tipoRequisitoStore';
@Injectable({ providedIn: "root" })
export class tipoRequisitoQuery extends QueryEntity<tipoRequisitoState, tipoRequisito>{
    selectTipoRequisito$ = this.selectAll();
    constructor(protected tipoRequisitoStore: tipoRequisitoStore) {
        super(tipoRequisitoStore)
    }
}