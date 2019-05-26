import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {


  busquedaForm: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = false;
  firstFormGroup: FormGroup;
  modalBusqueda: string = "modalBusqueda"

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.busquedaForm = this._formBuilder.group({
      dni: ["", [Validators.maxLength(8), Validators.pattern(/^[0-9_-]{8,8}$/)]],
      nombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  abrirModal(idModal: string) {
    functionsGlobal.openModal(idModal)
  }
  cerrarModal(idModal: string) {
    functionsGlobal.closeModal(idModal)
  }
  filtrar(formValue: any) {
    console.log(formValue)
  }
}
