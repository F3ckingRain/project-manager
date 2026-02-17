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

tableRouter.use('/projects/create', (_, res) => {
    res.status(200).send('success')
})

tableRouter.use('/projects/edit', (_, res) => {
    res.status(200).send('success')
})

tableRouter.use('/projects/remove', (req, res) => {
    const { projectId } = req.body || {};
    const filteredArr = tableData.projects.filter(({ id }) => id !== projectId);

    res.json(filteredArr);
})

tableRouter.use('/cases/create', (_, res) => {
    res.status(200).send('success')
})

tableRouter.use('/cases/edit', (_, res) => {
    res.status(200).send('success')
})

tableRouter.use('/cases/remove', (req, res) => {
    const { caseId } = req.body || {};
    const filteredArr = tableData.cases.filter(({ id }) => id !== caseId);

    res.json(filteredArr);
})