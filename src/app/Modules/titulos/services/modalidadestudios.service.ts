import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { trabajo_investigacion } from '../Models/trabajo_investigacion';

@Injectable({
  providedIn: 'root'
})
export class ModalidadestudiosService {

  private urlControlador = "http://localhost:8000/gradostitulos/modalidadestudio/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  listaNombreprogramaEstudio(): Observable<trabajo_investigacion[]> {
    return this.http.get<trabajo_investigacion[]>(this.urlControlador + "listaModalidadEstudio");
  }
}
