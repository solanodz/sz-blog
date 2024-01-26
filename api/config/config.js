export default {
    port: process.env.PORT || 8080,
    jwtSecret: process.env.JWT_SECRET,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/sz-blog',
}