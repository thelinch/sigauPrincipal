import { alumnoGraduadoTitulado } from './alumno_graduado_titulado';
import { DecanoFacultad } from 'src/app/global/Models/DecanoFacultad';
import { Rector } from 'src/app/global/Models/Rector';
import { tipo_diploma } from './tipo_diploma';
import { TranajadorArea } from 'src/app/global/Models/TrabajadorArea';


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
    tipo_diploma: tipo_diploma
    rector : Rector
    tipo_autoridad: number
    trabajador_areas: TranajadorArea
}