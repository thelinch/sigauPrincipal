import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { alumno } from '../Models/Alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private urlControlador = "http://localhost:8000/global/"
  constructor(private http: HttpClient) { }

  public AlumnosPregrado(): Observable<alumno[]> {
    return this.http.get<alumno[]>(this.urlControlador + "alumnosPregrado");
  }
}
