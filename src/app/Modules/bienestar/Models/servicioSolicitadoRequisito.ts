import { obuServicios } from "src/app/Modules/bienestar/Models/obuServicios";
import { ID } from "@datorama/akita";
import { requisito } from "./Requisito";

export interface servicioSolicitadoRequisito {
  id: ID;
  requisito: requisito;
  codigoMatricula: string;
  fechaRegistro: string;
  obuSolicitud: obuServicios;
  estado: boolean;
}
