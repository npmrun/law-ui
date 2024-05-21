import { fileURLToPath } from 'url'
import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import { generateSidebar, Options as SidebarOptions } from './plugins/sidebar';
import { defu } from "defu";

// https://vitepress-sidebar.jooy2.com/multiple-sidebars-how-to

function mergeOptons(object: Partial<SidebarOptions>) {
    return defu({
        dirTitleMap: {
            "1.components": "组件",
            "0.start": "起始",
        },
        hyphenToSpace: true,
        debugPrint: true,
        collapsed: false,
        capitalizeFirst: true,
        removeEmptyFolder: true,
        includeEmptyFolder: true, // 配合 convertSameNameSubFileToGroupIndexPage true
        excludeFolders: ["public", "scripts"],
        // useFolderTitleFromIndexFile: true,
        // useFolderLinkFromIndexFile: true,
        removePrefixAfterOrdering: true,
        prefixSeparator : ".",
        convertSameNameSubFileToGroupIndexPage: true,
        // folderLinkNotIncludesFileName: true,
        includeFolderIndexFile: true,
        // includeRootIndexFile: true,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        frontmatterOrderDefaultValue: 9, // For 'CHANGELOG.md'
        sortMenusByFrontmatterOrder: true,
    } as Partial<SidebarOptions>, object)
}

const vitepressSidebarOptions: SidebarOptions[] = [
    mergeOptons({
        documentRootPath: "/",
        scanStartPath: "/",
        resolvePath: '',
        flattenBase: true,
        excludeFolders: ["0.start", "1.components", "2.hooks"]
    }),
    mergeOptons({
        documentRootPath: "/",
        scanStartPath: "1.components",
        resolvePath: '/1.components/',
        flattenBase: true,
        rootGroupText: "组件",
        callback(sidebar) {
            sidebar.unshift({
                text: "返回",
                link: "/home",
            })
            return sidebar
        }
    }),
    mergeOptons({
        documentRootPath: "/",
        scanStartPath: "0.start",
        resolvePath: '/0.start/',
        flattenBase: true,
        rootGroupText: "起始",
        callback(sidebar) {
            sidebar.unshift({
                text: "返回",
                link: "/home",
            })
            return sidebar
        }
    }),
    mergeOptons({
        documentRootPath: "/",
        scanStartPath: "2.hooks",
        resolvePath: '/2.hooks/',
        flattenBase: true,
        rootGroupText: "hooks",
        callback(sidebar) {
            sidebar.unshift({
                text: "返回",
                link: "/home",
            })
            return sidebar
        }
    })
]
// const vitepressSidebarOptions: SidebarOptions = mergeOptons({
//     documentRootPath: "/",
//     dirTitleMap: {
//         "1.components": "组件",
//         "0.start": "起始",
//     },
// })

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'LAW-UI',
    head: [
        ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]
    ],
    description: '基于ant-design-vue，构建符合业务的组件',
    lastUpdated: true,
    lang: "zh",
    markdown: {
        theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
        },
        config(md) {
            md.use(containerPreview as any)
            md.use(componentPreview as any)

            md.renderer.rules.table_open = (): string => '<div class="vp-table__container"><table>'
            md.renderer.rules.table_close = (): string => '</table></div>'
        }
    },
    // base: "/somebuild",
    themeConfig: {
        logo: { src: '/favicon.png', width: 24, height: 24 },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '开始', link: '/0.start/0.nav' },
        ],
        sidebar: generateSidebar(vitepressSidebarOptions),
        // [
        //     {
        //         text: '开始',
        //         items: [{ text: '介绍', link: '/start/' }],
        //     },
        //     {
        //         text: 'AntDeisgnVue增强组件',
        //         items: [
        //             { text: '导览', link: '/components/' },
        //             { text: 'ButtonPlus', link: '/components/button-plus' },
        //         ],
        //     },
        //     {
        //         text: 'Hook',
        //         items: [
        //             { text: '导览', link: '/hooks/' },
        //             { text: 'useModal', link: '/hooks/useModal/' },
        //         ],
        //     }
        // ],

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
