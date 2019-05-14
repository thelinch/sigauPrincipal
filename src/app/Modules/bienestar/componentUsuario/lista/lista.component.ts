import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { servicio } from '../../Models/servicio';
import { ServicioService } from '../../services/servicio.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { requisito } from '../../Models/Requisito';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import FileUploadWithPreview from 'file-upload-with-preview';
import Swal from 'sweetalert2';
import { flatMap, map, take, filter, toArray } from 'rxjs/operators';
import { FileService } from 'src/app/global/services/file.service';
import { AlumnoService } from 'src/app/global/services/alumno.service';
import { servicioSolicitados } from '../../Models/servicioSolicitados';
import { alumnoRequisito } from './../../Models/alumnoRequisito';
import { AlumnoRequisitoService } from '../../services/alumno-requisito.service';
import { archivo } from '../../Models/archivo';
import { ServicioSolicitadoService } from '../../services/servicio-solicitado.service';
import { servicioSolicitadoQuery } from '../../query/servicioSolitadoQuery';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaServiciosComponent implements OnInit {
  idModalServicio: string = "modalServicio"
  modalListaRequisitoAlumno: string = "modalListaRequisitoAlumno"
  modalSubirArchivo: string = "modalSubirArchivo";
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formControlListaServicio: FormControl;
  showPopup: boolean = false;
  listaServiciosActivados: servicio[]
  listaAlumnoRequisitoPorALumnoYSemestre: alumnoRequisito[]
  servicioSolicitadoActualPorAlumnoYSemestreActual$: Observable<servicioSolicitados>;
  archivoSeleccionado: archivo;
  listaRequisitosPorServicio: any[]
  listaRequisitosLlenadosPorUsuario: requisito[]
  listaRequisitoRegistrodoAlumno: Array<number>
  listaFotosParaSubir: Array<FileUploadWithPreview>
  artefactoParaSubirArchivo: FileUploadWithPreview
  numeroTotalDeRequisitoRequerido: number;
  contadorTotalRequisitoEnviadoRequerido: number;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _formBuilder: FormBuilder,
    private servicioService: ServicioService,
    private filseService: FileService,
    private render: Renderer2,
    private alumnoService: AlumnoService,
    private alumnoRequisitoService: AlumnoRequisitoService,
    private servicioSolicitado: ServicioSolicitadoService,
    private servicioSolicitadoQuery: servicioSolicitadoQuery) { }

  ngOnInit() {

    this.listaFotosParaSubir = new Array<FileUploadWithPreview>();
    this.formControlListaServicio = new FormControl();
    //this.artefactoParaSubirArchivo = new FileUploadWithPreview("subirArchivo");
    this.contadorTotalRequisitoEnviadoRequerido = 0;
    this.iniciarDatos();


  }
  /**
   *
   *
   * @memberof ListaServiciosComponent
   *
   */
  iniciarDatos() {
    this.abrirBlock();
    let json = { idAlumno: "1", semestreActual: "2019-1" };
    this.alumnoService.servicioSolicitadoPorAlumnoYSemestreActual(json).subscribe(async servicioSolicitado => {
      if (!servicioSolicitado) {
        this.servicioService.listarServiciosActivados().subscribe(listaServiciosActivados => {
          this.listaServiciosActivados = listaServiciosActivados;
        })
        console.log("entro al if")
      }
      await this.cerrarBlock();
    });
    this.servicioSolicitadoActualPorAlumnoYSemestreActual$ = this.servicioSolicitadoQuery.selectFirst();

  }


  registrarServiciosParaEvaluacion() {
    if (this.contadorTotalRequisitoEnviadoRequerido != this.numeroTotalDeRequisitoRequerido) {
      Swal.fire({
        title: "Por favor registre todos los requisitos requeridos",
        type: "error",

      })
      return
    }
    let json = {
      idAlumno: "1",
      listaDeServicioSolicitados: this.formControlListaServicio.value,
      codigoMatricula: "2019-1"
    }
    this.abrirBlock();
    this.servicioSolicitado.registrarServicioSolicitadoPorAlumnoYSemestreActual(json).subscribe(servicioRegistrado => {

      this.cerrarModal(this.idModalServicio)
      this.cerrarBlock();
    })

  }
  subirImagenFileWithPreview(id: number, tipoArchivoAdmitido: string, nombreArchivPermitido: string, requisito: requisito, stepper, matSteep, boton: ElementRef) {
    let instanciaFotos = this.listaFotosParaSubir.find(fileUploader => fileUploader.uploadId == id);
    if (instanciaFotos.cachedFileArray.length > 0) {
      let validacionImagen: boolean = functionsGlobal.validarArchivoImagen(instanciaFotos.cachedFileArray, tipoArchivoAdmitido);
      if (validacionImagen) {
        Swal.fire({
          title: "Los archivos son correctos",
          type: "question"
        }).then(respuesta => {
          if (respuesta.value) {
            this.abrirBlock();
            from(instanciaFotos.cachedFileArray).pipe(take(instanciaFotos.cachedFileArray.length), map((file: File) => {
              let formData = new FormData();
              formData.append("archivo", file)
              formData.append("idRequisito", requisito.id.toString());
              formData.append("idUsuario", "1");
              formData.append("nombreCarpeta", "Comedor_internado/antony/" + "2019-1");
              return formData
            }),
              flatMap((formData) => this.filseService.guardarArchivo(formData))).subscribe({
                next: (respuesta) => { console.log(respuesta) },
                complete: () => {
                  functionsGlobal.getToast("Se subieron los archivos correctamente");
                  stepper.next();
                  matSteep.editable = false;
                  matSteep.interacted = true;
                  instanciaFotos.clearImagePreviewPanel();
                  this.render.addClass(boton, "disabled")
                  if (requisito.requerido) {
                    this.contadorTotalRequisitoEnviadoRequerido++;
                  }
                  if (this.contadorTotalRequisitoEnviadoRequerido == this.numeroTotalDeRequisitoRequerido) {
                    stepper.completed = true;
                  }
                  this.cerrarBlock();
                }
              })
          }
        })
      } else {
        Swal.fire({
          title: "Error",
          type: "error",
          html: "Por favor solo esta permitido archivos de tipo " + nombreArchivPermitido
        })
      }
    } else {
      Swal.fire({
        html: "Carga al menos una imagen",
        type: "error"
      })
    }

  }
  onUploadSuccess(e: any) {
    console.log(e)
  }
  stepChanged(evento, objeto) {
    console.log(evento)
    evento.next();
  }
  onSending(evento, idRequisito) {
    evento[2].append("id", idRequisito)
  }
  crearInstanciaFileWithPreview(idObjeto: number) {
    if (!this.listaFotosParaSubir.find(fileUploader => fileUploader.uploadId == idObjeto)) {
      this.listaFotosParaSubir.push(new FileUploadWithPreview(idObjeto))
    }
  }
  changeSelectListaServicios(event: any) {
   /* this.abrirBlock();
    let json = {
      listaServiciosSolicitados: this.formControlListaServicio.value,
      idAlumno: "1",
      codigoMatricula: "2019-1"
    }
    this.servicioService.listarRequisitosPorListaDeServicio(json).subscribe(listaRequisito => {
      //listaRequisito.sort(requisito => requisito.requerido ? -1 : 1);
      this.listaRequisitosPorServicio = listaRequisito

      from(this.listaRequisitosPorServicio).pipe(filter((requisito: requisito) => requisito.requerido), toArray()).subscribe(listaRequisitoRequerido => {
        this.numeroTotalDeRequisitoRequerido = listaRequisitoRequerido.length;
      })
      this.listaFotosParaSubir = [];
      this.cerrarBlock();
    }

    )*/
  }
  listaRequisitosPorAlumnoYSemestre(serviciosolicitado: servicioSolicitados) {
    let json = {
      codigoMatricula: serviciosolicitado.codigoMatricula,
      idAlumno: serviciosolicitado.alumno.id
    }
    this.abrirBlock();
    this.alumnoRequisitoService.listaAlumnoRequisitoPorAlumnoYSemestre(json).subscribe(listaAlumnoRequisito => {
      this.listaAlumnoRequisitoPorALumnoYSemestre = listaAlumnoRequisito;
      this.listaAlumnoRequisitoPorALumnoYSemestre.forEach(listaRequisitos => {
        listaRequisitos.archivos = listaRequisitos.archivos.map(archivo => {
          return { ...archivo, estadoActual: archivo.estados_archivo.filter(estado => estado.pivot.estado)[0] }
        })
      })
      this.abrilModal(this.modalListaRequisitoAlumno);
      this.cerrarBlock();
    });

  }
  modalResubirArchivo(archivo: archivo, kendo: any) {
    console.log(kendo)
  }
  listaArchivosPorAlumnoRequisito(alumnoRequisitoParametro: alumnoRequisito) {
    this.abrirBlock();
    let json = {
      id: alumnoRequisitoParametro.id
    }
    this.alumnoRequisitoService.listaArchivoPorAlumnoRequisito(json).subscribe(archivos => {
      alumnoRequisitoParametro.archivos = archivos;
      this.cerrarBlock();
    })
  }
  verificarExistenciaDeServicioSolicitado(idModalServicio: string) {
    this.servicioSolicitadoActualPorAlumnoYSemestreActual$.subscribe(servicioSolicitado => {
      console.log(servicioSolicitado)
      if (servicioSolicitado !== undefined) {
        Swal.fire({
          html: "Ya cuenta con un servicio que esta en proceso de evaluacion",
          type: "info"
        })
        return

      }
      this.abrilModal(idModalServicio)
    })
  }
  abrirBlock() {
    this.blockUI.start();
  }
  cerrarBlock() {
    this.blockUI.stop()
  }
  abrilModal(id: string) {
    functionsGlobal.openModal(id);
  }
  cerrarModal(id: string) {
    functionsGlobal.closeModal(id)
  }
}
