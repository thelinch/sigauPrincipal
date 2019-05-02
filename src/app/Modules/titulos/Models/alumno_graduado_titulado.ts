import { alumno } from 'src/app/global/Models/Alumno';
import { denominacionGradoTitulo } from './denominacion_grado_titulo';
import { trabajo_investigacion } from './trabajo_investigacion';
import { nombreProgramaestudio } from './nombre_programa_estudio';
import { obtencion_grados_titulo } from './obtencion_grados_titulo';
import { empresa } from './empresa';

export interface alumnoGraduadoTitulado {
    id: number
    codigoUniversidad: empresa
    denominacionGradoTitulo: denominacionGradoTitulo
    alumno_general_id: number
    tipo_alumno_id: number
    nombreProgramaestudio: nombreProgramaestudio
    obtencionGrado : obtencion_grados_titulo
    fechaingreso: Date
    fechaegreso: Date
    trabajo_investigacion: trabajo_investigacion
}