import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private urlControlador = "http://localhost:8000/global/";
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.headers.append("Content-Type", undefined);
  }
  guardarArchivo(formData: any): Observable<any> {
    return this.http.post(this.urlControlador + "fileUpload", formData, { headers: this.headers });
  }
  gurdarArchivoRequisito(formData: any): Observable<any> {
    return this.http.post(this.urlControlador + "fileUpload/Requisito", formData, { headers: this.headers })
  }
}
