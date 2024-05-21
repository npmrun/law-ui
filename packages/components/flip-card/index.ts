import FlipCard from "./src/flip-card.vue";
import { withInstall, withNoopInstall } from "@law-ui/utils";

export type FlipCardInstance = InstanceType<typeof FlipCard>;

export const LawFlipCard = withInstall(FlipCard);
export default FlipCard;
