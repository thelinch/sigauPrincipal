import { requisito } from './Requisito';
import { Moment } from 'moment';
export interface servicio {
  id?: number
  nombre: string
  estado: number
  total: number
  icono: string
  requisitos: requisito[]
  vacantesHombre: number
  vacantesMujer: number
  activador: boolean
  dividido: boolean
  fechaInicio: Date
  fechaFin: Date
  created_at: Date
  updated_at: Date
}
