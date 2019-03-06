import * as $ from 'jquery';
import * as M from 'materialize-css'
export class functionsGlobal {
  static closeModal(id: string) {
    M.Modal.getInstance($("#" + id)).close()
  }
  static openModal(id: string) {
    M.Modal.getInstance($("#" + id)).open()

  }
  static iniciarModal() {
    M.Modal.init($(".modal"));
  }
  static iniciarSideNav() {
    M.Sidenav.init($(".sidenav"));
  }
  static openSideNav(idSideNav: string) {
    M.Sidenav.getInstance($("#" + idSideNav)).open();
  }
  static closeSideNav(idSideNav: string) {
    M.Sidenav.getInstance($("#" + idSideNav)).close();

  }
  static destroySideNav(idSideNav: string) {
    M.Sidenav.getInstance($("#" + idSideNav)).destroy();

  }
  static iniciarCollapside() {
    M.Collapsible.init($('.collapsible'));
  }
  static iniciarMaterialBoxed() {
    M.Materialbox.init($('.materialboxed'));
  }
  static iniciarTooltip() {
    M.Tooltip.init($('.tooltipped'))
  }
}
