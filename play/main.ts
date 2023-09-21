import "./style.scss"
import { createApp } from 'vue'

// import '@law-ui/theme-chalk/src/dark/css-vars.scss'
// import 'ant-design-vue/dist/antd.css'
// import antd from "ant-design-vue"

;(async () => {
  const apps = import.meta.glob('./src/*.vue')
  const name = location.pathname.replace(/^\//, '') || 'App'
  const file = apps[`./src/${name}.vue`]
  if (!file) {
    location.pathname = 'App'
    return
  }

  const App = (await file() as any).default
  const app = createApp(App)
//   app.use(antd)
  app.mount('#play')
})()