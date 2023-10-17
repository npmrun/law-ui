<template>
    <div class="law-ant-empty" :class="['empty-' + layout]">
        <a-empty v-bind="$attrs" />
    </div>
</template>

<script lang="ts" setup>
withDefaults(
    defineProps<{
        layout: 'fixed' | 'inline'
    }>(),
    {
        layout: 'inline',
    }
)
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LawAntEmpty',
})
</script>
