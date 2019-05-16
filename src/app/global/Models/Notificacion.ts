import { SweetAlertType } from 'sweetalert2';

export interface Notificacion {
    severidad: SweetAlertType
    detalle: string
    resumen: string
}