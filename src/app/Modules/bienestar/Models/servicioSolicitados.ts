import { AlumnoService } from 'src/app/global/services/alumno.service';
import { servicio } from './servicio';
import { estadoServicio } from './estadoServicio';

export interface servicioSolicitados {
    id: number
    servicios: servicio[]
    fechaRegistro: Date
    codigoMatricula: string
    estado_servicio: estadoServicio
    estado: boolean
    created_at: Date
    updated_at: Date
}