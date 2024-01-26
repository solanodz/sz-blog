import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    /* TODO --> agregar username para que aparezca en Navbar una vez loggeado */
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 8, max: 32 },
})

export default mongoose.model("User", UserSchema)

