<script setup>
import { ButtonMore, ButtonMoreItem, useEneModal, useModalContext } from "law-ui";
import { h, defineComponent, ref, onBeforeUnmount } from "vue";
import { message, Input, Button, Space } from "ant-design-vue";
const modal = useEneModal({
    focusFirstInput: true,
    renderUI: defineComponent({
        setup() {
            const [state, action] = useModalContext()
            const isLoading = ref(false)
            const value = ref()
            return () => h(Space, null, () => [
                h(Input, { onInput(e) { value.value = e.target.value }, value: value.value }),
                h(Button, {
                    onClick() {
                        if (!value.value) {
                            message.error("请输入值")
                            return
                        }
                        isLoading.value = true;
                        setTimeout(() => {
                            action.hide(value.value)
                            isLoading.value = false
                        }, 2000);
                    }, loading: isLoading.value
                }, () => "提交")
            ])
        }
    })
})
async function handleClick(ev) {
    console.log('click', ev);
    const res = await modal.show("对话框")
    message.success(`获取到的数据：${res}`)
}

onBeforeUnmount(() => {
    console.log("onBeforeUnmount")
})
</script>

<template>
    <ButtonMore text="ButtonPlus" type="primary" @click="handleClick">
        <ButtonMoreItem :itemKey="0" @click="console.log">菜单 1</ButtonMoreItem>
        <ButtonMoreItem :itemKey="1" @click="console.log">菜单 2</ButtonMoreItem>
    </ButtonMore>
</template>
