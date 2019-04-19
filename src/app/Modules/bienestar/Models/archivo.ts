import { estadoArchivo } from './estadoArchivo';

export interface archivo {
  id: number
  nombreOriginal: string
  nombreSistema: string
  url: string
  estados_archivo: estadoArchivo
  estado: boolean
  extension: string
}
