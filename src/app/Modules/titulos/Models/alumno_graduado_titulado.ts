import { alumno } from 'src/app/global/Models/Alumno';
import { denominacionGradoTitulo } from './denominacion_grado_titulo';
import { trabajo_investigacion } from './trabajo_investigacion';
import { nombreProgramaestudio } from './nombre_programa_estudio';
import { obtenciongradostitulo } from './obtencion_grados_titulo';
import { empresa } from './empresa';
import { modalidadEstudio } from './modalidad_estudio';

export interface alumnoGraduadoTitulado {
    id: number
    codigoUniversidad: empresa
    creditos_aprobados: string
    fechaingreso: Date
    fechaegreso: Date
    denominacionGradoTitulo: denominacionGradoTitulo
    alumno_general_id: number
    tipo_alumno_id: number
    imageUrl: string
    nombreProgramaestudio: nombreProgramaestudio
    obtencionGrado : obtenciongradostitulo
    modalidadEstudio : modalidadEstudio
    trabajo_investigacion: trabajo_investigacion
}