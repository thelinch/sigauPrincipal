import { servicioSolicitadoQuery } from '../BD/query/servicioSolitadoQuery';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { servicioSolicitados } from '../Models/servicioSolicitados';
import { servicioSolicitadoStore } from '../BD/store/ServicioSolicitado.store';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioSolicitadoService {
  private urlControlador = "http://localhost:8000/bienestar/servicioSolicitado/"
  private header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  listarServicioSolicitadoPorSemestreActual(json: any): Observable<servicioSolicitados[]> {

    return this.http.post<servicioSolicitados[]>(this.urlControlador + "listaServicioSolicitadoPorSemestreActual", JSON.stringify(json), { headers: this.header });
  }
  registrarServicioSolicitadoPorAlumnoYSemestreActual(json: any): Observable<servicioSolicitados> {
    return this.http.post<servicioSolicitados>(this.urlControlador + "registroServicioSolicitadoPorAlumno", JSON.stringify(json), { headers: this.header });
  }
  servicioSolicitadoPorAlumnoComedorYInternadoYSemestreActual(json: any): Observable<servicioSolicitados> {
    return this.http.post<servicioSolicitados>(this.urlControlador + "servicioSolicitadoPorAlumnoComedorYInternadoYSemestreActual", JSON.stringify(json), { headers: this.header })
  }
}
