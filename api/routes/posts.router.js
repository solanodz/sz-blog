import PostModel from '../models/Post.js'
import fs from 'fs'
import multer from 'multer'
import { Router } from 'express'
import config from '../config/config.js'
import jwt from 'jsonwebtoken'


const router = Router()

const uploadMiddleware = multer({ dest: 'uploads/' })


router.get('/post', async (req, res) => {
    res.json(await PostModel.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
    )
})

router.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'File is required' });
    }

    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, config.jwtSecret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await PostModel.create({
            title,
            // summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.json(postDoc);
    });

})

router.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, config.jwtSecret, {}, async (err, info) => {
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

router.get('/post', async (req, res) => {
    res.json(await PostModel.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(4)
    )
})

router.get('/all-posts', async (req, res) => {
    res.json(await PostModel.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
    )
})

router.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await PostModel.findById(id).populate('author', ['username']);
    res.json(postDoc);
})

router.delete('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await PostModel.findByIdAndDelete(id);
    res.json(postDoc);
})

export default router;