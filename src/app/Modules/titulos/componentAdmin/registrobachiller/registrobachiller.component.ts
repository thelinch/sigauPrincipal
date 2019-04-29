import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AlumnoService } from 'src/app/global/services/alumno.service';
import { alumno } from 'src/app/global/Models/Alumno';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { EscuelaProfesional } from 'src/app/global/Models/EscuelaProfesional';
import { nombreProgramaestudio } from '../../Models/nombre_programa_estudio';
import { denominacionGradoTitulo } from '../../Models/denominacion_grado_titulo';
import { modalidadEstudio } from '../../Models/modalidad_estudio';
import { alumnoGraduadoTitulado } from '../../Models/alumno_graduado_titulado';

import { EscuelaprofesionalService } from 'src/app/global/services/escuelaprofesional.service';
import { DenominacionesService } from '../../services/denominaciones.service';
import { NombreprogramasService } from '../../services/nombreprogramas.service';
import { ModalidadestudiosService } from '../../services/modalidadestudios.service';


@Component({
  selector: 'app-registrobachiller',
  templateUrl: './registrobachiller.component.html',
  styleUrls: ['./registrobachiller.component.scss']
})
export class RegistrobachillerComponent implements OnInit, AfterViewInit {

  idModalAgregarAlumnoPregrado: string = "modalAgregarAlumnoPregrado"
  idModalParaRegistroDeDenominaciones: string = "modalRegistroDenominaciones"
  listaEscuelaprofesionales$: Observable<EscuelaProfesional[]>
  listaNombreProgramaEstudios$: Observable<nombreProgramaestudio[]>
  listaModalidadEstudios$: Observable<modalidadEstudio[]>

  listaAlumnosSeleccionados: Array<alumno>
  listaAlumnoGraduadoTitulado: Array<alumnoGraduadoTitulado>;
  displayedColumns: string[] = ['select', 'DNI', 'Nombre', "Apellidos", "Escuela profesional"];
  dataSource = new MatTableDataSource<alumno>();
  listaDenominacionesPorEspecialidad: denominacionGradoTitulo[]
  listaAlumnoSeleccionados = new SelectionModel<alumno>(true);
  alumnoBachillerSeleccionado: alumno
  alumnoPregradoSeleccionado: alumno
  checkedSeleccionado: any
  
  //codigo del stepper (pasar una transicion de pantalla)
  isLinear = false;
  firstFormGroup: FormGroup;
  formularioRegistroBachiller: FormGroup;
  //secondFormGroup: FormGroup;

