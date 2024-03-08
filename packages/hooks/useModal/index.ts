import {
    Fragment,
    defineComponent,
    h,
    markRaw,
    nextTick,
    onBeforeUnmount,
    onScopeDispose,
    reactive,
    ref,
    useAttrs,
    watchEffect,
} from "vue";
import { IEneModalState } from "./type";
import useAsyncComponent from "../useAsyncComponent";
import { createModalContext } from "./context";
import { cloneDeep } from "./utils";
import defineDefaultComponentInModal from "./customComponent";

let createComponentInModal;
export { defineDefaultComponentInModal };
export function useEneModal_ChangeComponentInModal(
    fn: typeof defineDefaultComponentInModal
) {
    createComponentInModal = fn;
    return fn;
}

// 知识：这里每次useEneModal都是一个新的组件，尽管EneModalToken是相同的，但是provide时是在两个不同的实例中的，因此即使EneModalToken相同，但数据仍是不同的。
export function useEneModal<T extends Object, Res extends any>({
    width = "550px",
    closable = true,
    focusFirstInput = false,
    destroyOnClose = false,
    autoInject = true,
    footer = false,
    bodyStyle = {},
    cProps = {},
    cTitle = "",
    renderUI,
}: {
    width?: string;
    closable?: boolean;
    focusFirstInput?: boolean;
    destroyOnClose?: boolean;
    autoInject?: boolean;
    renderUI?: any;
    footer?: boolean;
    cProps?: object;
    cTitle?: string;
    bodyStyle?: {};
} = {}) {
    if (!createComponentInModal) {
        console.warn("请定义一个Modal组件控制器");
        return new Proxy(
            {},
            {
                get(target, p, receiver) {
                    console.warn("请定义一个Modal组件控制器");
                    return;
                },
            }
        ) as any;
    }

    const state = reactive<IEneModalState>({
        visible: false,
        title: cTitle,
        allProps: cloneDeep(cProps),
    });

    let showResolve;
    function show(title: string, props: T): Promise<Res>;
    function show(props: T): Promise<Res>;
    function show(titleOrProps: string | T, props?: T): Promise<Res> {
        let _title: string;
        let _props: any;
        if (typeof titleOrProps === "string") {
            _title = titleOrProps;
            _props = props ?? {};
        } else {
            _props = titleOrProps;
        }
        if (_props) {
            state.allProps = _props;
        }
        nextTick(() => {
            let newState: IEneModalState = {
                visible: true,
                title: _title ?? state.title,
            };
            Object.assign(state, newState);
        });
        return new Promise((resolve, reject) => {
            showResolve = resolve;
        });
    }
    if (typeof renderUI === "function") {
        renderUI = useAsyncComponent(renderUI);
    }
    const internal = reactive({
        width: width,
        closable: closable,
        footer: footer,
        renderUI: renderUI ? markRaw(renderUI) : undefined,
    });

    const _ = {
        show,
        hide(value) {
            showResolve?.(value);
            state.visible = false;
        },
        setRenderUI(renderUI: any, width?: string) {
            if (width) {
                internal.width = width;
            }
            if (internal.renderUI === renderUI) {
                return _;
            }
            if (typeof renderUI === "function") {
                renderUI = useAsyncComponent(renderUI);
            }
            internal.renderUI = renderUI ? markRaw(renderUI) : undefined;
            return _;
        },
        setInternal(opts: {
            width?: string;
            closable?: boolean;
            renderUI?: any;
            footer?: boolean;
        }) {
            for (const key in opts) {
                if (Object.prototype.hasOwnProperty.call(opts, key)) {
                    let element = (opts as any)[key];
                    if (key === "renderUI") {
                        if (internal.renderUI === element) {
                            continue;
                        }
                        if (typeof element === "function") {
                            element = useAsyncComponent(renderUI);
                        }
                        internal.renderUI = element
                            ? markRaw(element)
                            : undefined;
                    } else {
                        if ((internal as any)[key] !== undefined) {
                            (internal as any)[key] = element;
                        }
                    }
                }
            }
            return _;
        },
        UI: null,
    };
    function close() {
        // 隐藏时参数全部重置
        internal.width = width;
        internal.closable = closable;
        internal.footer = footer;
        if (destroyOnClose) {
            internal.renderUI = undefined;
        }
    }
    const component = markRaw(
        createComponentInModal({
            close,
            internal,
            _,
            argus: {
                width,
                closable,
                focusFirstInput,
                destroyOnClose,
                autoInject,
                footer,
                bodyStyle,
                cProps,
                cTitle,
                renderUI,
            },
            state,
        })
    );
    _.UI = component;
    let markRawUI = markRaw(_.UI);
    if (autoInject) {
        allModals.value.push(markRawUI);
        onScopeDispose(() => {
            for (let i = 0; i < allModals.value.length; i++) {
                const modal = allModals.value[i];
                if (modal === markRawUI) {
                    allModals.value.splice(i, 1);
                    break;
                }
            }
        });
    }
    return _;
}

const allModals = ref<any[]>([]);

export function ModalContainer() {
    return h(
        Fragment,
        {},
        allModals.value.map((V) => {
            return h(V);
        })
    );
}

export default useEneModal;
