import { Component, OnInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { swal } from './../../../../global/swal';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Observer, Subject } from 'rxjs';
import { requisito } from '../../Models/Requisito';
import { RequisitoService } from '../../services/requisito.service';
import { scan, concat, startWith } from 'rxjs/operators';
import { ModelFactory, Model } from '@angular-extensions/model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

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
    if (formsValue.id == null) {
      delete formsValue.id
    }

    let requisitos = this.modelRequisito.get()
    this.blockUI.start()
    this.requisitoService.gurdarRequisito(formsValue).subscribe(requisito => {
      requisitos.push(requisito)
      this.modelRequisito.set(requisitos)
      this.closeModal(this.idModalRegistroRequisito);
      this.blockUI.stop();
    })
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
    })
  }
  setRequisito(requisito: requisito) {
    this.requisitoSeleccionado = requisito;
  }
}
