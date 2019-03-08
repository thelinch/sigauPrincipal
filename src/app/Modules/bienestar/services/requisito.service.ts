import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { requisito } from '../Models/Requisito';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {
  private urlControlador = "http://localhost:8000/bienestar/requisito"
  getHeaders: HttpHeaders = new HttpHeaders({
    "Access-Control-Allow-Origin": "*",

    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) {


  }
  getAllPersona() {
    this.http.get(this.urlControlador).subscribe(console.log)
  }
  gurdarRequisito(requisito: requisito): Observable<requisito> {
    console.log(requisito)

    return this.http.post<requisito>(this.urlControlador + "/create", requisito)
  }
  listarRequisitos(): Observable<requisito[]> {
    return this.http.get<requisito[]>(this.urlControlador + "/all");
  }
  editarRequisito(requisito: requisito): Observable<requisito> {
    return this.http.post<requisito>(this.urlControlador + "/requisito/" + requisito.id + "/edit", requisito)
  }
  borrarRequisito(id: number): Observable<requisito> {
    return this.http.get<requisito>(this.urlControlador + "/" + id + "/delete")
  }
}
