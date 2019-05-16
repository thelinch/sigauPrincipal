import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rector } from '../Models/Rector';

@Injectable({
  providedIn: 'root'
})
export class RectorService {
  private urlControlador = "http://localhost:8000/global/"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  Rector(): Observable<Rector[]> {
    return this.http.get<Rector[]>(this.urlControlador + "rector");
  }
}
