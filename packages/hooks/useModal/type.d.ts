

interface IEneModalState {
    visible: boolean
    title: string
    allProps?: any
}
interface IEneModalAction {
    show: Function
    hide: Function
}
export type EneModalExpose = [IEneModalState, IEneModalAction]
