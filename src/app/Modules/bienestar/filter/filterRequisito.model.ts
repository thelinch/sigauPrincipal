export enum VISIBILITY_FILTER {
    MOSTRAR_TODO = "MOSTRAR_TODOS",
    MOSTRAR_PRIORITARIOS = "MOSTRAR_PRIORITARIOS"

}
export type RequsitoFilter = {
    label: string
    value: VISIBILITY_FILTER
}
export const filtradoInicial: RequsitoFilter[] = [
    { label: "TODOS", value: VISIBILITY_FILTER.MOSTRAR_TODO },
    { label: "PRIORITARIOS", value: VISIBILITY_FILTER.MOSTRAR_PRIORITARIOS }
]