import { tipoRequisito } from './tipoRequisito';

export interface requisito {
  id?: number
  nombre: string
  descripcion: string
  requerido: boolean
  prioridad: number
  tipoArchivo: string
  tipo: tipoRequisito
  estado: number
  created_at: Date
  updated_at: Date
}
