export enum VISIBILITY_FILTER {
    MOSTRAR_TODO = "MOSTRAR_TODOS",
    MOSTRAR_PRIORITARIOS = "MOSTRAR_PRIORITARIOS",
    MOSTRAR_REQUERIDOS = "MOSTRAR_REQUERIDOS"

}
export type RequsitoFilter = {
    label: string
    value: VISIBILITY_FILTER
}
export const filtradoInicial: RequsitoFilter[] = [
    { label: "TODOS", value: VISIBILITY_FILTER.MOSTRAR_TODO },
    { label: "PRIORITARIOS", value: VISIBILITY_FILTER.MOSTRAR_PRIORITARIOS },
    { label: "REQUERIDOS", value: VISIBILITY_FILTER.MOSTRAR_REQUERIDOS }

]
