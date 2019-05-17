import { VISIBILITY_FILTER } from './../filter/filterRequisito.model';
import { requisito } from './../Models/Requisito';
import { Injectable } from '@angular/core';
import { ServicioService } from '../services/servicio.service';
import { NotificacionBusService } from 'src/app/global/services/NotificacionBusService.service';
import { servicioStore } from '../BD/store/servicio.store';
import { ID, arrayAdd } from '@datorama/akita';
import { servicio } from '../Models/servicio';
import { requisitoStore } from '../BD/store/Requisito.store';
import { AmpliacionService } from '../services/ampliacion.service';
import { Observable, Subject } from 'rxjs';
import { CicloAcademicoService } from 'src/app/global/services/ciclo-academico.service';
@Injectable({ providedIn: "root" })
export class servicioSandBox {
    private isLoadingService: Subject<boolean> = new Subject();
    constructor(private servicioService: ServicioService,
        private notificacionService: NotificacionBusService,
        private store: servicioStore,
        private ampliacionService: AmpliacionService,
        private storeRequisito: requisitoStore,
        private cicloAcademicoService: CicloAcademicoService) {

    }

    guardarServicio(servicio: servicio) {
        this.servicioService.guardarServicio(servicio).subscribe(servicioGuardado => {
            this.notificacionService.showSuccess("Se creo exitosamente el servicio");

            this.store.add(servicioGuardado);
        })
    }
    listaServicio() {
        this.servicioService.listarServicio().subscribe(listaServicio => {
            console.log(listaServicio)
            this.store.set(listaServicio);
        })
    }
    setActivate(idServicio: ID) {
        this.store.setActive(idServicio);
    }
    eliminarServicio(idServicio: ID) {
        this.servicioService.eliminarServicio(idServicio).subscribe(servicioRemovido => {
            this.notificacionService.showSuccess("Se elimino correctamente esl servicio")
            this.store.remove(idServicio);
        })
    }
    editarServicio(servicio: servicio) {
        this.servicioService.editarServicio(servicio).subscribe(servicioEditado => {
            this.notificacionService.showSuccess("se edito correctamente el servicio")
            this.store.update(servicioEditado.id, servicioEditado);
        })
    }
    activacionServicio(servicio: servicio) {
        this.servicioService.activarServicio(servicio).subscribe(servicioActivado => {
            this.store.update(servicioActivado.id, servicio => {
                return { ...servicioActivado, activador: true }
            });
        })
    }
    requisitosPorIdServicio(json: any, servicio: servicio) {
        this.isLoadingService.next(true);
        this.setActivate(servicio.id);
        this.servicioService.listaDerequisitosPorIdServicio(json).subscribe(requisitos => {
            this.store.update(servicio.id, servicio => {
                return {
                    ...servicio,
                    requisitos: requisitos
                }
            })
            this.isLoadingService.next(false)
        })
    }
    getLoadingService(): Observable<boolean> {
        return this.isLoadingService.asObservable();
    }
    crearAmpliacionServicioId(json: any, servicio: servicio) {
        this.ampliacionService.crearAmpliacionPorIdServicio(json).subscribe(servicioActualizado => {
            this.notificacionService.showSuccess("Se agrego correctamente la ampliacion");
            this.store.update(servicio.id, servicioActualizado);
        })
    }
    listarAmpliacionesPorServicio(json: any, servicio: servicio) {
        this.isLoadingService.next(true);
        this.setActivate(servicio.id)
        this.ampliacionService.listarAmpliacionesPorServicio(json).subscribe(listaAmpliaciones => {
            this.store.update(servicio.id, servicio => {
                return {
                    ...servicio,
                    ampliaciones: listaAmpliaciones
                }
            })
            this.isLoadingService.next(false);
        })

    }
    modificarCicloAcademico(json: any) {
        this.cicloAcademicoService.modificarCicloAcademicoPorServicio(json).subscribe(servicioModificado => {
            this.store.update(servicioModificado.id, servicioModificado);
            this.notificacionService.showSuccess("se modifico el ciclo academico correctamente")
        })
    }
    actualizarFiltrado(filter: VISIBILITY_FILTER) {
        this.store.update({ filter });
    }
} 