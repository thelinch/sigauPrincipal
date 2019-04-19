import { alumno } from 'src/app/global/Models/Alumno';
import { requisito } from './Requisito';
import { archivo } from './archivo';
export interface alumnoRequisito {
    id: number
    requisito: requisito
    codigoMatricula: string
    archivos: archivo[]
    fechaRegistro: Date
    estado: boolean
    created_at: Date
    updated_at: Date
}