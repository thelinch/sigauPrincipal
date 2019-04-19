import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { denominacionGradoTitulo } from '../Models/denominacion_grado_titulo';

@Injectable({
  providedIn: 'root'
})
export class DenominacionesService {
  private urlControlador = "http://localhost:8000/gradostitulos/denominaciones"
  constructor(private http: HttpClient) { }
  listarDenominacionesPorEspecialidad(json: any): Observable<denominacionGradoTitulo[]> {
    return this.http.post<denominacionGradoTitulo[]>(this.urlControlador + "/denominacionesPorEspecialidad", JSON.stringify(json));
  }
}
