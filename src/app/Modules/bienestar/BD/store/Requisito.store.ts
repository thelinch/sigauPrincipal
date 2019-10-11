import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState,
  EntityUIStore
} from "@datorama/akita";
import { requisito } from "../../Models/Requisito";
import { Inject, Injectable } from "@angular/core";
import { VISIBILITY_FILTER } from "../../filter/filterRequisito.model";

export interface RequisitoUI {
  errorUpdateRequisito: string | null;
  errorDeleteRequisito: string | null;
  errorAddRequisito: string | null;
  loadingUpdateRequisito: boolean;
  loadingAddRequisito: boolean;
  loadingDeleteRequisito: boolean;
}
export interface requisitosUIState
  extends EntityState<RequisitoUI>,
    ActiveState {}
export interface requisitoState extends EntityState<requisito>, ActiveState {
  filter: VISIBILITY_FILTER;
}
const initialStateUi: RequisitoUI = {
  errorUpdateRequisito: null,
  errorDeleteRequisito: null,
  errorAddRequisito: null,
  loadingUpdateRequisito: false,
  loadingAddRequisito: false,
  loadingDeleteRequisito: false
};
const initialState = {
  filter: VISIBILITY_FILTER.MOSTRAR_TODO
};
@Injectable({ providedIn: "root" })
@StoreConfig({ name: "requisitos" })
export class requisitoStore extends EntityStore<requisitoState, requisito> {
  ui: EntityUIStore<requisitosUIState, RequisitoUI>;

  constructor() {
    super(initialState);
    this.createUIStore().setInitialEntityState(entity => initialStateUi);
  }
}
