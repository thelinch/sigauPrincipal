import { Component, OnInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { swal } from './../../../../global/swal';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Observer, Subject } from 'rxjs';
import { requisito } from '../../Models/Requisito';
import { RequisitoService } from '../../services/requisito.service';
import { scan, concat, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: ['./requisito.component.scss']
})
export class RequisitoComponent implements OnInit {
  listaRequisito$: Observable<requisito[]>
  subject$ = new Subject()
  element: Observable<any>
  formularioRequisito: FormGroup
  requisitoSeleccionado: requisito

  constructor(private fb: FormBuilder, private requisitoService: RequisitoService) {

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
    //this.listarRequisitos()
  }
  listarRequisitos() {
    this.listaRequisito$ = this.requisitoService.listarRequisitos();
  }

  abrirModal(id: string) {
    functionsGlobal.openModal(id)
  }
  closeModal(id: string) {
    functionsGlobal.closeModal(id)
  }
  guardarYEditarRequisito(formsValue?) {

  }
}
