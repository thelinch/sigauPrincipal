import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { servicio } from '../../Models/servicio';
import { ServicioService } from '../../services/servicio.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { requisito } from '../../Models/Requisito';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import FileUploadWithPreview from 'file-upload-with-preview';
import Swal from 'sweetalert2';
import { flatMap, map, take } from 'rxjs/operators';
import { FileService } from 'src/app/global/services/file.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaServiciosComponent implements OnInit {
  idModalServicio: string = "modalServicio"
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formControlListaServicio: FormControl;
  listaServiciosActivados: servicio[]
  listaRequisitosPorServicio: any[]
  listaRequisitosLlenadosPorUsuario: requisito[]
  listaFotosParaSubir: Array<FileUploadWithPreview>
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _formBuilder: FormBuilder, private servicioService: ServicioService, private filseService: FileService, private render: Renderer2) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.listaFotosParaSubir = new Array<FileUploadWithPreview>();
    this.formControlListaServicio = new FormControl();
    this.abrirBlock();
    this.servicioService.serviciosActivados().subscribe(listaServicio => {

      this.listaServiciosActivados = listaServicio;
      this.cerrarBlock();
    });


  }
  guardarResultado(formValue) {
    console.log(formValue)
  }
  abrilModal(id: string) {
    functionsGlobal.openModal(id);
  }
  cerrarModal(id: string) {
    functionsGlobal.closeModal(id)
  }
  /*subirArchivos(dropzone: any, objeto) {
    objeto.next();
    if (dropzone.directiveRef.dropzone().files.length > 0) {
      console.log(dropzone.directiveRef.dropzone().getQueuedFiles())
      dropzone.directiveRef.dropzone().processQueue()
    } else {
      functionsGlobal.getToast("No hay archivos seleccionados")
    }
  }*/
  subirImagenFileWithPreview(id: number, tipoArchivoAdmitido: string, nombreArchivPermitido: string, requisito: requisito, stepper, matSteep, boton: ElementRef) {
    let instanciaFotos = this.listaFotosParaSubir.find(fileUploader => fileUploader.uploadId == id);
    let validacionImagen: boolean = true;
    instanciaFotos.cachedFileArray.forEach(element => {
      if (tipoArchivoAdmitido == "image/*") {
        if (!(/\.(jpg|png|gif)$/i).test(element.name)) {
          validacionImagen = false;
          return
        }
      } else {
        if (element.type != tipoArchivoAdmitido) {

          validacionImagen = false;
          return;
        }
      }

    });
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
            formData.append("idUsuario", "2");
            formData.append("nombreCarpeta", "Comedor_internado");
            return formData
          }),
            flatMap((formData) => this.filseService.guardarArchivo(formData))).subscribe({
              next: (respuesta) => { console.log(respuesta) },
              complete: () => {
                functionsGlobal.getToast("Se subio los archivos correctamente");
                stepper.next();
                matSteep.editable = false;
                matSteep.interacted = true;
                this.render.addClass(boton, "disabled")
                this.cerrarBlock();
              }
            })
        }
      })
    } else {
      Swal.fire({
        title: "Error",
        type: "error",
        html: "Por favor solo sube archivos de tipo " + nombreArchivPermitido
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
    this.abrirBlock();
    this.servicioService.requisitosPorArrayServicio(this.formControlListaServicio.value).subscribe(listaRequisito => {
      this.listaRequisitosPorServicio = listaRequisito
      this.listaFotosParaSubir = [];
      this.cerrarBlock();
    }

    )
  }
  abrirBlock() {
    this.blockUI.start();
  }
  cerrarBlock() {
    this.blockUI.stop()
  }
}
