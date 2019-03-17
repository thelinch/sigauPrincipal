import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { swal } from './../../../../global/swal';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, NgModel } from '@angular/forms';
import { Observable, Observer, Subject } from 'rxjs';
import { requisito } from '../../Models/Requisito';
import { RequisitoService } from '../../services/requisito.service';
import { scan, concat, startWith } from 'rxjs/operators';
import { ModelFactory, Model } from '@angular-extensions/model';
import Swal from 'sweetalert2';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { tipoRequisito } from '../../Models/tipoRequisito';
import { TipoRequisitoService } from '../../services/tipo-requisito.service';
import FileUploadWithPreview from 'file-upload-with-preview'
import { Select2OptionData } from 'ng2-select2';
import { ServicioService } from '../../services/servicio.service';
import { servicio } from '../../Models/servicio';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSelect } from '@angular/material';
import * as $ from 'jquery';

/**
 *
 *
 * @export
 * @class RequisitoComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: ['./requisito.component.scss']
})

export class RequisitoComponent implements OnInit {

  listaRequisito$: Observable<requisito[]>
  private modelRequisito: Model<requisito[]>;
  listaServicio$: Observable<servicio[]>
  listaTipoRequisito$: Observable<tipoRequisito[]>
  idModalRegistroRequisito: string = "modal1"
  formularioRequisito: FormGroup
  requisitoSeleccionado: requisito
  @BlockUI() blockUI: NgBlockUI;
  fileUpload: FileUploadWithPreview;
  estadoActualizarResgitrarFormularion: boolean = false;
  constructor(private fb: FormBuilder, private tipoRequisitoService: TipoRequisitoService, private requisitoService: RequisitoService, private modelFactory: ModelFactory<requisito[]>, private serviciosService: ServicioService) {

  }
  ngOnInit() {
    this.formularioRequisito = this.fb.group({
      id: new FormControl(),
      nombre: new FormControl("", [Validators.required]),
      descripcion: new FormControl(""),
      requerido: new FormControl("", [Validators.required]),
      prioridad: new FormControl("", [Validators.required]),
      tipoArchivo: new FormControl("", [Validators.required]),
      tipos: new FormControl("", [Validators.required]),
      servicios: new FormControl("", [Validators.required]),
      tipoPeticion: new FormControl("", [Validators.required])
    })
    this.fileUpload = new FileUploadWithPreview("fileRequisito")
    this.listaTipoRequisito$ = this.tipoRequisitoService.all();
    this.listaServicio$ = this.serviciosService.listarServicio();
    this.listarRequisitos();
    // this.requisitoService.getAllPersona()

  }
  activarFloating(ul: ElementRef) {
    $(ul).children().each((i, element) => {
      setTimeout(() => {
        $(element).fadeToggle(500)
      }, 100 + (i * 50))
    })
  }




  listarTipoRequisito(idModal: string) {
    this.activarBlock()
    this.listaTipoRequisito$ = this.tipoRequisitoService.all();
    this.listaTipoRequisito$.subscribe(data => {
      this.listaServicio$ = this.serviciosService.listarServicio();
      this.listaServicio$.subscribe(async dataSer => {
        await this.abrirModal(idModal)
        this.cerrarBlock()
      })
    })
  }
  listarRequisitos() {
    this.activarBlock()
    this.requisitoService.listarRequisitos().subscribe(requisitos => {
      this.modelRequisito = this.modelFactory.create(requisitos)
      this.listaRequisito$ = this.modelRequisito.data$
      this.cerrarBlock()
    })
  }
  //CRUD REQUISITO
  guardarYEditarRequisito(formsValue) {
    console.log(formsValue)
    let requisitos = this.modelRequisito.get()
    let isRequerido: boolean = formsValue.requerido == "true";
    let prioridadRequisito: number = parseInt(formsValue.prioridad);
    this.blockUI.start()
    if (formsValue.id == null) {
      delete formsValue.id;
      let guardarRequisito = formsValue as requisito;
      guardarRequisito.prioridad = prioridadRequisito;
      guardarRequisito.requerido = isRequerido;
      this.requisitoService.gurdarRequisito(guardarRequisito).subscribe(requisitoGurdado => {
        console.log(requisitoGurdado)
        requisitos.push(requisitoGurdado)
        this.modelRequisito.set(requisitos)
        this.closeModal(this.idModalRegistroRequisito);
        functionsGlobal.getToast("Se Registro Correctamente")
        this.blockUI.stop();
      })
    }
    else {
      this.requisitoSeleccionado.nombre = formsValue.nombre;
      this.requisitoSeleccionado.descripcion = formsValue.descripcion;
      this.requisitoSeleccionado.tipoArchivo = formsValue.tipoArchivo;
      this.requisitoSeleccionado.prioridad = prioridadRequisito;
      this.requisitoSeleccionado.requerido = isRequerido;
      this.requisitoService.editarRequisito(this.requisitoSeleccionado).subscribe(requisitoUpdate => {
        let index = this.buscarRequisito(requisitos, requisitoUpdate);
        requisitos[index] = requisitoUpdate;
        this.modelRequisito.set(requisitos)
        this.closeModal(this.idModalRegistroRequisito);
        functionsGlobal.getToast("Se Edito Correctamente")
        this.blockUI.stop();
      })
    }
  }
  mostrarDatosFormularioRequisito() {
    let tiposSeleccionado = this.requisitoSeleccionado.tipos.map(tipo => tipo.id);
    let serviciosSeleccionado = this.requisitoSeleccionado.servicios.map(servicio => servicio.id);
    this.estadoActualizarResgitrarFormularion = true;
    this.formularioRequisito.get("id").setValue(this.requisitoSeleccionado.id);
    this.formularioRequisito.get("nombre").setValue(this.requisitoSeleccionado.nombre);
    this.formularioRequisito.get("descripcion").setValue(this.requisitoSeleccionado.descripcion)
    this.formularioRequisito.get("tipoArchivo").setValue(this.requisitoSeleccionado.tipoArchivo)
    this.formularioRequisito.get("tipos").setValue(tiposSeleccionado);
    this.formularioRequisito.get("servicios").setValue(serviciosSeleccionado);
    this.formularioRequisito.get("prioridad").patchValue(this.requisitoSeleccionado.prioridad.toString());
    this.formularioRequisito.get("requerido").patchValue(this.requisitoSeleccionado.requerido ? "true" : "false")
    this.formularioRequisito.get("tipoPeticion").patchValue(this.requisitoSeleccionado.tipoPeticion);
    this.formularioRequisito.get("servicios").clearValidators();
    this.formularioRequisito.get("tipos").clearValidators();
    this.formularioRequisito.updateValueAndValidity();
    this.fileUpload.cachedFileArray = [];
    this.fileUpload.clearImagePreviewPanel();
  }
  eliminarRequisito() {
    Swal.fire({
      title: "¿Desea Eliminar el requisito?",
      showCancelButton: true,
      type: "question",
      showConfirmButton: true,
      cancelButtonText: "cancelar",
      confirmButtonText: "OK",

    }).then(respuesta => {
      if (respuesta.value) {
        this.blockUI.start()
        this.requisitoService.borrarRequisito(this.requisitoSeleccionado.id).subscribe(requisitoDelete => {
          let arrayRequisito = this.modelRequisito.get();
          let index = this.buscarRequisito(arrayRequisito, requisitoDelete)
          arrayRequisito.splice(index, 1);
          this.modelRequisito.set(arrayRequisito)
          this.blockUI.stop();
          functionsGlobal.getToast("Se Elimino Correctamente")

        })
      }
    })

  }
  //Metodos para cambiar el estado de los selects multiple
  changeTipo(event: any) {
    if (event.isUserInput && this.requisitoSeleccionado) {
      let json = {
        id: this.requisitoSeleccionado.id,
        idTipo: event.source.value,
        estado: event.source.selected
      }
      this.activarBlock()
      this.requisitoService.editarOpcionTipo(json).subscribe(requisitoActualizado => {
        this.actualizarRequisito(requisitoActualizado);
        this.closeModal(this.idModalRegistroRequisito);
        functionsGlobal.getToast("Se Edito Correctamente")
        this.cerrarBlock();
      });
    }
  }
  changeServicio(event: any) {
    if (this.requisitoSeleccionado && event.isUserInput) {
      let json = {
        id: this.requisitoSeleccionado.id,
        idServicio: event.source.value,
        estado: event.source.selected
      }
      this.activarBlock()
      this.requisitoService.editarOpcionServicio(json).subscribe(requisitoActualizado => {
        this.actualizarRequisito(requisitoActualizado);
        this.closeModal(this.idModalRegistroRequisito);
        functionsGlobal.getToast("Se Edito Correctamente")
        this.cerrarBlock();
      })
    }
  }
  actualizarRequisito(requisitoActualizado: requisito) {
    let arrayRequisito = this.modelRequisito.get();
    let index = this.buscarRequisito(arrayRequisito, requisitoActualizado)
    arrayRequisito[index] = requisitoActualizado;
    this.modelRequisito.set(arrayRequisito)
  }
  //FIN DE CRUD REQUISITOS




  disabledFormularioRequisito() {
    this.formularioRequisito.disable();
  }
  enabledFormularioRequisito() {
    this.formularioRequisito.enable();
  }
  visualizarRequisito() {
    this.mostrarDatosFormularioRequisito();
    this.disabledFormularioRequisito();
    this.abrirModal(this.idModalRegistroRequisito);
  }

  compareString(string1: any, string2: any) {
    return string1 === string2;
  }

  compareObjeto(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
  }






  //FUNCIONES BASICAS
  activarBlock() {
    this.blockUI.start()

  }
  cerrarBlock() {
    this.blockUI.stop()
  }
  abrirModal(id: string) {
    functionsGlobal.openModal(id)
  }
  closeModal(id: string) {
    functionsGlobal.closeModal(id)
  }
  buscarRequisito(requisitos: requisito[], requisito: requisito): number {
    return requisitos.findIndex(requisitoB => requisitoB.id == requisito.id)
  }
  setRequisito(requisito: requisito) {
    this.requisitoSeleccionado = requisito;
  }
  nuevoRequisito() {
    this.fileUpload.cachedFileArray = [];
    this.estadoActualizarResgitrarFormularion = false;
    this.fileUpload.clearImagePreviewPanel();
    this.requisitoSeleccionado = null;
    this.enabledFormularioRequisito();
    this.formularioRequisito.reset();
  }
  //FIN DE FUNCIONES BASICAS
}
