import { VISIBILITY_FILTER } from './../../filter/filterRequisito.model';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { swal } from './../../../../global/swal';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, NgModel } from '@angular/forms';
import { Observable, Observer, Subject, from } from 'rxjs';
import { requisito } from '../../Models/Requisito';
import { RequisitoService } from '../../services/requisito.service';
import { scan, concat, startWith, flatMap, take, map } from 'rxjs/operators';
import { ModelFactory, Model } from '@angular-extensions/model';
import Swal from 'sweetalert2';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { tipoRequisito } from '../../Models/tipoRequisito';
import { TipoRequisitoService } from '../../services/tipo-requisito.service';
import FileUploadWithPreview from 'file-upload-with-preview'
import { Select2OptionData } from 'ng2-select2';
import { ServicioService } from '../../services/servicio.service';
import { servicio } from '../../Models/servicio';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSelect } from '@angular/material';
import * as $ from 'jquery';
import { FileService } from 'src/app/global/services/file.service';
import { archivo } from '../../Models/archivo';
import { requisitoQuery } from '../../query/requisitoQuery';
import { ID } from '@datorama/akita';
import { RequsitoFilter, filtradoInicial } from '../../filter/filterRequisito.model';

/**
 *
 *
 * @export
 * @class RequisitoComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: ['./requisito.component.scss']
})

export class RequisitoComponent implements OnInit {

  listaRequisito$: Observable<requisito[]>
  listaFiltroRequisito: Array<RequsitoFilter>;
  private modelRequisito: Model<requisito[]>;
  private modelTipoRequisito: Model<tipoRequisito[]>;
  private modelServicios: Model<servicio[]>
  listaServicio$: Observable<servicio[]>
  listaArchivosPorRequisito: archivo[];
  listaTipoRequisito$: Observable<tipoRequisito[]>
  idModalRegistroRequisito: string = "modal1"
  idModalArchivos: string = "modalArchivos"
  formularioRequisito: FormGroup
  requisitoSeleccionado: requisito
  @BlockUI() blockUI: NgBlockUI;
  fileUpload: FileUploadWithPreview;
  @ViewChild("selectTipoArchivo")
  private selectTipoArchivo;
  controlFiltrado: FormControl
  estadoActualizarResgitrarFormularion: boolean = false;
  constructor(private fb: FormBuilder,
    private tipoRequisitoService: TipoRequisitoService,
    private filseService: FileService,
    private requisitoService: RequisitoService,
    private modelFactory: ModelFactory<requisito[]>,
    private modelFacotoryServicio: ModelFactory<servicio[]>,
    private modelFactoryTipoRequisito: ModelFactory<tipoRequisito[]>,
    private serviciosService: ServicioService,
    private requisitoQuery: requisitoQuery) {

  }
  ngOnInit() {
    this.controlFiltrado = new FormControl(VISIBILITY_FILTER.MOSTRAR_TODO);

    this.controlFiltrado.valueChanges.subscribe(opcion => {
      this.requisitoService.actualizarFiltrado(opcion);
    });
    this.formularioRequisito = this.fb.group({
      id: new FormControl(),
      nombre: new FormControl("", [Validators.required]),
      descripcion: new FormControl(""),
      requerido: new FormControl("", [Validators.required]),
      prioridad: new FormControl("", [Validators.required]),
      tipoArchivo: new FormControl("", [Validators.required]),
      tipos: new FormControl("", [Validators.required]),
      servicios: new FormControl("", [Validators.required]),
    })
    this.listaFiltroRequisito = filtradoInicial;
    this.fileUpload = new FileUploadWithPreview("fileRequisito")
    this.listaTipoRequisito$ = this.tipoRequisitoService.all();
    this.listaServicio$ = this.serviciosService.listarServicio();
    this.listarRequisitos();
    this.iniciarDatos();
    // this.requisitoService.getAllPersona()

  }
  activarFloating(ul: ElementRef) {
    $(ul).children().each((i, element) => {
      setTimeout(() => {
        $(element).fadeToggle(500)
      }, 100 + (i * 50))
    })
  }




  iniciarDatos() {
    this.activarBlock()
    this.tipoRequisitoService.all().subscribe(async tipoRequisito => {
      this.modelTipoRequisito = this.modelFactoryTipoRequisito.create(tipoRequisito);
      this.listaTipoRequisito$ = this.modelTipoRequisito.data$;
      await this.serviciosService.listarServicio().subscribe(async servicios => {
        this.modelServicios = this.modelFacotoryServicio.create(servicios);
        this.listaServicio$ = this.modelServicios.data$;
        await this.cerrarBlock();
      })

    });
    /*this.listaTipoRequisito$.subscribe(data => {
      this.listaServicio$ = this.serviciosService.listarServicio();
      this.listaServicio$.subscribe(async dataSer => {
        await this.abrirModal(idModal)
        this.cerrarBlock()
      })
    })*/
  }
  listarRequisitos() {
    this.requisitoService.listarRequisitos().subscribe();
    this.listaRequisito$ = this.requisitoQuery.selectVisibleTodos$;
  }
  //CRUD REQUISITO
  guardarYEditarRequisito(formsValue) {
    this.activarBlock();
    if (formsValue.id == null) {
      delete formsValue.id;
      let guardarRequisito = formsValue as requisito
      guardarRequisito.nombreArchivo = this.selectTipoArchivo.selected._element.nativeElement.innerText.trim()
      this.requisitoService.gurdarRequisito(guardarRequisito)
        .subscribe(requisitoGurdado => {
          from(this.fileUpload.cachedFileArray ? this.fileUpload.cachedFileArray : []).pipe(take(this.fileUpload.cachedFileArray.length), map((file: File) => {
            let formData = new FormData();
            formData.append("archivo", file)
            formData.append("idRequisito", requisitoGurdado.id.toString());
            formData.append("nombreCarpeta", "requisitos");
            return formData
          }), flatMap(formData => this.filseService.gurdarArchivoRequisito(formData))).subscribe({
            next: (respuesta) => { console.log(respuesta) },
            complete: () => {
              console.log(requisitoGurdado)
              this.closeModal(this.idModalRegistroRequisito);
              functionsGlobal.getToast("Se Registro Correctamente")
              this.cerrarBlock();
            }
          })
        })
    }
    else {
      formsValue.prioridad = formsValue.prioridad == "true" ? true : false;
      formsValue.requerido = formsValue.requerido == "true" ? true : false;

      formsValue.nombreArchivo = this.selectTipoArchivo.selected._element.nativeElement.innerText.trim()
      this.requisitoService.editarRequisito(formsValue).subscribe(requisitoUpdate => {

        this.closeModal(this.idModalRegistroRequisito);
        functionsGlobal.getToast("Se Edito Correctamente")
        this.blockUI.stop();
      })
    }
  }
  mostrarDatosFormularioRequisito() {
    let tiposSeleccionado = this.requisitoSeleccionado.tipos.map(tipo => tipo.id);
    let serviciosSeleccionado = this.requisitoSeleccionado.servicios.map(servicio => servicio.id);
    this.estadoActualizarResgitrarFormularion = true;
    this.formularioRequisito.get("id").setValue(this.requisitoSeleccionado.id);
    this.formularioRequisito.get("nombre").setValue(this.requisitoSeleccionado.nombre);
    this.formularioRequisito.get("descripcion").setValue(this.requisitoSeleccionado.descripcion)
    this.formularioRequisito.get("tipoArchivo").setValue(this.requisitoSeleccionado.tipoArchivo)
    this.formularioRequisito.get("tipos").setValue(tiposSeleccionado);
    this.formularioRequisito.get("servicios").setValue(serviciosSeleccionado);
    this.formularioRequisito.get("prioridad").patchValue(this.requisitoSeleccionado.prioridad ? "true" : "false");
    this.formularioRequisito.get("requerido").patchValue(this.requisitoSeleccionado.requerido ? "true" : "false")
    this.formularioRequisito.get("servicios").clearValidators();
    this.formularioRequisito.get("tipos").clearValidators();
    this.formularioRequisito.updateValueAndValidity();
    this.fileUpload.cachedFileArray = [];
    this.fileUpload.clearImagePreviewPanel();
  }
  eliminarRequisito(idRequisito: ID) {
    Swal.fire({
      title: "¿Desea Eliminar el requisito?",
      showCancelButton: true,
      type: "question",
      showConfirmButton: true,
      cancelButtonText: "cancelar",
      confirmButtonText: "OK",

    }).then(respuesta => {
      if (respuesta.value) {
        this.activarBlock();
        this.requisitoService.borrarRequisito(idRequisito).subscribe(requisitoBorrado => {
          functionsGlobal.getToast("Se elimino Correctamente");
          this.cerrarBlock();
        })

      }
    })

  }
  //Metodos para cambiar el estado de los selects multiple
  changeTipo(event: any) {
    if (event.isUserInput && this.requisitoSeleccionado) {
      let json = {
        id: this.requisitoSeleccionado.id,
        idTipo: event.source.value,
        estado: event.source.selected
      }
      this.activarBlock()
      this.requisitoService.editarOpcionTipo(json).subscribe(requisitoActualizado => {
        this.closeModal(this.idModalRegistroRequisito);
        functionsGlobal.getToast("Se Edito Correctamente")
        this.cerrarBlock();
      });
    }
  }
  changeServicio(event: any) {
    if (this.requisitoSeleccionado && event.isUserInput) {
      let json = {
        id: this.requisitoSeleccionado.id,
        idServicio: event.source.value,
        estado: event.source.selected
      }
      this.activarBlock()
      this.requisitoService.editarOpcionServicio(json).subscribe(requisitoActualizado => {
        this.closeModal(this.idModalRegistroRequisito);
        functionsGlobal.getToast("Se Edito Correctamente")
        this.cerrarBlock();
      })
    }
  }

  //FIN DE CRUD REQUISITOS
  //
  getArhivosPorRequisitoId(idRequisito: number) {
    this.activarBlock();
    this.requisitoService.getArchivosPorRequisitoId(idRequisito).subscribe(archivos => {
      this.listaArchivosPorRequisito = archivos;
      this.cerrarBlock();
      this.abrirModal(this.idModalArchivos)
    })
  }



  disabledFormularioRequisito() {
    this.formularioRequisito.disable();
  }
  enabledFormularioRequisito() {
    this.formularioRequisito.enable();
  }
  visualizarRequisito() {
    this.mostrarDatosFormularioRequisito();
    this.disabledFormularioRequisito();
    this.abrirModal(this.idModalRegistroRequisito);
  }
  descargarArchivo(archivo: string) {
    this.filseService.downloadFile(archivo)
  }
  compareString(string1: any, string2: any) {
    return string1 === string2;
  }

  compareObjeto(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
  }






  //FUNCIONES BASICAS
  activarBlock() {
    this.blockUI.start()

  }
  cerrarBlock() {
    this.blockUI.stop()
  }
  abrirModal(id: string) {
    functionsGlobal.openModal(id)
  }
  closeModal(id: string) {
    functionsGlobal.closeModal(id)
  }
  buscarRequisito(requisitos: requisito[], requisito: requisito): number {
    return requisitos.findIndex(requisitoB => requisitoB.id == requisito.id)
  }
  setRequisito(requisito: requisito) {
    this.requisitoSeleccionado = requisito;
  }
  nuevoRequisito() {
    this.fileUpload.cachedFileArray = [];
    this.estadoActualizarResgitrarFormularion = false;
    this.fileUpload.clearImagePreviewPanel();
    this.requisitoSeleccionado = null;
    this.enabledFormularioRequisito();
    this.formularioRequisito.reset();
  }
  //FIN DE FUNCIONES BASICAS
}
