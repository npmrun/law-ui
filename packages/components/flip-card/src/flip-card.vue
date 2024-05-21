<template>
	<div :class="[b(), isReverse ? is('reverse') : '']">
		<div
			:class="[e('flip'), em('flip', 'front')]"
			@click="isReverse = !isReverse"
		>
			<slot></slot>
		</div>
		<div
			:class="[e('flip'), em('flip', 'back')]"
			@click="isReverse = !isReverse"
		>
			<slot name="back"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNamespace } from "@law-ui/utils";
import { ref } from "vue";

defineOptions({
	name: "LawFilpCard",
});

const { b, is, e, em } = useNamespace("flip-card");

const isReverse = ref(false);
</script>
