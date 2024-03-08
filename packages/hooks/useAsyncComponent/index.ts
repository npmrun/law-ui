import { AsyncComponentLoader, defineAsyncComponent, h, markRaw } from "vue";

export function useAsyncComponent(comp: AsyncComponentLoader<any>) {
    return markRaw(
        defineAsyncComponent({
            loader: markRaw(comp),
        }) as any
    );
}

export default useAsyncComponent