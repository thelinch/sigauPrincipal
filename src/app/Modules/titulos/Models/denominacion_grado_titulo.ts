import { EscuelaProfesional } from 'src/app/global/Models/EscuelaProfesional';
import { gradoTitulo } from './grado_titulo';
import { mensionMaestrias } from './mension_maestros';

export interface denominacionGradoTitulo {
    id: number
    nombre: string
    estado: boolean
    escuela_profesional: EscuelaProfesional
    grado_titulo: gradoTitulo
    mension_maestria: mensionMaestrias
}