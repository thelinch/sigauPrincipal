import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

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
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  
  sexos: Lista[] = [
    {value: 'male', viewValue: 'Masculino'},
    {value: 'female', viewValue: 'Femenino'}
  ];

}
