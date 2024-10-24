import "./style.scss"
import { createApp, h, Fragment } from 'vue'
import Layout from './layout.vue'

// import '@law-ui/theme-chalk/src/dark/css-vars.scss'
// import 'ant-design-vue/dist/antd.css'
// import antd from "ant-design-vue"
import {Modal} from "ant-design-vue"
import 'ant-design-vue/lib/modal/style/index.css'

// useEneModal_ChangeComponentInModal, defineDefaultComponentInModal, 
import { ModalContainer } from 'law-ui';

// useEneModal_ChangeComponentInModal(defineDefaultComponentInModal)

;(async () => {
  const apps = import.meta.glob('./src/**/*.vue')
  const name = location.pathname.replace(/^\//, '') || 'App'
  const file = apps[`./src/${name}.vue`]
  if (!file) {
    location.pathname = 'App'
    return
  }

  const App = (await file() as any).default
  const app = createApp(()=>h(Fragment, {}, [h(Layout, null, ()=>[h(App)]),h(ModalContainer)]))
  // app.use(antd)
  app.use(Modal)
  app.mount('#play')
})()