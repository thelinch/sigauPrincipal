import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { requisito } from '../Models/Requisito';
import { Observable, Observer, of } from 'rxjs';
import { archivo } from '../Models/archivo';
import { tap } from 'rxjs/operators';
import { requisitoStore } from '../store/Requisito.store';
import { requisitoQuery } from '../query/requisitoQuery';
import { VISIBILITY_FILTER } from '../filter/filterRequisito.model';
import { ID } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {
  private urlControlador = "http://localhost:8000/bienestar/requisito"
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient,
    private requisitoStore: requisitoStore,
    private requisitoQuery: requisitoQuery) {


  }
  getAllPersona() {
    this.http.get(this.urlControlador).subscribe(console.log)
  }
  gurdarRequisito(requisito: requisito): Observable<requisito> {
    return this.http.post<requisito>(this.urlControlador + "/create", JSON.stringify(requisito), { headers: this.header }).pipe(tap(requisitoCreado => this.requisitoStore.add(requisitoCreado)))
  }
  listarRequisitos(): Observable<requisito[]> {
    const request$ = this.http.get<requisito[]>(this.urlControlador + "/all").pipe(tap(listaRequisitos => this.requisitoStore.set(listaRequisitos)))
    return this.requisitoQuery.getHasCache() ? of() : request$;
  }
  editarRequisito(requisito: requisito): Observable<requisito> {
    return this.http.post<requisito>(this.urlControlador + "/" + requisito.id.toString() + "/edit", JSON.stringify(requisito), { headers: this.header }).pipe(tap(requisitoEditado => this.requisitoStore.update(requisito.id, requisitoEditado)));
  }
  borrarRequisito(id: ID): Observable<requisito> {
    return this.http.get<requisito>(this.urlControlador + "/" + id.toString() + "/delete").pipe(tap(requisitoEliminado => this.requisitoStore.remove(id)));
  }
  editarOpcionTipo(json: any) {
    return this.http.post<requisito>(this.urlControlador + "/updateTipo", JSON.stringify(json), { headers: this.header }).pipe(tap(requisitoEditado => this.requisitoStore.update(requisitoEditado.id, requisitoEditado)));
  }
  editarOpcionServicio(json: any) {
    return this.http.post<requisito>(this.urlControlador + "/updateServicio", JSON.stringify(json), { headers: this.header }).pipe(tap(requisitoEditado => this.requisitoStore.update(requisitoEditado.id, requisitoEditado)));
  }
  getArchivosPorRequisitoId(idRequisitio: number): Observable<archivo[]> {
    let json = { id: idRequisitio }
    return this.http.post<archivo[]>(this.urlControlador + "/archivos", JSON.stringify(json));
  }
  actualizarFiltrado(filter: VISIBILITY_FILTER) {
    this.requisitoStore.update({ filter })
  }
}
