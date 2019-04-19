import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { archivo } from '../Models/archivo';
import { alumnoRequisito } from './../Models/alumnoRequisito';

@Injectable({
  providedIn: 'root'
})
export class AlumnoRequisitoService {
  private urlControlador = "http://localhost:8000/bienestar/alumnoRequisito/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  listaArchivoPorAlumnoRequisito(json: any): Observable<archivo[]> {
    return this.http.post<archivo[]>(this.urlControlador + "listaArchivo", JSON.stringify(json), { headers: this.header });
  }
  listaAlumnoRequisitoPorAlumnoYSemestre(json: any): Observable<alumnoRequisito[]> {
    return this.http.post<alumnoRequisito[]>(this.urlControlador + "listaPorAlumno", JSON.stringify(json), { headers: this.header });
  }
}
