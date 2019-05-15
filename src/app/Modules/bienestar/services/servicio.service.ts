import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { servicio } from '../Models/servicio';
import { requisito } from '../Models/Requisito';
import { alumno } from 'src/app/global/Models/Alumno';
import { tap } from 'rxjs/operators';
import { ID } from '@datorama/akita';

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
  eliminarServicio(id: ID): Observable<servicio> {
    return this.http.get<servicio>(this.urlControlador + "/" + id.toString() + "/delete");

  }
  editarServicio(servicio: servicio): Observable<servicio> {
    return this.http.post<servicio>(this.urlControlador + "/" + servicio.id.toString() + "/edit", JSON.stringify(servicio), { headers: this.header });
  }
  activarServicio(json: any): Observable<servicio> {
    return this.http.post<servicio>(this.urlControlador + "/activarServicio", JSON.stringify(json), { headers: this.header });
  }
  listaDerequisitosPorIdServicio(json: any): Observable<requisito[]> {
    return this.http.post<requisito[]>(this.urlControlador + "/requisitos", JSON.stringify(json), { headers: this.header });
  }
  listarAlumnosPorIdServicio(json: any): Observable<alumno[]> {
    console.log("entro al servicio")
    return this.http.post<alumno[]>(this.urlControlador + "/alumnosPorIdServicio", JSON.stringify(json), { headers: this.header });
  }
  listarServiciosActivados(): Observable<servicio[]> {
    return this.http.get<servicio[]>(this.urlControlador + "/all/servicioActivados");
  }
  listarRequisitosPorListaDeServicio(json: any): Observable<requisito[]> {
    return this.http.post<requisito[]>(this.urlControlador + "/alumno/requisitos", JSON.stringify(json), { headers: this.header });
  }

  listarServiciosRegistradosPorAlumno(json: any): Observable<servicio[]> {
    return this.http.post<servicio[]>(this.urlControlador + "/alumno/servicios", JSON.stringify(json), { headers: this.header });
  }
  

}
