export enum VISIBILITY_FILTER {
    MOSTRAR_TODO = "MOSTRAR_TODOS",
    MOSTRAR_ACTIVADOS = "MOSTRAR_ACTIVADOS"

}

export type ServicioFilter = {
    label: string
    value: VISIBILITY_FILTER
}
export const filtradoInicial: ServicioFilter[] = [
    { label: "TODOS", value: VISIBILITY_FILTER.MOSTRAR_TODO },
    { label: "ACTIVADOS", value: VISIBILITY_FILTER.MOSTRAR_ACTIVADOS },

]