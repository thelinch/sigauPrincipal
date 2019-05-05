import { servicioSolicitadoQuery } from './../query/servicioSolitadoQuery';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { servicioSolicitados } from '../Models/servicioSolicitados';
import { servicioSolicitadoStore } from '../store/ServicioSolicitado.store';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioSolicitadoService {
  private urlControlador = "http://localhost:8000/bienestar/servicioSolicitado/"
  private header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient,
    private servicioSolicitadoStore: servicioSolicitadoStore,
    private servicioSolicitadoQuery: servicioSolicitadoQuery) { }

  listarServicioSolicitadoPorSemestreActual(json: any): Observable<servicioSolicitados[]> {

    const request$ = this.http.post<servicioSolicitados[]>(this.urlControlador + "listaServicioSolicitadoPorSemestreActual", JSON.stringify(json), { headers: this.header }).pipe(tap(listaServicioSolicitado => {
      this.servicioSolicitadoStore.set(listaServicioSolicitado);
    }));
    return this.servicioSolicitadoQuery.getHasCache() ? of() : request$;
  }
  registrarServicioSolicitadoPorAlumnoYSemestreActual(json: any): Observable<servicioSolicitados> {
    return this.http.post<servicioSolicitados>(this.urlControlador + "registroServicioSolicitadoPorAlumno", JSON.stringify(json), { headers: this.header }).pipe(tap(servicioSolicitadoCreado => this.servicioSolicitadoStore.add(servicioSolicitadoCreado)));
  }
}
