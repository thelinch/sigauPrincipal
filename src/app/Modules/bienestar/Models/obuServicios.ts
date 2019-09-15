import { AlumnoService } from "src/app/global/services/alumno.service";
import { servicio } from "./servicio";
import { estadoServicio } from "./estadoServicio";
import { alumno } from "src/app/global/Models/Alumno";
import { ID } from "@datorama/akita";

export interface obuServicios {
  id: ID;
  servicios: servicio[];
  fechaRegistro: Date;
  codigoMatricula: string;
  alumno: alumno;
  estado_servicio: estadoServicio;
  estado: boolean;
  created_at: Date;
  updated_at: Date;
}
