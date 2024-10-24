import {
	AsyncComponentLoader,
	Component,
	defineAsyncComponent,
	defineComponent,
	h,
	markRaw,
	ref,
} from "vue";
let num = 0;
export function useAsyncComponent(comp: AsyncComponentLoader<any>) {
	let retryFn: Function;
	const asyncComp = defineAsyncComponent({
		// loader: comp,
		loader: () =>
			new Promise<Component>((resolve, reject) => {
				// resolve(comp());
				// resolve(() => h("div", {}, "aaa"));
				reject();
			}),
		loadingComponent: () => h("div", "loading"),
		errorComponent: () =>
			h(
				"div",
				{
					onClick() {
						if (retryFn) {
							retryFn();
						}
					},
				},
				"error"
			),
		timeout: 3000,
		onError(err, retry, fail, attempts) {
			console.error(err);
			retryFn = retry;
		},
	});
	return markRaw(h(asyncComp));
}

export default useAsyncComponent;
