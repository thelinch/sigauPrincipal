import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { servicio } from '../Models/servicio';
import { Injectable } from '@angular/core';


export interface servicioState extends EntityState<servicio> {

}
@Injectable({ providedIn: "root" })
@StoreConfig({ name: "servicios" })
export class servicioStore extends EntityStore<servicioState, servicio>{
    constructor() {
        super();
    }
}