import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { requisito } from '../Models/Requisito';
import { Observable, Observer } from 'rxjs';
import { archivo } from '../Models/archivo';

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {
  private urlControlador = "http://localhost:8000/bienestar/requisito"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) {


  }
  getAllPersona() {
    this.http.get(this.urlControlador).subscribe(console.log)
  }
  gurdarRequisito(requisito: requisito): Observable<requisito> {
    return this.http.post<requisito>(this.urlControlador + "/create", JSON.stringify(requisito), { headers: this.header })
  }
  listarRequisitos(): Observable<requisito[]> {
    return this.http.get<requisito[]>(this.urlControlador + "/all");
  }
  editarRequisito(requisito: requisito): Observable<requisito> {
    return this.http.post<requisito>(this.urlControlador + "/" + requisito.id + "/edit", JSON.stringify(requisito), { headers: this.header })
  }
  borrarRequisito(id: number): Observable<requisito> {
    return this.http.get<requisito>(this.urlControlador + "/" + id + "/delete")
  }
  editarOpcionTipo(json: any) {
    return this.http.post<requisito>(this.urlControlador + "/updateTipo", JSON.stringify(json), { headers: this.header });
  }
  editarOpcionServicio(json: any) {
    return this.http.post<requisito>(this.urlControlador + "/updateServicio", JSON.stringify(json), { headers: this.header });
  }
  getArchivosPorRequisitoId(idRequisitio: number): Observable<archivo[]> {
    let json = { id: idRequisitio }
    return this.http.post<archivo[]>(this.urlControlador + "/archivos", JSON.stringify(json));
  }
}
