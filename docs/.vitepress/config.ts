import { fileURLToPath } from 'url'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'LAW-UI',
    head: [
        ['link', { rel: 'icon', type: 'image/png', href: '/ii.png' }]
    ],
    description: '基于ant-design-vue，构建符合业务的组件',
    lastUpdated: true,
    lang: "zh",
    markdown: {
        theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
        }
    },
    // base: "/somebuild",
    themeConfig: {
        logo: { src: '/favicon.png', width: 24, height: 24 },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '开始', link: '/start/' },
        ],
        sidebar: [
            {
                text: '开始',
                items: [{ text: '介绍', link: '/start/' }],
            },
            {
                text: 'AntDeisgnVue增强组件',
                items: [
                    { text: '导览', link: '/components/' },
                    { text: 'ButtonPlus', link: '/components/button-plus' }
                ],
            },
            {
                text: 'Hook',
                items: [
                    { text: '导览', link: '/hooks/' },
                    { text: 'useModal', link: '/hooks/useModal' },
                ],
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
        ],
    },
    vite: {
        resolve: {
            alias: [
                {
                    find: /^.*\/VPSwitchAppearance\.vue$/,
                    replacement: fileURLToPath(
                        new URL('./theme/components/vp-theme-apperence.vue', import.meta.url)
                    )
                }
            ]
        }
    },
})
