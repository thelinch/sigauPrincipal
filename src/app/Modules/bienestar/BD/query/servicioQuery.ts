import { QueryEntity } from '@datorama/akita';
import { servicioState, servicioStore } from '../store/servicio.store';
import { requisito } from '../../Models/Requisito';
import { Injectable } from '@angular/core';
import { servicio } from '../../Models/servicio';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { VISIBILITY_FILTER } from '../../filter/filterServicio.model';
@Injectable({ providedIn: "root" })
export class servicioQuery extends QueryEntity<servicioState, servicio>{
    // selectVisbleFilter$ = this.select(state => state.filter)
    //  selectVisibleServicios$ = combineLatest(this.selectVisbleFilter$, this.selectAll, this.getVisibleServicio)
    constructor(protected servicioStore: servicioStore) {
        super(servicioStore);
        this.createUIQuery();
    }
    /* private getVisibleServicio(filter, servicios: servicio[]) {
         switch (filter) {
             case VISIBILITY_FILTER.MOSTRAR_ACTIVADOS:
                 return servicios.filter(servicio => servicio.activador)
             default:
                 return servicios;
         }
     }*/
}