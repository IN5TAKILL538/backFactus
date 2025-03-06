// models/Factura.js
import mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
    number: { type: String, required: true },
    api_client_name: { type: String },
    reference_code: { type: String },
    identification: { type: String },
    graphic_representation_name: { type: String },
    email: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: Number, default: 1 },
    payment_form: { type: String },
    created_at: { type: Date, default: Date.now },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
}, { timestamps: true });

export default mongoose.model('Factura', facturaSchema);