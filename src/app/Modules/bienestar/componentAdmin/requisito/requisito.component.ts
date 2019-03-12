import { Component, OnInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { swal } from './../../../../global/swal';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: ['./requisito.component.scss']
})
export class RequisitoComponent implements OnInit {
  listaRequisito$: Observable<requisito[]>
  listaTipoRequisito$: Observable<tipoRequisito[]>
  idModalRegistroRequisito: string = "modal1"
  private modelRequisito: Model<requisito[]>;
  formularioRequisito: FormGroup
  requisitoSeleccionado: requisito
  @BlockUI() blockUI: NgBlockUI;
  fileUpload: FileUploadWithPreview;
  constructor(private fb: FormBuilder, private tipoRequisitoService: TipoRequisitoService, private requisitoService: RequisitoService, private modelFactory: ModelFactory<requisito[]>) {

  }

  ngOnInit() {
    this.formularioRequisito = this.fb.group({
      id: new FormControl(""),
      nombre: new FormControl("", [Validators.required]),
      descripcion: new FormControl(""),
      requerido: new FormControl("", [Validators.required]),
      prioridad: new FormControl("", [Validators.required]),
      tipoArchivo: new FormControl("", [Validators.required]),
      tipo: new FormControl("", [Validators.required])
    })
    this.fileUpload = new FileUploadWithPreview("fileRequisito")
    this.listaTipoRequisito$ = this.tipoRequisitoService.all();
    this.listarRequisitos();
    // this.requisitoService.getAllPersona()

  }

  listarTipoRequisito(idModal: string) {
    this.activarBlock()
    this.listaTipoRequisito$ = this.tipoRequisitoService.all();
    this.listaTipoRequisito$.subscribe(data => {
      this.listaTipoRequisito$ = this.tipoRequisitoService.all();
      this.abrirModal(idModal)
      this.cerrarBlock()
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
  nuevoRequisito() {
    this.fileUpload.cachedFileArray = [];
    this.fileUpload.clearImagePreviewPanel();
    this.formularioRequisito.reset();
  }
  guardarYEditarRequisito(formsValue) {
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
      this.requisitoSeleccionado.tipo = formsValue.tipo;
      this.requisitoSeleccionado.tipoArchivo = formsValue.tipoArchivo;
      this.requisitoSeleccionado.prioridad = prioridadRequisito;
      this.requisitoSeleccionado.requerido = isRequerido;
      this.requisitoService.editarRequisito(this.requisitoSeleccionado).subscribe(requisitoUpdate => {
        let index = this.buscarRequisito(requisitos, requisitoUpdate);
        requisitos[index] = requisitoUpdate;
        console.log(requisitos[index])
        this.modelRequisito.set(requisitos)
        this.closeModal(this.idModalRegistroRequisito);
        functionsGlobal.getToast("Se Edito Correctamente")
        this.blockUI.stop();
      })
    }
  }

  buscarRequisito(requisitos: requisito[], requisito: requisito): number {
    return requisitos.findIndex(requisitoB => requisitoB.id == requisito.id)
  }
  editarRequisito() {
    this.formularioRequisito.get("id").setValue(this.requisitoSeleccionado.id);
    this.formularioRequisito.get("nombre").setValue(this.requisitoSeleccionado.nombre);
    this.formularioRequisito.get("descripcion").setValue(this.requisitoSeleccionado.descripcion)
    this.formularioRequisito.get("tipoArchivo").setValue(this.requisitoSeleccionado.tipoArchivo)
    this.formularioRequisito.get("tipo").patchValue({ id: this.requisitoSeleccionado.tipo.id });
    this.formularioRequisito.get("prioridad").patchValue(this.requisitoSeleccionado.prioridad.toString());
    this.formularioRequisito.get("requerido").patchValue(this.requisitoSeleccionado.requerido ? "true" : "false")
    this.fileUpload.cachedFileArray = [];
    this.fileUpload.clearImagePreviewPanel();
  }
  compareString(string1: any, string2: any) {
    return string1 === string2;
  }
  compareObjeto(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
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
        this.requisitoService.borrarRequisito(this.requisitoSeleccionado.id).subscribe(requisitoPa => {
          console.log(requisitoPa)
          let arrayRequisito = this.modelRequisito.get();
          let index = arrayRequisito.findIndex(requisito => {
            return requisito.id == requisitoPa.id
          })
          arrayRequisito.splice(index, 1)
          this.modelRequisito.set(arrayRequisito)
          this.blockUI.stop();
          functionsGlobal.getToast("Se Elimino Correctamente")

        })
      }
    })

  }
  setRequisito(requisito: requisito) {
    this.requisitoSeleccionado = requisito;
  }
}
