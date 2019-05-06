import { alumnoGraduadoTitulado } from './alumno_graduado_titulado';


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
    director_decano_id: number
    estado : boolean
    created_at : Date
    updated_at : Date 
    alumno_graduado_id: alumnoGraduadoTitulado
    tipo_diplona: number
    rector_id : number
    tipo_autoridad_id: number
    trabajador_areas_id: number
}