import { persona } from './Persona';

export interface Docente {
  id: number;
  codigo : string;
  correo_institucional : string;
  numero_colegiatura : number;
  url_cv: string;
  codigo_essalud: string;
  estado: boolean;
  persona: persona;
  created_at: Date;
  updated_at: Date;
}
