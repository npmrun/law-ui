

export interface IEneModalState {
    visible: boolean
    title: string
    allProps?: any
}
export interface IEneModalAction {
    show: Function
    hide: Function
}
export type EneModalExpose = [IEneModalState, IEneModalAction]
