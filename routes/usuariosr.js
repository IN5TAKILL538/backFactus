

import express from "express";



import { createUser, getAllUsers, getUserById, deleteUser } from '../controllers/usuariosc.js';

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/', createUser);

// Ruta para obtener todos los usuarios
router.get('/', getAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/:id', getUserById);

router.delete('/:id', deleteUser);
export default router;
