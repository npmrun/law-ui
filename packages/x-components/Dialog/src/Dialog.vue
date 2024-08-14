<template>
	<teleport :to="to" :disabled="computedDisabled">
		<transition :name="maskAnimComputed">
			<Mask
				is-render
				:inBox="inBox"
				:can-close="maskCanClose"
				v-model:show="isShow"
			></Mask>
		</transition>
		<div
			class="dialog__wrapper"
			v-bind="attrs"
			:class="[
				noCenterYMargin ? '' : 'my',
				mode ? mode : 'center',
				inBox ? 'inbox' : '',
				isPlaying ? 'playing' : '',
			]"
			v-show="isShowWraper"
			@click.stop="clickWrapper"
		>
			<slot name="placeholder"></slot>
			<transition :name="dialogAnimComputed" @after-enter="onResetPlaying()"
			@enter-cancelled="onResetPlaying()" @after-leave="[onResetPlaying(), close()]"
			@leave-cancelled="onResetPlaying()">
				<div
					class="dialog__content"
					:style="style"
					v-show="isShow"
					@click="clickContent($event)"
				>
					<slot v-if="showContent"></slot>
				</div>
			</transition>
		</div>
	</teleport>
</template>

<script lang="ts" setup>
import {
	onMounted,
	watch,
	ref,
	nextTick,
	provide,
	inject,
	computed,
	useAttrs,
} from "vue";
import Mask from "@law-ui/x-components/Mask";
import { DialogToken } from "./Token";

defineOptions({
	inheritAttrs: false,
});

const showContent = ref(true);

const attrs = useAttrs();

function setStyle(el: HTMLElement, css: Partial<CSSStyleDeclaration>) {
	for (const key in css) {
		if (Object.prototype.hasOwnProperty.call(css, key)) {
			const prop = css[key];
			el.style[key] = prop as string;
		}
	}
}

// https://github.com/microsoft/TypeScript/issues/42873

const props = withDefaults(
	defineProps<{
		to?: string;
		disabled?: boolean;
		show?: boolean;
		style?: Record<string, string> | string;
		inBox?: boolean;
		noCenterYMargin?: boolean;
		maskCanClose?: boolean;
		stopPropagation?: boolean;
		destoryOnClose?: boolean;
		animation?: boolean | string;
		maskAnimation?: string;
		mode?: "bottom" | "top";
	}>(),
	{
		to: "body",
		disabled: false,
		stopPropagation: true,
		maskCanClose: true,
		noCenterYMargin: false,
		destoryOnClose: false,
		show: false,
		animation: true,
		maskAnimation: "mask-fade",
		inBox: false, // 对话框不全屏
	}
);
const emits = defineEmits<{
	(e: "update:show", isShow: boolean): void;
	(e: "close"): void;
}>();

function clickWrapper() {
	if (props.maskCanClose) {
		isShow.value = false;
	}
}

function clickContent(e: Event) {
	if (props.stopPropagation) {
		e.stopPropagation();
	}
}

const isInDialog = inject(DialogToken, false);

const computedDisabled = computed(() => {
	return isInDialog ? true : props.disabled;
});
if (!isInDialog) {
	provide(DialogToken, true);
}

const maskAnimComputed = computed(() => {
	if (props.animation === false) {
		return;
	}
	return props.maskAnimation;
});

const dialogAnimComputed = computed(() => {
	if (typeof props.animation === "boolean") {
		return props.animation ? `dialog-${getDialogAnimType()}` : undefined;
	}
	return `dialog-${props.animation}`;
});

const getDialogAnimType = () => {
	if (props.mode) return props.mode;
	return "slide-fade";
};

onMounted(() => {
	watch(
		() => props.show,
		(isShow) => {
			if (isShow) {
				show();
			} else {
				hide();
			}
		},
		{
			immediate: true,
		}
	);
});

const isShow = ref(false);
const isShowWraper = ref(false);
const isPlaying = ref(false);

watch(
	isShow,
	(isShow, old) => {
		isPlaying.value = true
	}
);

function show() {
	showContent.value = true;
	isShowWraper.value = true;
	setStyle(document.body, {
		overflow: "hidden",
	});
	nextTick(() => {
		isShow.value = true;
	});
}

function hide() {
	isShow.value = false;
	setStyle(document.body, {
		overflow: "",
	});
}

function close() {
	isShowWraper.value = false;
	emits("update:show", false);
	emits("close");
	if (props.destoryOnClose) {
		showContent.value = false;
	}
}

function onResetPlaying(){
	isPlaying.value = false
}
</script>
