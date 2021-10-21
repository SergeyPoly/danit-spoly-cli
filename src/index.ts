#!/usr/bin/env node

import { createCoreData } from "./helpers/core-data";
import { createCoreStructure } from "./helpers/core-structure";

const generateAPI = async ():Promise<void> => {
    try {
        await createCoreData();
        await createCoreStructure();
        console.log(`API generated successfully`)
    } catch (e:any) {
        console.log(`error occurred while generating API: ${e.message}`)
    }

};

generateAPI()
