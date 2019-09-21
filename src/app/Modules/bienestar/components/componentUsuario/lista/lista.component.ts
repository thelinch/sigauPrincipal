import { tap, flatMap, map, zip } from "rxjs/operators";
import { servicioSolicitadoSandBox } from "./../../../sandBox/servicioSolicitadoSandBox";
import { servicioQuery } from "./../../../BD/query/servicioQuery";
import { requisitoQuery } from "./../../../BD/query/requisitoQuery";
import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { functionsGlobal } from "src/app/global/funciontsGlobal";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from "@angular/forms";
import { Observable, from, of, forkJoin } from "rxjs";
import { NgBlockUI, BlockUI } from "ng-block-ui";
import FileUploadWithPreview from "file-upload-with-preview";
import Swal from "sweetalert2";
import { FileService } from "src/app/global/services/file.service";
import { servicio } from "../../../Models/servicio";
import { alumnoRequisito } from "../../../Models/alumnoRequisito";
import { obuServicios } from "../../../Models/obuServicios";
import { archivo } from "../../../Models/archivo";
import { requisito } from "../../../Models/Requisito";
import { AlumnoRequisitoService } from "../../../services/alumno-requisito.service";
import { ServicioSolicitadoService } from "../../../services/servicio-solicitado.service";
import { servicioSandBox } from "../../../sandBox/servicioSandBox";
import { requisitoSandBox } from "../../../sandBox/requisitoSandBox";
import { ServicioSolicitadoRequisitoService } from "../../../services/servicio-solicitado-requisito.service";
import { variables } from "src/app/global/variablesGlobales";
import { obuSolicitudRequisitoArchivos } from "../../../services/obuSolicitud-requisitos-archivos.service";

