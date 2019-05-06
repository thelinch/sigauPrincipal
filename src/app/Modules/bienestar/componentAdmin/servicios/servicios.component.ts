
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { servicio } from '../../Models/servicio';
import { Model, ModelFactory } from '@angular-extensions/model';
import { ServicioService } from '../../services/servicio.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { requisito } from '../../Models/Requisito';
import { alumno } from 'src/app/global/Models/Alumno';
import { servicioQuery } from '../../query/servicioQuery';
import { ID } from '@datorama/akita';
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
  listaRequisitos: requisito[]
  listaAlumnos: alumno[]
  private modelServicio: Model<servicio[]>
  autoSuma: boolean = false;
  idModalRegistroServicio: string = "modalRegisto";
  idModalRegistroRegistroFecha: string = "modalActualizacionFecha"
  idModalRegistoRequisitoDeServicio = "modalRequisitoServicio"
  idModalVisualizacionAlumno = "modalAlumno"
  formularioActualizacionFechaServicio: FormGroup;
  formularioServicio: FormGroup;
  @BlockUI() blockUI: NgBlockUI;
  servicioSeleccionado: servicio;
  constructor(private fb: FormBuilder,
    private servicioService: ServicioService,
    private modelFactory: ModelFactory<servicio[]>,
    private servicioQuery: servicioQuery) { }

  ngOnInit() {
    this.formularioServicio = this.fb.group({
      id: new FormControl(),
      nombre: new FormControl("", [Validators.required]),
      total: new FormControl("", Validators.required),
      icono: new FormControl(""),
      vacantesHombre: new FormControl(""),
      vacantesMujer: new FormControl(""),
      codigoMatricula: new FormControl("", [Validators.required])
    })
    this.formularioActualizacionFechaServicio = this.fb.group({
      fechaInicio: new FormControl("", Validators.required),
      fechaFin: new FormControl("", Validators.required)
    })
    this.listarServicios();

  }
  listarServicios() {
    this.abrirBlock();
    this.servicioService.listarServicio().subscribe(listaServicio => this.cerrarBlock());
    this.listaServicio$ = this.servicioQuery.selectAll();
  }

  nuevoServicio() {
    this.formularioServicio.reset();
  }

  mostrarDatosFormularioServicio(idServicio: ID) {
    this.servicioQuery.selectEntity(idServicio).subscribe(servicioSeleccionado => {
      this.formularioServicio.get("id").setValue(servicioSeleccionado.id);
      this.formularioServicio.get("nombre").setValue(servicioSeleccionado.nombre);
      this.formularioServicio.get("total").setValue(servicioSeleccionado.total);
      this.formularioServicio.get("vacantesHombre").setValue(servicioSeleccionado.vacantesHombre);
      this.formularioServicio.get("vacantesMujer").setValue(servicioSeleccionado.vacantesMujer);
      this.formularioServicio.get("icono").setValue(servicioSeleccionado.icono);
      this.formularioServicio.get("codigoMatricula").setValue(servicioSeleccionado.codigoMatricula)
    })

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
        this.abrirBlock()
        this.servicioService.eliminarServicio(servicio.id).subscribe(servicioEliminado => {
          functionsGlobal.getToast("Se elimino correctamanete el servicio " + servicioEliminado.nombre)
          this.cerrarBlock();
        })
      }
    })
  }
  guardarYEditarServicio(valorFomulario: any) {
    this.abrirBlock();

    if (valorFomulario.id == null) {
      delete valorFomulario.id
      this.servicioService.guardarServicio(valorFomulario as servicio).subscribe(nuevoServicio => {
        this.closeModal(this.idModalRegistroServicio);
        functionsGlobal.getToast("Se Registro Correctamente el servicio " + nuevoServicio.nombre)
        this.cerrarBlock();
      })
    } else {

      // this.servicioSeleccionado.icono=valorFomulario.icono;
      this.servicioService.editarServicio(valorFomulario).subscribe(servicioActualizado => {
        functionsGlobal.getToast("Se Edito Correctamente " + servicioActualizado.nombre)
        this.closeModal(this.idModalRegistroServicio);
        this.cerrarBlock();
      });
    }
  }
  todososAlumnosPorIdServicio() {
    this.abrirBlock();
    let json = {
      id: this.servicioSeleccionado.id,
      codigoMatricula: this.servicioSeleccionado.codigoMatricula
    }
    this.servicioService.todososAlumnosPorIdServicio(json).subscribe(alumnos => {
      this.listaAlumnos = alumnos
      this.cerrarBlock();
      this.abrirModal(this.idModalVisualizacionAlumno)
    })
  }
  requisitosPorIdServicio() {
    this.abrirBlock();
    let json = {
      id: this.servicioSeleccionado.id,

    }
    this.servicioService.requisitoIdServicio(json).subscribe(requisitos => {
      this.listaRequisitos = requisitos
      this.abrirModal(this.idModalRegistoRequisitoDeServicio);
      this.cerrarBlock();
    });

  }
  activarServicio(formValue: any) {
    this.abrirBlock();
    let jsonFecha: any = {
      id: this.servicioSeleccionado.id,
      fechaInicio: formValue.fechaInicio,
      fechaFin: formValue.fechaFin
    }
    this.servicioService.activacionServicio(jsonFecha).subscribe(serviciosActualizado => {

      functionsGlobal.getToast("Se Edito Correctamente el Servicio")
      this.cerrarModal(this.idModalRegistroRegistroFecha);
      this.cerrarBlock();
    })
  }
  activarModalFormularioActualizacionFechaServicio() {
    if (this.servicioSeleccionado.fechaFin && this.servicioSeleccionado.fechaInicio) {
      this.formularioActualizacionFechaServicio.get("fechaInicio").patchValue(this.servicioSeleccionado.fechaInicio)
      this.formularioActualizacionFechaServicio.get("fechaFin").patchValue(this.servicioSeleccionado.fechaFin)
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

  setServicio(servicio: servicio) {
    this.servicioSeleccionado = servicio;
  }
  //FIN DE FUNCIONES COMUNES
}
