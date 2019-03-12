import { vacante } from './vacante';

export interface servicio {
  id?: number
  nombre: string
  estado: number
  vacante: vacante
  created_at: Date
  updated_at: Date
}
