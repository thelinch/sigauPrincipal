import { Component, OnInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { servicio } from '../../Models/servicio';
import { ServicioService } from '../../services/servicio.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { requisito } from '../../Models/Requisito';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaServiciosComponent implements OnInit {
  idModalServicio: string = "modalServicio"
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formControlListaServicio: FormControl;
  listaServiciosActivados: servicio[]
  listaRequisitosPorServicio: any[]
  listaRequisitosLlenadosPorUsuario: requisito[]
  @BlockUI() blockUI: NgBlockUI;
  constructor(private _formBuilder: FormBuilder, private servicioService: ServicioService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.formControlListaServicio = new FormControl();
    this.abrirBlock();
    this.servicioService.serviciosActivados().subscribe(listaServicio => {

      this.listaServiciosActivados = listaServicio;
      this.cerrarBlock();
    });


  }
  guardarResultado(formValue) {
    console.log(formValue)
  }
  abrilModal(id: string) {
    functionsGlobal.openModal(id);
  }
  cerrarModal(id: string) {
    functionsGlobal.closeModal(id)
  }
  changeSelectListaServicios(event: any) {
    this.abrirBlock();
    this.servicioService.requisitosPorArrayServicio(this.formControlListaServicio.value).subscribe(listaRequisito => {
      this.listaRequisitosPorServicio = listaRequisito
      this.cerrarBlock();
    }

    )
  }
  abrirBlock() {
    this.blockUI.start();
  }
  cerrarBlock() {
    this.blockUI.stop()
  }
}
