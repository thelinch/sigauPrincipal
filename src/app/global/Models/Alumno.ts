import { servicio } from 'src/app/Modules/bienestar/Models/servicio';
import { requisito } from 'src/app/Modules/bienestar/Models/Requisito';
import { EscuelaProfesional } from './EscuelaProfesional';
import { persona } from './Persona';
import { tipoAlumno } from './tipoAlumno';

export interface alumno {
  id: number;
  codigo: string;
  correo_institucional: string;
  estado: boolean;
  servicios: servicio[]
  requisitos: requisito[]
  persona: persona
  grado_alumno: boolean
  created_at: Date
  updated_at: Date
  tipo_alumno: tipoAlumno
  escuela_profesional: EscuelaProfesional;


}
