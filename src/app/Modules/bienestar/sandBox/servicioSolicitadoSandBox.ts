import { ServicioSolicitadoService } from './../services/servicio-solicitado.service';

import { Injectable } from '@angular/core';
import { servicioSolicitadoStore } from '../BD/store/ServicioSolicitado.store';

@Injectable({ providedIn: "root" })

export class servicioSolicitadoSandBox {

    constructor(private servicioSolicitadoService: ServicioSolicitadoService,
        private store: servicioSolicitadoStore) {

    }

    listarServicioSolicitado(json: any) {
        this.servicioSolicitadoService.listarServicioSolicitadoPorSemestreActual(json).subscribe(listaServicioSolicitado => {
            this.store.set(listaServicioSolicitado);
        })
    }
    registrarServicioSolicitadoPorAlumnoYSemestreActual(json: any) {
        this.servicioSolicitadoService.registrarServicioSolicitadoPorAlumnoYSemestreActual(json).subscribe(servicioSolicitado => {
            this.store.addActive(servicioSolicitado);
        })
    }
}