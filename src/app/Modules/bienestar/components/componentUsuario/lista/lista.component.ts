import { tap, flatMap, map, zip, take } from "rxjs/operators";
import { servicioSolicitadoSandBox } from "./../../../sandBox/servicioSolicitadoSandBox";
import { servicioQuery } from "./../../../BD/query/servicioQuery";
import { requisitoQuery } from "./../../../BD/query/requisitoQuery";
import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  AfterViewInit,
  ViewChild
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
import { servicio } from "../../../Models/servicio";
import { alumnoRequisito } from "../../../Models/alumnoRequisito";
import { obuServicios } from "../../../Models/obuServicios";
import { archivo } from "../../../Models/archivo";
import { requisito } from "../../../Models/Requisito";
import { AlumnoRequisitoService } from "../../../services/alumno-requisito.service";
import { ServicioSolicitadoService } from "../../../services/servicio-solicitado.service";
import { servicioSandBox } from "../../../sandBox/servicioSandBox";
import { requisitoSandBox } from "../../../sandBox/requisitoSandBox";

@Component({
  selector: "app-lista",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.scss"]
})
export class ListaServiciosComponent implements OnInit, AfterViewInit {
  idModalServicio: string = "modalServicio";
  modalListaRequisitoAlumno: string = "modalListaRequisitoAlumno";
  modalSubirArchivo: string = "modalSubirArchivo";
  modalListaRequisitos: string = "modelListaRequisito";
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
  artefactoParaSubirArchivo: FileUploadWithPreview;
  numeroTotalDeRequisitoRequerido$: Observable<number>;
  numeroTotalDeRequisitoRequerido: number;
  contadorTotalRequisitoEnviadoRequerido: number;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild("numeroTotalRequisitoRequerido", { static: false })
  numeroTotalHtml: ElementRef;
  constructor(
    private _formBuilder: FormBuilder,
    private servicioSandBox: servicioSandBox,
    private requisitoSandBox: requisitoSandBox,
    private requisitoQuery: requisitoQuery,
    private servicioQuery: servicioQuery,
    private alumnoRequisitoService: AlumnoRequisitoService,
    private servicioSolicitadoService: ServicioSolicitadoService
  ) {}
  ngOnInit() {
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
    let numeroTotalDeRequisitoRequerido = this.numeroTotalHtml.nativeElement
      .value;
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
      idObuSolicitud: this.servicioSolicitadoActualPorAlumnoYSemestreActual.id
    };
    console.log(json);
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

  async registerServices(step: any) {
    const respuesta = await Swal.fire({
      text: "Su solicitud se registrara , no se podra deshacer la operacion",
      type: "question",
      showCancelButton: true,
      showConfirmButton: true
    });
    if (respuesta.value) {
      let json = {
        listaServiciosSolicitados: this.formListService.get(
          "listaDeServicioSolicitados"
        ).value,
        idAlumno: "1"
      };
      console.log(json);
      this.servicioSolicitadoActualPorAlumnoYSemestreActual = await this.servicioSolicitadoService
        .registrarServicioSolicitadoPorAlumnoYSemestreActual(json)
        .toPromise();
      step.next();
      this.requisitoSandBox.listarRequisitosDeComedorYInternadoYTipoAlumno(
        json
      );
    }
  }
  listaRequisitosPorAlumnoYSemestre(serviciosolicitado: obuServicios) {
    let json = {
      listaServiciosSolicitados: serviciosolicitado.servicios.map(s => s.id),
      idAlumno: "1"
    };
    this.requisitoSandBox.listarRequisitosDeComedorYInternadoYTipoAlumno(json);
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
  setFormGroupListServices(step: any) {
    let serviciosId = this.servicioSolicitadoActualPorAlumnoYSemestreActual.servicios.map(
      servicio => servicio.id
    );
    this.formListService
      .get("listaDeServicioSolicitados")
      .setValue(serviciosId);
    const json = {
      idAlumno: "1",
      listaServiciosSolicitados: serviciosId
    };
    console.log(json);
    this.requisitoSandBox.listarRequisitosDeComedorYInternadoYTipoAlumno(json);
    step.next();
  }
}
