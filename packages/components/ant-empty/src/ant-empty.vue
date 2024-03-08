<template>
    <div class="law-ant-empty" :class="[layoutClassName]">
        <a-empty v-bind="$attrs" />
    </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@law-ui/utils'
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        layout?: 'fixed' | 'inline'
    }>(),
    {
        layout: 'inline',
    }
)

defineOptions({
    name: 'LawAntEmpty',
})

const ns = useNamespace('ant-empty')

const layoutClassName = computed(()=>{
    return ns.m(props.layout)
})
</script>
