import { Injectable } from "@angular/core";
import { requisitoStore } from "../BD/store/Requisito.store";
import { RequisitoService } from "../services/requisito.service";
import { requisito } from "../Models/Requisito";
import { VISIBILITY_FILTER } from "../filter/filterRequisito.model";
import { ID, arrayRemove, arrayUpdate, transaction } from "@datorama/akita";
import { take, map, flatMap, tap, switchMap, catchError } from "rxjs/operators";
import { from, Subject, Observable } from "rxjs";
import { FileService } from "src/app/global/services/file.service";
import { NotificacionBusService } from "src/app/global/services/NotificacionBusService.service";
import { TipoRequisitoService } from "../services/tipo-requisito.service";
import { variables } from "src/app/global/variablesGlobales";
import { ServicioService } from "../services/servicio.service";
import { RequisitoArchivoService } from "../services/requisitoArchivo.service";
@Injectable({ providedIn: "root" })
export class requisitoSandBox {
  // selectVisible$ = this.requisitoQuery.selectVisibleTodos$;
  private isLoadingRequisito: Subject<boolean> = new Subject();
  listaTipoRequisitos$ = this.tipoRequisitoService.all();
  // listaServiciAndTipoRequisito$ = forkJoin(this.servicioQuery.selectAll(), this.tipoRequisitoService.all());
  constructor(
    private store: requisitoStore,
    private requisitoService: RequisitoService,
    private fileService: FileService,
    private notificacionBusServicio: NotificacionBusService,
    private tipoRequisitoService: TipoRequisitoService,
    private servicioService: ServicioService,
    private requisitoArchivoService: RequisitoArchivoService
  ) {}
  listaRequisitos(): void {
    this.requisitoService.listarRequisitos().subscribe(listaRequisito => {
      this.store.set(listaRequisito);
    });
  }
  
  updateEditLoading() {
    this.store.ui.updateActive(state => {
      return {
        ...state,
        loadingUpdateRequisito: !state.loadingUpdateRequisito,
        errorUpdateRequisito: null
      };
    });
  }
  setErrorEdit(error) {
    this.store.ui.updateActive({ errorUpdateRequisito: error });
  }
  updateRequestEdit() {
    this.store.ui.updateActive({});
  }

  crearRequisito(requisito: requisito, archivos: File[]): void {
    this.requisitoService
      .gurdarRequisito(requisito)
      .pipe(
        tap(requisitoCreado => (requisito = requisitoCreado)),
        flatMap(requisitoCreado => {
          return from(archivos ? archivos : []).pipe(
            take(archivos.length),
            map((archivo: File) => {
              let formData = new FormData();
              formData.append("archivo", archivo);
              formData.append("idRequisito", requisitoCreado.id.toString());
              formData.append(
                "nombreCarpeta",
                variables.carpetaOBUArchivoRequisitos
              );
              return formData;
            })
          );
        }),
        flatMap(formData => this.fileService.guardarArchivo(formData)),
        flatMap(archivoGuardado => {
          archivoGuardado = JSON.parse(archivoGuardado);
          console.log(archivoGuardado);
          let json = { ...archivoGuardado, requisito_id: requisito.id };
          return this.requisitoArchivoService.save(json);
        })
      )
      .subscribe({
        complete: () => {
          this.store.add(requisito);
          this.notificacionBusServicio.showInfo(
            "Se creo correctamente el requisito"
          );
        }
      });
  }

