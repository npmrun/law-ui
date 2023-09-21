<template>
    <div class="law-ant-empty" :class="['empty-' + layout]">
        <Empty v-bind="$attrs" />
    </div>
</template>

<script lang="ts" setup>
import Empty from 'ant-design-vue/es/empty'
withDefaults(
    defineProps<{
        layout: 'fixed' | 'inline'
    }>(),
    {
        layout: 'inline',
    }
)
</script>
