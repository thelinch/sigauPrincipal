import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { registro_graduado_titulado } from '../Models/registro_graduado_titulado';

@Injectable({
  providedIn: 'root'
})
export class RegistroAlumnoGraduadoService {
  private urlControlador = "http://localhost:8000/gradostitulos/registroalumnograduado/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  guardarRegistroAlumnoGraduado(registroAlumnoGraduadoTitulado:registro_graduado_titulado): Observable<registro_graduado_titulado> {
    return this.http.post<registro_graduado_titulado>(this.urlControlador + "create", JSON.stringify(registroAlumnoGraduadoTitulado), { headers: this.header });
  }

  /*
  editarAlumnoGraduado(alumnoGraduadoTitulado: alumnoGraduadoTitulado): Observable<alumnoGraduadoTitulado> {
    return this.http.post<alumnoGraduadoTitulado>(this.urlControlador + alumnoGraduadoTitulado.id + "/editar", JSON.stringify(alumnoGraduadoTitulado), { headers: this.header });
  }
  */
}
