import { inject, provide } from "vue";
import { DialogExpose } from "./type";
import { EneModalToken } from "./token";

export function createDialogContext(data: DialogExpose) {
    provide(EneModalToken, data)
}

export function useDialogContext() {
    return inject(EneModalToken)
}