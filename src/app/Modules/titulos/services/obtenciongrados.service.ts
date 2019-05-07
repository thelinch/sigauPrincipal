import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { obtenciongradostitulo } from '../Models/obtencion_grados_titulo';

@Injectable({
  providedIn: 'root'
})
export class ObtenciongradosService {

  private urlControlador = "http://localhost:8000/gradostitulos/obtenciongrado/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  listaObtencionGrado(): Observable<obtenciongradostitulo[]> {
    return this.http.get<obtenciongradostitulo[]>(this.urlControlador + "listaObtencionGrado");
  }
}
