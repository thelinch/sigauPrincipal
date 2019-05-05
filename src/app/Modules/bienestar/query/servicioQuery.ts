import { QueryEntity } from '@datorama/akita';
import { servicioState, servicioStore } from '../store/servicio.store';
import { requisito } from '../Models/Requisito';
import { Injectable } from '@angular/core';
import { servicio } from '../Models/servicio';
@Injectable({ providedIn: "root" })
export class servicioQuery extends QueryEntity<servicioState, servicio>{
    constructor(protected servicioStore: servicioStore) {
        super(servicioStore);
    }
    
}