import { createVNode, getCurrentInstance, render } from 'vue'
import {isVNode} from "@law-ui/utils";
import MessageConstructor from "./Message.vue"

const instances:any = []
let seed = 1

const Message = function(
    opts: any,
):any {
    if (typeof opts === 'string') {
        opts = {
            message: opts,
        }
    }
    let options = opts
    const userOnClose = options.onClose
    const id = 'message_' + seed++

    let verticalOffset = opts.offset || 20
    // @ts-ignore
    instances.forEach(({ vm }) => {
        verticalOffset += (vm.el.offsetHeight || 0) + 16
    })
    verticalOffset += 16

    options = {
        ...options,
        offset: verticalOffset,
        id
    }

    const container = document.createElement('div')
    container.className = `container_${id}`

    const message = options.message
    if(isVNode(message)){
        delete options.message
    }
    
    const vm = createVNode(
        MessageConstructor,
        options,
        isVNode(message) ? { default: () => message } : null,
    )
    
    // @ts-ignore
    vm.props.onClose = () => {
        close(id, userOnClose)
    }
    // @ts-ignore
    vm.props.onDestroy = () => {
        render(null, container)
    }
    render(vm, container)
    instances.push({ vm })
    document.body.appendChild(container.firstElementChild as Element)

    return {
        // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
        // for out component, so that all closing steps will not be skipped.
        // @ts-ignore
        close: () => (vm.component.proxy).visible = false,
    }
}as any

function close(id: string, userOnClose?: any){
    // @ts-ignore
    const idx = instances.findIndex(({ vm }) => {
        const { id: _id } = vm.component.props
        return id === _id
    })
    if (idx === -1) {
        return
    }
    const { vm } = instances[idx]
    if (!vm) return
    userOnClose?.(vm)

    const removedHeight = vm.el.offsetHeight
    instances.splice(idx, 1)

    // 调整其他实力的高度偏移
    const len = instances.length
    if (len < 1) return
    for (let i = idx; i < len; i++) {
        const pos =
            parseInt(instances[i].vm.el.style['top'], 10) - removedHeight - 16

        instances[i].vm.component.props.offset = pos
    }
}

export function closeAll(): void {
    for (let i = instances.length - 1; i >= 0; i--) {
        const instance = instances[i].vm.component as any
        instance.ctx.close()
    }
}

export default Message
