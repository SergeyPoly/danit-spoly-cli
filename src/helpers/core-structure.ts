import fs from "fs";
import path from "path";
import { coreData } from "./core-data";
import {
    routerTemplate,
    funcHandlerTemplate,
    entryPointTemplate,
    methods
} from "../constants/templates";

export const createCoreStructure = async () => {
    const targetDir = path.join(coreData.rootPath, `/src/api/${coreData.entityName}`);
    const entryFilePath = path.join(coreData.rootPath, `/src/api/index.ts`)
    const entryData = await fs.promises.readFile(entryFilePath, 'utf8');

    await fs.promises.mkdir(targetDir, { recursive: true });
    await Promise.all(methods.map((method) => fs.promises.writeFile(`${targetDir}/${method}.ts`, funcHandlerTemplate(method))))
    await fs.promises.writeFile(`${targetDir}/index.ts`, routerTemplate());
    await fs.promises.writeFile(entryFilePath, entryPointTemplate(entryData));
}