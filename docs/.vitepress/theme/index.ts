import Theme from "vitepress/theme";
import { App, h, onMounted } from "vue";
import { ConfigProvider } from "ant-design-vue";

import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

import {
    useEneModal_ChangeComponentInModal,
    defineDefaultComponentInModal,
    ModalContainer
} from "law-ui";

import { Modal, Button, Dropdown, Menu, MenuItem } from "ant-design-vue";
import "ant-design-vue/es/modal/style/css";
import "ant-design-vue/es/button/style/css";
import "ant-design-vue/es/dropdown/style/css";
import "ant-design-vue/es/menu/style/css";
import "ant-design-vue/es/message/style/css";
import "ant-design-vue/es/space/style/css";
import "ant-design-vue/es/input/style/css";

import "./style/vitepress.scss";

// import 'ant-design-vue/dist/antd.css';
// import 'ant-design-vue/dist/antd.dark.css';
// import './antdv-dark.css'

export default {
    ...Theme,
    Layout() {
        return h(ConfigProvider, null, () => [h(Theme.Layout), h(ModalContainer)]);
    },
    async enhanceApp({ app }: { app: App }) {
        app.component('demo-preview', AntDesignContainer)

        app.use(Button);
        app.use(Modal);
        app.use(Dropdown);
        app.use(Menu);
        // app.use(antd)
        useEneModal_ChangeComponentInModal(defineDefaultComponentInModal);
        
        const styleEl = document.createElement("link")
        styleEl.rel = "stylesheet"
        styleEl.href = "./antd.min.css"
        const darkStyleEl = document.createElement("link")
        darkStyleEl.rel = "stylesheet"
        darkStyleEl.href = "/antd.dark.min.css"
        // @ts-ignore
        window.lightTheme = () => {
            darkStyleEl.remove()
            document.head.appendChild(styleEl)
        }
        // @ts-ignore
        window.darkTheme = () => {
            styleEl.remove()
            document.head.appendChild(darkStyleEl)
        }

        const isDark = document.documentElement.classList.contains('dark')
        if(isDark) {
            document.head.appendChild(darkStyleEl)
        } else {
            document.head.appendChild(styleEl)
        }
    },
};
