import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranajadorArea } from '../Models/TrabajadorArea';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorareaService {
  private urlControlador = "http://localhost:8000/global/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  TrabajadorArea(): Observable<TranajadorArea[]> {
    return this.http.get<TranajadorArea[]>(this.urlControlador + "trabajadorArea");
  }
}
