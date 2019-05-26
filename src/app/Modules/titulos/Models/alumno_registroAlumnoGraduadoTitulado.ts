import { alumno } from 'src/app/global/Models/Alumno';
import { registro_graduado_titulado } from './registro_graduado_titulado';
import { alumnoGraduadoTitulado } from './alumno_graduado_titulado';
import { DecanoFacultad } from 'src/app/global/Models/DecanoFacultad';

export interface alumno_registroAlumnoGraduadoTitulado {
    alumno: alumno
    registro_alumno_graduado: registro_graduado_titulado
    alumno_graduado: alumnoGraduadoTitulado
    decano: DecanoFacultad
}