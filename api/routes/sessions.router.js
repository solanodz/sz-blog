import { Router } from 'express';
import { comparePassword, hashPassword } from '../utils.js';
import jwt from 'jsonwebtoken'
import config from '../config/config.js';
import UserModel from '../models/User.js';

import TokenModel from '../models/Token.js';
import { verifyEmail } from '../utils.js';
import crypto from 'crypto';

const router = Router()

router.post('/register', async (req, res) => {

    const { username, email, password } = req.body;

    // Check if email and password are provided
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const emailDoc = await new UserModel({
            username,
            email,
            password: await hashPassword(password)
        }).save();

        const token = await new TokenModel({
            userId: emailDoc._id,
            token: crypto.randomBytes(32).toString('hex')
        }).save();

        const url = `${config.frontendUrl}/sessions/verify/${emailDoc.id}/${token.token}`;
        await verifyEmail(emailDoc.email, "Verify email", url);

        res.status(201).send({ message: 'An email was sent to your account. Please verify' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/verify/:id/:token', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ error: 'Invalid link' });
        }

        const token = await TokenModel.findOne({ userId: user._id, token: req.params.token });
        if (!token) {
            return res.status(400).json({ error: 'Invalid link' });
        }

        user.verified = true;
        await UserModel.updateOne({ _id: user._id, verified: true });
        await token.remove();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

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