import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { registro_graduado_titulado } from '../Models/registro_graduado_titulado';
import { alumno_registroAlumnoGraduadoTitulado } from '../Models/alumno_registroAlumnoGraduadoTitulado';

@Injectable({
  providedIn: 'root'
})
export class RegistroAlumnoGraduadoService {
  private urlControlador = "http://localhost:8000/gradostitulos/registroalumnograduado/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  guardarRegistroAlumnoGraduado(registroAlumnoGraduadoTitulado:registro_graduado_titulado): Observable<alumno_registroAlumnoGraduadoTitulado> {
    return this.http.post<alumno_registroAlumnoGraduadoTitulado>(this.urlControlador + "create", JSON.stringify(registroAlumnoGraduadoTitulado), { headers: this.header });
  }

  /*
  editarAlumnoGraduado(alumnoGraduadoTitulado: alumnoGraduadoTitulado): Observable<alumnoGraduadoTitulado> {
    return this.http.post<alumnoGraduadoTitulado>(this.urlControlador + alumnoGraduadoTitulado.id + "/editar", JSON.stringify(alumnoGraduadoTitulado), { headers: this.header });
  }
  */
}
