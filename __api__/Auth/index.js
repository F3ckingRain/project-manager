import express from 'express'
import fs from 'fs'
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
    
export const authRouter = express.Router();

const __dirname = dirname(fileURLToPath(import.meta.url));

authRouter.use('/login', (_, res) => {
    const token = fs.readFileSync('./token.json')

    res.send(token)
})

authRouter.use('/logout', (_, res) => {
    res.send('success logout')
})

authRouter.use('/check-token-expired', (req, res) => {
    const reqToken = req.query?.token;
    const enableToken = JSON.parse(fs.readFileSync(resolve(__dirname, './token.json')))?.token;
    
    if (reqToken === enableToken) {
        res.status(200).send('success login')
    } else {
        res.status(401).send('session expired')
    }
})