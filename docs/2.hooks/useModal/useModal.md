# useModal

<a-button type="dashed" danger>该组件尚未稳定，请谨慎使用</a-button>

## 基本使用

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

3. 使用 useEneModal

    ```ts
    import { useEneModal, useModalContext } from "law-ui";

    const modal = useEneModal({
        focusFirstInput: true,
        renderUI: defineComponent({
            setup() {
                const [state, action] = useModalContext();

                return () =>
                    h(
                        "div",
                        {
                            onClick() {
                                setTimeout(() => {
                                    action.hide("完成");
                                }, 2000);
                            },
                        },
                        "内容，内容"
                    );
            },
        }),
    });
    ```

<preview path="./useModal.vue" title="基本使用"></preview>

## 自定义Modal控制器

## Button Attributes

| 参数            | 说明                                                                                                                                                                                                          | 类型                                                                   | 可选值                                                  | 默认值   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------- | -------- |
| `bold`          | 按钮文字是否加粗                                                                                                                                                                                              | boolean                                                                | ——                                                      | false    |
| `circle`        | 是否为圆形按钮                                                                                                                                                                                                | boolean                                                                | ——                                                      | false    |
| `round`         | 是否为圆角按钮                                                                                                                                                                                                | boolean                                                                | ——                                                      | false    |
| `font-size`     | 文字字体大小                                                                                                                                                                                                  | string / number                                                        | ——                                                      | ——       |
| `font-color`    | 文字字体颜色                                                                                                                                                                                                  | string                                                                 | ——                                                      | ——       |
| `size`          | 按钮尺寸                                                                                                                                                                                                      | <a href="/components/interface.html#fightingsize">FightingSize</a>     | `large` `middle` `small` `mini`                         | middle   |
| `block`         | 是否为块级元素                                                                                                                                                                                                | boolean                                                                | ——                                                      | false    |
| `href`          | 链接按钮的地址                                                                                                                                                                                                | string                                                                 | ——                                                      | ——       |
| `target`        | 原生 [target](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a#attr-href) 属性，在 `link="true"` 时生效                                                                                            | <a href="/components/interface.html#fightingtarget">FightingTarget</a> | `_blank` `_self` `_parent` `_top`                       | \_self   |
| `loading`       | 是否展示 loading 状态                                                                                                                                                                                         | boolean                                                                | ——                                                      | false    |
| `disabled`      | 是否禁用按钮                                                                                                                                                                                                  | boolean                                                                | ——                                                      | false    |
| `before-icon`   | 之前的 icon                                                                                                                                                                                                   | <a href="/components/interface.html#fightingicon">FightingIcon</a>     | ——                                                      | ——       |
| `after-icon`    | 之后的 icon                                                                                                                                                                                                   | <a href="/components/interface.html#fightingicon">FightingIcon</a>     | ——                                                      | ——       |
| `loading-icon`  | loading 状态下的 icon                                                                                                                                                                                         | <a href="/components/interface.html#fightingicon">FightingIcon</a>     | ——                                                      | ——       |
| `type`          | 按钮的类型 （不同类型对应不同的背景和字体颜色，非自定义按钮颜色时有效）                                                                                                                                       | <a href="/components/interface.html#fightingtype">FightingType</a>     | `default` `primary` `success` `danger` `warning` `info` | ——       |
| `autofocus`     | 是否自动获取焦点                                                                                                                                                                                              | boolean                                                                | ——                                                      | false    |
| `spread`        | 是否带有点击扩散效果                                                                                                                                                                                          | boolean                                                                | ——                                                      | false    |
| `name`          | 按钮的名字                                                                                                                                                                                                    | string                                                                 | ——                                                      | f-button |
| `shadow`        | 按钮的阴影                                                                                                                                                                                                    | string                                                                 | ——                                                      | ——       |
| `text`          | 是否为文字按钮 （非自定义按钮颜色时有效）                                                                                                                                                                     | boolean                                                                | ——                                                      | false    |
| `simple`        | 是否为简约按钮 （非自定义按钮颜色时有效）                                                                                                                                                                     | boolean                                                                | ——                                                      | false    |
| `ripples`       | 是否启用点击涟漪效果                                                                                                                                                                                          | boolean                                                                | ——                                                      | false    |
| `ripples-color` | 涟漪背景色                                                                                                                                                                                                    | string                                                                 | ——                                                      | ——       |
| `native-type`   | 按钮的原生类型                                                                                                                                                                                                | <a href="#buttonnative">ButtonNative</a>                               | `button` `submit` `reset`                               | button   |
| `color`         | 自定义按钮的背景颜色，仅支持 [hex](https://baike.baidu.com/item/%E5%8D%81%E5%85%AD%E8%BF%9B%E5%88%B6%E9%A2%9C%E8%89%B2%E7%A0%81/10894232?fr=aladdin) 格式的色号。如果未指定`font-color`，则字体颜色默认为白色 | string                                                                 | ——                                                      | ——       |
| `on-click`      | 点击执行的回调                                                                                                                                                                                                | <a href="/components/interface.html#handlemouse">HandleMouse</a>       | ——                                                      | ——       |

## ButtonGroup Attributes

| 参数        | 说明     | 类型                                                               | 可选值                          | 默认值     |
| ----------- | -------- | ------------------------------------------------------------------ | ------------------------------- | ---------- |
| `size`      | 按钮尺寸 | <a href="/components/interface.html#fightingsize">FightingSize</a> | `large` `middle` `small` `mini` | middle     |
| `direction` | 排列方式 | <a href="#buttongroupdirection">ButtonGroupDirection</a>           | `horizontal` `vertical`         | horizontal |

## Button Slots

| 名称      | 说明           |
| --------- | -------------- |
| `default` | 默认按钮的内容 |

## ButtonGroup Slots

| 名称      | 说明             |
| --------- | ---------------- |
| `default` | 默认按钮组的内容 |
