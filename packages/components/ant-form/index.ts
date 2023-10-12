import AntForm from "./src/ant-form.vue"
import AntFormItem from "./src/ant-form-item.vue"

export type FormInstance = InstanceType<typeof AntForm>
export type FormItemInstance = InstanceType<typeof AntFormItem>

export const LawAntForm = AntForm
export const LawAntFormItem = AntFormItem
export default AntForm