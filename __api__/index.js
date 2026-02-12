import express from 'express'
import { authRouter } from './Auth/index.js'
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRouter);

app.listen(8080);
