import path from "path"
import fs from "fs-extra"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 创建node_modules中的包，相当于pnpm的安装
let haveBuild = fs.pathExistsSync(path.resolve(__dirname, "../../dist/law-ui"))
if (haveBuild) {
    if (!fs.pathExistsSync(path.resolve(__dirname, "../node_modules/law-ui"))) {
        fs.createSymlinkSync(path.resolve(__dirname, "../../dist/law-ui"), path.resolve(__dirname, "../node_modules/law-ui"))
    }
}
