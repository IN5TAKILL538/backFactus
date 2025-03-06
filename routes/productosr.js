import express from "express"

import { check } from "express-validator";

import { validarDatos } from "../middleware/validar-datos.js";
import {
    getProducts,
    getProductById,
    createProduct,

} from "../controllers/productosc.js";

const router = express.Router();

router.post(
    '/products',
    [
        check('productName', 'El nombre es obligatorio').notEmpty(),
        check('description', 'La descripción es obligatoria').notEmpty(),
        validarDatos
    ],
    createProduct
);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post(
    '/products',
    [
        check('productName', 'El nombre es obligatorio').notEmpty(),
        check('description', 'La descripción es obligatoria').notEmpty(),
        validarDatos
    ],
    createProduct
);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post(
    '/products',
    [
        check('productName', 'El nombre es obligatorio').notEmpty(),
        check('description', 'La descripción es obligatoria').notEmpty(),
        validarDatos
    ],
    createProduct
);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.put(
    '/products/:id',
    [
        check('id', 'ID no válido').isMongoId(),
        check('productName', 'El nombre es obligatorio').optional().notEmpty(),
        check('description', 'La descripción es obligatoria').optional().notEmpty(),
        validarDatos
    ],
    updateProduct
);
router.put(
    '/products/state/:id',
    [
        check('id', 'ID no válido').isMongoId(),
        validarDatos
    ],
    toggleProductState
);
export default router;