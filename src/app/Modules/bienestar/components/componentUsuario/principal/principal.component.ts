import { Component, OnInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    functionsGlobal.iniciarModal();

  }

}
