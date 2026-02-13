import express from 'express'
import fs from 'fs'
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
    
export const tableRouter = express.Router();

const __dirname = dirname(fileURLToPath(import.meta.url));
const tableData = JSON.parse(fs.readFileSync(resolve(__dirname, './table.json')));

tableRouter.use('/get-projects', (_, res) => {
    res.json(tableData.projects);
})

tableRouter.use('/get-test-cases', (_, res) => {
    res.json(tableData.cases);
})