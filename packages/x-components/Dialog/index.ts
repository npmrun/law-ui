import _Dialog from "./src/Dialog.vue";
import { withInstall } from "@law-ui/utils";

export type Dialog = InstanceType<typeof _Dialog>;

export const Dialog = withInstall(_Dialog);
export default Dialog;
