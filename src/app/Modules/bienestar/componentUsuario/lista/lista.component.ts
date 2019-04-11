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
import { flatMap, map, take, reduce, filter, mapTo, toArray } from 'rxjs/operators';
import { FileService } from 'src/app/global/services/file.service';
import { AlumnoService } from 'src/app/global/services/alumno.service';

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
  listaServiciosRegistradoPorAlumno: servicio[];
  listaRequisitosPorServicio: any[]
  listaRequisitosLlenadosPorUsuario: requisito[]
  listaRequisitoRegistrodoAlumno: Array<number>
  listaFotosParaSubir: Array<FileUploadWithPreview>
  numeroTotalDeRequisitoRequerido: number;
  contadorTotalRequisitoEnviadoRequerido: number;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _formBuilder: FormBuilder, private servicioService: ServicioService, private filseService: FileService, private render: Renderer2, private alumnoService: AlumnoService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.listaFotosParaSubir = new Array<FileUploadWithPreview>();
    this.formControlListaServicio = new FormControl();

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
    let json = { id: "1" };
    this.servicioService.serviciosActivados().subscribe({
      next: (listaServicios) => {
        this.listaServiciosActivados = listaServicios;

      },
      complete: () => {
        console.log("entro al complete")
        this.alumnoService.buscarAlumnoConRequisitosYServiciosPorId(json).subscribe(async alumno => {

          await this.cerrarBlock();
          this.listaRequisitoRegistrodoAlumno = alumno.requisitos.map(requisito => requisito.id);
        })
      }
    });

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
      codigoMatricula: "2019-I"
    }
    this.servicioService.registrarServicioParaEvaluacion(json).subscribe(servicioRegistrado => {
      this.listaServiciosRegistradoPorAlumno = servicioRegistrado;
    })

  }
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
            formData.append("idUsuario", "1");
            formData.append("nombreCarpeta", "Comedor_internado");
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
    let json = {
      listaServiciosSolicitados: this.formControlListaServicio.value,
      idAlumno: "1",
      codigoMatricula: "2019-I"
    }
    this.servicioService.requisitosPorArrayServicio(json).subscribe(listaRequisito => {
      //listaRequisito.sort(requisito => requisito.requerido ? -1 : 1);
      this.listaRequisitosPorServicio = listaRequisito

      from(this.listaRequisitosPorServicio).pipe(filter((requisito: requisito) => requisito.requerido), toArray()).subscribe(listaRequisitoRequerido => {
        this.numeroTotalDeRequisitoRequerido = listaRequisitoRequerido.length;
      })
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
  abrilModal(id: string) {
    functionsGlobal.openModal(id);
  }
  cerrarModal(id: string) {
    functionsGlobal.closeModal(id)
  }
}
