export default {
    port: process.env.PORT || 8080,
    jwtSecret: process.env.JWT_SECRET,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/sz-blog',
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    service: process.env.SERVICE,
    secure: process.env.SECURE,
    emailPort: process.env.EMAIL_PORT,
    frontendUrl: process.env.FRONTEND_URL,
    googleClientId: process.env.CLIENT_ID,
    googleClientSecret: process.env.CLIENT_SECRET,
}