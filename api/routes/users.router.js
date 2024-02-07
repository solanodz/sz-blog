import { Router } from 'express'
import config from '../config/config.js'
import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'

const JWT_SECRET = config.jwtSecret

const router = Router()

router.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    jwt.verify(token, JWT_SECRET, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    res.json(user);
});

export default router