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

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: ['./requisito.component.scss']
})
export class RequisitoComponent implements OnInit {
  listaRequisito$: Observable<requisito[]>
  idModalRegistroRequisito: string = "modal1"
  private modelRequisito: Model<requisito[]>;
  formularioRequisito: FormGroup
  requisitoSeleccionado: requisito
  @BlockUI() blockUI: NgBlockUI;
  constructor(private fb: FormBuilder, private requisitoService: RequisitoService, private modelFactory: ModelFactory<requisito[]>) {

  }

  ngOnInit() {
    this.formularioRequisito = this.fb.group({
      id: new FormControl(),
      nombre: new FormControl("", [Validators.required]),
      descripcion: new FormControl(""),
      numeroArchivos: new FormControl("", [Validators.required]),
      tipoArchivo: new FormControl("", [Validators.required]),
      tipo: new FormControl("", [Validators.required])
    })
    // this.requisitoService.getAllPersona()
    this.listarRequisitos()
  }
  listarRequisitos() {
    this.requisitoService.listarRequisitos().subscribe(requisitos => {

      this.modelRequisito = this.modelFactory.create(requisitos)
      this.listaRequisito$ = this.modelRequisito.data$
    })
  }

  abrirModal(id: string) {
    functionsGlobal.openModal(id)
  }
  closeModal(id: string) {
    functionsGlobal.closeModal(id)
  }
  nuevoRequisito() {
    this.formularioRequisito.reset();
  }

  guardarYEditarRequisito(formsValue) {
    this.blockUI.start()
    let requisitos = this.modelRequisito.get()
    if (formsValue.id == null) {
      delete formsValue.id
      this.requisitoService.gurdarRequisito(formsValue).subscribe(requisito => {
        requisitos.push(requisito)
        this.modelRequisito.set(requisitos)
        this.closeModal(this.idModalRegistroRequisito);
        functionsGlobal.getToast("Se Registro Correctamente")
        this.blockUI.stop();
      })
    } else {
      this.requisitoSeleccionado.nombre = formsValue.nombre;
      this.requisitoSeleccionado.descripcion = formsValue.descripcion;
      this.requisitoSeleccionado.numeroArchivos = formsValue.numeroArchivos;
      this.requisitoSeleccionado.tipo = formsValue.tipo;
      this.requisitoSeleccionado.tipoArchivo = formsValue.tipoArchivo;
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

  buscarRequisito(requisitos: requisito[], requisito: requisito): number {
    return requisitos.findIndex(requisitoB => requisitoB.id == requisito.id)
  }
  editarRequisito() {
    this.formularioRequisito.get("id").setValue(this.requisitoSeleccionado.id);
    this.formularioRequisito.get("nombre").setValue(this.requisitoSeleccionado.nombre);
    this.formularioRequisito.get("descripcion").setValue(this.requisitoSeleccionado.descripcion)
    this.formularioRequisito.get("numeroArchivos").setValue(this.requisitoSeleccionado.numeroArchivos)
    this.formularioRequisito.get("tipoArchivo").setValue(this.requisitoSeleccionado.tipoArchivo)
    this.formularioRequisito.get("tipo").setValue(this.requisitoSeleccionado.tipo);

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
