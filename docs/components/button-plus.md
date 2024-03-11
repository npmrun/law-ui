## 效果

<script setup>
    import { ButtonMore, ButtonMoreItem, useEneModal, useModalContext } from "law-ui";
    import { h, defineComponent, onMounted, onBeforeUnmount } from "vue";
    const aa = useEneModal({
        focusFirstInput: true,
        renderUI: defineComponent({
            setup() {
                const [state, action] = useModalContext()
            
                return () => h("div", {
                    onClick() {
                        setTimeout(()=>{
                            action.hide("完成")
                        }, 2000)
                    }
                }, "aaaa")
            }
        })
    })
    async function handleClick(ev) {
        console.log('click', ev);
        const res = await aa.show("大雪纷纷")
        console.log(res);
    }

    onBeforeUnmount(()=>{
        console.log("onBeforeUnmount")
    })
</script>

<ButtonMore text="ButtonPlus" type="primary" @click="handleClick">
    <ButtonMoreItem :itemKey="0" @click="console.log">阿萨大</ButtonMoreItem>
    <ButtonMoreItem :itemKey="1" @click="console.log">阿萨大 22</ButtonMoreItem>
</ButtonMore>
