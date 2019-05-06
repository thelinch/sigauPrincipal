import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Notificacion } from '../Models/Notificacion';
@Injectable({ providedIn: "root" })
export class NotificacionBusService {
    showNotificacionSource: Subject<Notificacion> = new Subject();
    getNotificacion(): Observable<Notificacion> {
        return this.showNotificacionSource.asObservable();
    }
    showError(mensaje: string, resumen?: string) {
        this.show("error", resumen, mensaje);
    }
    showSuccess(mensaje: string, resumen?: string) {
        this.show("success", resumen, mensaje);
    }
    showInfo(mensaje: string, resumen?: string) {
        this.show("Info", resumen, mensaje);
    }
    showWarn(mensaje: string, resumen?: string) {
        this.show("Warn", resumen, mensaje);
    }

    private show(severidad: string, resumen: string, mensaje: string) {
        const notificacion: Notificacion = {
            severidad: severidad,
            resumen: resumen,
            detalle: mensaje
        }
        this.notificar(notificacion);
    }
    private notificar(notificacion: Notificacion) {
        this.showNotificacionSource.next(notificacion);
    }

}