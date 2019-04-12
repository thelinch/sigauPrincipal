import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { alumno } from '../Models/Alumno';
import { servicio } from 'src/app/Modules/bienestar/Models/servicio';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private urlControlador = "http://localhost:8000/global/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  AlumnosPregrado(): Observable<alumno[]> {
    return this.http.get<alumno[]>(this.urlControlador + "alumnosPregrado");
  }
  buscarAlumnoConRequisitosYServiciosPorId(json: any): Observable<alumno> {
    return this.http.post<alumno>(this.urlControlador + "alumno/bienestarUniversitario", JSON.stringify(json), { headers: this.header });
  }
  listaServiciosPorAlumno(json: any): Observable<servicio[]> {
    return this.http.post<servicio[]>(this.urlControlador + "alumno/servicios", JSON.stringify(json), { headers: this.header });
  }
}
