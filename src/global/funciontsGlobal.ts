import * as $ from 'jquery';
import * as M from 'materialize-css'
export class functionsGlobal {
  static closeModal(id: string) {
    M.Modal.getInstance($("#" + id)).close()
  }
  static openModal(id: string) {
    M.Modal.getInstance($("#" + id)).open()

  }
  static iniciarModal(){
    M.Modal.init($(".modal"));
  }
}
