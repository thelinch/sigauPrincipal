
import { tipo_empresa } from './tipo_empresa';

export interface empresa {
    id: number
    ruc: string
    nombre: string
    sigla: string
    sector: string
    codigo: string
    telefono: string
    url_pagina : string
    direccion: string
    pais : string
    descripcion : string
    tipo_empresa : tipo_empresa
    created_at: Date
    updated_at: Date
    estado: boolean
}
