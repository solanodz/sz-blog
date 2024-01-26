import mongoose from "mongoose";
/* import dotenv from "dotenv"; */
/* dotenv.config(); */
import config from "../config/config.js";

export const init = async () => {
    try {
        const URI = config.mongoUri;
        await mongoose.connect(URI);
        console.log('Conectado a la db correctamente 🚀');
    } catch (error) {
        console.error(error);
    }
}