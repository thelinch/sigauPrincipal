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

  static iniciarFloatinButton(configuracion: any) {
    M.FloatingActionButton.init($(".fixed-action-btn"), { hoverEnabled: false })
  }
  static abrirFloatingButton(idFixedAction: string) {
    M.FloatingActionButton.getInstance($("#" + idFixedAction)).open();
  }
  static cerrarFloatingButton(idFixedAction: string) {
    M.FloatingActionButton.getInstance($("#" + idFixedAction)).close();

  }
  static iniciarCarousel() {
    M.Carousel.init($(".carousel"));
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
  static updateInputs() {
    M.updateTextFields()
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
  static getToast(mensaje: string) {
    M.toast({ html: mensaje })
  }
  static iniciarTooltip() {
    M.Tooltip.init($('.tooltipped'))
  }
  static iniciarSelect() {
    M.FormSelect.init($('select'));
  }


  static iniciarScrollSpy() {
    M.ScrollSpy.init($('.scrollspy'), { scrollOffset: 100 });
  }
  static iniciarDropdown() {
    M.Dropdown.init($('.dropdown-trigger'));
  }
  static openDropdown(idDropdown: string) {
    M.Dropdown.getInstance($("#" + idDropdown)).open();
  }
  static closeDropdown(idDropdown: string) {
    M.Dropdown.getInstance($("#" + idDropdown)).close();
  }
  static recalculatedimensionsDropdown(idDropdown: string) {
    M.Dropdown.getInstance($("#" + idDropdown)).recalculateDimensions();
  }
  static destroyDropdown(idDropdown: string) {
    M.Dropdown.getInstance($("#" + idDropdown)).destroy();
  }
  static validarArchivoImagen(listaArchivo: Array<File>, tipoArchivoAdmitido: string) {
    let validacionArchivo = true;
    listaArchivo.forEach(element => {
      if (tipoArchivoAdmitido == "image/*") {
        if (!(/\.(jpg|png)$/i).test(element.name)) {
          validacionArchivo = false;
        }
      } else {
        if (element.type != tipoArchivoAdmitido) {

          validacionArchivo = false;
        }
      }

    });
    return validacionArchivo;
  }

}
