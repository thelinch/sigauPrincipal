import { tipoRequisito } from './tipoRequisito';
import { servicio } from './servicio';
import { archivo } from './archivo';

export interface requisito {
  id?: number
  nombre: string
  descripcion: string
  requerido: boolean
  prioridad: boolean
  tipoArchivo: string
  nombreArchivo: string
  tipos: tipoRequisito[]
  servicios: servicio[]
  archivos: archivo[]
  estado: boolean
  created_at: Date
  updated_at: Date
}
