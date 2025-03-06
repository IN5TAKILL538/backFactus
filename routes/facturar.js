import express from "express"


import { check } from "express-validator";

import { validarDatos } from "../middleware/validar-datos.js";
import {
    createFactura,
    getFacturas,
    getFacturaById,
    updateFactura


} from "../controllers/facturac.js";

const router = express.Router();

// POST: Crear una nueva orden
router.post(
    "/",
    [
        
        check("cliente", "El cliente es obligatorio").notEmpty(),
        check("productos", "Los productos son obligatorios").isArray({ min: 1 }),
        validarDatos
    ],
    createFactura
);

// GET: Obtener todas las órdenes
router.get(
    "/",
    [
        
        validarDatos,
    ],
    getFacturas
);

// GET: Obtener una orden por ID
router.get(
    "/:id",
    [
        
        check("id", "ID no válido").isMongoId(),
        validarDatos
    ],
    getFacturaById
);

// PUT: Actualizar una orden
router.put(
    "/:id",
    [
        
        check("id", "ID no válido").isMongoId(),
        check("estado", "El estado es obligatorio").optional().notEmpty(),
        validarDatos
    ],
    updateFactura
);



export default router;