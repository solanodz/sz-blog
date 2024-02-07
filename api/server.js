import http from 'http';
import app from './app.js';
import config from './config/config';
import app from './app.js';
import { init as initMongoDB } from './db/mongo.js';

await initMongoDB();

const server = http.createServer(app);
const PORT = config.port;

server.listen(PORT, () => {
    console.log(`🚀 Server is running in http://localhost:${PORT} 🚀`);
})