  @transaction()
  setActive(idRequisito: ID) {
    this.store.ui.setActive(idRequisito);
    this.store.setActive(idRequisito);
  }
  editarRequisito(requisito: requisito, archivos: File[]): void {
    this.requisitoService
      .editarRequisito(requisito)
      .pipe(
        tap(requisitoEditado => (requisito = requisitoEditado)),
        flatMap(requisitoEditado => {
          return from(archivos ? archivos : []).pipe(
            take(archivos.length),
            map((archivo: File) => {
              let formData = new FormData();
              formData.append("archivo", archivo);
              formData.append("idRequisito", requisitoEditado.id.toString());
              formData.append(
                "nombreCarpeta",
                variables.carpetaOBUArchivoRequisitos
              );
              return formData;
            })
          );
        }),
        flatMap(formData => this.fileService.guardarArchivo(formData)),
        flatMap(archivoGuardado => {
          archivoGuardado = JSON.parse(archivoGuardado);
          let json = { ...archivoGuardado, requisito_id: requisito.id };
          return this.requisitoArchivoService.save(json);
        })
      )
      .subscribe({
        complete: () => {
          this.store.update(requisito.id, requisito);
          this.updateEditLoading();
          this.notificacionBusServicio.showSuccess(
            "Se Registro correctamente el requisito " + requisito.nombre
          );
        }
      });
  }
  eliminarArchivo(json: any) {
    this.fileService
      .eliminarArchivoRequisito(json)
      .subscribe(archivoEliminado => {
        this.store.update(json.id, servicio => ({
          archivos: arrayRemove(servicio.archivos, archivoEliminado.id)
        }));
        this.notificacionBusServicio.showSuccess(
          "Se elimino correctamente el archivo"
        );
      });
  }

  borrarRequisito(id: ID): void {
    this.requisitoService.borrarRequisito(id).subscribe(requisitoBorrado => {
      this.notificacionBusServicio.showInfo(
        "Se Elimino Correctamente el requisito " + requisitoBorrado.nombre
      );
      this.store.remove(id);
    });
  }
  editarOpcionTipo(json: any): void {
    this.requisitoService
      .editarOpcionTipo(json)
      .subscribe(requisitoActualizado => {
        this.updateEditLoading();
        this.notificacionBusServicio.showInfo(
          "Se Actualizo correctamente el requisito " +
            requisitoActualizado.nombre
        );
        this.store.update(requisitoActualizado.id, requisitoActualizado);
      });
  }
  editarOpcionServicio(json: any): void {
    this.requisitoService
      .editarOpcionServicio(json)
      .subscribe(requisitoActualizado => {
        this.updateEditLoading();
        this.notificacionBusServicio.showInfo(
          "Se Actualizo correctamente el requisito " +
            requisitoActualizado.nombre
        );

        this.store.update(requisitoActualizado.id, requisitoActualizado);
      });
  }
  cambioActualizacion(json: any) {
    this.requisitoService
      .cambiarActualizaconRequisito(json)
      .subscribe(requisitoActualizado => {
        /*this.store.update(requisitoActualizado.id, requisito => {
                tipos: arrayUpdate(requisito.tipos, json.tipo_id, { pivot.actualizacion: json.checked })
            })*/
        this.store.update(requisitoActualizado.id, requisito => ({
          tipos: arrayUpdate(requisito.tipos, json.tipo_id, {
            pivot: {
              actualizacion: json.checked,
              numero_anios_actualizacion: json.tiempo
            }
          })
        }));
        //  this.store.update(1, arrayUpdate<requisito, tipoRequisito>('tipos', 1, { pivot.actualizacion: true }))
        this.notificacionBusServicio.showInfo(
          "Se Actualizo correctamente el requisito " +
            requisitoActualizado.nombre
        );
      });
  }
  actualizarFiltrado(filter: VISIBILITY_FILTER) {
    this.store.update({ filter });
  }
  listarArchivosPorRequisito(json: any) {
    this.isLoadingRequisito.next(true);
    this.requisitoService
      .listarArchivosPorRequisitoId(json)
      .subscribe(archivos => {
        this.store.update(json.id, requisito => {
          return { ...requisito, archivos: archivos };
        });
        this.isLoadingRequisito.next(false);
      });
  }
  getLoadingRequisito(): Observable<boolean> {
    return this.isLoadingRequisito.asObservable();
  }
  //Funcionalidades del alumno
  listarRequisitosDeComedorYInternadoYTipoAlumno(json: any) {
    this.servicioService
      .listarRequisitosPorListaDeServicio(json)
      .subscribe(listaRequisitos => {
        this.store.set(listaRequisitos);
      });
  }

  //Fin de funcionalidades del alumno
}
