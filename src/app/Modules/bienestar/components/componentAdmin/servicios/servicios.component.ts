import { Component, OnInit, AfterViewInit } from "@angular/core";
import { functionsGlobal } from "src/app/global/funciontsGlobal";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Observable } from "rxjs";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import Swal from "sweetalert2";
import * as moment from "moment";
import { alumno } from "src/app/global/Models/Alumno";
import { ID } from "@datorama/akita";
import { servicio } from "../../../Models/servicio";
import { requisito } from "../../../Models/Requisito";
import {
  ServicioFilter,
  filtradoInicial,
  VISIBILITY_FILTER
} from "../../../filter/filterServicio.model";
import { servicioQuery } from "../../../BD/query/servicioQuery";
import { servicioSandBox } from "../../../sandBox/servicioSandBox";
import { cicloAcademicoSandBox } from "src/app/global/sandBox/cicloAcademicoSandBox";
import { cicloAcademicoQuery } from "src/app/global/BD/query/cicloAcademicoQuery";
import { cicloAcademico } from "src/app/global/Models/cicloAcademico";
import { NotificacionBusService } from "src/app/global/services/NotificacionBusService.service";
import { JpPreloadService } from "@jaspero/ng-image-preload";
/**
 *
 *
 * @export
 * @class ServiciosComponent
 * @implements {OnInit}
 */
@Component({
  selector: "app-servicios",
  templateUrl: "./servicios.component.html",
  styleUrls: ["./servicios.component.scss"]
})
export class ServiciosComponent implements OnInit {
  listaServicio$: Observable<servicio[]>;
  listaAlumnos: alumno[];
  idModalRegistroServicio: string = "modalRegisto";
  idModalRegistroRegistroFecha: string = "modalActualizacionFecha";
  idModalRegistoRequisitoDeServicio = "modalRequisitoServicio";
  idModalVisualizacionAlumno = "modalAlumno";
  idModalFormularioCreacionAmpliacion = "modalFormularioCreacionAmpliacion";
  idModalVisualizacionDeAmpliaciones = "listaAmpliaciones";

  formularioActualizacionFechaServicio: FormGroup;
  servicioSeleccionado$: Observable<servicio>;
  listaRequisitoServicio$: Observable<requisito[]>;
  listaDecicloAcademico$: Observable<cicloAcademico[]>;
  formularioCreacionAmpliacion: FormGroup;
  loading$: Observable<boolean>;
  servicioSeleccionado: servicio;
  loadingService$: Observable<boolean>;
  formularioServicio: FormGroup;
  formControlFiltrado: FormControl;
  listaFiltroServicio: Array<ServicioFilter>;
  @BlockUI() blockUI: NgBlockUI;
  isAbiertoSelect: boolean;
  constructor(
    private fb: FormBuilder,
    private servicioQuery: servicioQuery,
    private sb: servicioSandBox,
    private sandBoxCicloAcademico: cicloAcademicoSandBox,
    private cicloAcademicoQuery: cicloAcademicoQuery,
    private notificacionService: NotificacionBusService,
    private jpPreloadService: JpPreloadService
  ) {
    this.jpPreloadService.initialize();
  }

  ngOnInit() {
    this.sandBoxCicloAcademico.all();
    this.listaFiltroServicio = filtradoInicial;
    this.notificacionService.getNotificacion().subscribe(notificacion => {
      Swal.fire({
        html: notificacion.detalle,
        type: notificacion.severidad,
        toast: true,
        position: "top-end",
        timer: 3000
      });
    });
    this.formControlFiltrado = new FormControl(VISIBILITY_FILTER.MOSTRAR_TODO);
    this.formControlFiltrado.valueChanges.subscribe(valor => {
       this.sb.actualizarFiltrado(valor);
     })
    this.formularioServicio = this.fb.group({
      id: new FormControl(),
      nombre: new FormControl("", [Validators.required]),
      icono: new FormControl(""),
      matricula: new FormControl("", [Validators.required]),
      divisio_personas: new FormControl(false)
    });
    this.formularioCreacionAmpliacion = this.fb.group({
      mujer: new FormControl("", [Validators.required]),
      varon: new FormControl("", [Validators.required]),
      total: new FormControl("", [Validators.required])
    });
    this.formularioActualizacionFechaServicio = this.fb.group({
      fechaInicio: new FormControl("", Validators.required),
      fechaFin: new FormControl("", Validators.required)
    });
    this.loadingService$ = this.sb.getLoadingService();
    this.loading$ = this.servicioQuery.selectLoading();
    this.servicioSeleccionado$ = this.servicioQuery.selectActive();
    this.listaDecicloAcademico$ = this.cicloAcademicoQuery.selectAll();
    this.listarServicios();
    functionsGlobal.iniciarModal();
  }
  openened(event) {
    this.isAbiertoSelect = event;
  }
  listarServicios() {
    this.sb.listaServicio();
    this.listaServicio$ = this.servicioQuery.selectAll();
  }

