import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DecanoFacultad } from '../Models/DecanoFacultad';

@Injectable({
  providedIn: 'root'
})
export class DecanofacultadService {
  private urlControlador = "http://localhost:8000/global/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  DecanoFacultad(): Observable<DecanoFacultad[]> {
    return this.http.get<DecanoFacultad[]>(this.urlControlador + "decanoFacultad");
  }
}
