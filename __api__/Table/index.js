import express from 'express'
import { casesRouter } from './Cases/index.js'
import { projectsRouter } from './Projects/index.js'
import { testRunsRouter } from './TestRuns/index.js'
    
export const tableRouter = express.Router();

tableRouter.use('/projects', projectsRouter);
tableRouter.use('/cases', casesRouter);
tableRouter.use('/test-runs', testRunsRouter)