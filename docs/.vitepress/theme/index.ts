import Theme from 'vitepress/theme'
import { h } from 'vue'
import "./style/vitepress.scss"
import antd from "ant-design-vue"
import 'ant-design-vue/dist/antd.css'

export default {
    ...Theme,
    Layout() {
        return h(Theme.Layout, null, {})
    },
    enhanceApp({app}) {
        app.use(antd)
    },
}
