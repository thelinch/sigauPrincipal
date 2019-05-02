import { Component, OnInit } from '@angular/core';
import { ServicioSolicitadoService } from '../../services/servicio-solicitado.service';
import { Observable } from 'rxjs';
import { servicioSolicitados } from '../../Models/servicioSolicitados';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { AlumnoRequisitoService } from '../../services/alumno-requisito.service';
import { alumnoRequisito } from '../../Models/alumnoRequisito';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { alumno } from 'src/app/global/Models/Alumno';
import { archivo } from '../../Models/archivo';
import { estadoArchivoRequisito } from '../../Models/estadoArchivoRequisito';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  serviciosSolicitado: servicioSolicitados[]
  idModalListaRequisitos: string = "idModalListaRequisitos";
  alumnoSeleccionado: alumno;
  listaAlumnoRequisitoPorAlumnoYSemestre: alumnoRequisito[];
  listaEstadoPorArchivo: estadoArchivoRequisito[]
  @BlockUI() blockUI: NgBlockUI;
  constructor(private servicioSolicitadoService: ServicioSolicitadoService,
    private alumnoRequisitoService: AlumnoRequisitoService) { }

  ngOnInit() {
    this.listarServicioSolicitadoPorSemestreActual();
    functionsGlobal.iniciarModal();
  }
  listarServicioSolicitadoPorSemestreActual() {
    this.abrirBlock();
    let json = {
      codigoMatricula: "2019-1"
    }
    this.servicioSolicitadoService.listarServicioSolicitadoPorSemestreActual(json).subscribe(async listaServicioSolicitado => {
      this.serviciosSolicitado = await listaServicioSolicitado;
      this.cerrarBlock();
    });
  }
  listarRequisitoPorAlumnoYSemestreActual(servicioSolicitado: servicioSolicitados) {
    this.abrirBlock();
    let json = {
      codigoMatricula: servicioSolicitado.codigoMatricula,
      idAlumno: servicioSolicitado.alumno.id
    }
    this.alumnoRequisitoService.listaAlumnoRequisitoPorAlumnoYSemestre(json).subscribe(listaAlumnoRequisito => {
      this.listaAlumnoRequisitoPorAlumnoYSemestre = listaAlumnoRequisito;
      this.listaAlumnoRequisitoPorAlumnoYSemestre.forEach(listaRequisitos => {
        listaRequisitos.archivos = listaRequisitos.archivos.map(archivo => {
          return { ...archivo, estadoActual: archivo.estados_archivo.filter(estado => estado.pivot.estado)[0] }
        })
      })
      this.seleccionarAlumno(servicioSolicitado.alumno)
      this.cerrarBlock();
      this.abrirModal(this.idModalListaRequisitos);
    })

  }
  seleccionarAlumno(alumno: alumno) {
    this.alumnoSeleccionado = alumno;
  }
  listarEstadoPorArchivo(archivo: archivo) {
    this.abrirBlock();
    let json = {
      idArchivo: archivo.id
    }
    this.alumnoRequisitoService.historialDeEstadosPorArchivo(json).subscribe(listaEstadoArchivo => {
      this.listaEstadoPorArchivo = listaEstadoArchivo;
      console.log(this.listaEstadoPorArchivo)
      this.cerrarBlock();
    })
  }
  abrirModal(id: string) {
    functionsGlobal.openModal(id);
  }
  cerrarModal(id: string) {
    functionsGlobal.closeModal(id);
  }
  abrirBlock() {
    this.blockUI.start();
  }
  cerrarBlock() {
    this.blockUI.stop();
  }
}
