import fs from "fs";
import path from "path";

export const coreData = {
    entityName: '',
    rootPath: '',
    capitalizeName: function ():string {
        return `${this.entityName[0].toUpperCase()}${this.entityName.slice(1)}`
    }
}

export const checkRoot = async (rootPath:string):Promise<string> => {
    const dirFiles:string[] = await fs.promises.readdir(rootPath)
    if (dirFiles.includes('package.json')) {
        return rootPath
    } else {
        return checkRoot(path.join(rootPath, '..'))
    }
}


export const createCoreData = async () => {
    const name:string = process.argv[2]
    if (name) {
        coreData.entityName = name
    } else {
        throw new Error('an entity name has been not passed as an argument')
    }

    coreData.rootPath = await checkRoot(process.cwd())
}