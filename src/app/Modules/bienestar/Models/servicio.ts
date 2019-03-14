import { requisito } from './Requisito';

export interface servicio {
  id?: number
  nombre: string
  estado: number
  total: number
  icono: string
  vacanteHombre: number
  vacanteMujer: number
  requisitos: requisito[]
  created_at: Date
  updated_at: Date
}
