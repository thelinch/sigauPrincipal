import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { requisito } from '../Models/Requisito';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {
  private urlControlador = ""

  constructor(private http: HttpClient) {


  }
  gurdarRequisito(requisito: requisito): Observable<requisito> {
    return this.http.post<requisito>(this.urlControlador, requisito)
  }
  listarRequisitos(): Observable<requisito[]> {
    return this.http.get<requisito[]>(this.urlControlador);
  }
  editarRequisito(requisito: requisito): Observable<requisito> {
    return this.http.post<requisito>(this.urlControlador + "/requisito/" + requisito.id + "/edit", requisito)
  }
  borrarRequisito(id: number): Observable<requisito> {
    return this.http.get<requisito>(this.urlControlador)
  }
}
