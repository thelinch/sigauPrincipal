import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodicElement } from '../registros/registros.component';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AlumnoService } from 'src/app/global/services/alumno.service';
import { alumno } from 'src/app/global/Models/Alumno';

@Component({
  selector: 'app-registrobachiller',
  templateUrl: './registrobachiller.component.html',
  styleUrls: ['./registrobachiller.component.scss']
})
export class RegistrobachillerComponent implements OnInit {

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  selection = new SelectionModel<PeriodicElement>(true, []);
  listaAlumnos: alumno[]
  dataSource = new MatTableDataSource<alumno>(this.listaAlumnos);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
 /* masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }*/

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  selecion: any
  constructor(private alumnoService: AlumnoService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.alumnosPregado();
  }
  public alumnosPregado() {
    this.alumnoService.AlumnosPregrado().subscribe(listaAlumnos => {
      console.log(listaAlumnos)
      this.listaAlumnos = listaAlumnos;
    })
  }

}

