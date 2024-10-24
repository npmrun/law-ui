<script setup lang="ts">
import { useNamespace } from "law-ui";
import { computed, ref, isReactive, isRef } from "vue";

const apps = import.meta.glob('./src/**/*.vue')

const value = ref("law");
const value2 = ref("flip-card");
const suffixValue = ref("suffix");
const nameValue = ref("name");
const elementValue = ref("element");
const modifierValue = ref("modifier");
const { namespace, b, is, e, m, be, em, bm, bem, cssVar, cssVarName, cssVarBlock, cssVarBlockName } = useNamespace(value2, value);

const list = [
	{ label: computed(()=>`"${namespace.value}"`), get value() { return computed(() => eval(this.label.value)) } },
	{ label: computed(()=>`b("${suffixValue.value}")`), get value() { return computed(() => eval(this.label.value)) } },
	{ label: computed(()=>`is("${nameValue.value}")`), get value() { return computed(() => eval(this.label.value)) } },
	{ label: computed(()=>`e("${elementValue.value}")`), get value() { return computed(() => eval(this.label.value)) } },
	{ label: computed(()=>`m("${modifierValue.value}")`), get value() { return computed(() => eval(this.label.value)) } },
	{ label: computed(()=>`b("${suffixValue.value}")`), get value() { return computed(() => eval(this.label.value)) } },
	{ label: computed(()=>`be("${suffixValue.value}", "${elementValue.value}")`), get value() { return computed(() => eval(this.label.value)) } },
	{ label: computed(()=>`em("${elementValue.value}", "${modifierValue.value}")`), get value() { return computed(() => eval(this.label.value)) } },
	{ label: computed(()=>`bm("${suffixValue.value}", "${modifierValue.value}")`), get value() { return computed(() => eval(this.label.value)) } },
	{ label: computed(()=>`bem("${suffixValue.value}", "${elementValue.value}", "${modifierValue.value}")`), get value() { return computed(() => eval(this.label.value)) } },
	{ label: computed(()=>`cssVar({"a": "b"})`), get value() { return computed(() => eval(this.label.value)) } },
	{ label: computed(()=>`cssVarName("${elementValue.value}")`), get value() { return computed(() => eval(this.label.value)) } },
	{ label: computed(()=>`cssVarBlock({"a": "b"})`), get value() { return computed(() => eval(this.label.value)) } },
	{ label: computed(()=>`cssVarBlockName("${elementValue.value}")`), get value() { return computed(() => eval(this.label.value)) } },
];
</script>

<template>
	<div class="layout">
		<div style="border: 1px solid #f2f2f2; padding: 20px;overflow-y: auto;max-width: 550px">
			<div style="display: flex;flex-wrap: wrap;column-gap:20px;">
				<template v-for="(item, key) in apps">
					<a  :href="key.replace(/^\.\/src/, '').replace(/\.vue$/, '')">{{ key }}</a>
				</template>
			</div>
			<h2>bem规则</h2>
			<p><a target="_blank" href="https://juejin.cn/post/6844903672162304013#heading-1">BEM 命名规范</a></p>
			<div>
				<input v-model="value" type="text">
				<input v-model="value2" type="text">
				<input v-model="suffixValue" type="text"> <br>
				<div>name:<input v-model="nameValue" type="text"></div>
				<div>element：<input v-model="elementValue" type="text"></div>
				<div>modifier: <input v-model="modifierValue" type="text"></div>
			</div>
			<table class="gridtable">
				<tr>
					<th>函数</th>
					<th>转换结果</th>
				</tr>
				<tr v-for="item in list">
					<td>{{ isRef(item.label) ? item.label.value: item.label  }}</td>
					<td>{{ isRef(item.value) ? item.value.value: item.value }}</td>
				</tr>
			</table>
		</div>
		<slot></slot>
	</div>
</template>

<style lang="scss" scoped></style>
