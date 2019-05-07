import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface Lista {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registrodocente',
  templateUrl: './registrodocente.component.html',
  styleUrls: ['./registrodocente.component.scss']
})

export class RegistrodocenteComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  sexos: Lista[] = [
    {value: 'male', viewValue: 'Masculino'},
    {value: 'female', viewValue: 'Femenino'}
  ];

  TipoRegPensionarios: Lista[] = [
    {value: 'private', viewValue: 'Privado'},
    {value: 'public', viewValue: 'Publico'}
  ];

  RegPensionarios: Lista[] = [
    {value: 'afp', viewValue: 'AFP'},
    {value: 'snp', viewValue: 'SNP'}
  ];

  EntidadesRegPensionarios: Lista[] = [
    {value: 'integra', viewValue: 'Integra'},
    {value: 'profuturo', viewValue: 'Profuturo'},
    {value: 'primax', viewValue: 'Primax'},
    {value: 'snp', viewValue: 'SNP'}
  ];

  Departamentos: Lista[] = [
    {value: 'dacis', viewValue: 'Dep. Academico de Ciencias en Informatica y Sistemas'},
    {value: 'dace', viewValue: 'Dep. Academico de Ciencias Exactas'},
  ];

  Categorias: Lista[] = [
    {value: 'jp', viewValue: 'Jefe de Practicas'},
    {value: 'auxiliar', viewValue: 'Auxiliar'},
    {value: 'principal', viewValue: 'Principal'},
  ];

  Condiciones: Lista[] = [
    {value: 'nombrado', viewValue: 'Nombrado'},
    {value: 'contratado', viewValue: 'Contratado'},
  ];
 
  Cargos: Lista[] = [
    {value: 'director', viewValue: 'Director'},
    {value: 'jefedepartamento', viewValue: 'Jefe de Departamento'},
    {value: 'decano', viewValue: 'Decano'},
  ];

  Dedicaciones: Lista[] = [
    {value: 'tp', viewValue: 'Tiempo Parcial'},
    {value: 'de', viewValue: 'Dedicacion Exclusiva'},
    {value: 'tc', viewValue: 'tiempo completo'},
  ];

  RegimenContratos: Lista[] = [
    {value: 'cas', viewValue: 'Tiempo Parcial'},
    {value: 'Auxiliar', viewValue: 'Dedicacion Exclusiva'},
    // {value: '', viewValue: 'tiempo completo'},
  ];





  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
