import { computed, getCurrentInstance, inject, isRef, ref, unref } from 'vue'

import type { InjectionKey, MaybeRef, Ref } from 'vue'

export const defaultNamespace = 'law'
const statePrefix = 'is-'

const _bem = (
    namespace: string,
    block: string,
    blockSuffix: string,
    element: string,
    modifier: string
) => {
    let cls = `${namespace}-${block}`
    if (blockSuffix) {
        cls += `-${blockSuffix}`
    }
    if (element) {
        cls += `__${element}`
    }
    if (modifier) {
        cls += `--${modifier}`
    }
    return cls
}

export const namespaceContextKey: InjectionKey<Ref<string | undefined>> =
    Symbol('namespaceContextKey')

/**
 * 获取上下文的命名空间
 * @param namespaceOverrides 覆盖命令空间
 * @returns 覆盖后的命令空间
 */
export const useGetDerivedNamespace = (
    namespaceOverrides?: Ref<string | undefined>
) => {
    const derivedNamespace =
        namespaceOverrides ||
        (getCurrentInstance()
            ? inject(namespaceContextKey, ref(defaultNamespace))
            : ref(defaultNamespace))
    const namespace = computed(() => {
        return unref(derivedNamespace) || defaultNamespace
    })
    return namespace
}

export const useNamespace = (
    block: MaybeRef<string>,
    namespaceOverrides?: Ref<string | undefined>
) => {
    const namespace = useGetDerivedNamespace(namespaceOverrides)
    const getBlock = () => isRef(block) ? block.value : block
    const b = (blockSuffix = '') =>
        _bem(namespace.value, getBlock(), blockSuffix, '', '') // law-button-test
    const e = (element?: string) =>
        element ? _bem(namespace.value, getBlock(), '', element, '') : '' // law-button__test
    const m = (modifier?: string) =>
        modifier ? _bem(namespace.value, getBlock(), '', '', modifier) : '' // law-button--test
    const be = (blockSuffix?: string, element?: string) =>
        blockSuffix && element
            ? _bem(namespace.value, getBlock(), blockSuffix, element, '') // law-button-test__test
            : ''
    const em = (element?: string, modifier?: string) =>
        element && modifier
            ? _bem(namespace.value, getBlock(), '', element, modifier) // law-button__test--test
            : ''
    const bm = (blockSuffix?: string, modifier?: string) =>
        blockSuffix && modifier
            ? _bem(namespace.value, getBlock(), blockSuffix, '', modifier) // law-button-test--test
            : ''
    const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
        blockSuffix && element && modifier
            ? _bem(namespace.value, getBlock(), blockSuffix, element, modifier) // law-button-test__test--test
            : ''
    const is: {
        (name: string, state: boolean | undefined): string
        (name: string): string
    } = (name: string, ...args: [boolean | undefined] | []) => {
        const state = args.length >= 1 ? args[0]! : true
        return name && state ? `${statePrefix}${name}` : '' // is-test 
    }

    // for css var
    // --law-xxx: value;
    const cssVar = (object: Record<string, string>) => {
        const styles: Record<string, string> = {}
        for (const key in object) {
            if (object[key]) {
                styles[`--${namespace.value}-${key}`] = object[key] // --law-test: test
            }
        }
        return styles
    }
    // with block
    const cssVarBlock = (object: Record<string, string>) => {
        const styles: Record<string, string> = {}
        for (const key in object) {
            if (object[key]) {
                styles[`--${namespace.value}-${getBlock()}-${key}`] = object[key] // --law-button-test: test
            }
        }
        return styles
    }

    const cssVarName = (name: string) => `--${namespace.value}-${name}` // --law-test
    const cssVarBlockName = (name: string) =>
        `--${namespace.value}-${getBlock()}-${name}`  // --law-button-test

    return {
        namespace,
        // law-button-test
        b,
        e,
        m,
        be,
        em,
        bm,
        bem,
        is,
        // css
        cssVar,
        cssVarName,
        cssVarBlock,
        cssVarBlockName,
    }
}

export type UseNamespaceReturn = ReturnType<typeof useNamespace>