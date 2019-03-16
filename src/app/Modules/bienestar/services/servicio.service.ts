import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { servicio } from '../Models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private urlControlador = "http://localhost:8000/bienestar/servicio"
  private header = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }
  guardarServicio(servicio: servicio): Observable<servicio> {
    return this.http.post<servicio>(this.urlControlador+"/create", JSON.stringify(servicio), { headers: this.header })
  }
  listarServicio(): Observable<servicio[]> {
    return this.http.get<servicio[]>(this.urlControlador + "/all");
  }
  eliminarServicio(id: number): Observable<servicio> {
    return this.http.get<servicio>(this.urlControlador + "/" + id + "/delete");
  }
  editarServicio(servicio: servicio): Observable<servicio> {
    return this.http.post<servicio>(this.urlControlador + "/" + servicio.id + "/edit", JSON.stringify(servicio), { headers: this.header })
  }

}
