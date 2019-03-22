import { requisito } from './Requisito';
import { alumno } from 'src/app/global/Models/Alumno';
export interface servicio {
  id?: number
  nombre: string
  estado: number
  total: number
  icono: string
  requisitos: requisito[]
  codigoMatricula: string
  vacantesHombre: number
  vacantesMujer: number
  activador: boolean
  dividido: boolean
  alumnos: alumno[]
  fechaInicio: Date
  fechaFin: Date
  created_at: Date
  updated_at: Date
}
