import { defineRootConfig } from 'somebuild'
import { EBuildType } from '@somebuild/build-components-vue3'

export default defineRootConfig({
    mode: 'components-vue3',
    'components-vue3': {
        // dtsIgnore: ["**/law-ui/resolver.*"],
        outDir: './dist/law-ui',
        name: 'law-ui',
        prefix: "law",
        pkgRoot: "packages",
        themeRoot: "theme-chalk",
        'build-type': EBuildType.ElementPlus,
        // @ts-ignore
        includePublishPkgGlob: ["**/style/*.{js,ts}", "law-ui/resolver.ts"],
        publishPkg: "./packages/law-ui",
        publishPkgEntry: "index.ts",
        config: {}
    },
})
