import { Pipe, PipeTransform } from '@angular/core';
import { estadoArchivo } from '../Models/estadoArchivo';

@Pipe({
  name: 'filterEstadoActual'
})
export class FilterEstadoActualPipe implements PipeTransform {

  transform(estadoArchivoParametro: estadoArchivo[]): any {
    return estadoArchivoParametro.filter(estado => estado.pivot.estado)[0];
  }

}
