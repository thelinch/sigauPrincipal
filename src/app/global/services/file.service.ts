import { archivoBase } from './../../Modules/bienestar/Models/archivoBase';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private urlControlador = "http://localhost:8000/global/";
  private headers: HttpHeaders = new HttpHeaders();
  private headerImagen: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.headerImagen.append("Accept", "application/pdf")
    this.headers.append("Content-Type", undefined);
  }
  guardarArchivo(formData: any): Observable<any> {
    return this.http.post(this.urlControlador + "fileUpload", formData, { headers: this.headers });
  }
  gurdarArchivoRequisito(formData: any): Observable<any> {
    return this.http.post(this.urlControlador + "fileUpload/Requisito", formData, { headers: this.headers })
  }
  eliminarArchivoRequisito(json: any): Observable<archivoBase> {
    return this.http.post<archivoBase>(this.urlControlador + "fileUpload/elimarArchivoRequisito", JSON.stringify(json), { headers: this.headers });
  }
  downloadFile(archivoParametro: string) {
    let json = { archivo: archivoParametro }
    this.http.post(this.urlControlador + "download/file", JSON.stringify(json), { headers: this.headerImagen }).subscribe(archivos => {

    })
  }
}
