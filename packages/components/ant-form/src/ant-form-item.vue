<template>
    <a-form-item :class="className">
        <slot></slot>
    </a-form-item>
</template>
<style lang="less" scoped></style>
<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({
    name: 'LawAntFormItem',
})

const props = withDefaults(
    defineProps<{
        block?: boolean
    }>(),
    {
        block: false,
    }
)

const className = computed(() => {
    const result = []
    if (props.block) {
        result.push('block')
    }
    return result
})
</script>
