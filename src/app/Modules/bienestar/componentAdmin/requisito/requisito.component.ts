import { Component, OnInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { swal } from './../../../../global/swal';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Observer, Subject } from 'rxjs';
import { requisito } from '../../Models/Requisito';
import { RequisitoService } from '../../services/requisito.service';
import { scan, concat, startWith } from 'rxjs/operators';
import { ModelFactory, Model } from '@angular-extensions/model';

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: ['./requisito.component.scss']
})
export class RequisitoComponent implements OnInit {
  listaRequisito$: Observable<requisito[]>
  private modelRequisito: Model<requisito[]>;
  formularioRequisito: FormGroup
  requisitoSeleccionado: requisito

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
  guardarYEditarRequisito(formsValue?) {
    let requisitos = this.modelRequisito.get()
    this.requisitoService.gurdarRequisito(formsValue).subscribe(requisito => {
      requisitos.push(formsValue)
      this.modelRequisito.set(requisitos)
    })
  }
}
