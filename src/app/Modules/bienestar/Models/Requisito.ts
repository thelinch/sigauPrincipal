import { tipoRequisito } from './tipoRequisito';
import { servicio } from './servicio';
import { archivo } from './archivo';
import { ID } from '@datorama/akita';

export interface requisito {
  id: ID
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
