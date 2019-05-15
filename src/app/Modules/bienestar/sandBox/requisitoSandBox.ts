import { Injectable } from '@angular/core';
import { requisitoStore } from '../BD/store/Requisito.store';
import { RequisitoService } from '../services/requisito.service';
import { requisitoQuery } from '../BD/query/requisitoQuery';
import { requisito } from '../Models/Requisito';
import { VISIBILITY_FILTER } from '../filter/filterRequisito.model';
import { ID } from '@datorama/akita';
import { tap, take, map, flatMap } from 'rxjs/operators';
import { from, Observable, combineLatest, forkJoin } from 'rxjs';
import { FileService } from 'src/app/global/services/file.service';
import { NotificacionBusService } from 'src/app/global/services/NotificacionBusService.service';
import { TipoRequisitoService } from '../services/tipo-requisito.service';
import { ServicioService } from '../services/servicio.service';
import { servicioStore } from '../BD/store/servicio.store';
import { servicioSandBox } from './servicioSandBox';
import { servicioQuery } from '../BD/query/servicioQuery';
@Injectable({ providedIn: "root" })
export class requisitoSandBox {

    // selectVisible$ = this.requisitoQuery.selectVisibleTodos$;

    listaTipoRequisitos$ = this.tipoRequisitoService.all();
    // listaServiciAndTipoRequisito$ = forkJoin(this.servicioQuery.selectAll(), this.tipoRequisitoService.all());
    constructor(private store: requisitoStore,
        private requisitoService: RequisitoService,
        private fileService: FileService,
        private notificacionBusServicio: NotificacionBusService,
        private tipoRequisitoService: TipoRequisitoService,
    ) {
    }
    crearRequisito(requisito: requisito, archivos: File[]): void {
        this.requisitoService.gurdarRequisito(requisito).subscribe(requisitoCreado => {
            from(archivos ? archivos : []).pipe(take(archivos.length), map((archivo: File) => {
                let formData = new FormData();
                formData.append("archivo", archivo)
                formData.append("idRequisito", requisitoCreado.id.toString());
                formData.append("nombreCarpeta", "requisitos");
                return formData
            }), flatMap(formData => this.fileService.gurdarArchivoRequisito(formData))).subscribe({
                next: (respuesta) => { console.log(respuesta) },
                complete: () => {
                    this.store.add(requisitoCreado);
                    this.notificacionBusServicio.showSuccess("Se Registro correctamente el requisito " + requisitoCreado.nombre);
                }
            })
        })
    }
    setActive(idRequisito: ID) {
        this.store.setActive(idRequisito);

    }

    editarRequisito(requisito: requisito): void {
        this.requisitoService.editarRequisito(requisito).subscribe(requisitoEditado => {
            this.store.update(requisitoEditado.id, requisitoEditado);
            this.notificacionBusServicio.showInfo("Se Actualizo Correctamente");
        })
    }

    listaRequisitos(): void {
        this.requisitoService.listarRequisitos().subscribe(listaRequisito => this.store.set(listaRequisito));
    }
    borrarRequisito(id: ID): void {
        this.requisitoService.borrarRequisito(id).subscribe(requisitoBorrado => {
            this.notificacionBusServicio.showInfo("Se Elimino Correctamente el requisito " + requisitoBorrado.nombre)
            this.store.remove(id)
        });
    }
    editarOpcionTipo(json: any): void {
        this.requisitoService.editarOpcionTipo(json).subscribe(requisitoActualizado => {
            this.notificacionBusServicio.showInfo("Se Actualizo correctamente el requisito " + requisitoActualizado.nombre)
            this.store.update(requisitoActualizado.id, requisitoActualizado)
        })
    }
    editarOpcionServicio(json: any): void {
        this.requisitoService.editarOpcionServicio(json).subscribe(requisitoActualizado => {
            this.notificacionBusServicio.showInfo("Se Actualizo correctamente el requisito " + requisitoActualizado.nombre)

            this.store.update(requisitoActualizado.id, requisitoActualizado)
        })
    }
    actualizarFiltrado(filter: VISIBILITY_FILTER) {
        this.store.update({ filter })
    }
}