import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'
import mkcert from 'vite-plugin-mkcert'
import type { ProjectManifest } from '@pnpm/types'

import './vite.init'

import Resolver from "../resolver"

const cwdDir = process.cwd()

export const getPackageManifest = (pkgPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as ProjectManifest
}

export const getPackageDependencies = (
  pkgPath: string
): Record<'dependencies' | 'peerDependencies', string[]> => {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  let { dependencies } = getPackageDependencies(path.resolve(cwdDir, "package.json"))
  dependencies = dependencies.filter((dep) => !dep.startsWith('@types/')) // exclude dts deps
  const optimizeDeps = []
  // (
  //   await glob(['dayjs/(locale|plugin)/*.js'], {
  //     cwd: path.resolve(cwdDir, 'node_modules'),
  //   })
  // ).map((dep) => dep.replace(/\.js$/, ''))

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
    server: {
      host: true,
      https: !!env.HTTPS,
    },
    plugins: [
      vue(),
      vueJsx(),
      // VueMacros({
      //   setupComponent: false,
      //   setupSFC: false,
      //   plugins: {
      //     vue: vue(),
      //     vueJsx: vueJsx(),
      //   },
      // }),
      Components({
        include: [`${__dirname}/**`, path.resolve(cwdDir, "../packages/**")],
        resolvers:[Resolver({ importStyle: 'sass' }), AntDesignVueResolver()], // , AntDesignVueResolver()
        dts: false,
      }),
      mkcert(),
      Inspect(),
    ],
    optimizeDeps: {
      include: ['vue', ...dependencies, ...optimizeDeps],
    },
    esbuild: {
      target: 'chrome64',
    },
  }
})