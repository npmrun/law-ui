import Theme from 'vitepress/theme'
import { h } from 'vue'
import antd, { ConfigProvider } from "ant-design-vue"

import 'ant-design-vue/dist/antd.dark.min.css';
import './antdv-dark.css'

import "./style/vitepress.scss"

export default {
    // ...Theme,
    Layout() {
        return h(ConfigProvider, null, () => [h(Theme.Layout)])
    },
    async enhanceApp({ app }) {
        app.use(antd)
    },
}
