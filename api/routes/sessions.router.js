import { Router } from 'express';
import { comparePassword, hashPassword } from '../utils.js';
import jwt from 'jsonwebtoken'
import config from '../config/config.js';
import UserModel from '../models/User.js';

const router = Router()

router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
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
        jwt.sign({ email, id: emailDoc._id }, config.jwtSecret, {}, (err, token) => {
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

router.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out' });

});

export default router