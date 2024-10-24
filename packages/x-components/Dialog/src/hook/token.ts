import { InjectionKey } from "vue";
import { DialogExpose } from "./type";

/**
 * 不会存在provide覆盖的问题，因为inject取出的都是上一级的provide对应的响应式数据，不会出现inject取出的是覆盖后的数据
 */
export const EneModalToken: InjectionKey<DialogExpose> = Symbol("useModalToken")
