import { fileURLToPath } from "url";
import { defineConfig } from "vitepress";
import {
	containerPreview,
	componentPreview,
} from "@vitepress-demo-preview/plugin";
import { generateSidebar, Options as SidebarOptions } from "./plugins/sidebar";
import { defu } from "defu";

// https://vitepress-sidebar.jooy2.com/multiple-sidebars-how-to


const dirTitleArray = [
    { text: '起始', name: '0.start' },     
    { text: '组件', name: '1.components' },
    { text: 'Hooks', name: '2.hooks' }     
]
function buildMergeOptons() {
	const allResult = [];
	for (let i = 0; i < dirTitleArray.length; i++) {
		const name = dirTitleArray[i].name;
		const text = dirTitleArray[i].text;
		allResult.push(
			mergeOptons({
				documentRootPath: "/",
				scanStartPath: `${name}`,
				resolvePath: `/${name}/`,
				flattenBase: true,
				rootGroupText: text,
				callback(sidebar) {
					sidebar.unshift({
						text: "<-- 开始",
						link: "/0.home",
					});
					return sidebar;
				},
			})
		);
	}
	return allResult;
}

function mergeOptons(object: Partial<SidebarOptions>) {
    const dirTitleMap = {}
    for (let i = 0; i < dirTitleArray.length; i++) {
        const name = dirTitleArray[i].name;
        const text = dirTitleArray[i].text;
        dirTitleMap[name] = text
    }
	return defu(
		{
			dirTitleMap,
			hyphenToSpace: true,
			debugPrint: false,
			collapsed: false,
			capitalizeFirst: true,
			removeEmptyFolder: true,
			includeEmptyFolder: true, // 配合 convertSameNameSubFileToGroupIndexPage true
			excludeFolders: ["public", "scripts"],
			// useFolderTitleFromIndexFile: true,
			// useFolderLinkFromIndexFile: true,
			removePrefixAfterOrdering: true,
			prefixSeparator: ".",
			convertSameNameSubFileToGroupIndexPage: true,
			// folderLinkNotIncludesFileName: true,
			includeFolderIndexFile: true,
			// includeRootIndexFile: true,
			useTitleFromFileHeading: true,
			useTitleFromFrontmatter: true,
			frontmatterOrderDefaultValue: 9, // For 'CHANGELOG.md'
			sortMenusByFrontmatterOrder: true,
		} as Partial<SidebarOptions>,
		object
	);
}

const vitepressSidebarOptions: SidebarOptions[] = [
	mergeOptons({
		documentRootPath: "/",
		scanStartPath: "/",
		resolvePath: "",
		flattenBase: true,
		// excludeFolders: ["0.start", "1.components", "2.hooks"],
		callback(sidebar) {
			// 取子目录的标题，以及第一个导航的链接
			const label = {
				text: "子目录",
				items: [],
			};
			for (let i = sidebar.length - 1; i >= 0; i--) {
				const item = sidebar[i];
				let text = item.text;
				if (item.items && item.items.length) {
					item.items[0].text = text;
					label.items.unshift(item.items[0]);
					sidebar.splice(i, 1);
				}
			}
            const newItmes = []
            label.items.forEach(item=>{
                let index = dirTitleArray.findIndex(v=>v.text === item.text)
                if(index != -1) {
                    newItmes[index] = item
                }
            })
            label.items = newItmes
			sidebar.push(label);
			return sidebar;
		},
	}),
	...buildMergeOptons(),
];
// const vitepressSidebarOptions: SidebarOptions = mergeOptons({
//     documentRootPath: "/",
//     dirTitleMap: {
//         "1.components": "组件",
//         "0.start": "起始",
//     },
// })

let oldSidebar: string;

// https://vitepress.dev/reference/site-config
const userConfig = defineConfig({
	title: "LAW-UI",
	head: [["link", { rel: "icon", type: "image/png", href: "/favicon.png" }]],
	description: "基于ant-design-vue，构建符合业务的组件",
	lastUpdated: true,
	lang: "zh",
	markdown: {
		theme: {
			light: "vitesse-light",
			dark: "vitesse-dark",
		},
		config(md) {
			md.use(containerPreview as any);
			md.use(componentPreview as any);

			md.renderer.rules.table_open = (): string =>
				'<div class="vp-table__container"><table>';
			md.renderer.rules.table_close = (): string => "</table></div>";
		},
	},
	// base: "/somebuild",
	themeConfig: {
		logo: { src: "/favicon.png", width: 24, height: 24 },
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "首页", link: "/" },
			{ text: "开始", link: "/0.start/0.nav" },
		],
		socialLinks: [
			{ icon: "github", link: "https://github.com/vuejs/vitepress" },
		],
	},
	vite: {
		resolve: {
			alias: [
				{
					find: /^.*\/VPSwitchAppearance\.vue$/,
					replacement: fileURLToPath(
						new URL(
							"./theme/components/vp-theme-apperence.vue",
							import.meta.url
						)
					),
				},
			],
		},
		plugins: [
			{
				name: "refresh-tree",
				enforce: "post",
				config(config) {
					let curSidebar = generateSidebar(vitepressSidebarOptions);
					// @ts-ignore
					config.vitepress.site.themeConfig.sidebar = curSidebar;
					oldSidebar = JSON.stringify(curSidebar);
					return config;
				},
				async handleHotUpdate(ctx) {
					const { file, read, server, modules } = ctx;
					if (file.endsWith(".md")) {
						let curSidebar = generateSidebar(
							vitepressSidebarOptions
						);
						if (JSON.stringify(curSidebar) !== oldSidebar) {
							if (userConfig.themeConfig) {
								userConfig.themeConfig.sidebar = curSidebar;
								oldSidebar = JSON.stringify(curSidebar);
							}
							server.moduleGraph.onFileChange("/@siteData");
						}
					}
				},
				configureServer(server) {
					// md文件删除与刷新时通知文件更改
					const { moduleGraph, watcher, ws, restart } = server;
					function reload() {
						let curSidebar = generateSidebar(
							vitepressSidebarOptions
						);
						if (JSON.stringify(curSidebar) !== oldSidebar) {
							if (userConfig.themeConfig) {
								userConfig.themeConfig.sidebar = curSidebar;
								oldSidebar = JSON.stringify(curSidebar);
							}
							server.moduleGraph.onFileChange("/@siteData");
						}
					}
					watcher
						.add(["**/*.md"])
						.on("add", reload)
						.on("unlink", reload);
				},
			},
		],
	},
});

export default userConfig;
