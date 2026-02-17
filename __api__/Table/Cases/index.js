import express from 'express'
import fs from 'fs'
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const casesData = JSON.parse(fs.readFileSync(resolve(__dirname, './cases.json')));

export const casesRouter = express.Router();

casesRouter.use('/list', (_, res) => {
    res.json(casesData);
})

casesRouter.use('/get', (req, res) => {
    const { id } = req.query;

    const caseData = casesData.find((project) => project.id === id);

    caseData ? res.json(caseData) : res.status(400).send('Cannot find test-case')
})


casesRouter.use('/create', (_, res) => {
    res.status(200).send('success')
})

casesRouter.use('/edit', (_, res) => {
    res.status(200).send('success')
})

casesRouter.use('/remove', (req, res) => {
    const { caseId } = req.body || {};
    const filteredArr = casesData.filter(({ id }) => id !== caseId);

    res.json(filteredArr);
})