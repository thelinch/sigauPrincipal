import { tipoRequisito } from './tipoRequisito';
import { servicio } from './servicio';

export interface requisito {
  id?: number
  nombre: string
  descripcion: string
  requerido: boolean
  prioridad: boolean
  tipoArchivo: string
  tipos: tipoRequisito[]
  servicios: servicio[]
  estado: boolean
  created_at: Date
  updated_at: Date
}
