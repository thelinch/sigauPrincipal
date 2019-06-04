import { requisito } from './Requisito';

export interface tipoRequisito {
  id: number;
  nombre: string;
  icono: string;
  estado: boolean;
  pivot: any
  requisitos: requisito[]
  created_at: Date;
  updated_at: Date;

}
