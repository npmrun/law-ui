import path from "node:path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const rootPath = path.resolve(__dirname, "../../")
export const pkgPath = path.resolve(rootPath, "./packages")