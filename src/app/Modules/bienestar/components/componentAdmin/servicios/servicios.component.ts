
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { alumno } from 'src/app/global/Models/Alumno';
import { ID } from '@datorama/akita';
import { servicio } from '../../../Models/servicio';
import { requisito } from '../../../Models/Requisito';
import { ServicioFilter, filtradoInicial, VISIBILITY_FILTER } from '../../../filter/filterServicio.model';
import { servicioQuery } from '../../../BD/query/servicioQuery';
import { servicioSandBox } from '../../../sandBox/servicioSandBox';
import { cicloAcademicoSandBox } from 'src/app/global/sandBox/cicloAcademicoSandBox';
import { cicloAcademicoQuery } from 'src/app/global/BD/query/cicloAcademicoQuery';
import { cicloAcademico } from 'src/app/global/Models/cicloAcademico';
/**
 *
 *
 * @export
 * @class ServiciosComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})

export class ServiciosComponent implements OnInit {

  listaServicio$: Observable<servicio[]>
  listaAlumnos: alumno[]
  idModalRegistroServicio: string = "modalRegisto";
  idModalRegistroRegistroFecha: string = "modalActualizacionFecha"
  idModalRegistoRequisitoDeServicio = "modalRequisitoServicio"
  idModalVisualizacionAlumno = "modalAlumno"
  idModalFormularioCreacionAmpliacion = "modalFormularioCreacionAmpliacion";
  idModalVisualizacionDeAmpliaciones="listaAmpliaciones"
  formularioActualizacionFechaServicio: FormGroup;
  servicioSeleccionado$: Observable<servicio>
  listaRequisitoServicio$: Observable<requisito[]>;
  listaDecicloAcademico$: Observable<cicloAcademico[]>
  formularioCreacionAmpliacion: FormGroup;
  loading$: Observable<boolean>;
  loadingService$: Observable<boolean>
  formularioServicio: FormGroup;
  formControlFiltrado: FormControl
  listaFiltroServicio: Array<ServicioFilter>
  @BlockUI() blockUI: NgBlockUI;
  constructor(private fb: FormBuilder,
    private servicioQuery: servicioQuery,
    private sb: servicioSandBox,
    private sandBoxCicloAcademico: cicloAcademicoSandBox,
    private cicloAcademicoQuery: cicloAcademicoQuery) { }

  ngOnInit() {
    this.sandBoxCicloAcademico.all();
    this.listaFiltroServicio = filtradoInicial;
    this.formControlFiltrado = new FormControl(VISIBILITY_FILTER.MOSTRAR_TODO)
    /* this.formControlFiltrado.valueChanges.subscribe(valor => {
       this.sb.actualizarFiltrado(valor);
     })*/
    this.formularioServicio = this.fb.group({
      id: new FormControl(),
      nombre: new FormControl("", [Validators.required]),
      icono: new FormControl(""),
      matricula: new FormControl("", [Validators.required])
    })
    this.formularioCreacionAmpliacion = this.fb.group({
      mujer: new FormControl(""),
      varon: new FormControl(""),
      total: new FormControl("")
    })
    this.formularioActualizacionFechaServicio = this.fb.group({
      fechaInicio: new FormControl("", Validators.required),
      fechaFin: new FormControl("", Validators.required)
    })
    this.loadingService$ = this.sb.getLoadingService();
    this.loading$ = this.servicioQuery.selectLoading();
    this.servicioSeleccionado$ = this.servicioQuery.selectActive();
    this.listaDecicloAcademico$ = this.cicloAcademicoQuery.selectAll();
    this.listarServicios();

  }
  listarServicios() {
    this.sb.listaServicio();
    this.listaServicio$ = this.servicioQuery.selectAll()
  }

  nuevoServicio() {
    this.formularioServicio.reset();
  }

  mostrarDatosFormularioServicio(idServicio: ID) {
    let servicioSeleccionado = this.servicioQuery.getEntity(idServicio);
    this.formularioServicio.get("id").setValue(servicioSeleccionado.id);
    this.formularioServicio.get("nombre").setValue(servicioSeleccionado.nombre);
    this.formularioServicio.get("icono").setValue(servicioSeleccionado.icono);
    //this.formularioServicio.get("matricula").setValue(servicioSeleccionado.codigoMatricula)

  }
  eliminarServicio(servicio: servicio) {
    Swal.fire({
      title: "¿Desea Eliminar el Servicio?",
      showCancelButton: true,
      type: "question",
      showConfirmButton: true,
      cancelButtonText: "cancelar",
      confirmButtonText: "OK",

    }).then(respuesta => {
      if (respuesta.value) {
        this.sb.eliminarServicio(servicio.id);
      }
    })
  }
  guardarYEditarServicio(valorFomulario: any) {
    if (valorFomulario.id == null) {
      delete valorFomulario.id
      console.log(valorFomulario)
      this.sb.guardarServicio(valorFomulario as servicio);
    } else {
      this.sb.editarServicio(valorFomulario);
    }
  }
  listarAmpliacionesPorServicio(servicio: servicio) {
    let json = {
      codigoMatricula: servicio.codigoMatricula,
      id: servicio.id
    }
    this.sb.listarAmpliacionesPorServicio(json, servicio);
    this.servicioSeleccionado$.subscribe(console.log)
  }
  requisitosPorIdServicio(servicio: servicio) {
    let json = {
      id: servicio.id

    }
    this.sb.requisitosPorIdServicio(json, servicio);
    this.abrirModal(this.idModalRegistoRequisitoDeServicio)

  }
  setActiveServicio(servicio: servicio) {
    this.sb.setActivate(servicio.id);
  }
  activarServicio(formValue: any) {
    let servicioSelecionado = this.servicioQuery.getEntity(this.servicioQuery.getActiveId());
    let fechaInicio = moment(formValue.fechaInicio)
    let fechaFin = moment(formValue.fechaFin)

    let jsonFecha: any = {
      id: servicioSelecionado.id,
      fechaInicio: fechaInicio.format(),
      fechaFin: fechaFin.format()
    }
    this.sb.activacionServicio(jsonFecha);

  }
  crearAmpliacionPorServicio(formValue: any) {
    let servicioSeleccionado: servicio = this.servicioQuery.getEntity(this.servicioQuery.getActiveId())
    formValue.servicio_id = servicioSeleccionado.id;
    formValue.codigoMatricula = servicioSeleccionado.codigoMatricula;
    this.sb.crearAmpliacionServicioId(formValue, servicioSeleccionado);
  }
  activarModalFormularioActualizacionFechaServicio(servicio: servicio) {
    this.setActiveServicio(servicio);
    let servicioSelecionado = this.servicioQuery.getEntity(this.servicioQuery.getActiveId());

    if (servicioSelecionado.fechaFin && servicioSelecionado.fechaInicio) {
      this.formularioActualizacionFechaServicio.get("fechaInicio").patchValue(servicioSelecionado.fechaInicio)
      this.formularioActualizacionFechaServicio.get("fechaFin").patchValue(servicioSelecionado.fechaFin)
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
    this.blockUI.start()
  }
  cerrarBlock() {
    this.blockUI.stop();
  }

  //FIN DE FUNCIONES COMUNES
}
