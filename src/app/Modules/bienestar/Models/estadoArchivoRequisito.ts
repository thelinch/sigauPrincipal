import { estadoArchivo } from './estadoArchivo';

export interface estadoArchivoRequisito {
    id: number
    fechaRegistro: Date
    estado_archivo: estadoArchivo
    created_at: Date
    updated_at: Date
    estado: boolean
}