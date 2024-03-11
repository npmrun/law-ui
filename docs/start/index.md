
# 介绍

## 前置条件

满足其一即可

-   全量引入`ant-design-vue`

-   提前引入需要的`ant-design-vue`中的组件，这个本 UI 会提供需要哪些组件 **(待添加)**


这主要是因为内部是通过 `reasolveComponent` 获取组件的，而 `unplugin-vue-components` 并不支持解析 `reasolveComponent` 中的组件。

```js
import {Modal} from "ant-design-vue"
import 'ant-design-vue/lib/modal/style/index.css'
```