import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class obuSolicitudRequisitoArchivos {
  private urlControlador =
    "http://localhost:8000/bienestar/obuSolicitudRequisitoArchivo/";
  header: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  constructor(private http: HttpClient) {}
  create(json: any) {
    return this.http.post(this.urlControlador + "create", json, {
      headers: this.header
    });
  }
}
