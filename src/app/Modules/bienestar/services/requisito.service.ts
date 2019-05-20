import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { requisito } from '../Models/Requisito';
import { Observable, Observer, of } from 'rxjs';
import { archivo } from '../Models/archivo';
import { VISIBILITY_FILTER } from '../filter/filterRequisito.model';
import { ID } from '@datorama/akita';
import { archivoBase } from '../Models/archivoBase';

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
    return this.http.post<requisito>(this.urlControlador + "/create", JSON.stringify(requisito), { headers: this.header });
  }
  listarRequisitos(): Observable<requisito[]> {
    return this.http.get<requisito[]>(this.urlControlador + "/all");
  }
  editarRequisito(requisito: requisito): Observable<requisito> {
    return this.http.post<requisito>(this.urlControlador + "/" + requisito.id.toString() + "/edit", JSON.stringify(requisito), { headers: this.header })
  }
  borrarRequisito(id: ID): Observable<requisito> {
    return this.http.get<requisito>(this.urlControlador + "/" + id.toString() + "/delete");
  }
  editarOpcionTipo(json: any) {
    return this.http.post<requisito>(this.urlControlador + "/updateTipo", JSON.stringify(json), { headers: this.header })
  }
  editarOpcionServicio(json: any) {
    return this.http.post<requisito>(this.urlControlador + "/updateServicio", JSON.stringify(json), { headers: this.header })
  }
  cambiarActualizaconRequisito(json: any): Observable<requisito> {
    return this.http.post<requisito>(this.urlControlador + "/updateActualizacion", JSON.stringify(json), { headers: this.header });
  }
  listarArchivosPorRequisitoId(json: any): Observable<archivoBase[]> {
    return this.http.post<archivoBase[]>(this.urlControlador + "/archivos", JSON.stringify(json));
  }

}
