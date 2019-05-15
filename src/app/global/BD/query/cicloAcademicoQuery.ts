import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { cicloAcademicoState, cicloAcademicoStore } from '../store/cicloAcademicoStore';
import { cicloAcademico } from '../../Models/cicloAcademico';
@Injectable({ providedIn: "root" })
export class cicloAcademicoQuery extends QueryEntity<cicloAcademicoState, cicloAcademico>{
    constructor(protected cicloAcademicoStore: cicloAcademicoStore) {
        super(cicloAcademicoStore);
    }
}