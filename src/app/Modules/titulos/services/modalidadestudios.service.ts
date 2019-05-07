import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { modalidadEstudio } from '../Models/modalidad_estudio';

@Injectable({
  providedIn: 'root'
})
export class ModalidadestudiosService {

  private urlControlador = "http://localhost:8000/gradostitulos/modalidadestudio/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  listaModalidadEstudio(): Observable<modalidadEstudio[]> {
    return this.http.get<modalidadEstudio[]>(this.urlControlador + "listaModalidadEstudio");
  }
}
