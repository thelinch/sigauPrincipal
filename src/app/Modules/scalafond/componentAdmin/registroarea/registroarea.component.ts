import { Component, OnInit, ViewChild } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Area de Soluciones', weight: 1.0079, symbol: 'AS'},
  {position: 2, name: 'Area de Soporte Tecnico', weight: 4.0026, symbol: 'AST'},
  {position: 3, name: 'Area de Redes', weight: 6.941, symbol: 'AR'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-registroarea',
  templateUrl: './registroarea.component.html',
  styleUrls: ['./registroarea.component.scss']
})
export class RegistroareaComponent implements OnInit {
  
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  // displayedColumns : string[] = ['posicion','name','weight','symbol'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  constructor() { }

  ngOnInit() {
  this.dataSource=this.dataSource;
  }
}

