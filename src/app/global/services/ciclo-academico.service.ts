import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cicloAcademico } from '../Models/cicloAcademico';
import { servicio } from 'src/app/Modules/bienestar/Models/servicio';

@Injectable({ providedIn: 'root' })
export class CicloAcademicoService {
  private urlControlador = "http://localhost:8000/global/cicloAcademico/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) {
  }
  all(): Observable<cicloAcademico[]> {
    return this.http.get<cicloAcademico[]>(this.urlControlador + "all");
  }
  modificarCicloAcademicoPorServicio(json: any): Observable<servicio> {
    return this.http.post<servicio>(this.urlControlador + "modificarCicloAcademicoPorServicio", JSON.stringify(json), { headers: this.header })
  }
}
