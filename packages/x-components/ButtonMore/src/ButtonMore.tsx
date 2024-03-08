import { Ref, computed, defineComponent, inject, provide, ref } from 'vue'

export const ButtonMore = defineComponent({
    name: 'ButtonMore',
    props: ['text'],
    emits: ['menuClick'],
    setup(props, { slots, emit }) {
        const { text } = props
        const holder: any = {}
        const itemKey = ref(0)
        function handleClick({ item, key, keyPath }: any) {
            holder[key]?.({ item, key, keyPath })
            emit('menuClick', { item, key, keyPath })
        }
        function register(key: any, fn: Function) {
            // if(Reflect.has(holder, key)){
            //     console.warn(`itemKey: ${key} 重复，请检查`)
            // }
            key && (holder[key] = fn)
        }
        provide(token, { register, itemKey })

        const otherSlots = {
            ...slots,
            icon: undefined,
            button: undefined,
        }

        if (slots.default === undefined) {
            return () => (
                <a-button>
                    {{
                        default: slots?.button ? slots.button : () => text,
                    }}
                </a-button>
            )
        }
        return () => (
            <a-dropdown-button>
                {{
                    default: slots?.button ? slots.button : () => text,
                    icon: slots?.icon
                        ? slots.icon
                        : () => (
                            <span class="anticon anticon-down">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 1024 1024"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M831.872 340.864L512 652.672L192.128 340.864a30.592 30.592 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.592 30.592 0 0 0-42.752 0z"
                                    />
                                </svg>
                            </span>
                        ),
                    overlay: () => (
                        <a-menu onClick={handleClick}>{otherSlots}</a-menu>
                    ),
                }}
            </a-dropdown-button>
        )
    },
})

const token = Symbol('ButtonMore')

export const ButtonMoreItem = defineComponent({
    name: 'ButtonPlus-Item',
    props: ['itemKey', 'text', 'onClick'],
    setup(props, { slots }) {
        const { text, onClick } = props
        const { register, itemKey } = inject(token) as { register: Function, itemKey: Ref<number> }
        let cloneKey
        if (props.itemKey !== undefined) {
            cloneKey = props.itemKey
        } else {
            cloneKey = `$$key-` + (+itemKey.value)
        }
        if (onClick && register) {
            register(cloneKey, onClick)
            itemKey.value++
        }

        return () => (
            <a-menu-item key={cloneKey}>
                {{
                    default: slots?.default ? slots.default : () => text,
                }}
            </a-menu-item>
        )
    },
})

