import Swal from 'sweetalert2'

export class swal {
  static getMensajeExito(mensaje: string) {
    console.log("enreo")
    return Swal.fire({
      title: "Operacion Exitosa",
      text: mensaje,
      type: "success"
    })
  }
  static getMensajeError(error: string) {
    return Swal.fire({
      title: "Upps!",
      text: error,
      type: "error"
    })
  }
}
