import _Mask from "./src/Mask.vue";
import { withInstall } from "@law-ui/utils";

export type Mask = InstanceType<typeof _Mask>;

export const Mask = withInstall(_Mask);
export default Mask;
