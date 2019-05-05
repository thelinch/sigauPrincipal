import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { servicio } from '../Models/servicio';
import { requisito } from '../Models/Requisito';
import { alumno } from 'src/app/global/Models/Alumno';
import { servicioSolicitados } from '../Models/servicioSolicitados';
import { tap } from 'rxjs/operators';
import { servicioStore } from '../store/servicio.store';
import { servicioQuery } from '../query/servicioQuery';
import { ID } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private urlControlador = "http://localhost:8000/bienestar/servicio"
  private header = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient,
    private servicioStore: servicioStore,
    private servicioQuery: servicioQuery) { }
  guardarServicio(servicio: servicio): Observable<servicio> {
  
    return this.http.post<servicio>(this.urlControlador + "/create", JSON.stringify(servicio), { headers: this.header }).pipe(tap(servicioCreado => this.servicioStore.add(servicioCreado)))
  }
  listarServicio(): Observable<servicio[]> {
    return this.http.get<servicio[]>(this.urlControlador + "/all").pipe(tap(listaServicio => this.servicioStore.set(listaServicio)));
  }
  eliminarServicio(id: ID): Observable<servicio> {
    this.servicioStore.remove(id);
    return this.http.get<servicio>(this.urlControlador + "/" + id.toString() + "/delete");

  }
  editarServicio(servicio: servicio): Observable<servicio> {
    return this.http.post<servicio>(this.urlControlador + "/" + servicio.id.toString() + "/edit", JSON.stringify(servicio), { headers: this.header }).pipe(tap(servicioEditado => this.servicioStore.update(servicio.id, servicioEditado)))
  }
  activacionServicio(json: any): Observable<servicio> {
    return this.http.post<servicio>(this.urlControlador + "/activarServicio", JSON.stringify(json), { headers: this.header }).pipe(tap(servicioActualizado => this.servicioStore.update(servicioActualizado.id, servicioActualizado)));
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

  listaServiciosRegistradosPorAlumno(json: any): Observable<servicio[]> {
    return this.http.post<servicio[]>(this.urlControlador + "/alumno/servicios", JSON.stringify(json), { headers: this.header });
  }

}
