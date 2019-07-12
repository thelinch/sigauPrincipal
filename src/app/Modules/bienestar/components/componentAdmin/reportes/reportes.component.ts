import { Component, OnInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    functionsGlobal.iniciarModal();

  }

}
