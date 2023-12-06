import fs from "fs-extra"
import { pkgPath, rootPath } from "@internal/shared"
import path from "path"

fs.ensureDirSync(path.resolve(pkgPath, "law-ui"))

if (fs.pathExistsSync(path.resolve(pkgPath, "law-ui/package.json"))) {
    const pkgJSON = fs.readJSONSync(path.resolve(pkgPath, "law-ui/package.json"))
    // const rootPkgJSON = fs.readJSONSync(path.resolve(rootPath, "package.json"))

    pkgJSON.scripts = {}
    fs.writeJSONSync(path.resolve(rootPath, "dist/law-ui/package.json"), pkgJSON, { spaces: 2 })
}

if (fs.pathExistsSync(path.resolve(pkgPath, "law-ui/readme.md"))) {
    fs.createReadStream(path.resolve(pkgPath, "law-ui/readme.md")).pipe(fs.createWriteStream(path.resolve(rootPath, "dist/law-ui/readme.md")))
}


