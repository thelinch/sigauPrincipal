import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { servicioSolicitadoRequisito } from '../Models/servicioSolicitadoRequisito';


@Injectable({ providedIn: 'root' })
export class ServicioSolicitadoRequisitoService {
  private urlControlador = "http://localhost:8000/bienestar/servicioSolicitadoRequisito"
  private header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(
    private http: HttpClient) {
  }
  registrarServicioSolicitadoRequisito(json: any): Observable<servicioSolicitadoRequisito> {
    return this.http.post<servicioSolicitadoRequisito>(this.urlControlador + "/create", JSON.stringify(json), { headers: this.header })
  }

}
