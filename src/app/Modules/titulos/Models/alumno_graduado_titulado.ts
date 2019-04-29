import { alumno } from 'src/app/global/Models/Alumno';
import { denominacionGradoTitulo } from './denominacion_grado_titulo';
import { trabajo_investigacion } from './trabajo_investigacion';
import { nombreProgramaestudio } from './nombre_programa_estudio';

export interface alumnoGraduadoTitulado {
    id: number
    codigoUniversidad: string
    denominacionGradoTitulo: denominacionGradoTitulo
    alumno_general_id: number
    tipo_alumno_id: number
    nombreProgramaestudio: nombreProgramaestudio
    fechaingreso: Date
    fechaegreso: Date
    trabajo_investigacion: trabajo_investigacion
}