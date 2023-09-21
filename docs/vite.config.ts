import path, { resolve } from 'path'
import type { UserConfigExport } from 'vite'
import Components from 'unplugin-vue-components/vite'
import Resolver from "law-ui/resolver"
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default (): UserConfigExport => {
    return {
        optimizeDeps: {
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
            // , path.resolve(__dirname, "node_modules/law-ui/**")
            Components({
                include: [`${__dirname}/**`, path.resolve(__dirname, "node_modules/law-ui/**"), path.resolve(__dirname, ".vitepress/cache/deps/law-ui*/**")],
                extensions: ['vue',"md","js","mjs"],
                resolvers: [Resolver({ importStyle: 'sass' }) as any, AntDesignVueResolver(), {}],
                dts: false,
            }),
        ]
    }
}
