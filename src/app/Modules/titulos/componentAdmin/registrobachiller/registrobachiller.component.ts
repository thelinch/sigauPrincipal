import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodicElement } from '../registros/registros.component';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AlumnoService } from 'src/app/global/services/alumno.service';
import { alumno } from 'src/app/global/Models/Alumno';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-registrobachiller',
  templateUrl: './registrobachiller.component.html',
  styleUrls: ['./registrobachiller.component.scss']
})
export class RegistrobachillerComponent implements OnInit {
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  listaAlumnos: alumno[]
  //dataSource = new MatTableDataSource<alumno>(this.listaAlumnos);


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }



  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @BlockUI() blockUI: NgBlockUI;
  selecion: any
  constructor(private alumnoService: AlumnoService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.alumnosPregado();
  }
  public alumnosPregado() {
    this.abrirBlock();
    this.alumnoService.AlumnosPregrado().subscribe(listaAlumnos => {
      console.log(listaAlumnos)
      this.listaAlumnos = listaAlumnos;
      this.cerrarBlock();
    })
  }
  abrirBlock() {
    this.blockUI.start()
  }
  cerrarBlock() {
    this.blockUI.stop();
  }
  //*Arreglo para importar datos al overflow de filtar en el modal por facultad
  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

