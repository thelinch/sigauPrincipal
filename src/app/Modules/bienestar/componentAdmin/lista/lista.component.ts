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
import { servicioSolicitadoQuery } from '../../query/servicioSolitadoQuery';
import { ID } from '@datorama/akita';
import { flatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  serviciosSolicitado$: Observable<servicioSolicitados[]>
  idModalListaRequisitos: string = "idModalListaRequisitos";
  alumnoSeleccionado: alumno;
  numeroTotalServicioSolicitado$: Observable<number>;
  listaAlumnoRequisitoPorAlumnoYSemestre: alumnoRequisito[];
  listaEstadoPorArchivo: estadoArchivoRequisito[]
  @BlockUI() blockUI: NgBlockUI;
  constructor(private servicioSolicitadoService: ServicioSolicitadoService,
    private servicioSolicitadoQuery: servicioSolicitadoQuery,
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
    this.servicioSolicitadoService.listarServicioSolicitadoPorSemestreActual(json).subscribe(servicios => this.cerrarBlock());
    this.serviciosSolicitado$ = this.servicioSolicitadoQuery.selectAll();
    this.numeroTotalServicioSolicitado$ = this.servicioSolicitadoQuery.selectCount();
  }
  listarRequisitoPorAlumnoYSemestreActual(idServicioSolicitado: ID) {
    this.abrirBlock();
    this.servicioSolicitadoQuery.selectEntity(idServicioSolicitado).pipe(flatMap(servicioSolicitado => {
      let json = {
        codigoMatricula: servicioSolicitado.codigoMatricula,
        idAlumno: servicioSolicitado.alumno.id
      }
      this.seleccionarAlumno(servicioSolicitado.alumno)
      return this.alumnoRequisitoService.listaAlumnoRequisitoPorAlumnoYSemestre(json);
    }), map(listaAlumnoRequisito => {
      listaAlumnoRequisito.forEach(listaRequisitos => {
        listaRequisitos.archivos = listaRequisitos.archivos.map(archivo => {
          return { ...archivo, estadoActual: archivo.estados_archivo.filter(estado => estado.pivot.estado)[0] }
        })
      })
      return listaAlumnoRequisito;
    })).subscribe(listaAlumnoRequisito => {
      this.listaAlumnoRequisitoPorAlumnoYSemestre = listaAlumnoRequisito;
      this.cerrarBlock();
      this.abrirModal(this.idModalListaRequisitos);
    })



  }
  clickBoton(id: ID) {
    this.servicioSolicitadoQuery.selectEntity(id).subscribe(console.log);
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
