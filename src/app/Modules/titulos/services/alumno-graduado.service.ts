import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { alumnoGraduadoTitulado } from '../Models/alumno_graduado_titulado';

@Injectable({
  providedIn: 'root'
})
export class AlumnoGraduadoService {
  private urlControlador = "http://localhost:8000/gradostitulos/alumnoGraduado/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  guardarAlumnoGraduado(json: any): Observable<alumnoGraduadoTitulado> {
    return this.http.post<alumnoGraduadoTitulado>(this.urlControlador + "create", JSON.stringify(json), { headers: this.header });
  }
}
