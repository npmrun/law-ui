import _Dialog from "./src/Dialog.vue";
import { withInstall } from "@law-ui/utils";

export * from "./src/hook/useDialog";
export * from "./src/hook/context";

export type Dialog = InstanceType<typeof _Dialog>;

export const Dialog = withInstall(_Dialog);
export default Dialog;
