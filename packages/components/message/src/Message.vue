<template>
    <transition name="law-message-fade" @before-leave="$emit('close')" @after-leave="$emit('destroy')">
        <div :id="id" v-show="visible" class="law-message a-shadow" :style="customStyle" @dblclick="close"
            @mouseenter="hoverEnter" @mouseleave="hoverLeave">
            <div class="law-message-wrapper">
                <slot>
                    <span>{{ message }}</span>
                </slot>
            </div>
        </div>
    </transition>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, inject, onMounted, ref } from "vue"

export default defineComponent({
    name: 'LawMessage',
    emits: ['destroy', 'close'],
    props: {
        id: { type: String, default: '' },
        message: {
            type: String,
            default: ''
        },
        duration: {
            type: Number,
            default: 3000
        },
        offset: {
            type: Number,
            default: 0
        }
    },
    setup(props) {
        const visible = ref<boolean>(false)
        let timer = null
        function startTimer() {
            if (props.duration) {
                timer = setTimeout(() => {
                    close()
                }, props.duration)
            }
        }
        function stopTimer() {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
        }
        function reTimer() {
            stopTimer()
            startTimer()
        }

        function close() {
            visible.value = false
        }
        const customStyle = computed(() => {
            return {
                top: `${props.offset}px`
            }
        })
        onMounted(() => {
            visible.value = true
            startTimer()
        })

        function hoverEnter() {
            stopTimer()
        }
        function hoverLeave() {
            reTimer()
        }
        return {
            hoverEnter,
            hoverLeave,
            close,
            customStyle,
            visible
        }
    }
})
</script>