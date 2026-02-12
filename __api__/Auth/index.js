import express from 'express'
import fs from 'fs'
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
    
export const authRouter = express.Router();

const __dirname = dirname(fileURLToPath(import.meta.url));
const userData = JSON.parse(fs.readFileSync(resolve(__dirname, './user.json')))

authRouter.use('/sign-in', (_, res) => {
    res.json(userData)
})

authRouter.use('/sign-up', (_, res) => {
    res.json(userData)
})

authRouter.use('/logout', (_, res) => {
    res.send('success logout')
})

authRouter.use('/check-token-expired', (req, res) => {
    const reqToken = req.query?.token;
    const enableToken = userData.token;
    
    if (reqToken === enableToken) {
        res.status(200).json(userData)
    } else {
        res.status(401).send('session expired')
    }
})

authRouter.use('/restore-password', (_, res) => {
    res.status(200).send('password changed')
})