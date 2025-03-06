import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nombres: { type: String, required: true },
    email: { type: String, unique: true, required: true }
}, { timestamps: true });

export default mongoose.model('Usuario', usuarioSchema);