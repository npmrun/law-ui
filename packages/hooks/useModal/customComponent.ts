import {
    defineComponent,
    h,
    nextTick,
    reactive,
    ref,
    resolveComponent,
    useAttrs,
    watchEffect,
} from "vue";
import { createModalContext } from "./context";

export default (opts) => {
    const { internal, _, argus, state, close } = opts;

    return defineComponent({
        name: "EneModal",
        setup(props: any, { slots, expose }) {
            const attrs = useAttrs() as any;
            const haveDefaule = !!slots?.default;

            function handleAfterClose(e: any) {
                // 隐藏时参数全部重置
                close();
            }
            const action = {
                show: _.show,
                hide: _.hide,
            }
            createModalContext([state, action]);
            let modalAttr = reactive<any>({
                bodyStyle: argus.bodyStyle,
            });
            watchEffect(() => {
                if (!internal.footer) {
                    modalAttr["footer"] = null;
                } else {
                    Reflect.deleteProperty(modalAttr, "footer");
                }
            });
            const wrapperRef = ref();
            if (argus.focusFirstInput) {
                // 在对话框打开时直接聚焦第一个对话框
                watchEffect(async () => {
                    if (state.visible) {
                        await nextTick();
                        const elements =
                            wrapperRef.value?.querySelectorAll("input");
                        for (let i = 0; i < elements.length; i++) {
                            const el = elements[i] as HTMLElement;
                            let type = el.getAttribute("type");
                            let isHidden = el.style.display === "none";
                            let isReadonly = el.hasAttribute("readonly");
                            let isDisabled = el.hasAttribute("disabled");
                            if (
                                (type == "text" || type == "number" || !type) &&
                                !isReadonly &&
                                !isDisabled &&
                                !isHidden
                            ) {
                                el.focus();
                                return;
                            }
                        }
                    }
                });
            }
            const F = () => {
                return h(
                    internal.renderUI,
                    { ...attrs, ...state.allProps },
                    () => []
                );
                // 以下方式会导致props改了但内部可能监听不到
                // return <internal.renderUI {...{ ...attrs, ...state.allProps }}></internal.renderUI>
            };
            const Modal = resolveComponent("a-modal") as string;
            return () =>
                h(
                    Modal,
                    {
                        ...modalAttr,
                        maskClosable: true,
                        destroyOnClose: props.destroyOnClose,
                        closable: internal.closable,
                        visible: state.visible,
                        ["onUpdate:visible"]: (e: any) => (state.visible = e),
                        width: internal.width,
                        afterClose: handleAfterClose,
                    },
                    {
                        title: () =>
                            h(
                                state.title
                                    ? () => h("div", state.title)
                                    : undefined
                            ),
                        default: () =>
                            h(
                                "div",
                                {
                                    ref: wrapperRef,
                                },
                                [
                                    haveDefaule
                                        ? slots?.default?.({
                                              ...attrs,
                                              ...state.allProps,
                                          })
                                        : !!internal.renderUI && h(F),
                                ]
                            ),
                    }
                );
        },
    });
};
