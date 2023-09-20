const noStylesComponents = ['ElAutoResizer']

export default (options): any => {
    let optionsResolved

    async function resolveOptions() {
        if (optionsResolved)
            return optionsResolved
        optionsResolved = {
            ssr: false,
            importStyle: 'css',
            directives: true,
            exclude: undefined,
            noStylesComponents: options.noStylesComponents || [],
            nightly: false,
            ...options,
        }
        return optionsResolved
    }
    return {
        type: 'component',
        resolve: async (name: string) => {
            const options = await resolveOptions()

            if ([...options.noStylesComponents, ...noStylesComponents].includes(name))
                return resolveComponent(name, { ...options, importStyle: false })
            else return resolveComponent(name, options)
        },
    }
}

export function kebabCase(key: string) {
    const result = key.replace(/([A-Z])/g, ' $1').trim()
    return result.split(' ').join('-').toLowerCase()
}

function resolveComponent(name: string, options): any {
    if (options.exclude && name.match(options.exclude))
        return

    if (!name.match(/^El[A-Z]/))
        return

    if (name.match(/^ElIcon.+/)) {
        return {
            name: name.replace(/^ElIcon/, ''),
            from: '@law-ui/icons-vue',
        }
    }

    const partialName = kebabCase(name.slice(2))// ElTableColumn -> table-column
    const { version, ssr, nightly } = options
    return {
        name,
        from: `${'law-ui'}/${ssr ? 'lib' : 'es'}`,
        sideEffects: getSideEffects(partialName, options),
    }
}

function getSideEffects(dirName: string, options): any | undefined {
    const { importStyle, ssr, nightly } = options
    const themeFolder = 'law-ui/theme-chalk'
    const esComponentsFolder = 'law-ui/es/components'
    if (importStyle === 'sass') {
        return ssr
            ? [`${themeFolder}/src/base.scss`, `${themeFolder}/src/${dirName}.scss`]
            : [`${esComponentsFolder}/base/style/index`, `${esComponentsFolder}/${dirName}/style/index`]
    }
    else if (importStyle === true || importStyle === 'css') {
        return ssr
            ? [`${themeFolder}/base.css`, `${themeFolder}/el-${dirName}.css`]
            : [`${esComponentsFolder}/base/style/css`, `${esComponentsFolder}/${dirName}/style/css`]
    }
}