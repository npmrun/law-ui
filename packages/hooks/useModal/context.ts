import { inject, provide } from "vue";
import { EneModalExpose } from "./type";
import { EneModalToken } from "./token";

export function createModalContext(data: EneModalExpose) {
    provide(EneModalToken, data)
}

export function useModalContext() {
    return inject(EneModalToken)
}