import { AlumnoService } from 'src/app/global/services/alumno.service';
import { servicio } from './servicio';
import { estadoServicio } from './estadoServicio';
import { alumno } from 'src/app/global/Models/Alumno';

export interface servicioSolicitados {
    id: number
    servicios: servicio[]
    fechaRegistro: Date
    codigoMatricula: string
    alumno: alumno
    estado_servicio: estadoServicio
    estado: boolean
    created_at: Date
    updated_at: Date
}