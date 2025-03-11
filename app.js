import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import facturar from "./routes/facturar.js";
import productosr from "./routes/productosr.js";
import usuariosr from "./routes/usuariosr.js";


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static("public"));


app.use(cors());


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Base de datos conectada'))
    .catch((error) => console.log('Error en la conexión a la base de datos:', error));


    app.use("/api/facturar", facturar)
    app.use("/api/usuariosr", usuariosr)
    app.use("/api/productosr", productosr)


const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto HTTP://LOCALHOST:${PORT}`);
});

