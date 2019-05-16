import { Docente } from './Docente';

export interface Rector {
  id: number;
  fecha_contrato_inicio : Date;
  fecha_contrato_fin : Date;
  estado: boolean;
  docente: Docente;
  created_at: Date;
  updated_at: Date;
}
