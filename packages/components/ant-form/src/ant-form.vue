<template>
    <div
        class="law-ant-form"
        :class="[attrs?.layout == 'inline' ? 'law-ant-form-inline' : '']"
        :style="{
            '--law-ant-form-LawAntForm': labelWidth,
        }"
    >
        <a-form v-bind="attrs" :ref="getRef">
            <slot></slot>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'

defineOptions({
    name: 'LawAntForm',
})

const props = withDefaults(
    defineProps<{
        labelWidth?: string
    }>(),
    {
        labelWidth: '80px',
    }
)
const emit = defineEmits<{
    (ev: 'getRef', el: HTMLElement): void
}>()
const attrs = useAttrs()

function getRef(e: any) {
    emit('getRef', e)
}
</script>

<style lang="scss" scoped></style>
