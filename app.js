import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import facturas from "./routes/facturar.js";
import clientes from "./routes/productosr.js";
import servicios from "./routes/usuariosr.js";


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static("public"));


app.use(cors());


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Base de datos conectada'))
    .catch((error) => console.log('Error en la conexión a la base de datos:', error));


app.use("/api/facturas", facturas)
app.use("/api/clientes", clientes)
app.use("/api/servicios", servicios)


const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto HTTP://LOCALHOST:${PORT}`);
});

