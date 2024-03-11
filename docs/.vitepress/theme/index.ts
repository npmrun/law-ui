import Theme from "vitepress/theme";
// import { h } from "vue";
// import { ConfigProvider } from "ant-design-vue";

// import {
//     useEneModal_ChangeComponentInModal,
//     defineDefaultComponentInModal,
//     ModalContainer
// } from "law-ui";

// import 'ant-design-vue/dist/antd.dark.min.css';
// import './antdv-dark.css'

// import { Modal, Button, Dropdown, Menu, MenuItem } from "ant-design-vue";
// import "ant-design-vue/lib/modal/style/css";
// import "ant-design-vue/lib/button/style/css";
// import "ant-design-vue/lib/dropdown/style/css";
// import "ant-design-vue/lib/menu/style/css";

import "./style/vitepress.scss";

export default {
    ...Theme,
    // Layout() {
    //     return h(ConfigProvider, null, () => [h(Theme.Layout), h(ModalContainer)]);
    // },
    async enhanceApp({ app }) {
        // app.use(Button);
        // app.use(Modal);
        // app.use(Dropdown);
        // app.use(Menu);
        // app.use(antd)
        // useEneModal_ChangeComponentInModal(defineDefaultComponentInModal);
    },
};
