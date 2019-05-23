import { tipo_documento } from './tipo_documento';

export interface persona {
    id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    nombre_completo: string;
    sexo: string;
    foto: string;
    fecha_nacimiento: Date;
    pais: string;
    numero_documento: string;
    direccion: string;
    estado: boolean;
    tipo_documento: tipo_documento;
}