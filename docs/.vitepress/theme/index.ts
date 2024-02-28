import Theme from 'vitepress/theme'
import { h } from 'vue'
import antd, { ConfigProvider } from "ant-design-vue"

// import DemoContainer from "./components/DemoContainer.vue"

// import 'ant-design-vue/dist/antd.dark.min.css';
// import './antdv-dark.css'
import 'ant-design-vue/dist/antd.min.css';

import "./style/vitepress.scss"

export default {
    // ...Theme,
    Layout() {
        // return h(Theme.Layout)
        return h(ConfigProvider, null, () => [h(Theme.Layout)])
    },
    async enhanceApp({ app }) {
        // app.component('DemoContainer', DemoContainer);
        app.use(antd)
    },
}
