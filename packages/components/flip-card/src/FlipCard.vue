<template>
    <div :class="[b(), isReverse ? is('reverse') : '']">
        <div class="panel-wrapper">
            <div class="panel-flip front" @click="isReverse = !isReverse">
                front
            </div>
            <div class="panel-flip back" @click="isReverse = !isReverse">
                back
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@law-ui/utils';
import { ref } from 'vue';

const { b, is } = useNamespace("flipcard")
console.log();

const isReverse = ref(false)

</script>