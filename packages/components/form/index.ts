import Form from "./src/form.vue"
import FormItem from "./src/form-item.vue"
import { withInstall, withNoopInstall } from "@law-ui/utils"

export type FormInstance = InstanceType<typeof Form>
export type FormItemInstance = InstanceType<typeof FormItem>

export const LawForm = withInstall(Form, {
    FormItem
})
export const LawAntFormItem = withNoopInstall(FormItem)
export default Form