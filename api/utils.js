import bcrypt from 'bcrypt';
import { hostname } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config/config.js';
import nodemailer from 'nodemailer';


const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt);
}

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

export const verifyEmail = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: config.host,
            service: config.service,
            port: Number(config.emailPort),
            secure: Boolean(config.secure),
            auth: {
                user: config.email,
                pass: config.password
            }
        });

        await transporter.sendMail({
            from: `"GGG" <${config.email}>`,
            to: email,
            subject: 'Verify your email',
            html: `
            <h1>Click the link below to verify your email</h1>
            <a href="${config.host}/sessions/verify/${email}">Verify</a>
        `
        })
        console.log('Email sent ✅');
    } catch (error) {
        console.log('Error sending email ⛔', error);
    }
}