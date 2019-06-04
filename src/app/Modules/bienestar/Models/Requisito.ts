import { tipoRequisito } from './tipoRequisito';
import { servicio } from './servicio';
import { archivo } from './archivo';
import { ID } from '@datorama/akita';
import { archivoBase } from './archivoBase';

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
  archivos: archivoBase[]
  estado: boolean
  created_at: Date
  updated_at: Date
}
