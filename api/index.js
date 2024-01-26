import express from 'express'
import cors from 'cors'
import UserModel from './models/User.js'
import PostModel from './models/Post.js'
import mongoose from 'mongoose'
import { comparePassword, hashPassword } from './utils.js'
import jwt from 'jsonwebtoken'
import { init as initMongoDB } from './db/mongo.js'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import fs from 'fs'

import('dotenv/config.js');

const uploadMiddleware = multer({ dest: 'uploads/' })

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const PORT = config.port
const JWT_SECRET = config.jwtSecret

// 

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if email and password are provided
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const emailDoc = await UserModel.create({
            username,
            email,
            password: await hashPassword(password)
        });
        res.json(emailDoc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const emailDoc = await UserModel.findOne({ email });

    // Check if a user was found
    if (!emailDoc) {
        return res.status(400).json({ error: 'User not found' });
    }

    const id = emailDoc._id;

    const passwordValid = comparePassword(password, emailDoc.password);
    if (passwordValid) {
        // TODO - logged in --> jsonwebtoken
        jwt.sign({ email, id: emailDoc._id }, JWT_SECRET, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id,
                username: emailDoc.username,
            })
        })
    } else {
        res.status(400).json({ error: 'Wrong credentials' })
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    jwt.verify(token, JWT_SECRET, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

app.get('/post', async (req, res) => {
    res.json(await PostModel.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
    )
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'File is required' });
    }

    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await PostModel.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.json(postDoc);
    });

})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
        if (err) throw err;

        const { id, title, summary, content } = req.body;
        const postDoc = await PostModel.findById(id)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(401).json({ error: 'You are not the author of this post.' });
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });

        res.json(postDoc);
    });

})

app.get('/post', async (req, res) => {
    res.json(await PostModel.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(4)
    )
})

app.get('/all-posts', async (req, res) => {
    res.json(await PostModel.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
    )
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await PostModel.findById(id).populate('author', ['username']);
    res.json(postDoc);
})



app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await PostModel.findById(id).populate('author', ['username']);
    res.json(postDoc);
})

app.delete('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await PostModel.findByIdAndDelete(id);
    res.json(postDoc);
})


app.listen(PORT, () => {
    console.log('server is running at http://localhost:8080 🚀')
})

// mongodb+srv://solanodz:hlbG4F6oN2fYYUnr@cluster0.bpi5x3f.mongodb.net/