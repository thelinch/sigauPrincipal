import { cicloAcademico } from 'src/app/global/Models/cicloAcademico';

export interface cicloAcademicoActual{
    id:number
    estado:boolean
    ciclo_academico:cicloAcademico
    vigencia:boolean
}