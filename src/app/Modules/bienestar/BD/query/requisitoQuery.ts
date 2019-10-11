import { Injectable } from "@angular/core";
import { requisito } from "../../Models/Requisito";
import {
  QueryEntity,
  QueryConfig,
  Order,
  EntityUIQuery,
  ID
} from "@datorama/akita";
import {
  requisitoState,
  requisitoStore,
  RequisitoUI,
  requisitosUIState
} from "../store/Requisito.store";
import { combineLatest, Observable } from "rxjs";
import { VISIBILITY_FILTER } from "../../filter/filterRequisito.model";
@QueryConfig({
  sortBy: "requerido",
  sortByOrder: Order.DESC
})
@Injectable({ providedIn: "root" })
export class requisitoQuery extends QueryEntity<requisitoState, requisito> {
  ui: EntityUIQuery<requisitosUIState, RequisitoUI>;
  selectVisibleFilter$ = this.select(state => state.filter);
  selectVisibleTodos$ = combineLatest(
    this.selectVisibleFilter$,
    this.selectAll(),
    this.getVisibleRequisito
  );
  constructor(protected requisitoStore: requisitoStore) {
    super(requisitoStore);
    this.createUIQuery();
  }

  selectUpdateLoading(): Observable<boolean> {
    return this.ui.selectActive(e => e.loadingUpdateRequisito);
  }
  

  private getVisibleRequisito(filter, requisitos: requisito[]) {
    switch (filter) {
      case VISIBILITY_FILTER.MOSTRAR_PRIORITARIOS:
        return requisitos.filter(r => r.prioridad);
      case VISIBILITY_FILTER.MOSTRAR_REQUERIDOS:
        return requisitos.filter(r => r.requerido);
      default:
        return requisitos;
    }
  }
}
