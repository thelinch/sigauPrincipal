import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AlumnoService } from 'src/app/global/services/alumno.service';
import { alumno } from 'src/app/global/Models/Alumno';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable, from } from 'rxjs';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { EscuelaProfesional } from 'src/app/global/Models/EscuelaProfesional';
import { nombreProgramaestudio } from '../../Models/nombre_programa_estudio';
import { denominacionGradoTitulo } from '../../Models/denominacion_grado_titulo';
import { modalidadEstudio } from '../../Models/modalidad_estudio';
import { alumnoGraduadoTitulado } from '../../Models/alumno_graduado_titulado';
import { obtenciongradostitulo } from '../../Models/obtencion_grados_titulo';
import { empresa } from '../../Models/empresa';
import { DecanoFacultad } from 'src/app/global/Models/DecanoFacultad';
import { Rector } from 'src/app/global/Models/Rector';
import { TranajadorArea } from 'src/app/global/Models/TrabajadorArea';

import { EscuelaprofesionalService } from 'src/app/global/services/escuelaprofesional.service';
import { DenominacionesService } from '../../services/denominaciones.service';
import { NombreprogramasService } from '../../services/nombreprogramas.service';
import { ModalidadestudiosService } from '../../services/modalidadestudios.service';
import { ObtenciongradosService } from '../../services/obtenciongrados.service';
import { EmpresasService } from '../../services/empresas.service';
import { AlumnoGraduadoService } from '../../services/alumno-graduado.service';
import { DecanofacultadService } from 'src/app/global/services/decanofacultad.service';
import { RectorService } from 'src/app/global/services/rector.service';
import { TrabajadorareaService } from 'src/app/global/services/trabajadorarea.service';

import { ExporterService } from '../../services/exporter.service';


