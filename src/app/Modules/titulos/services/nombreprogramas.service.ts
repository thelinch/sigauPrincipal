import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { nombreProgramaestudio } from '../Models/nombre_programa_estudio';

@Injectable({
  providedIn: 'root'
})
export class NombreprogramasService {

  private urlControlador = "http://localhost:8000/gradostitulos/nombreprograma/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  listaNombreprogramaEstudio(): Observable<nombreProgramaestudio[]> {
    return this.http.get<nombreProgramaestudio[]>(this.urlControlador + "listaNombreprogramaEstudio");
  }
}
