import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EscuelaProfesional } from '../Models/EscuelaProfesional';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscuelaprofesionalService {
  private urlControlador = "http://localhost:8000/global/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  EscuelaProfesional(): Observable<EscuelaProfesional[]> {
    return this.http.get<EscuelaProfesional[]>(this.urlControlador + "escuelaProfesional");
  }
}
