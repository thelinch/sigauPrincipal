import { requisito } from './Requisito';
import { alumno } from 'src/app/global/Models/Alumno';
import { ID } from '@datorama/akita';
import { ampliacion } from './ampliacion';
import { cicloAcademicoActual } from './cicloAcademicoActual';
export class servicio {
  id: ID
  nombre: string
  estado: number
  total: number
  icono: string
  divisio_personas: boolean
  ciclo_academico_actual: cicloAcademicoActual
  requisitos?: requisito[]
  ampliaciones?: ampliacion[]
  ampliacion_actual: ampliacion
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
export type servicioUI = {
  isOpen: boolean;
  isLoading: boolean
  viewMode: { mode: string }
}
