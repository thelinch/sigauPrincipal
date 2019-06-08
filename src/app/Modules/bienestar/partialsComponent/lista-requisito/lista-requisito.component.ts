import { requisito } from 'src/app/Modules/bienestar/Models/Requisito';
import { Component, OnInit, Input } from '@angular/core';
import { servicio } from '../../Models/servicio';

@Component({
  selector: 'app-lista-requisito',
  templateUrl: './lista-requisito.component.html',
  styleUrls: ['./lista-requisito.component.css']
})
export class ListaRequisitoComponent implements OnInit {
  @Input() listaRequisito: requisito[]
  @Input() listaServicios: servicio[]
  constructor() { }

  ngOnInit() {
  }

}
