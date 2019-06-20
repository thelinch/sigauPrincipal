import { servicioSolicitadoSandBox } from './../../../sandBox/servicioSolicitadoSandBox';
import { servicioQuery } from './../../../BD/query/servicioQuery';
import { requisitoQuery } from './../../../BD/query/requisitoQuery';
import { Component, OnInit, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import FileUploadWithPreview from 'file-upload-with-preview';
import Swal from 'sweetalert2';
import { flatMap, map, take, filter, toArray, tap } from 'rxjs/operators';
import { FileService } from 'src/app/global/services/file.service';
import { AlumnoService } from 'src/app/global/services/alumno.service';
import { servicio } from '../../../Models/servicio';
import { alumnoRequisito } from '../../../Models/alumnoRequisito';
import { servicioSolicitados } from '../../../Models/servicioSolicitados';
import { archivo } from '../../../Models/archivo';
import { requisito } from '../../../Models/Requisito';
import { AlumnoRequisitoService } from '../../../services/alumno-requisito.service';
import { ServicioSolicitadoService } from '../../../services/servicio-solicitado.service';
import { servicioSolicitadoQuery } from '../../../BD/query/servicioSolitadoQuery';
import { servicioSandBox } from '../../../sandBox/servicioSandBox';
import { requisitoSandBox } from '../../../sandBox/requisitoSandBox';
import { variables } from 'src/app/global/variablesGlobales';
import { ServicioSolicitadoRequisitoService } from '../../../services/servicio-solicitado-requisito.service';
import { servicioSolicitadoRequisito } from '../../../Models/servicioSolicitadoRequisito';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaServiciosComponent implements OnInit, AfterViewInit {

  idModalServicio: string = "modalServicio"
  modalListaRequisitoAlumno: string = "modalListaRequisitoAlumno"
  modalSubirArchivo: string = "modalSubirArchivo";
  isLinear = false;
  formControlListaServicio: FormControl;
  showPopup: boolean = false;
  listaServiciosActivados$: Observable<servicio[]>
  listaAlumnoRequisitoPorALumnoYSemestre: alumnoRequisito[]
  servicioSolicitadoActualPorAlumnoYSemestreActual: servicioSolicitados
  archivoSeleccionado: archivo;
  listaRequisitosPorServicio$: Observable<requisito[]>
  listaRequisitosLlenadosPorUsuario: requisito[]
  listaRequisitoRegistrodoAlumno: Array<number>
  listaFotosParaSubir: Array<FileUploadWithPreview>
  artefactoParaSubirArchivo: FileUploadWithPreview
  numeroTotalDeRequisitoRequerido: number;
  contadorTotalRequisitoEnviadoRequerido: number;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _formBuilder: FormBuilder,
    //private servicioService: ServicioService,
    private servicioSandBox: servicioSandBox,
    private requisitoSandBox: requisitoSandBox,
    private requisitoQuery: requisitoQuery,
    private servicioQuery: servicioQuery,
    private filseService: FileService,
    private render: Renderer2,
    private alumnoRequisitoService: AlumnoRequisitoService,
    private servicioSolicitadoService: ServicioSolicitadoService,
    private servicioSolicitadoRequisitoService: ServicioSolicitadoRequisitoService
  ) { }
  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30
  };

  ngOnInit() {

    this.listaFotosParaSubir = new Array<FileUploadWithPreview>();
    this.formControlListaServicio = new FormControl();
    this.contadorTotalRequisitoEnviadoRequerido = 0;
    this.listaRequisitosPorServicio$ = this.requisitoQuery.selectAll();
    this.listaServiciosActivados$ = this.servicioQuery.selectAll({
      filterBy: entity => entity.activador && (entity.nombre == "COMEDOR" || entity.nombre == "INTERNADO")
    })
    this.iniciarDatos();


  }
  ngAfterViewInit(): void {
    functionsGlobal.iniciarCarousel();

  }
  /**
   *
   *
   * @memberof ListaServiciosComponent
   *
   */
  iniciarDatos() {
    let json = { idAlumno: "1" };
    this.servicioSandBox.listaServicio();
    this.abrirBlock();
    this.servicioSolicitadoService.servicioSolicitadoPorAlumnoComedorYInternadoYSemestreActual(json).subscribe(servicioSolicitado => {
      this.servicioSolicitadoActualPorAlumnoYSemestreActual = servicioSolicitado;
      this.cerrarBlock();
    })

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
    }
    this.abrirBlock();
    this.servicioSolicitadoService.registrarServicioSolicitadoPorAlumnoYSemestreActual(json).subscribe(servicioRegistrado => {
      this.servicioSolicitadoActualPorAlumnoYSemestreActual = servicioRegistrado;
      this.cerrarModal(this.idModalServicio)
      this.cerrarBlock();
    })

  }
  subirImagenFileWithPreview(id: number, tipoArchivoAdmitido: string, nombreArchivoPermitido: string, requisito: requisito, stepper, matSteep, boton: ElementRef) {
    let instanciaFotos = this.listaFotosParaSubir.find(fileUploader => fileUploader.uploadId == id);
    if (instanciaFotos.cachedFileArray.length > 0) {
      let validacionImagen: boolean = functionsGlobal.validarArchivoImagen(instanciaFotos.cachedFileArray, tipoArchivoAdmitido);
      if (validacionImagen) {
        Swal.fire({
          text: "Los archivos son correctos",
          type: "question"
        }).then(respuesta => {
          if (respuesta.value) {
            this.abrirBlock();
            let jsonServicioSolicitado = {
              idAlumno: 1,
              listaDeServicioSolicitados: this.formControlListaServicio.value
            }
            this.servicioSolicitadoService.registrarServicioSolicitadoPorAlumnoYSemestreActual(jsonServicioSolicitado).pipe(tap(servicioSolicitado => {
              this.servicioSolicitadoActualPorAlumnoYSemestreActual = servicioSolicitado;
            }), flatMap((servicioSolicitadoRegistrado: servicioSolicitados) => {
              let json = {
                "idServicioSolicitado": servicioSolicitadoRegistrado.id,
                "idRequisito": requisito.id,
                "codigoMatricula": servicioSolicitadoRegistrado.codigoMatricula
              }
              return this.servicioSolicitadoRequisitoService.registrarServicioSolicitadoRequisito(json);
            }), map((servicioSolicitadoRequisitoRegistrado: servicioSolicitadoRequisito) => {
              let formData = new FormData();
              formData.append("archivos", instanciaFotos.cachedFileArray)
              formData.append("idServicioSolicitadoRegistrado", servicioSolicitadoRequisitoRegistrado.id.toString())
              return formData;
            })
            ).subscribe(respuesta => {
              if (respuesta) {
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
                Swal.fire({
                  toast: true,
                  type: "success",
                  timer: 2000,
                  text: "Se subieron correctamente los archivos"
                })
                this.cerrarBlock()
              }
            });
          }
        })
      } else {
        Swal.fire({
          title: "Error",
          type: "error",
          html: "Por favor solo esta permitido archivos de tipo " + nombreArchivoPermitido
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
    let json = {
      listaServiciosSolicitados: this.formControlListaServicio.value,
      idAlumno: "1"
    }
    this.requisitoSandBox.listarRequisitosDeComedorYInternadoYTipoAlumno(json);

    this.listaFotosParaSubir = [];
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
    if (this.servicioSolicitadoActualPorAlumnoYSemestreActual) {
      Swal.fire({
        html: "Ya cuenta con un servicio que esta en proceso de evaluacion",
        type: "info"
      })
      return

    }
    this.abrilModal(idModalServicio)
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
