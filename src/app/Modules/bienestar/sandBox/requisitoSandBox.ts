import { Injectable } from '@angular/core';
import { requisitoStore } from '../BD/store/Requisito.store';
import { RequisitoService } from '../services/requisito.service';
import { requisito } from '../Models/Requisito';
import { VISIBILITY_FILTER } from '../filter/filterRequisito.model';
import { ID, arrayRemove, arrayUpdate } from '@datorama/akita';
import { take, map, flatMap } from 'rxjs/operators';
import { from, Subject, Observable } from 'rxjs';
import { FileService } from 'src/app/global/services/file.service';
import { NotificacionBusService } from 'src/app/global/services/NotificacionBusService.service';
import { TipoRequisitoService } from '../services/tipo-requisito.service';
import { variables } from 'src/app/global/variablesGlobales';
import { ServicioService } from '../services/servicio.service';
@Injectable({ providedIn: "root" })
export class requisitoSandBox {

    // selectVisible$ = this.requisitoQuery.selectVisibleTodos$;
    private isLoadingRequisito: Subject<boolean> = new Subject();
    listaTipoRequisitos$ = this.tipoRequisitoService.all();
    // listaServiciAndTipoRequisito$ = forkJoin(this.servicioQuery.selectAll(), this.tipoRequisitoService.all());
    constructor(private store: requisitoStore,
        private requisitoService: RequisitoService,
        private fileService: FileService,
        private notificacionBusServicio: NotificacionBusService,
        private tipoRequisitoService: TipoRequisitoService,
        private servicioService: ServicioService
    ) {
    }
    listaRequisitos(): void {
        this.requisitoService.listarRequisitos().subscribe(listaRequisito => {
            this.store.set(listaRequisito)
        });
    }
    crearRequisito(requisito: requisito, archivos: File[]): void {
        this.requisitoService.gurdarRequisito(requisito).subscribe(requisitoCreado => {
            from(archivos ? archivos : []).pipe(take(archivos.length), map((archivo: File) => {
                let formData = new FormData();
                formData.append("archivo", archivo)
                formData.append("idRequisito", requisitoCreado.id.toString());
                formData.append("nombreCarpeta", variables.carpetaOBUArchivoRequisitos)
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

    editarRequisito(requisito: requisito, archivos: File[]): void {
        this.requisitoService.editarRequisito(requisito).subscribe(requisitoEditado => {
            from(archivos ? archivos : []).pipe(take(archivos.length), map((archivo: File) => {
                let formData = new FormData();
                formData.append("archivo", archivo)
                formData.append("idRequisito", requisitoEditado.id.toString());
                formData.append("nombreCarpeta", variables.carpetaOBUArchivoRequisitos)
                return formData
            }), flatMap(formData => this.fileService.gurdarArchivoRequisito(formData))).subscribe({
                complete: () => {
                    this.store.update(requisitoEditado.id, requisitoEditado);
                    this.notificacionBusServicio.showSuccess("Se Registro correctamente el requisito " + requisitoEditado.nombre);
                }
            })
        })
    }
    eliminarArchivo(json: any) {
        this.fileService.eliminarArchivoRequisito(json).subscribe(archivoEliminado => {
            this.store.update(json.id, servicio => ({
                archivos: arrayRemove(servicio.archivos, archivoEliminado.id)
            }));
            this.notificacionBusServicio.showSuccess("Se elimino correctamente el archivo")
        })
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
    cambioActualizacion(json: any) {
        this.requisitoService.cambiarActualizaconRequisito(json).subscribe(requisitoActualizado => {
            /*this.store.update(requisitoActualizado.id, requisito => {
                tipos: arrayUpdate(requisito.tipos, json.tipo_id, { pivot.actualizacion: json.checked })
            })*/
            this.store.update(requisitoActualizado.id, requisito => ({
                tipos: arrayUpdate(requisito.tipos, json.tipo_id, { "pivot": { actualizacion: json.checked, numero_anios_actualizacion: json.tiempo } })
            }));
            //  this.store.update(1, arrayUpdate<requisito, tipoRequisito>('tipos', 1, { pivot.actualizacion: true }))
            this.notificacionBusServicio.showInfo("Se Actualizo correctamente el requisito " + requisitoActualizado.nombre)
        })
    }
    actualizarFiltrado(filter: VISIBILITY_FILTER) {
        this.store.update({ filter })
    }
    listarArchivosPorRequisito(json: any) {
        this.isLoadingRequisito.next(true)
        this.requisitoService.listarArchivosPorRequisitoId(json).subscribe(archivos => {
            this.store.update(json.id, requisito => {
                return { ...requisito, archivos: archivos }
            })
            this.isLoadingRequisito.next(false)
        })
    }
    getLoadingRequisito(): Observable<boolean> {
        return this.isLoadingRequisito.asObservable();
    }
    //Funcionalidades del alumno 
    listarRequisitosDeComedorYInternadoYTipoAlumno(json: any) {
        this.servicioService.listarRequisitosPorListaDeServicio(json).subscribe(listaRequisitos => {
            this.store.set(listaRequisitos)
        })
    }
    
    //Fin de funcionalidades del alumno
}