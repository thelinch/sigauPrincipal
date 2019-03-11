import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tipoRequisito } from '../Models/tipoRequisito';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoRequisitoService {
  private urlControlador = "http://localhost:8000/bienestar/tipoRequisito"
  constructor(private http: HttpClient) { }
  all(): Observable<tipoRequisito[]> {
    return this.http.get<tipoRequisito[]>(this.urlControlador + "/all")
  }
}
