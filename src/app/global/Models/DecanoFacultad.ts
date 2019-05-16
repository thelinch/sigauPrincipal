import { Docente } from './Docente';
import { Facultad } from './Facultad';

export interface DecanoFacultad {
  id: number;
  fecha_periodo_inicio : Date;
  fecha_periodo_fin : Date;
  estado: boolean;
  docente: Docente;
  facultad_oficina: Facultad;
  created_at: Date;
  updated_at: Date;
}
