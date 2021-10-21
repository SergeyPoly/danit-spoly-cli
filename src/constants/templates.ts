import { coreData } from "../helpers/core-data";

export const methods:string[] = ['get', 'post', 'put', 'patch', 'delete'];

export const funcHandlerTemplate = (method:string):string => {
    return (
`import { Request, Response } from 'express';

export const ${method}${coreData.capitalizeName()} = async (req:Request, res:Response) => {
    res.sendStatus(200);
};`
    )
}

export const routerTemplate = ():string => {
    const imports = methods.map((method):string => `import { ${method}${coreData.capitalizeName()} } from './${method}';\n`)
    const routes = methods.map((method):string => `router.${method}('/', ${method}${coreData.capitalizeName()});\n`)

    return (
`import { Router } from 'express';\n
${imports.join('')}

const router = Router();\n

${routes.join('')}

export default router;`
    )
}

export const entryPointTemplate = (data:string):string => {
    const importStr = data.match(/^i.*$/gm) || [];
    const routersStr = data.match(/app\.use\(.*$/gm) || [];

    const importsUpdate = [
        ...importStr,
        `import ${coreData.entityName}Router from './${coreData.entityName}';`,
    ].join('\n');

    const routersUpdate = [
        ...routersStr,
        ` app.use('/${coreData.entityName}s', ${coreData.entityName}Router);`,
    ].join('\n');

    return (
`${importsUpdate}\n
export const registerRouters = (app:Express)=> {\n ${routersUpdate}\n};`
    )
}