  //dataSource = new MatTableDataSource<alumno>(this.listaAlumnos);


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.listaAlumnoSeleccionados.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.listaAlumnoSeleccionados.clear() :
      this.dataSource.data.forEach(row => this.listaAlumnoSeleccionados.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: alumno): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.listaAlumnoSeleccionados.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }



  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @BlockUI() blockUI: NgBlockUI;
  selecion: any

  constructor(private alumnoService: AlumnoService,
    private escuelaprofesionalService: EscuelaprofesionalService,
    private denominacionService: DenominacionesService,
    private  nombreProgramaestudio: NombreprogramasService,
    private modalidadEstudio : ModalidadestudiosService,
    private fb: FormBuilder) { }


  /*CODIGO PARA INICIAR LOS METODOS*/
  ngOnInit() {
    functionsGlobal.iniciarScrollSpy();
    this.dataSource.paginator = this.paginator;
    this.listaAlumnosSeleccionados = new Array();
    this.iniciarData();
    //codigo para Stepper
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.formularioRegistroBachiller = this.fb.group({
      tipo_alumno_id:["",],
      codigoUniversidad: ["", Validators.required],
      denominacionGradoTitulo: ["", Validators.required],
      nombreProgramaestudio: ["",Validators.required],
      modalidaddeEstudio: ["",Validators.required],
      fechaingreso:["",Validators.required],
      fechaegreso:["",Validators.required],
      trabajo_investigacion: this.fb.group({ nombre: ["",], url: ["",] })
    });
    //Fin de codigo Stepper
    this.listaAlumnoGraduadoTitulado = new Array();
    
  }
  /*FIN DE CODIGO PARA INICIAR LOS METODOS*/

  ngAfterViewInit(): void {
  }

  ingresardatosbachiller(stepper){
    console.log(stepper)
    stepper.next()
  }
  registrarAlumnosBachiller() {


  }
  seleccionarAlumno(alumno: alumno, check: any) {
    this.alumnoBachillerSeleccionado = alumno;
    this.checkedSeleccionado = check;
  }

  verificacionDeAlumnoBachiller(alumnoParametro: alumno) {
    let alumnoGraduadotitulado = this.listaAlumnoGraduadoTitulado.find(alumnoGraduado => alumnoGraduado.alumno_general_id == alumnoParametro.id)
    if (alumnoGraduadotitulado) {
      this.editarFormularioBachiller(alumnoGraduadotitulado)
      return
    }
    this.limpiarFormularioAlumnoGraduadoTitulado();

  }
  compareObjeto(val1: any, val2) {
    return val1 && val2 ? val1.id === val2 : val1 === val2;
  }
  limpiarFormularioAlumnoGraduadoTitulado() {
    this.formularioRegistroBachiller.reset();
  }
  editarFormularioBachiller(alumnoParametro: alumnoGraduadoTitulado) {
    this.formularioRegistroBachiller.get("codigoUniversidad").setValue(alumnoParametro.codigoUniversidad);
    this.formularioRegistroBachiller.get("fechaingreso").setValue(alumnoParametro.fechaingreso);
    this.formularioRegistroBachiller.get("fechaegreso").setValue(alumnoParametro.fechaegreso);
    this.formularioRegistroBachiller.get("denominacionGradoTitulo").setValue({ nombre: alumnoParametro.denominacionGradoTitulo.nombre });
    this.formularioRegistroBachiller.get("nombreProgramaestudio").setValue({ nombre: alumnoParametro.nombreProgramaestudio.nombre });
    this.formularioRegistroBachiller.get("trabajo_investigacion").get("nombre").setValue(alumnoParametro.trabajo_investigacion.nombre);
    this.formularioRegistroBachiller.get("trabajo_investigacion").get("url").setValue(alumnoParametro.trabajo_investigacion.url);
    console.log(this.formularioRegistroBachiller.get("nombreProgramaestudio").setValue({ nombre: alumnoParametro.nombreProgramaestudio.nombre }))
  }
  listarDenominacionGradoPorEspecialidad(alumnoParametro: alumno) {
    this.abrirBlock();
    let json = {
      id: alumnoParametro.escuela_profesional.id
    }
    console.log(json)
    this.denominacionService.listarDenominacionesPorEspecialidad(json).subscribe(listaDenominacion => {
      this.listaDenominacionesPorEspecialidad = listaDenominacion;
      this.cerrarBlock();
    })
  }

  agregarDatosAlumno(alumnoGraduadoTitulado: any) {
    alumnoGraduadoTitulado.alumno_general_id = this.alumnoBachillerSeleccionado.id;
    alumnoGraduadoTitulado.trabajo_investigacion = alumnoGraduadoTitulado.trabajo_investigacion
    if (!this.listaAlumnoGraduadoTitulado.find(alumnoGraduado => alumnoGraduado.alumno_general_id == this.alumnoBachillerSeleccionado.id)) {
      this.listaAlumnoGraduadoTitulado.push(alumnoGraduadoTitulado);
    } else {
      let index = this.listaAlumnoGraduadoTitulado.findIndex(alumnoGraduado => alumnoGraduado.alumno_general_id == this.alumnoBachillerSeleccionado.id)
      this.listaAlumnoGraduadoTitulado[index] = alumnoGraduadoTitulado
    }
    console.log(this.listaAlumnoGraduadoTitulado)
    this.checkedSeleccionado.checked = true;
    //console.log(alumnoGraduadoTitulado)
  }

  removerAlumno(alumno: alumno) {
    if (this.listaAlumnoSeleccionados.isSelected(alumno)) {
      this.listaAlumnoSeleccionados.deselect(alumno);
      let index = this.listaAlumnoGraduadoTitulado.findIndex(alumnoGraduado => alumnoGraduado.alumno_general_id == alumno.id)
      this.listaAlumnoGraduadoTitulado.splice(index, 1)
      console.log(this.listaAlumnoGraduadoTitulado)
    }
  }

  clickAlumnoCard(alumno: alumno) {
    this.alumnoPregradoSeleccionado = alumno;
    console.log(this.alumnoPregradoSeleccionado)
    //this.isLinear = false;

  }

  gradoacademico(alumno: alumno) {
    this.alumnoPregradoSeleccionado = alumno;
    if (this.alumnoPregradoSeleccionado.grado_alumno === true) {
      var grado: string = 'Alumno Pregrado';
    }
    return grado
  }

  iniciarData() {
    this.alumnoService.AlumnosPregrado().subscribe({
      next: (listaAlumnos) => {
        this.dataSource.data = listaAlumnos
      },
      complete: () => {
        this.listaEscuelaprofesionales$ = this.escuelaprofesionalService.EscuelaProfesional();
        this.listaNombreProgramaEstudios$ = this.nombreProgramaestudio.listaNombreprogramaEstudio();
        this.listaModalidadEstudios$ = this.modalidadEstudio.listaNombreprogramaEstudio();
      }
    })
  }


  count() {

  }
  /*CODIGO PARA MOSTRAR LOS ESTUDIANTES DE PRE-GRADO
  public alumnosPregado() {
    this.abrirBlock();
    this.alumnoService.AlumnosPregrado().subscribe(listaAlumnos => {
      console.log(listaAlumnos)

      this.cerrarBlock();
    })
  }

  /*CODIGO PARA MOSTRAR LAS ESCUELAS PROFESIONALES
  public escuelaProfesional() {
    this.abrirBlock();

  }
*/

  abrirBlock() {
    this.blockUI.start()
  }
  cerrarBlock() {
    this.blockUI.stop();
  }
  abrirModal(id: string) {
    functionsGlobal.openModal(id);
  }
  cerrarModal(id: string) {
    functionsGlobal.closeModal(id);
  }
}



