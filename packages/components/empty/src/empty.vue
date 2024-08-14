<template>
    <div :class="[ns.b(), layoutClassName]">
        <a-empty v-bind="$attrs" />
    </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@law-ui/utils'
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        layout?: 'absolute' | 'inline'
    }>(),
    {
        layout: 'inline',
    }
)

defineOptions({
    name: 'LawEmpty',
})

const ns = useNamespace('empty')

const layoutClassName = computed(()=>{
    return ns.m(props.layout)
})
</script>
