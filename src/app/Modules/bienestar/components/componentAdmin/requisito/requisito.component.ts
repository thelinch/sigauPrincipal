import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import FileUploadWithPreview from 'file-upload-with-preview'
import * as $ from 'jquery';
import { FileService } from 'src/app/global/services/file.service';
import { ID } from '@datorama/akita';
import { NotificacionBusService } from 'src/app/global/services/NotificacionBusService.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequsitoFilter, filtradoInicial, VISIBILITY_FILTER } from '../../../filter/filterRequisito.model';
import { requisito } from '../../../Models/Requisito';
import { archivo } from '../../../Models/archivo';
import { servicio } from '../../../Models/servicio';
import { tipoRequisito } from '../../../Models/tipoRequisito';
import { requisitoQuery } from '../../../BD/query/requisitoQuery';
import { requisitoSandBox } from '../../../sandBox/requisitoSandBox';
import { servicioSandBox } from '../../../sandBox/servicioSandBox';
import { servicioQuery } from '../../../BD/query/servicioQuery';

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
    private filseService: FileService,
    private sb: requisitoSandBox,
    private notificacionBusService: NotificacionBusService,
    private requisitoQuery: requisitoQuery,
    private sandBoxService: servicioSandBox,
    private servicioQuery: servicioQuery) {

  }
  ngOnInit() {
    this.sandBoxService.listaServicio();
    this.controlFiltrado = new FormControl(VISIBILITY_FILTER.MOSTRAR_TODO);
    this.notificacionBusService.showNotificacionSource.subscribe(notificacion => {
      Swal.fire({
        html: notificacion.detalle,
        type: notificacion.severidad
      })
    })
    this.controlFiltrado.valueChanges.subscribe(opcion => {
      this.sb.actualizarFiltrado(opcion);
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
    this.sb.listaRequisitos();
    this.listaRequisito$ = this.requisitoQuery.selectVisibleTodos$;
    this.listaServicio$ = this.servicioQuery.selectAll();
    this.listaTipoRequisito$ = this.sb.listaTipoRequisitos$;

  }

  //CRUD REQUISITO
  guardarYEditarRequisito(formsValue) {
    if (formsValue.id == null) {
      delete formsValue.id;
      let guardarRequisito = formsValue as requisito
      guardarRequisito.nombreArchivo = this.selectTipoArchivo.selected._element.nativeElement.innerText.trim()
      this.sb.crearRequisito(guardarRequisito, this.fileUpload.cachedFileArray)
    }
    else {
      formsValue.prioridad = formsValue.prioridad == "true" ? true : false;
      formsValue.requerido = formsValue.requerido == "true" ? true : false;
      formsValue.nombreArchivo = this.selectTipoArchivo.selected._element.nativeElement.innerText.trim()
      this.sb.editarRequisito(formsValue)
    }
  }
  mostrarDatosFormularioRequisito(idRequisito: ID) {
    this.requisitoQuery.selectEntity(idRequisito).subscribe(requisitoSeleccionado => {

      this.sb.setActive(requisitoSeleccionado.id)
      let tiposSeleccionado = requisitoSeleccionado.tipos.map(tipo => tipo.id);
      let serviciosSeleccionado = requisitoSeleccionado.servicios.map(servicio => servicio.id);
      this.estadoActualizarResgitrarFormularion = true;
      this.formularioRequisito.get("id").setValue(requisitoSeleccionado.id);
      this.formularioRequisito.get("nombre").setValue(requisitoSeleccionado.nombre);
      this.formularioRequisito.get("descripcion").setValue(requisitoSeleccionado.descripcion)
      this.formularioRequisito.get("tipoArchivo").setValue(requisitoSeleccionado.tipoArchivo)
      this.formularioRequisito.get("tipos").setValue(tiposSeleccionado);
      this.formularioRequisito.get("servicios").setValue(serviciosSeleccionado);
      this.formularioRequisito.get("prioridad").patchValue(requisitoSeleccionado.prioridad ? "true" : "false");
      this.formularioRequisito.get("requerido").patchValue(requisitoSeleccionado.requerido ? "true" : "false")
      this.formularioRequisito.get("servicios").clearValidators();
      this.formularioRequisito.get("tipos").clearValidators();
      this.formularioRequisito.updateValueAndValidity();
      this.fileUpload.cachedFileArray = [];
      this.fileUpload.clearImagePreviewPanel();
    })

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
        this.sb.borrarRequisito(idRequisito);
      }
    })

  }
  //Metodos para cambiar el estado de los selects multiple
  changeTipo(event: any) {
    let requisitoActivo: requisito = this.requisitoQuery.getEntity(this.requisitoQuery.getActiveId());
    if (event.isUserInput && requisitoActivo) {

      let json = {
        id: requisitoActivo.id,
        idTipo: event.source.value,
        estado: event.source.selected
      }
      this.sb.editarOpcionTipo(json);
    }
  }
  changeServicio(event: any) {
    let requisitoActivo: requisito = this.requisitoQuery.getEntity(this.requisitoQuery.getActiveId());
    if (event.isUserInput && requisitoActivo) {
      let json = {
        id: requisitoActivo.id,
        idServicio: event.source.value,
        estado: event.source.selected
      }
      this.sb.editarOpcionServicio(json);
    }
  }

  //FIN DE CRUD REQUISITOS
  //
  getArhivosPorRequisitoId(idRequisito: number) {
    /*this.activarBlock();
    this.sb.getArchivosPorRequisitoId(idRequisito).subscribe(archivos => {
      this.listaArchivosPorRequisito = archivos;
      this.cerrarBlock();
      this.abrirModal(this.idModalArchivos)
    })*/
  }



  disabledFormularioRequisito() {
    this.formularioRequisito.disable();
  }
  enabledFormularioRequisito() {
    this.formularioRequisito.enable();
  }
  visualizarRequisito(idRequisito: ID) {
    this.mostrarDatosFormularioRequisito(idRequisito);
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
