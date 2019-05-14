import { QueryEntity } from '@datorama/akita';
import { servicioState, servicioStore } from '../store/servicio.store';
import { requisito } from '../Models/Requisito';
import { Injectable } from '@angular/core';
import { servicio } from '../Models/servicio';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: "root" })
export class servicioQuery extends QueryEntity<servicioState, servicio>{
    constructor(protected servicioStore: servicioStore) {
        super(servicioStore);
    }
    selectServiceRequisitos(): Observable<requisito[]> {
        
        return this.selectActive().pipe(map(servicio => servicio.requisitos));
    }
}