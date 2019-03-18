
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
  private modelServicio: Model<servicio[]>
  autoSuma: boolean = false;
  idModalRegistroServicio: string = "modalRegisto";
  idModalRegistroRegistroFecha: string = "modalActualizacionFecha"
  formularioActualizacionFechaServicio: FormGroup;
  formularioServicio: FormGroup;
  @BlockUI() blockUI: NgBlockUI;
  servicioSeleccionado: servicio;
  constructor(private fb: FormBuilder, private servicioService: ServicioService, private modelFactory: ModelFactory<servicio[]>) { }

  ngOnInit() {
    this.formularioServicio = this.fb.group({
      id: new FormControl(),
      nombre: new FormControl("", [Validators.required]),
      total: new FormControl("", Validators.required),
      vacantesHombre: new FormControl(""),
      vacantesMujer: new FormControl("")
    })
    this.formularioActualizacionFechaServicio = this.fb.group({
      fechaInicio: new FormControl(moment(), Validators.required),
      fechaFin: new FormControl(moment(), Validators.required)
    })
    this.listarServicios();
  }
  listarServicios() {
    this.abrirBlock();
    this.servicioService.listarServicio().subscribe(servicios => {
      this.modelServicio = this.modelFactory.create(servicios);
      this.listaServicio$ = this.modelServicio.data$;
      this.cerrarBlock();
    })
  }

  nuevoServicio() {
    this.formularioServicio.reset();
  }

  mostrarDatosFormularioServicio() {
    this.formularioServicio.get("id").setValue(this.servicioSeleccionado.id);
    this.formularioServicio.get("nombre").setValue(this.servicioSeleccionado.nombre);
    this.formularioServicio.get("total").setValue(this.servicioSeleccionado.total);
    this.formularioServicio.get("vacantesHombre").setValue(this.servicioSeleccionado.vacantesHombre);
    this.formularioServicio.get("vacantesMujer").setValue(this.servicioSeleccionado.vacantesMujer);
  }
  eliminarServicio() {
    let servicios = this.modelServicio.get();
    Swal.fire({
      title: "¿Desea Eliminar el Servicio?",
      showCancelButton: true,
      type: "question",
      showConfirmButton: true,
      cancelButtonText: "cancelar",
      confirmButtonText: "OK",

    }).then(respuesta => {
      if (respuesta.value) {
        console.log(this.servicioSeleccionado)
        this.abrirBlock()
         this.servicioService.eliminarServicio(this.servicioSeleccionado.id).subscribe(servicioEliminado => {
           let index = this.buscarServicio(servicios, servicioEliminado)
           servicios.splice(index, 1);
           this.modelServicio.set(servicios);
           this.listaServicio$ = this.modelServicio.data$;
           functionsGlobal.getToast("Se elimino correctamanete el servicio")
           this.cerrarBlock();
         })
      }
    })
  }
  guardarYEditarServicio(valorFomulario: any) {
    this.abrirBlock();
    let servicios = this.modelServicio.get()
    if (valorFomulario.id == null) {
      delete valorFomulario.id
      this.servicioService.guardarServicio(valorFomulario as servicio).subscribe(nuevoServicio => {
        servicios.push(nuevoServicio);
        this.modelServicio.set(servicios);
        this.closeModal(this.idModalRegistroServicio);
        functionsGlobal.getToast("Se Registro Correctamente")
        this.cerrarBlock();
      })
    } else {

    }
  }

  activarServicio(formValue: any) {
    this.abrirBlock();
    let modeloServicio = this.modelServicio.get();
    let jsonFecha: any = {
      id: this.servicioSeleccionado.id,
      fechaInicio: (formValue.fechaInicio as moment.Moment).format("YYYY-MM-DD"),
      fechaFin: (formValue.fechaFin as moment.Moment).format("YYYY-MM-DD")
    }
    this.servicioService.activacionServicio(jsonFecha).subscribe(serviciosActualizado => {
      let index = this.buscarServicio(modeloServicio, serviciosActualizado);
      modeloServicio[index] = serviciosActualizado;
      this.modelServicio.set(modeloServicio);
      this.listaServicio$ = this.modelServicio.data$;
      functionsGlobal.getToast("Se Edito Correctamente el Servicio")
      this.cerrarModal(this.idModalRegistroRegistroFecha);
      this.cerrarBlock();
    })

  }
  activarModalFormularioActualizacionFechaServicio() {
    if (this.servicioSeleccionado.fechaFin && this.servicioSeleccionado.fechaInicio) {
      this.formularioActualizacionFechaServicio.get("fechaInicio").setValue(this.servicioSeleccionado.fechaInicio)
      this.formularioActualizacionFechaServicio.get("fechaFin").setValue(this.servicioSeleccionado.fechaFin)

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
  buscarServicio(servicios: servicio[], servicio: servicio): number {
    return servicios.findIndex(requisitoB => requisitoB.id == servicio.id)
  }
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
