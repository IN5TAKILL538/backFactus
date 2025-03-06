

import express from "express";
import { check } from "express-validator";

import { validarDatos } from "../middleware/validar-datos.js";
import {
    getUsers,
    createUser,
    updateUser,
    getUserById
    
} from "../controllers/usuariosc.js";

const router = express.Router();

// POST: Crear una nueva transacción en el inventario
router.post(
    "/",
    [
       
        check("producto", "El producto es obligatorio").notEmpty(),
        check("cantidad", "La cantidad es obligatoria y debe ser un número").isNumeric(),
        validarDatos
    ],
    createUser
);

// GET: Obtener todas las transacciones del inventario
router.get(
    "/",
    [
      
        validarDatos,
    ],
    getUsers
);

// GET: Obtener una transacción específica por ID
router.get(
    "/:id",
    [
      
        check("id", "ID no válido").isMongoId(),
        validarDatos
    ],
    getUserById
);

// PUT: Cambiar el estado de una transacción en el inventario

export default router;