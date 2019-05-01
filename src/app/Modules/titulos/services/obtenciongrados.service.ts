import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { obtencion_grados_titulo } from '../Models/obtencion_grados_titulo';

@Injectable({
  providedIn: 'root'
})
export class ObtenciongradosService {

  private urlControlador = "http://localhost:8000/gradostitulos/obtenciongrado/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  listaObtencionGrado(): Observable<obtencion_grados_titulo[]> {
    return this.http.get<obtencion_grados_titulo[]>(this.urlControlador + "listaObtencionGrado");
  }
}
