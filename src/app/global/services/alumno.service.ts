import { servicioSolicitadoQuery } from './../../Modules/bienestar/query/servicioSolitadoQuery';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { alumno } from '../Models/Alumno';
import { servicio } from 'src/app/Modules/bienestar/Models/servicio';
import { servicioSolicitados } from 'src/app/Modules/bienestar/Models/servicioSolicitados';
import { alumnoRequisito } from 'src/app/Modules/bienestar/Models/alumnoRequisito';
import { servicioSolicitadoStore } from 'src/app/Modules/bienestar/store/ServicioSolicitado.store';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private urlControlador = "http://localhost:8000/global/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient,
    private servicioSolicitadoStore: servicioSolicitadoStore,
    private servicioSolicitadoQuery: servicioSolicitadoQuery) { }

  AlumnosPregrado(): Observable<alumno[]> {
    return this.http.get<alumno[]>(this.urlControlador + "alumnosPregrado");
  }
  buscarAlumnoConRequisitosYServiciosPorId(json: any): Observable<alumno> {
    return this.http.post<alumno>(this.urlControlador + "alumno/bienestarUniversitario", JSON.stringify(json), { headers: this.header });
  }
  servicioSolicitadoPorAlumnoYSemestreActual(json: any): Observable<servicioSolicitados> {
    const request$ = this.http.post<servicioSolicitados>(this.urlControlador + "alumno/servicios", JSON.stringify(json), { headers: this.header }).pipe(tap(servicioSolicitado => {
      this.servicioSolicitadoStore.add(servicioSolicitado)
    }));
    return this.servicioSolicitadoQuery.getHasCache() ? of() : request$;
  }
  listarRequisitosPorAlumnoYSemestreActual(json: any): Observable<alumnoRequisito[]> {
    return this.http.post<alumnoRequisito[]>(this.urlControlador + "alumno/requisitos", JSON.stringify(json), { headers: this.header });
  }
}
