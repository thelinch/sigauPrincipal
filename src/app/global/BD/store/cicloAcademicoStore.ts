import { Injectable } from '@angular/core';
import { EntityState, StoreConfig, EntityStore, ActiveState } from '@datorama/akita';
import { cicloAcademico } from '../../Models/cicloAcademico';

export interface cicloAcademicoState extends EntityState<cicloAcademico>, ActiveState {

}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "cicloAcademicos" })
export class cicloAcademicoStore extends EntityStore<cicloAcademicoState, cicloAcademico>{
    constructor() {
        super();
    }

}