  nuevoServicio() {
    this.sb.setActivate(null);
    this.servicioSeleccionado = null;
    this.formularioServicio.reset();
  }
  compareObjeto(obj1: any, obj2: any): boolean {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
  }
  mostrarDatosFormularioServicio() {
    if (this.servicioSeleccionado) {
      this.formularioServicio.get("id").setValue(this.servicioSeleccionado.id);
      this.formularioServicio
        .get("nombre")
        .setValue(this.servicioSeleccionado.nombre);
      this.formularioServicio
        .get("icono")
        .setValue(this.servicioSeleccionado.icono);
      this.formularioServicio
        .get("matricula")
        .patchValue({
          id: this.servicioSeleccionado.ciclo_academico_actual.ciclo_academico
            .id
        });
      this.formularioServicio
        .get("divisio_personas")
        .setValue(this.servicioSeleccionado.divisio_personas);
    }
  }
  cambiarCicloAcademico(event: any) {
    if (
      event.isUserInput &&
      this.servicioSeleccionado &&
      this.isAbiertoSelect
    ) {
      Swal.fire({
        type: "warning",
        showConfirmButton: true,
        text: "Esta seguro(a)?",
        cancelButtonText: "cancelar",
        showCancelButton: true,
        confirmButtonText: "Ok"
      }).then(respuesta => {
        if (respuesta.value) {
          let json = {
            idServicioSelecionado: this.servicioSeleccionado.id,
            idCicloAcademico: event.source.value.id,
            nombreCicloAcademicoSeleccionado: event.source.value.nombre
          };
          this.sb.modificarCicloAcademico(json);
        }
      });
    }
  }
  eliminarServicio(servicio: servicio) {
    Swal.fire({
      title: "¿Desea Eliminar el Servicio?",
      showCancelButton: true,
      type: "question",
      showConfirmButton: true,
      cancelButtonText: "cancelar",
      confirmButtonText: "OK"
    }).then(respuesta => {
      if (respuesta.value) {
        this.sb.eliminarServicio(servicio.id);
      }
    });
  }
  guardarYEditarServicio(valorFomulario: any) {
    if (valorFomulario.id == null) {
      delete valorFomulario.id;
      this.sb.guardarServicio(valorFomulario as servicio);
    } else {
      this.sb.editarServicio(valorFomulario);
    }
  }
  listarAmpliacionesPorServicio() {
    let servicioSelecionado = this.servicioQuery.getEntity(
      this.servicioQuery.getActiveId()
    );
    let json = {
      codigoMatricula: servicioSelecionado.codigoMatricula,
      id: servicioSelecionado.id
    };
    this.sb.listarAmpliacionesPorServicio(json, servicioSelecionado);
  }
  requisitosPorIdServicio(servicioSeleccionado: servicio) {
    let json = {
      id: servicioSeleccionado.id
    };
    this.sb.requisitosPorIdServicio(json, servicioSeleccionado);
    this.abrirModal(this.idModalRegistoRequisitoDeServicio);
  }
  seleccionarServicio(servicio: servicio) {
    this.servicioSeleccionado = servicio;
  }
  setActiveServicio(idServicio: ID) {
    this.sb.setActivate(idServicio);
  }
  activarServicio(formValue: any) {
    let servicioSelecionado = this.servicioQuery.getEntity(
      this.servicioQuery.getActiveId()
    );
    let fechaInicio = moment(formValue.fechaInicio);
    let fechaFin = moment(formValue.fechaFin);
    if (fechaFin.diff(fechaInicio) <= 0) {
      Swal.fire({
        type: "error",
        text: "la fecha fin debe ser mayor a la fecha inicio"
      });
      return;
    }
    let jsonFecha: any = {
      id: servicioSelecionado.id,
      fechaInicio: fechaInicio.format(),
      fechaFin: fechaFin.format()
    };
    this.sb.activacionServicio(jsonFecha);
  }
  crearAmpliacionPorServicio(formValue: any) {
    let servicioSeleccionado: servicio = this.servicioQuery.getEntity(
      this.servicioQuery.getActiveId()
    );
    formValue.servicio_id = servicioSeleccionado.id;
    formValue.codigoMatricula = servicioSeleccionado.codigoMatricula;
    this.sb.crearAmpliacionServicioId(formValue, servicioSeleccionado);
  }
  activarModalFormularioActualizacionFechaServicio() {
    let servicioSelecionado = this.servicioQuery.getEntity(
      this.servicioQuery.getActiveId()
    );

    if (servicioSelecionado.fechaFin && servicioSelecionado.fechaInicio) {
      this.formularioActualizacionFechaServicio
        .get("fechaInicio")
        .patchValue(servicioSelecionado.fechaInicio);
      this.formularioActualizacionFechaServicio
        .get("fechaFin")
        .patchValue(servicioSelecionado.fechaFin);
    } else {
      this.limpiarFormularioActualizacionFechaServicio();
    }
  }
  limpiarFormularioActualizacionFechaServicio() {
    this.formularioActualizacionFechaServicio.reset();
  }
  disabledFormularioServicio() {
    this.formularioServicio.disable();
  }
  enabledFormularioServicio() {
    this.formularioServicio.enable();
  }
  nuevaAmpliacion(servicioS: servicio) {
    if (!servicioS.divisio_personas) {
      this.formularioCreacionAmpliacion.get("varon").disable();
      this.formularioCreacionAmpliacion.get("mujer").disable();
    } else {
      this.formularioCreacionAmpliacion.get("varon").enable();
      this.formularioCreacionAmpliacion.get("mujer").enable();
    }
    this.formularioCreacionAmpliacion.reset();
  }

  closeModal(id: string) {
    functionsGlobal.closeModal(id);
  }
  //FUNCIONES COMUNES

  /**
   *
   * @param id
   */
  abrirModal(id: string) {
    functionsGlobal.openModal(id);
  }
  cerrarModal(id: string) {
    functionsGlobal.closeModal(id);
  }
  abrirBlock() {
    this.blockUI.start();
  }
  cerrarBlock() {
    this.blockUI.stop();
  }

  //FIN DE FUNCIONES COMUNES
}
