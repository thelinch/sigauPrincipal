import { Adminsitrativo } from './Administrativo';
import { Cargo } from './Cargo';

export interface TranajadorArea {
  id: number;
  sueldo : string;
  fecha_contraro_inicio: Date;
  fecha_contraro_fin: Date;
  resolucion: string;
  codigo_resolucion: string;
  estado: boolean;
  created_at: Date;
  updated_at: Date;
  administrativo: Adminsitrativo;
  area: number;
  cargo: Cargo;
  categoria_administrativo: number;
  condicion_trabajador: number;
  regimen_contrato: number;
}
