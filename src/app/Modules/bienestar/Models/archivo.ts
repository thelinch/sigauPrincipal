import { estadoArchivo } from './estadoArchivo';
import { ampliacion } from './ampliacion';

export interface archivo {
  id: number
  nombreOriginal: string
  nombreSistema: string
  url: string
  estados_archivo: estadoArchivo[]
  estadoActual: estadoArchivo
  estado: boolean
  ampliaciones: ampliacion[]
  ampliacionActivada: ampliacion
  extension: string
}
