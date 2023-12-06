import { defineRootConfig } from 'somebuild'
import { EBuildType } from '@somebuild/build-components-vue3'

export default defineRootConfig({
    mode: 'components-vue3',
    'components-vue3': {
        outDir: './dist/law-ui',
        name: 'law-ui',
        prefix: "law",
        pkgRoot: "packages",
        themeRoot: "theme-chalk",
        'build-type': EBuildType.ElementPlus,
        publishPkgJson: "./packages/law-ui/package.json",
        config: {}
    },
})
