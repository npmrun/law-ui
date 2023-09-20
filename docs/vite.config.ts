import path, { resolve } from 'path'
import type { UserConfigExport } from 'vite'
import Components from 'unplugin-vue-components/vite'
import Resolver from "law-ui/resolver"

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
            Components({
                include: `${__dirname}/**`,
                resolvers: Resolver({ importStyle: 'sass' }) as any,
                dts: false,
            }),
        ]
    }
}
