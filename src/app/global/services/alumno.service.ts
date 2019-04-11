import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { alumno } from '../Models/Alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private urlControlador = "http://localhost:8000/global/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  public AlumnosPregrado(): Observable<alumno[]> {
    return this.http.get<alumno[]>(this.urlControlador + "alumnosPregrado");
  }
  public buscarAlumnoConRequisitosYServiciosPorId(json: any): Observable<alumno> {
    return this.http.post<alumno>(this.urlControlador + "alumno/bienestarUniversitario", JSON.stringify(json), { headers: this.header });
  }
}
