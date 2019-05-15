import { Injectable } from '@angular/core';
import { EntityState, StoreConfig, EntityStore } from '@datorama/akita';
import { tipoRequisito } from '../../Models/tipoRequisito';

export interface tipoRequisitoState extends EntityState<tipoRequisito> {

}
@Injectable({ providedIn: "root" })
@StoreConfig({ name: "tipoRequisitos" })
export class tipoRequisitoStore extends EntityStore<tipoRequisitoState, tipoRequisito>{

}