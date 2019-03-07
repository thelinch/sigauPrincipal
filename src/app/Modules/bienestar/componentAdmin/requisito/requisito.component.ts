import { Component, OnInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { swal } from './../../../../global/swal';

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: ['./requisito.component.scss']
})
export class RequisitoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  abrirModal(id: string) {
    functionsGlobal.openModal(id)
    swal.getMensajeExito("wdwdw")
  }
  closeModal(id: string) {
    functionsGlobal.closeModal(id)
  }

}
