import express from 'express'
import fs from 'fs'
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectsData = JSON.parse(fs.readFileSync(resolve(__dirname, './projects.json')));

export const projectsRouter = express.Router();

projectsRouter.use('/list', (_, res) => {
    res.json(projectsData);
})

projectsRouter.use('/get', (req, res) => {
    const { id } = req.query;

    const projectData = projectsData.find((project) => project.id === id);

    projectData ? res.json(projectData) : res.status(400).send('Cannot find project')
})

projectsRouter.use('/create', (_, res) => {
    res.status(200).send('success')
})

projectsRouter.use('/edit', (_, res) => {
    res.status(200).send('success')
})

projectsRouter.use('/remove', (req, res) => {
    const { projectId } = req.body || {};
    const filteredArr = projectsData.filter(({ id }) => id !== projectId);

    res.json(filteredArr);
})