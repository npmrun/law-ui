import fs from "fs"

fs.createReadStream('./scripts/package.json.1').pipe(
    fs.createWriteStream('./dist/law-ui/package.json')
)
