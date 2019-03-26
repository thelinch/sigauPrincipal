import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { servicio } from '../Models/servicio';
import { requisito } from '../Models/Requisito';
import { alumno } from 'src/app/global/Models/Alumno';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private urlControlador = "http://localhost:8000/bienestar/servicio"
  private header = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }
  guardarServicio(servicio: servicio): Observable<servicio> {
    return this.http.post<servicio>(this.urlControlador + "/create", JSON.stringify(servicio), { headers: this.header })
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
  activacionServicio(json: any): Observable<servicio> {
    return this.http.post<servicio>(this.urlControlador + "/activarServicio", JSON.stringify(json), { headers: this.header })
  }
  requisitoIdServicio(json: any): Observable<requisito[]> {
    return this.http.post<requisito[]>(this.urlControlador + "/requisitos", JSON.stringify(json), { headers: this.header });
  }
  todososAlumnosPorIdServicio(json: any): Observable<alumno[]> {
    console.log("entro al servicio")
    return this.http.post<alumno[]>(this.urlControlador + "/alumnosPorIdServicio", JSON.stringify(json), { headers: this.header });
  }
  serviciosActivados(): Observable<servicio[]> {
    return this.http.get<servicio[]>(this.urlControlador + "/all/servicioActivados");
  }
  requisitosPorArrayServicio(json: any): Observable<requisito[]> {
    return this.http.post<requisito[]>(this.urlControlador + "/alumno/requisitos", JSON.stringify(json), { headers: this.header });
  }
}
