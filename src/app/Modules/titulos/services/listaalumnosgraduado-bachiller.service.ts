import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { alumno_registroAlumnoGraduadoTitulado } from '../Models/alumno_registroAlumnoGraduadoTitulado';

@Injectable({
  providedIn: 'root'
})
export class listaAlumnosgraduadoBachillerService {

  private urlControlador = "http://localhost:8000/gradostitulos/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  listaAlumnosGraduadosBachilleres(): Observable<alumno_registroAlumnoGraduadoTitulado[]> {
    return this.http.get<alumno_registroAlumnoGraduadoTitulado[]>(this.urlControlador + "alumnosGraduadosBachilleres");
  }
}
