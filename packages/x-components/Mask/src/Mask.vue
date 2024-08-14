<template>
    <div :class="[ns.b(), inBox?ns.m('inbox'):'']" v-if="isRenderShow" v-show="isDisplayShow" @click.stop="clickMask"></div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@law-ui/utils';
import { computed } from 'vue';
const props = withDefaults(defineProps<{
    show?: boolean
    isRender?: boolean
    canClose?: boolean
    inBox?: boolean
}>(), {
    show: false,
    isRender: false,
    canClose: true,
    inBox: false,
})
const isDisplayShow = computed(() => {
    if(props.isRender) {
        return props.show
    }
    return true
})
const isRenderShow = computed(() => {
    if(props.isRender) {
        return true
    }
    return props.show
})

const ns = useNamespace('mask')

const emits = defineEmits<{
    (e: "update:show", isShow: boolean): void
}>()

function clickMask() {
    if(!props.canClose) return
    emits("update:show", false)
}
</script>
