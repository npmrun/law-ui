import { ViteDevServer, Plugin, ResolvedConfig } from 'vite'
import path, { resolve } from 'path';
import { readFileSync } from 'fs';

let curConfig: ResolvedConfig

export default {
    name: "test",
    enforce: "pre",
    configResolved(config) {
        curConfig = config
        if (config.root) {
            if (config.build?.rollupOptions?.input) {
                const input = config.build.rollupOptions.input
                input['-demos/demos'] = path.resolve(config.root, "./-demos/demos.html")
                console.log(input);
                
            }
        }
        if (config.command == "serve") {

        } else if (config.command == "build") {
            // @ts-ignore
            config.plugins = config.plugins.map((plugin: Plugin) => {
                if (plugin.name !== "vite:build-html") return plugin;
                const originalTransform = plugin.transform as Plugin["transform"] as Function;
                const originalGenerateBundle =
                    plugin.generateBundle as Plugin["generateBundle"] as Function;
                plugin.transform = function (code: string, id: string) {
                    return originalTransform!.call(this, code, id);
                };
                plugin.generateBundle = async function (
                    options: any,
                    bundle: any,
                    isWrite: boolean
                ) {
                    // console.log(Object.keys(bundle));
                    console.log(bundle['-demos/demos.js']);
                    
                    // @ts-ignore
                    // config.root = clientDir
                    const result = await originalGenerateBundle!.call(this, options, bundle, isWrite);
                    // @ts-ignore
                    // config.root = cwdDir
                    return result
                };
                return plugin
            })
        }
    },
    resolveId(id) {
        if (id.match(/\\-demos\\(\w+)\.html/)) {
            return id;
        }
        return undefined;
    },
    // load(id, options) {
    //     if (id === "internal:demo") {
    //         console.log(id);
    //         return {
    //             code: "aaaaa"//readFileSync(resolve(curConfig.root, `./-demos/index.html`), "utf-8")
    //         }
    //     }
    // },
    configureServer(server: ViteDevServer) {
        return () => {
            server.middlewares.use(async (req, res, next) => {
                console.log(req.url);

                // console.log(req.url, req.url?.match(/^\/-demos\/(\w+)\.md/));
                if (req.url?.match(/^\/-demos\/(\w+)\.html/)) {
                    const demo = readFileSync(resolve(curConfig.root, `.${req.url}`), "utf-8")
                    const content = await server.transformIndexHtml?.(req.url, demo, req.originalUrl);
                    res.end(content);
                    return;
                } else {
                    await next();
                }
            });
        }
    }
} as Plugin