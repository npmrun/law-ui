## useModal

这是一个控制模块框的组件，默认使用 ant-design-vue 的 Modal 组件进行基层渲染，当然，也可以编写自己的基层对话框控制器。

其使用方法如下：

1. 如果没有 Modal 的话需要配置，同时配置默认渲染器

    ```ts
    import {Modal} from "ant-design-vue"
    import 'ant-design-vue/lib/modal/style/index.css'
    import { useEneModal_ChangeComponentInModal, defineDefaultComponentInModal } from 'law-ui';

    useEneModal_ChangeComponentInModal(defineDefaultComponentInModal)
    ...
    app.use(Modal)
    ...
    ```

2. 防止 ModalContainer 作为所有 Modal 的渲染位置，一般放在 App.vue 中
    ```vue
    <template>
        <div class="play-container">
            <RouteView><RouteView>
            <ModalContainer></ModalContainer>
        </div>
    </template>
    <script setup lang="ts">
    import { ModalContainer } from 'law-ui';
    </script>
    ```

3. 使用useEneModal
    ```
    import { useEneModal, useModalContext } from 'law-ui';
    ```