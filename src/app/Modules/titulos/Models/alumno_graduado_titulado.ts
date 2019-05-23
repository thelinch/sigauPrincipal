import { alumno } from 'src/app/global/Models/Alumno';
import { denominacionGradoTitulo } from './denominacion_grado_titulo';
import { trabajo_investigacion } from './trabajo_investigacion';
import { nombreProgramaestudio } from './nombre_programa_estudio';
import { obtenciongradostitulo } from './obtencion_grados_titulo';
import { empresa } from './empresa';
import { modalidadEstudio } from './modalidad_estudio';

export interface alumnoGraduadoTitulado {
    id: number
    empresa: empresa
    creditos_aprobados: string
    fecha_egreso: Date
    fecha_ingreso: Date
    denominacion_grado_titulo: denominacionGradoTitulo
    alumno_general_id: number
    tipo_alumno_id: number
    foto: string
    nombre_programa_estudio: nombreProgramaestudio
    obtencion_grado : obtenciongradostitulo
    modalidad_estudio : modalidadEstudio
    trabajo_investigacion: trabajo_investigacion
}