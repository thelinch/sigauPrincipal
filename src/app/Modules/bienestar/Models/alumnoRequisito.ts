import { alumno } from 'src/app/global/Models/Alumno';
import { requisito } from './Requisito';
export interface alumnoRequisito {
    id: number
    alumno: alumno
    requisito: requisito
    codigoMatricula: string
    fechaRegistro: Date
    estado: boolean
    created_at: Date
    updated_at: Date
}