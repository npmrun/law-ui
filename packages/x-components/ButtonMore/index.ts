import { ButtonMore as _ButtonMore, ButtonMoreItem as _ButtonMoreItem } from "./src/ButtonMore"
import { withInstall, withNoopInstall } from "@law-ui/utils"

export type ButtonMoreInstance = InstanceType<typeof _ButtonMore>
export type ButtonMoreItemInstance = InstanceType<typeof _ButtonMoreItem>

export const ButtonMore = withInstall(_ButtonMore, {
    _ButtonMoreItem
})
export const ButtonMoreItem = withNoopInstall(_ButtonMoreItem)
export default _ButtonMore
