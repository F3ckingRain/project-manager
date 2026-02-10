import express from 'express'
import { authRouter } from './Auth/index.js'

const app = express()

app.use('/auth', authRouter);

app.listen(8080);