@Component({
  selector: "app-lista",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.scss"]
})
export class ListaServiciosComponent implements OnInit, AfterViewInit {
  idModalServicio: string = "modalServicio";
  modalListaRequisitoAlumno: string = "modalListaRequisitoAlumno";
  modalSubirArchivo: string = "modalSubirArchivo";
  isLinear = false;
  //formControlListaServicio: FormControl;
  formListService: FormGroup;
  showPopup: boolean = false;
  listaServiciosActivados$: Observable<servicio[]>;
  listaAlumnoRequisitoPorALumnoYSemestre: alumnoRequisito[];
  servicioSolicitadoActualPorAlumnoYSemestreActual: obuServicios;
  archivoSeleccionado: archivo;
  listaRequisitosPorServicio$: Observable<requisito[]>;
  listaRequisitosLlenadosPorUsuario: requisito[];
  listaRequisitoRegistrodoAlumno: Array<number>;
  listaFotosParaSubir: Array<FileUploadWithPreview>;
  artefactoParaSubirArchivo: FileUploadWithPreview;
  numeroTotalDeRequisitoRequerido$: Observable<number>;
  contadorTotalRequisitoEnviadoRequerido: number;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private _formBuilder: FormBuilder,
    //private servicioService: ServicioService,
    private servicioSandBox: servicioSandBox,
    private requisitoSandBox: requisitoSandBox,
    private requisitoQuery: requisitoQuery,
    private servicioQuery: servicioQuery,
    private filseService: FileService,
    private render: Renderer2,
    private alumnoRequisitoService: AlumnoRequisitoService,
    private servicioSolicitadoService: ServicioSolicitadoService,
    private servicioSolicitadoRequisitoService: ServicioSolicitadoRequisitoService,
    private obuSolicitudRequisitoArchivo: obuSolicitudRequisitoArchivos
  ) {}
  config: SwiperOptions = {
    pagination: ".swiper-pagination",
    paginationClickable: true,
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    spaceBetween: 30
  };

  async ngOnInit() {
    this.listaFotosParaSubir = new Array<FileUploadWithPreview>();
    this.formListService = this._formBuilder.group({
      listaDeServicioSolicitados: ["", Validators.required]
    });
    this.numeroTotalDeRequisitoRequerido$ = this.requisitoQuery.selectCount(
      requisito => requisito.requerido
    );
    this.contadorTotalRequisitoEnviadoRequerido = 0;
    this.listaRequisitosPorServicio$ = this.requisitoQuery.selectAll();
    this.listaServiciosActivados$ = this.servicioQuery.selectAll({
      filterBy: entity =>
        entity.activador &&
        (entity.nombre == "COMEDOR" || entity.nombre == "INTERNADO")
    });
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
  async iniciarDatos() {
    let json = { idAlumno: "1" };
    this.servicioSandBox.listaServicio();
    this.servicioSolicitadoActualPorAlumnoYSemestreActual = await this.servicioSolicitadoService
      .servicioSolicitadoPorAlumnoComedorYInternadoYSemestreActual(json)
      .toPromise();
  }

  async registrarServiciosParaEvaluacion() {
    let numeroTotalDeRequisitoRequerido = await this.numeroTotalDeRequisitoRequerido$.toPromise();
    if (
      this.contadorTotalRequisitoEnviadoRequerido !=
      numeroTotalDeRequisitoRequerido
    ) {
      Swal.fire({
        title: "Requisitos requeridos",
        text: "Registre todos los requesitos requeridos",
        type: "error"
      });
      return;
    }
    let json = {
      idAlumno: "1",
      listaDeServicioSolicitados: this.formListService.value
    };
    this.servicioSolicitadoActualPorAlumnoYSemestreActual = await this.servicioSolicitadoService
      .registrarServicioSolicitadoPorAlumnoYSemestreActual(json)
      .toPromise();
  }
  async subirImagenFileWithPreview(
    id: number,
    tipoArchivoAdmitido: string,
    nombreArchivoPermitido: string,
    requisito: requisito,
    stepper,
    matSteep,
    boton: ElementRef
  ) {
    let instanciaFotos = this.listaFotosParaSubir.find(
      fileUploader => fileUploader.uploadId == id
    );
    if (instanciaFotos.cachedFileArray.length > 0) {
      let validacionImagen: boolean = functionsGlobal.validarArchivoImagen(
        instanciaFotos.cachedFileArray,
        tipoArchivoAdmitido
      );
      if (validacionImagen) {
        const respuesta = await Swal.fire({
          text: "Los archivos son correctos",
          type: "question"
        });

        if (respuesta.value) {
          let json = {
            codigoMatricula: this
              .servicioSolicitadoActualPorAlumnoYSemestreActual.codigoMatricula,
            idServicioSolicitado: this
              .servicioSolicitadoActualPorAlumnoYSemestreActual.id,
            idRequisito: requisito.id
          };
          let obuSolicitudRequisito = await this.servicioSolicitadoRequisitoService
            .registrarServicioSolicitadoRequisito(json)
            .toPromise();
          from(instanciaFotos.cachedFileArray)
            .pipe(
              map((file: File) => {
                let formData = new FormData();
                formData.append("archivo", file);
                formData.append(
                  "nombreCarpeta",
                  variables.carpetaOBUArchivoRequisitos +
                    `antony/${this.servicioSolicitadoActualPorAlumnoYSemestreActual.codigoMatricula}/`
                );
                return formData;
              }),
              flatMap(formData => {
                return this.filseService.guardarArchivo(formData);
              }),
              flatMap((url: string) => {
                let json = {
                  obu_requisito_id: obuSolicitudRequisito.id,
                  url: url
                };
                return this.obuSolicitudRequisitoArchivo.create(json);
              }),
              flatMap(respuesta => {
                return this.requisitoQuery.selectCount(
                  requisito => requisito.requerido
                );
              })
            )
            .subscribe(numeroTotalRequisitoRequerido => {
              if (numeroTotalRequisitoRequerido) {
                matSteep.editable = false;
                matSteep.interacted = true;
                instanciaFotos.clearImagePreviewPanel();
                this.render.addClass(boton, "disabled");
                if (requisito.requerido) {
                  this.contadorTotalRequisitoEnviadoRequerido++;
                }
                if (
                  this.contadorTotalRequisitoEnviadoRequerido ==
                  numeroTotalRequisitoRequerido
                ) {
                  stepper.completed = true;
                }
                Swal.fire({
                  toast: true,
                  type: "success",
                  timer: 2000,
                  text: "Se subieron correctamente los archivos"
                });
                this.cerrarBlock();
              }
            });

          /*this.servicioSolicitadoService
            .registrarServicioSolicitadoPorAlumnoYSemestreActual(
              jsonServicioSolicitado
            )
            .pipe(
              tap(servicioSolicitado => {
                this.servicioSolicitadoActualPorAlumnoYSemestreActual = servicioSolicitado;
              }),
              flatMap((servicioSolicitadoRegistrado: obuServicios) => {
                let json = {
                  idServicioSolicitado: servicioSolicitadoRegistrado.id,
                  idRequisito: requisito.id,
                  codigoMatricula: servicioSolicitadoRegistrado.codigoMatricula
                };
                return this.servicioSolicitadoRequisitoService.registrarServicioSolicitadoRequisito(
                  json
                );
              }),
              flatMap(
                (
                  servicioSolicitadoRequisitoRegistrado: servicioSolicitadoRequisito
                ) => {
                  let formData = new FormData();
                  formData.append("archivos", instanciaFotos.cachedFileArray);
                  formData.append(
                    "idServicioSolicitadoRegistrado",
                    servicioSolicitadoRequisitoRegistrado.id.toString()
                  );
                  return this.filseService.guardarArchivo(formData);
                }
              )
            )
            .subscribe(respuesta => {
              if (respuesta) {
                matSteep.editable = false;
                matSteep.interacted = true;
                instanciaFotos.clearImagePreviewPanel();
                this.render.addClass(boton, "disabled");
                if (requisito.requerido) {
                  this.contadorTotalRequisitoEnviadoRequerido++;
                }
                if (
                  this.contadorTotalRequisitoEnviadoRequerido ==
                  this.numeroTotalDeRequisitoRequerido
                ) {
                  stepper.completed = true;
                }
                Swal.fire({
                  toast: true,
                  type: "success",
                  timer: 2000,
                  text: "Se subieron correctamente los archivos"
                });
                this.cerrarBlock();
              }
            });*/
        }
      } else {
        Swal.fire({
          title: "Error",
          type: "error",
          html:
            "Por favor solo esta permitido archivos de tipo " +
            nombreArchivoPermitido
        });
      }
    } else {
      Swal.fire({
        html: "Carga al menos una imagen",
        type: "error"
      });
    }
  }
  onUploadSuccess(e: any) {
    console.log(e);
  }
  stepChanged(evento, objeto) {
    console.log(evento);
    evento.next();
  }
  onSending(evento, idRequisito) {
    evento[2].append("id", idRequisito);
  }
  crearInstanciaFileWithPreview(idObjeto: number) {
    if (
      !this.listaFotosParaSubir.find(
        fileUploader => fileUploader.uploadId == idObjeto
      )
    ) {
      this.listaFotosParaSubir.push(new FileUploadWithPreview(idObjeto));
    }
  }
  async registerServices(listServices: any, step: any) {
    const respuesta = await Swal.fire({
      text: "Su solicitud se registrara , no se podra deshacer la operacion",
      type: "question",
      showCancelButton: true,
      showConfirmButton: true
    });
    if (respuesta.value) {
      let json = {
        listaServiciosSolicitados: listServices,
        idAlumno: "1"
      };
      this.servicioSolicitadoActualPorAlumnoYSemestreActual = await this.servicioSolicitadoService
        .registrarServicioSolicitadoPorAlumnoYSemestreActual(json)
        .toPromise();
      this.requisitoSandBox.listarRequisitosDeComedorYInternadoYTipoAlumno(
        json
      );
      this.listaFotosParaSubir = [];
    }
  }
  listaRequisitosPorAlumnoYSemestre(serviciosolicitado: obuServicios) {
    let json = {
      codigoMatricula: serviciosolicitado.codigoMatricula,
      idAlumno: serviciosolicitado.alumno.id
    };
    this.abrirBlock();
    this.alumnoRequisitoService
      .listaAlumnoRequisitoPorAlumnoYSemestre(json)
      .subscribe(listaAlumnoRequisito => {
        this.listaAlumnoRequisitoPorALumnoYSemestre = listaAlumnoRequisito;
        this.listaAlumnoRequisitoPorALumnoYSemestre.forEach(listaRequisitos => {
          listaRequisitos.archivos = listaRequisitos.archivos.map(archivo => {
            return {
              ...archivo,
              estadoActual: archivo.estados_archivo.filter(
                estado => estado.pivot.estado
              )[0]
            };
          });
        });
        this.abrilModal(this.modalListaRequisitoAlumno);
        this.cerrarBlock();
      });
  }
  modalResubirArchivo(archivo: archivo, kendo: any) {
    console.log(kendo);
  }
  listaArchivosPorAlumnoRequisito(alumnoRequisitoParametro: alumnoRequisito) {
    this.abrirBlock();
    let json = {
      id: alumnoRequisitoParametro.id
    };
    this.alumnoRequisitoService
      .listaArchivoPorAlumnoRequisito(json)
      .subscribe(archivos => {
        alumnoRequisitoParametro.archivos = archivos;
        this.cerrarBlock();
      });
  }
  async verificarExistenciaDeServicioSolicitado(idModalServicio: string) {
    // const obuServicio: obuServicios = await this.servicioSolicitadoActualPorAlumnoYSemestreActual$.toPromise();
    if (this.servicioSolicitadoActualPorAlumnoYSemestreActual) {
      Swal.fire({
        html: "Ya cuenta con un servicio que esta en proceso de evaluacion",
        type: "info"
      });
      return;
    }
    this.abrilModal(idModalServicio);
  }
  abrirBlock() {
    this.blockUI.start();
  }
  cerrarBlock() {
    this.blockUI.stop();
  }
  abrilModal(id: string) {
    functionsGlobal.openModal(id);
  }
  async cerrarModal(id: string) {
    if (id == "modalServicio") {
      let respuesta = await Swal.fire({
        title: "esta seguro de cerra la ventana",
        type: "question",
        position: "center",
        showConfirmButton: true,
        showCancelButton: true
      });
      if (respuesta.value) {
        functionsGlobal.closeModal(id);
      }
    } else {
      functionsGlobal.closeModal(id);
    }
  }
}
