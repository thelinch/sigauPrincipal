import { servicio } from 'src/app/Modules/bienestar/Models/servicio';

export interface cicloAcademico {
    id: number
    nombre: string
    año: string
    servicios: servicio[]
    fecha_fin: Date
    fecha_inicio: Date
    estado: boolean
    created_at: Date
    updated_at: Date
}