import Swal from 'sweetalert2';
import { registro_graduado_titulado } from '../../Models/registro_graduado_titulado';
import { NotificacionBusService } from 'src/app/global/services/NotificacionBusService.service';
import { RegistroAlumnoGraduadoService } from '../../services/registro-alumno-graduado.service';
import { alumno_registroAlumnoGraduadoTitulado } from '../../Models/alumno_registroAlumnoGraduadoTitulado';
import { v4 as uuid } from 'uuid';
import FileUploadWithPreview from 'file-upload-with-preview'
import { FileService } from 'src/app/global/services/file.service';
import { flatMap, map, take } from 'rxjs/operators';
import { variables } from 'src/app/global/variablesGlobales';
import { IfStmt } from '@angular/compiler';

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
  listaObtencionGrados$: Observable<obtenciongradostitulo[]>
  listaDecanosFaultades$: Observable<DecanoFacultad[]>
  listaTrabajadorAreas$: Observable<TranajadorArea[]>
  listaRectores$: Observable<Rector[]>
  listaEmpresas: Array<empresa>
  listaAlumnosSeleccionados: Array<alumno>
  listaAlumnoGraduadoTitulado: Array<alumnoGraduadoTitulado>;

  displayedColumns: string[] = ['select', 'DNI', 'Nombre', "Apellidos", "Escuela profesional"];
  dataSource = new MatTableDataSource<alumno>();
  listaDenominacionesPorEspecialidad: denominacionGradoTitulo[]
  listaAlumnoSeleccionados = new SelectionModel<alumno>(true);
  alumnoBachillerSeleccionado: alumno
  alumnoGraduadoTituladoCreado: alumnoGraduadoTitulado
  registroAlumnoGraduadoTitulado: registro_graduado_titulado
  alumnoPregradoSeleccionado: alumno
  checkedSeleccionado: any
  imageUrl: string = "../../../../../assets/UsuarioDefecto/noimage.png";
  fileToUpload: File = null;
  fileUpload: FileUploadWithPreview;
  listaAlumnoExcel: Array<alumno_registroAlumnoGraduadoTitulado>
  displayedColumnsAlumno_Excel =
    ['nombre_completo', 'Especialidad', 'Facultad'];



  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }


  //codigo del stepper (pasar una transicion de pantalla)
  panelOpenState = false;
  isLinear = false;
  firstFormGroup: FormGroup;
  formularioRegistroBachiller: FormGroup;
  formularioGuardarBachiller: FormGroup;
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
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;

  }

  @BlockUI() blockUI: NgBlockUI;
  selecion: any

  constructor(private alumnoService: AlumnoService,
    private escuelaprofesionalService: EscuelaprofesionalService,
    private denominacionService: DenominacionesService,
    private nombreProgramaestudio: NombreprogramasService,
    private modalidadEstudio: ModalidadestudiosService,
    private obtencionGrado: ObtenciongradosService,
    private fb: FormBuilder,
    private empresaservice: EmpresasService,
    private decanofacultadService: DecanofacultadService,
    private rectorService: RectorService,
    private trabajadorareaService: TrabajadorareaService,
    private notificacionService: NotificacionBusService,
    private alumnoGraduadoService: AlumnoGraduadoService,
    private registroAlumnoGraduadoService: RegistroAlumnoGraduadoService,
    private excelService: ExporterService,
    private fileService: FileService) { }


  /*CODIGO PARA INICIAR LOS METODOS*/
  ngOnInit() {

    this.listaAlumnoExcel = new Array<alumno_registroAlumnoGraduadoTitulado>();
    //this.fileUpload = new FileUploadWithPreview("foto");
    //FILTRAR
    this.dataSource.filterPredicate = this.filtrarData
    //FIN DE FILTAR

    //NOTIFICACIONES
    this.notificacionService.getNotificacion().subscribe(notificacion => {
      Swal.fire({
        html: notificacion.detalle,
        type: notificacion.severidad,
        toast: true,
        position: "top-end",
        timer: 3000,
      })
    })
    //FIN DE NOTIFICACIONES

    functionsGlobal.iniciarScrollSpy();
    this.dataSource.paginator = this.paginator;
    this.listaAlumnosSeleccionados = new Array();
    this.iniciarData();
    //this.listarUniversidades()


    //codigo para Stepper
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });

    //FORMULARIO PARA INGRESAR DATOS EL ALUMNO A GRADUAR
    this.formularioRegistroBachiller = this.fb.group({
      id: ["",],
      tipo_alumno_id: ["",],
      creditos_aprobados: ["", Validators.required],
      empresa_id: ["", Validators.required],
      denominacion_grado_titulo: ["", Validators.required],
      nombre_programa_estudio: ["", Validators.required],
      modalidad_de_estudio: ["", Validators.required],
      obtencion_grado: ["", Validators.required],
      fecha_ingreso: ["", Validators.required],
      fecha_egreso: ["", Validators.required],
      trabajo_investigacion: this.fb.group({ id: [""], nombre: ["",], url: ["",] })
    });
    //Fin de codigo Stepper

    //FORMULARIO PARA REGISTRAR EL ALUMNO GRADUADO
    this.formularioGuardarBachiller = this.fb.group({
      id: ["",],
      numero_oficio: ["", Validators.required],
      numero_resolucion: ["", Validators.required],
      fecha_resolucion: ["", Validators.required],
      numero_diploma: ["", Validators.required],
      tipo_diplona: ["",],
      fecha_emision_diploma: ["", Validators.required],
      registro_libro: ["", Validators.required],
      registro_folio: ["", Validators.required],
      numero_registro: ["", Validators.required],
      director_decano: ["", Validators.required],
      tipo_autoridad: [""],
      rector: ["", Validators.required],
      trabajador_areas: ["", Validators.required],
    });

    this.listaAlumnoGraduadoTitulado = new Array();
  }
  filtrarPorEspecialidad(event: any) {
    //this.filtrarData(this.dataSource.data,event.source.value.nombre);
    if (event.source._selected) {
      console.log(event.source.value)
      this.applyFilter(event.source.value.nombre)
    }
  }
  filtrarData(data, filter: string) {
    return data.persona.numero_documento.toLowerCase().includes(filter) ||
      data.persona.nombre.toLowerCase().includes(filter) ||
      data.persona.apellido_paterno.toLowerCase().includes(filter) ||
      data.persona.apellido_materno.toLowerCase().includes(filter) ||
      data.persona.nombre_completo.toLowerCase().includes(filter) ||
      data.escuela_profesional.nombre.toLowerCase().includes(filter);
  }
  /*FIN DE CODIGO PARA INICIAR LOS METODOS*/
  crearIntanciaFoto() {
    if (!this.fileUpload) {
      this.fileUpload = new FileUploadWithPreview("foto");
    }
  }
  //EXPORTAR EXCEL//
  exportAsXLSX(): void {
    let id = 1
    let listaModificada = this.listaAlumnoExcel.map(alumnoExcel => {

      return {
        ID: id++,
        CODUNIV: alumnoExcel.alumno_graduado.empresa.codigo,
        RAZ_SOC: alumnoExcel.alumno_graduado.empresa.nombre,
        MATRI_FEC: alumnoExcel.alumno_graduado.fecha_ingreso,
        FAC_NOM: alumnoExcel.alumno.escuela_profesional.facultad_oficina.nombre,
        CARR_PROG: alumnoExcel.alumno.escuela_profesional.nombre,
        ESC_POS: "",
        EGRES_FEC: alumnoExcel.alumno_graduado.fecha_egreso,
        APEPAT: alumnoExcel.alumno.persona.apellido_paterno,
        APEMAT: alumnoExcel.alumno.persona.apellido_materno,
        NOMBRE: alumnoExcel.alumno.persona.nombre,
        SEXO: alumnoExcel.alumno.persona.sexo,
        DOCU_TIP: alumnoExcel.alumno.persona.tipo_documento.nombre,
        DOCU_NUM: alumnoExcel.alumno.persona.numero_documento,
        PROC_BACH: "",
        GRAD_TITU: alumnoExcel.alumno_graduado.denominacion_grado_titulo.grado_titulo.nombre,
        DEN_GRAD: alumnoExcel.alumno_graduado.denominacion_grado_titulo.nombre,
        SEG_ESP: "",
        TRAB_INV: alumnoExcel.alumno_graduado.trabajo_investigacion.nombre,

        NUM_CRED: alumnoExcel.alumno_graduado.creditos_aprobados,
        REG_METADATO: alumnoExcel.alumno_graduado.nombre_programa_estudio.nombre,
        PROG_ESTU: alumnoExcel.alumno_graduado.nombre_programa_estudio.nombre,
        PROC_TITULO_PED: "",
        MOD_OBT: alumnoExcel.alumno_graduado.modalidad_estudio.nombre,
        MOD_EST: alumnoExcel.alumno_graduado.modalidad_estudio.sigla,
        ABRE_GYT: alumnoExcel.alumno_graduado.denominacion_grado_titulo.grado_titulo.siglas,
        PROC_REV_PAIS: "",
        PROC_REV_UNIV: "",
        PROC_REV_GRADO: "",
        RESO_NUM: alumnoExcel.registro_alumno_graduado.numero_resolucion,
        RESO_FEC: alumnoExcel.registro_alumno_graduado.fecha_resolucion,
        DIPL_FEC_ORG: alumnoExcel.registro_alumno_graduado.fecha_emision_diploma,
        DIPL_FEC_DUP: "",
        DIPL_NUM: alumnoExcel.registro_alumno_graduado.numero_diploma,
        DIPL_TIP_EMI: alumnoExcel.registro_alumno_graduado.tipo_diploma.sigla,
        REG_LIBRO: alumnoExcel.registro_alumno_graduado.registro_libro,
        REG_FOLIO: alumnoExcel.registro_alumno_graduado.registro_folio,
        REG_REGISTRO: alumnoExcel.registro_alumno_graduado.numero_registro,
        CARGO1: "RECTOR",
        AUTORIDAD1: alumnoExcel.registro_alumno_graduado.rector.docente.persona.nombre_completo,
        CARGO2: "SECRETARIO GENERAL",
        AUTORIDAD2: alumnoExcel.registro_alumno_graduado.trabajador_areas.administrativo.persona.nombre_completo,
        CARGO3: "DECANO",
        AUTORIDAD3: alumnoExcel.decano.docente.persona.nombre_completo,
        PROC_PAIS_EXT: "",
        PROC_UNIV_EXT: "",
        PROC_GRADO_EXT: "",
        REG_OFICIO: alumnoExcel.registro_alumno_graduado.numero_oficio,
        FEC_MAT_PROG: "",
        FEC_INICIO_PROG: "",
        FEC_FIN_PROG: "",
      }
    });

    this.excelService.exportTOExcel(listaModificada, 'my_export');
  }

  ngAfterViewInit(): void {
  }

  ingresardatosbachiller(stepper) {
    console.log(stepper)
    stepper.next()
  }
  registrarAlumnosBachiller() {
  }

  seleccionarAlumno(alumno: alumno, check: any) {
    this.alumnoBachillerSeleccionado = alumno;
    this.checkedSeleccionado = check;
  }


  compareObjeto(val1: any, val2) {
    return val1 && val2 ? val1.id === val2 : val1 === val2;
  }
  limpiarFormularioAlumnoGraduadoTitulado() {
    this.formularioRegistroBachiller.reset();
  }


  limpiarFormularioRegistroGraduadoTitulado() {
    this.formularioGuardarBachiller.reset();
  }

  editarFormularioBachiller() {
    if (this.alumnoGraduadoTituladoCreado) {
      this.formularioRegistroBachiller.get("id").setValue(this.alumnoGraduadoTituladoCreado.id)
      this.formularioRegistroBachiller.get("trabajo_investigacion").get("id").setValue(this.alumnoGraduadoTituladoCreado.trabajo_investigacion.id)
      console.log(this.formularioRegistroBachiller.value)
    }

  }

  listarDenominacionGradoPorEspecialidad(alumnoParametro: alumno) {
    this.abrirBlock();
    let json = {
      id: alumnoParametro.escuela_profesional.id,
      gradoTitulo: 1
    }
    console.log(json)
    this.denominacionService.listarDenominacionesPorEspecialidad(json).subscribe(listaDenominacion => {
      this.listaDenominacionesPorEspecialidad = listaDenominacion;
      this.cerrarBlock();
    })
  }

  agregarDatosAlumno(alumnoGraduadoTitulado: any) {

    if (this.alumnoGraduadoTituladoCreado && this.alumnoGraduadoTituladoCreado.id) {
      //CUANDO SE EDITA EL ALUMNO
      this.subirFotoAlumnoGraduado(this.fileUpload.cachedFileArray).subscribe(url => {
        alumnoGraduadoTitulado.foto = url;
        alumnoGraduadoTitulado.trabajo_investigacion = alumnoGraduadoTitulado.trabajo_investigacion
        this.alumnoGraduadoService.editarAlumnoGraduado(alumnoGraduadoTitulado).subscribe(alumnoGraduadoTituladoCreado => {
          this.alumnoGraduadoTituladoCreado = alumnoGraduadoTituladoCreado;
          this.notificacionService.showSuccess("Se editó correctamente los datos del alumno " + this.alumnoBachillerSeleccionado.persona.nombre);
        });
      })

    } else {
      //CUANDO RECIEN SE VA A CREAR EL ALUMNO
      this.subirFotoAlumnoGraduado(this.fileUpload.cachedFileArray).subscribe(url => {
        alumnoGraduadoTitulado.foto = url;
        alumnoGraduadoTitulado.alumno_general_id = this.alumnoBachillerSeleccionado.id;
        alumnoGraduadoTitulado.trabajo_investigacion = alumnoGraduadoTitulado.trabajo_investigacion
        alumnoGraduadoTitulado.tipo_alumno_id = 1
        alumnoGraduadoTitulado.grado_titulo_id = 1

        this.alumnoGraduadoService.guardarAlumnoGraduado(alumnoGraduadoTitulado).subscribe(alumnoGraduadoTituladoCreado => {
          this.alumnoGraduadoTituladoCreado = alumnoGraduadoTituladoCreado;
          this.notificacionService.showSuccess("Se guardó correctamente los datos del alumno " + this.alumnoBachillerSeleccionado.persona.nombre);
        });
      })


    }


    /*
    if (!this.listaAlumnoGraduadoTitulado.find(alumnoGraduado => alumnoGraduado.alumno_general_id == this.alumnoBachillerSeleccionado.id)) {
      this.listaAlumnoGraduadoTitulado.push(alumnoGraduadoTitulado);
    } else {
      let index = this.listaAlumnoGraduadoTitulado.findIndex(alumnoGraduado => alumnoGraduado.alumno_general_id == this.alumnoBachillerSeleccionado.id)
      this.listaAlumnoGraduadoTitulado[index] = alumnoGraduadoTitulado
    }*/
    //this.checkedSeleccionado.checked = true;
    //console.log(alumnoGraduadoTitulado)

  }
  subirFotoAlumnoGraduado(file: File[]): Observable<string> {
    return from(file).pipe(take(file.length), map((archivo: File) => {
      let formData = new FormData();
      formData.append("archivo", archivo)
      formData.append("id", uuid());
      formData.append("nombreCarpeta", variables.carpetaGradosYTitulos + "bachilleres")
      return formData
    }), flatMap((formData: any) => this.fileService.guardarArchivo(formData)))
  }
  guardarAlumnoBachiller(registroalumnoGraduadoTitulado: any) {
    if (this.registroAlumnoGraduadoTitulado && this.registroAlumnoGraduadoTitulado.id) {
      //CUANDO SE EDITA EL ALUMNO
      console.log(registroalumnoGraduadoTitulado)
    } else {
      //CUANDO RECIEN SE VA A CREAR EL ALUMNO
      registroalumnoGraduadoTitulado.alumno_graduado_id = this.alumnoGraduadoTituladoCreado.id;
      registroalumnoGraduadoTitulado.numero_oficio = registroalumnoGraduadoTitulado.numero_oficio;
      registroalumnoGraduadoTitulado.numero_resolucion = registroalumnoGraduadoTitulado.numero_resolucion;
      registroalumnoGraduadoTitulado.fecha_resolucion = registroalumnoGraduadoTitulado.fecha_resolucion;
      registroalumnoGraduadoTitulado.numero_diploma = registroalumnoGraduadoTitulado.numero_diploma;
      registroalumnoGraduadoTitulado.tipo_diplona = 1;
      registroalumnoGraduadoTitulado.fecha_emison_diploma = registroalumnoGraduadoTitulado.fecha_emison_diploma;
      registroalumnoGraduadoTitulado.registro_libro = registroalumnoGraduadoTitulado.registro_libro;
      registroalumnoGraduadoTitulado.registro_folio = registroalumnoGraduadoTitulado.registro_folio;
      registroalumnoGraduadoTitulado.numero_registro = registroalumnoGraduadoTitulado.numero_registro;
      registroalumnoGraduadoTitulado.director_decano = registroalumnoGraduadoTitulado.director_decano;
      registroalumnoGraduadoTitulado.tipo_autoridad = 1;
      registroalumnoGraduadoTitulado.rector = registroalumnoGraduadoTitulado.rector;
      registroalumnoGraduadoTitulado.trabajador_areas = registroalumnoGraduadoTitulado.trabajador_areas;

      this.registroAlumnoGraduadoService.guardarRegistroAlumnoGraduado(registroalumnoGraduadoTitulado).subscribe(registroAlumnoGraduadoTitulado => {
        console.log(registroAlumnoGraduadoTitulado)
        // this.registroAlumnoGraduadoTitulado = registroAlumnoGraduadoTitulado;
        this.listaAlumnoExcel.push(registroAlumnoGraduadoTitulado)
        this.alumnoGraduadoTituladoCreado = null;
        this.registroAlumnoGraduadoTitulado = null;
        this.alumnoPregradoSeleccionado = null;
        this.fileUpload.cachedFileArray = [];
        this.fileUpload.clearImagePreviewPanel();
        console.log(this.listaAlumnoExcel)
        this.notificacionService.showSuccess("Se Graduó correctamente el alumno " + this.alumnoBachillerSeleccionado.persona.nombre);
        this.formularioGuardarBachiller.reset();
      });

      this.checkedSeleccionado.checked = true;
      console.log(registroalumnoGraduadoTitulado)

    }

  }

  reguistroDeAlumnoGraduadoTitulado(formValue: any) {
    if (!this.alumnoGraduadoTituladoCreado) {
      Swal.fire({
        title: "Error",
        type: "error",
        html: "Por favor Registre los datos"
      })
      return
    }
    let json = {
      idAlumnoGraduado: this.alumnoGraduadoTituladoCreado.id,
      idAlumno: this.alumnoGraduadoTituladoCreado.alumno_general_id,
      formValue: formValue
    }
  }


  removerAlumno(alumno: alumno) {
    if (this.listaAlumnoSeleccionados.isSelected(alumno)) {
      this.listaAlumnoSeleccionados.deselect(alumno);
      let index = this.listaAlumnoGraduadoTitulado.findIndex(alumnoGraduado => alumnoGraduado.alumno_general_id == alumno.id)
      this.listaAlumnoGraduadoTitulado.splice(index, 1)
      this.alumnoPregradoSeleccionado = null
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
    this.listaEscuelaprofesionales$ = this.escuelaprofesionalService.EscuelaProfesional();
    this.listaNombreProgramaEstudios$ = this.nombreProgramaestudio.listaNombreprogramaEstudio();
    this.listaModalidadEstudios$ = this.modalidadEstudio.listaModalidadEstudio();
    this.listaObtencionGrados$ = this.obtencionGrado.listaObtencionGrado();
    this.listaDecanosFaultades$ = this.decanofacultadService.DecanoFacultad();
    this.listaRectores$ = this.rectorService.Rector();
    this.listaTrabajadorAreas$ = this.trabajadorareaService.TrabajadorArea();
  }


  listarUniversidades() {
    let json = { empresa_id: 2 }
    this.empresaservice.listaEmpresaPorTipoEmpresa(json).subscribe(listauniversidades => {
      this.listaEmpresas = listauniversidades
    })
  }

  filtarAlumnos(valor: any) {
    valor.especialidad = valor.especialidad == "todos" ? null : valor.especialidad;
    this.alumnoService.listaAlumnosFiltrado(valor).subscribe(listaFiltrada => {
      
      this.dataSource.data = listaFiltrada;
      if (this.dataSource.data.length == 0) {
        this.notificacionService.showInfo("No se encontraron coincidencias");
      } else {
        this.notificacionService.showSuccess("Se encontró " + this.dataSource.data.length + " coincidencias");
      }
      console.log(valor)
      console.log(listaFiltrada)
    })

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



