import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt);
}

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}