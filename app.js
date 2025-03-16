

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import facturas from "./routes/facturar.js";
import usuarios from "./routes/usuariosr.js"; 
import servicios from "./routes/productosr.js"


dotenv.config();


const app = express();


app.use(express.json()); 
app.use(cors()); 
app.use(express.static("public"))

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch((error) => console.error("❌ Error al conectar a MongoDB:", error));

// Rutas
app.use("/api/facturas", facturas);
app.use("/api/usuarios", usuarios);       
app.use("/api/servicios",servicios)

// Puerto del servidor
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});