import { archivoBase } from "./../../Models/archivoBase";
import { obuServicios } from "./../../Models/obuServicios";
import { requisito } from "src/app/Modules/bienestar/Models/Requisito";
import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  Renderer2
} from "@angular/core";
import { Observable, from } from "rxjs";
import FileUploadWithPreview from "file-upload-with-preview";
import Swal from "sweetalert2";
import { functionsGlobal } from "src/app/global/funciontsGlobal";
import { map, flatMap } from "rxjs/operators";
import { variables } from "src/app/global/variablesGlobales";
import { ServicioSolicitadoRequisitoService } from "../../services/servicio-solicitado-requisito.service";
import { FileService } from "src/app/global/services/file.service";
import { obuSolicitudRequisitoArchivos } from "../../services/obuSolicitud-requisitos-archivos.service";
import { requisitoQuery } from "../../BD/query/requisitoQuery";

@Component({
  selector: "app-lista-requisito",
  templateUrl: "./lista-requisito.component.html",
  styleUrls: ["./lista-requisito.component.css"]
})
export class ListaRequisitoComponent implements OnInit {
  @Input() servicioSolicitadoActualPorAlumnoYSemestreActual: obuServicios;
  listaRequisitosPorServicio$: Observable<requisito[]>;
  listaFotosParaSubir: Array<FileUploadWithPreview>;
  @ViewChild("numeroTotalRequisitoRequerido", { static: false })
  numeroTotalHtml: ElementRef;
  contadorTotalRequisitoEnviadoRequerido: number;
  numeroTotalDeRequisitoRequerido$: Observable<number>;
  config: SwiperOptions = {
    pagination: ".swiper-pagination",
    paginationClickable: true,
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    spaceBetween: 30
  };
  constructor(
    private servicioSolicitadoRequisitoService: ServicioSolicitadoRequisitoService,
    private filseService: FileService,
    private obuSolicitudRequisitoArchivo: obuSolicitudRequisitoArchivos,
    private render: Renderer2,
    private requisitoQuery: requisitoQuery
  ) {
    this.contadorTotalRequisitoEnviadoRequerido = 0;
    if (!this.listaFotosParaSubir) {
      this.listaFotosParaSubir = new Array<FileUploadWithPreview>();
    }
  }

  ngOnInit() {
    this.numeroTotalDeRequisitoRequerido$ = this.requisitoQuery.selectCount(
      requisito => requisito.requerido
    );
    this.listaRequisitosPorServicio$ = this.requisitoQuery.selectAll();
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
              flatMap((archivoBase: any) => {
                const url = JSON.parse(archivoBase).url;
                let json = {
                  obu_requisito_id: obuSolicitudRequisito.id,
                  url: url
                };
                return this.obuSolicitudRequisitoArchivo.create(json);
              })
            )
            .subscribe({
              complete: () => {
                console.log("se completo");
                let numeroTotalRequerido = this.numeroTotalHtml.nativeElement
                  .value;
                if (numeroTotalRequerido) {
                  matSteep.editable = false;
                  matSteep.interacted = true;
                  instanciaFotos.clearImagePreviewPanel();
                  this.render.addClass(boton, "disabled");
                  if (requisito.requerido) {
                    this.contadorTotalRequisitoEnviadoRequerido++;
                  }
                  if (
                    this.contadorTotalRequisitoEnviadoRequerido ==
                    numeroTotalRequerido
                  ) {
                    stepper.completed = true;
                  }
                  stepper.next();
                  Swal.fire({
                    toast: true,
                    type: "success",
                    timer: 2000,
                    position: "top-end",
                    text: "Se subieron correctamente los archivos"
                  });
                }
              }
            });
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
  crearInstanciaFileWithPreview(idObjeto: number) {
    if (
      !this.listaFotosParaSubir.find(
        fileUploader => fileUploader.uploadId == idObjeto
      )
    ) {
      console.log("entro al IF");
      this.listaFotosParaSubir.push(new FileUploadWithPreview(idObjeto));
    }
  }
  registrarServiciosParaEvaluacion() {}
}
