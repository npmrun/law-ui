import { cloneDeep } from "@law-ui/utils";
import { Dialog } from "law-ui";
import {
	defineComponent,
	Fragment,
	h,
	markRaw,
	nextTick,
	onScopeDispose,
	reactive,
	ref,
	resolveComponent,
	shallowRef,
	useAttrs,
} from "vue";
import { createDialogContext } from "./context";
import { IDialogState } from "./type";
import useAsyncComponent from "@law-ui/hooks/useAsyncComponent";

export interface LawDialogHookOptions {
	props?: object;
	dialogProps?: object;
	title?: string;
	argus?: object;
	autoInject?: boolean;
	renderUI: any;
}

let createComponentInModal = (opts: any) => {
	const { state, renderUI, _ } = opts;
	return defineComponent({
		name: "LawDialog",
		setup(props: any, { slots, expose }) {
			const attrs = useAttrs() as any;
			const haveDefaule = !!slots?.default;

			const action = {
				show: _.show,
				hide: _.hide,
			};
			createDialogContext([state, action]);

			const F = () => {
				return h(renderUI, { ...attrs, ...state.props }, () => []);
			};
			return () =>
				h(
					Dialog,
					{
						show: state.visible,
						["onUpdate:show"]: (e: any) => (state.visible = e),
						...(state.dialogProps || {}),
					},
					{
						default: () =>
							h(Fragment, [
								haveDefaule
									? slots?.default?.({
											...attrs,
											...state.props,
									  })
									: !!renderUI && h(F),
							]),
					}
				);
		},
	});
};

function useDialog({
	argus = {},
	props = {},
	dialogProps = {},
	renderUI,
	autoInject = true,
}: LawDialogHookOptions) {
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
	const state = reactive<IDialogState>({
		visible: false,
		dialogProps: cloneDeep(dialogProps),
		props: cloneDeep(props),
		argus: cloneDeep(argus),
	});

	let showResolve;
	function show(props, argus = {}) {
		state.props = props;
		state.argus = argus;
		let newState: IDialogState = {
			visible: true,
		};
		Object.assign(state, newState);
		return new Promise((resolve, reject) => {
			showResolve = resolve;
		});
	}

	const _ = {
		show,
		hide(value) {
			showResolve?.(value);
			state.visible = false;
		},
		UI: null,
	};
	if (typeof renderUI === "function") {
        renderUI = useAsyncComponent(renderUI);
    }
	const component = markRaw(
		createComponentInModal({
			state,
			renderUI,
			_,
		})
	);
	_.UI = component;
	let markRawUI = markRaw(_.UI);
	if (autoInject) {
		allModals.value.push(markRawUI);
		// @ts-ignore
		_.destory = () => {
			let index = -1;
			for (let i = 0; i < allModals.value.length; i++) {
				const modal = allModals.value[i];
				if (modal === markRawUI) {
					index = i;
					break;
				}
			}
			if (index !== -1) {
				allModals.value.splice(index, 1);
			}
		};
		onScopeDispose(() => {
			let index = -1;
			for (let i = 0; i < allModals.value.length; i++) {
				const modal = allModals.value[i];
				if (modal === markRawUI) {
					index = i;
					break;
				}
			}
			if (index !== -1) {
				allModals.value.splice(index, 1);
			}
		});
	}
	return _;
}

const allModals = ref([]);

export function ModalContainer() {
	return h(
		Fragment,
		{},
		allModals.value.map((V) => {
			return h(V);
		})
	);
}

export { useDialog };
export default useDialog;
