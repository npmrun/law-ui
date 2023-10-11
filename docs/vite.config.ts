import path, { resolve } from 'path'
import type { UserConfigExport } from 'vite'
import Components from 'unplugin-vue-components/vite'
import Resolver from "../packages/law-ui/resolver"
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'

const cwdDir = process.cwd()

export default (): UserConfigExport => {
    return {
        resolve: {
            alias: [
                {
                    find: /^law-ui(\/(es|lib))?$/,
                    replacement: path.resolve(cwdDir, '../packages/law-ui/index.ts'),
                },
                {
                    find: /^law-ui\/(es|lib)\/(.*)$/,
                    replacement: `${path.resolve(cwdDir, "../packages")}/$2`,
                },
            ],
        },
        optimizeDeps: {
            // include: ['law-ui/resolver'],
            exclude: ['vitepress'],
        },
        /**
         * 定义全局常量替换方式
         *
         * @see define https://cn.vitejs.dev/config/shared-options.html#define
         */
        define: {},
        server: {
            port: 9999,
        },
        // resolve: {
        //     alias: [
        //         {
        //             find: /^comps-demo(\/(es|lib))?$/,
        //             replacement: path.resolve(__dirname, '../src/index.ts'),
        //         },
        //         {
        //             find: /^comps-demo\/(es|lib)\/(.*)$/,
        //             replacement: `${path.resolve(__dirname, "../src")}/$2`,
        //         },
        //     ]
        // },
        css: {
            postcss: {
                plugins: [
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: (atRule): void => {
                                if (atRule.name === 'charset') {
                                    atRule.remove()
                                }
                            },
                        },
                    },
                ],
            },
        },
        plugins: [
            vueJsx(),
            // , path.resolve(__dirname, "node_modules/law-ui/**")
            Components({
                // inclu/de: [`${__dirname}/**`, path.resolve(__dirname, "node_modules/law-ui/**"), path.resolve(__dirname, ".vitepress/cache/deps/law-ui*/**")],
                include: [`${__dirname}/**`],
                extensions: ['vue', "md", "js", "mjs"],
                resolvers: [Resolver({ importStyle: 'sass' }) as any, AntDesignVueResolver(), {}],
                // resolvers: [AntDesignVueResolver()],
                dts: false,
            }),
        ]
    }
}
