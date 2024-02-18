import { Router } from "express";
import UserModel from "../models/User.js";
import TokenModel from "../models/Token.js";
import { verifyEmail } from "../utils.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import config from "../config/config.js";

const router = Router();


async function getUserData(access_token) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?${access_token}`);
    const data = await response.json();
    console.log(data);
}

router.get('/google', async (req, res) => {
    const code = req.query.code;
    try {
        const redirectUrl = 'http://127.0.0.1:3000/oauth';
        const oAuth2Client = new OAuth2Client(
            config.googleClientId,
            config.googleClientSecret,
            redirectUrl
        );
        const res = await OAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(res.tokens);
        console.log('Tokens acquired');
        const user = oAuth2Client.credentials;
        console.log('credentials', user);
        await getUserData(user.access_token);
    } catch (error) {
        console.log('Error with sign in with Google', error);
    }
})


export default router;






/* router.post('/register', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await UserModel.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });

        if (!user.verified) {
            let token = await TokenModel.findOne({ userId: user._id });
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();
                const url = `${config.host}/sessions/verify/${user._id}/${token.token}`
                await verifyEmail(user.email, "Verify Email", url);
            }

            return res
                .status(400)
                .send({ message: "An Email sent to your account please verify" });
        }
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}); */