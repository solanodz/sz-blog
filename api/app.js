import express from 'express'
import cors from 'cors'
import UserModel from './models/User.js'
import jwt from 'jsonwebtoken'
import { init as initMongoDB } from './db/mongo.js'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import fs from 'fs'

import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath } from 'url';
import path from 'path';
import config from './config/config.js'

initMongoDB()
const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);


const PORT = config.port

import postsRouter from './routes/posts.router.js'
import sessionsRouter from './routes/sessions.router.js'
import usersRouter from './routes/users.router.js'

app.use('/', postsRouter, usersRouter)
app.use('/sessions', sessionsRouter)


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    jwt.verify(token, config.jwtSecret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.listen(PORT, () => {
    console.log('server is running at http://localhost:8080 🚀')
})
