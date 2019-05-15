import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ampliacion } from '../Models/ampliacion';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AmpliacionService {
  private urlControlador = "http://localhost:8000/bienestar/ampliacion"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(
    private http: HttpClient) {
  }
  crearAmpliacionPorIdServicio(json: any): Observable<ampliacion> {
    return this.http.post<ampliacion>(this.urlControlador + "/create", JSON.stringify(json), { headers: this.header });
  }


}
