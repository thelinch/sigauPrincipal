import { alumno } from 'src/app/global/Models/Alumno';
import { registro_graduado_titulado } from './registro_graduado_titulado';

export interface alumno_registroAlumnoGraduadoTitulado {
    alumno: alumno
    alumno_graduado: registro_graduado_titulado
}