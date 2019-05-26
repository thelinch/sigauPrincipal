import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';

export interface Lista {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-registraradministrativo',
  templateUrl: './registraradministrativo.component.html',
  styleUrls: ['./registraradministrativo.component.css']
})
export class RegistraradministrativoComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  llamarModal:functionsGlobal;
  idModalEstudiosSuperiores:string = "ModalEstudiosSuperiores";
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl:['', Validators.required]
    })
    this.fourthFormGroup= this._formBuilder.group({
      fourthCtrl: ['',Validators.required]
    })
  }

  
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

  Areas: Lista[] = [
    {value: 'AR', viewValue: 'Area de Redes'},
    {value: 'AS', viewValue: 'Area de Soluciones'},
    {value: 'AST', viewValue: 'Area de Soporte Tecnico'},
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
    {value: 'cas', viewValue: 'CAS'},
    // {value: 'auxiliar', viewValue: 'AUXILIAR'},
    // {value: 'principal', viewValue: 'PRINCIPAL'},
  ];
  
  NivelEstudios: Lista[] = [
    {value: 'primaria', viewValue: 'Primaria'},
    {value: 'secundaria', viewValue: 'Secundaria'},
    {value: 'superior', viewValue: 'Superior'},
  ];

  Instituciones: Lista[] = [
    {value: 'unas', viewValue: 'Uni. Nacinal Agraria de la Selva'},
    {value: 'gad', viewValue: 'I.E Gomez Areas Davila'},
    {value: 'rp', viewValue: 'I.E Ricardo Palma'},
  ];

  EspecialidadMencion: Lista[] = [
    {value: 'fdsgf', viewValue: 'CAS'},
    {value: 'auxiliar', viewValue: 'AUXILIAR'},
    {value: 'principal', viewValue: 'PRINCIPAL'},
  ];

  abrirModal(id: string) {
    // functionsGlobal.openModal(id)
    functionsGlobal.iniciarModal()
     functionsGlobal.openModal(id)
  }
  closeModal(id: string) {
    functionsGlobal.closeModal(id)
  }
}
