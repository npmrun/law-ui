import fs from "fs-extra"
const pkgJSON = fs.readJSONSync("packages/law-ui/package.json")
const rootPkgJSON = fs.readJSONSync("package.json")

pkgJSON.peerDependencies = rootPkgJSON.peerDependencies

fs.writeJSONSync("./dist/law-ui/package.json", pkgJSON, { spaces: 2 })

fs.createReadStream("./readme.md").pipe(fs.createWriteStream("./dist/law-ui/readme.md"))