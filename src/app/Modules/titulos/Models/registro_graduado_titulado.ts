import { alumnoGraduadoTitulado } from './alumno_graduado_titulado';
import { DecanoFacultad } from 'src/app/global/Models/DecanoFacultad';
import { Rector } from 'src/app/global/Models/Rector';


export interface registro_graduado_titulado {
    id: number
    numero_oficio: string
    numero_resolucion: string
    fecha_resolucion: Date
    numero_diploma: string  
    fecha_emision_diploma: Date
    registro_libro: string
    registro_folio: string
    numero_registro: string
    director_decano: DecanoFacultad
    estado : boolean
    created_at : Date
    updated_at : Date 
    alumno_graduado: alumnoGraduadoTitulado
    tipo_diplona: number
    rector : Rector
    tipo_autoridad: number
    trabajador_areas: number
}