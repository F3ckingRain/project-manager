import express from 'express'
import fs from 'fs'
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const testRunsData = JSON.parse(fs.readFileSync(resolve(__dirname, './testRuns.json')));

export const testRunsRouter = express.Router();

testRunsRouter.use('/list', (_, res) => {
    res.json(testRunsData);
})

testRunsRouter.use('/get', (req, res) => {
    const { id } = req.query;

    const testRunData = testRunsData.find((project) => project.id === id);

    testRunData ? res.json(testRunData) : res.status(400).send('Cannot find test run')
})

testRunsRouter.use('/create', (_, res) => {
    res.status(200).send('success')
})

testRunsRouter.use('/edit', (_, res) => {
    res.status(200).send('success')
})

testRunsRouter.use('/remove', (req, res) => {
    const { testRunId } = req.body || {};
    const filteredArr = testRunsData.filter(({ id }) => id !== testRunId);

    res.json(filteredArr);
})