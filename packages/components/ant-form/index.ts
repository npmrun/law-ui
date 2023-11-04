import AntForm from "./src/ant-form.vue"
import AntFormItem from "./src/ant-form-item.vue"
import { withInstall, withNoopInstall } from "@law-ui/utils"

export type FormInstance = InstanceType<typeof AntForm>
export type FormItemInstance = InstanceType<typeof AntFormItem>

export const LawAntForm = withInstall(AntForm, {
    AntFormItem
})
export const LawAntFormItem = withNoopInstall(AntFormItem)
export default AntForm