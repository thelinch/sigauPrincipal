import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class RequisitoArchivoService {
  private urlController = "http://localhost:8000/bienestar/requisitoArchivo/";
  header: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  constructor(private _http: HttpClient) {}
  save(json: any): Observable<any> {
    return this._http.post<any>(this.urlController + "create", json, {
      headers: this.header
    });
  }
}
