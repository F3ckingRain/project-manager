import express from 'express'
import bodyParser from 'body-parser'
import { authRouter } from './Auth/index.js'
import { tableRouter } from './Table/index.js'; 

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/table', tableRouter);

app.listen(8080);
