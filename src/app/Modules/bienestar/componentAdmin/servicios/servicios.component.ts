import { Component, OnInit, AfterViewInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { servicio } from '../../Models/servicio';
import { Model, ModelFactory } from '@angular-extensions/model';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {
  listaServicio$: Observable<servicio[]>
  private modelServicio: Model<servicio[]>
  autoSuma: boolean = false;
  idModalRegistroServicio: string = "modalRegisto"
  formularioServicio: FormGroup;

  constructor(private fb: FormBuilder, private servicioService: ServicioService, private modelFactory: ModelFactory<servicio[]>) { }

  ngOnInit() {
    this.formularioServicio = this.fb.group({
      id: new FormControl(),
      nombre: new FormControl("", [Validators.required]),
      total: new FormControl("", Validators.required),
      vacante: this.fb.group({
        id: new FormControl(),
        vacantesHombre: new FormControl(0),
        vacantesMujer: new FormControl(0)
      })
    })
  }
  listarServicios() {
    this.servicioService.listarServicio().subscribe(servicios => {
      this.modelServicio = this.modelFactory.create(servicios);
      this.listaServicio$ = this.modelServicio.data$;
    })
  }
  nuevoServicio() {
    this.formularioServicio.reset();
  }
  abrirModal(id: string) {
    functionsGlobal.openModal(id);
  }
  cerrarModal(id: string) {
    functionsGlobal.closeModal(id);
  }
  guardarYEditarServicio(formValue: any) {
    console.log(formValue)
  }
  actualizarTotal() {
    if (this.autoSuma && this.formularioServicio.get("vacante").get("vacantesHombre").value && this.formularioServicio.get("vacante").get("vacantesHombre").value) {
      let numeroTotal = this.formularioServicio.get("total").value ? this.formularioServicio.get("total").value : 0;
      let numeroVarones = parseInt(this.formularioServicio.get("vacante").get("vacantesHombre").value);
      let numeroMujeres = parseInt(this.formularioServicio.get("vacante").get("vacantesMujer").value);
      let total = numeroTotal + numeroVarones + numeroMujeres;
      this.formularioServicio.get("total").patchValue(total);

    } else {
      this.formularioServicio.get("total").patchValue(0)
    }
  }
  closeModal(id: string) {
    functionsGlobal.closeModal(id);
  }
}
