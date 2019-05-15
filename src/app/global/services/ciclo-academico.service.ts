import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cicloAcademico } from '../Models/cicloAcademico';

@Injectable({ providedIn: 'root' })
export class CicloAcademicoService {
  private urlControlador = "http://localhost:8000/global/cicloAcademico/"
  constructor(private http: HttpClient) {
  }
  all(): Observable<cicloAcademico[]> {
    return this.http.get<cicloAcademico[]>(this.urlControlador + "all");
  }
}
