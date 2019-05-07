import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { empresa } from '../Models/empresa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private urlControlador = "http://localhost:8000/gradostitulos/empresa/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  listaEmpresaPorTipoEmpresa(json: any): Observable<empresa[]> {
    return this.http.post<empresa[]>(this.urlControlador + "listaEmpresa", JSON.stringify(json),{headers:this.header});
  }
}
