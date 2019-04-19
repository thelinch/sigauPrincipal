import { alumno } from 'src/app/global/Models/Alumno';
import { denominacionGradoTitulo } from './denominacion_grado_titulo';

export interface alumnoGraduadoTitulado {

    id: number
    codigoUniversidad: string
    denominacionGradoTitulo: denominacionGradoTitulo
    alumno_general_id: number
}