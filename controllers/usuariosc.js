import User from '../models/usuarios.js';





/**
 * POST /users
 * Crea un nuevo usuario en la base de datos.
 */
const createUser = async (req, res) => {
    try {
        const { identification, email } = req.body;

        // Verificar si el usuario ya existe por identificación o email
        const existingUser = await User.findOne({ 
            $or: [{ identification }, { email }] 
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuario ya existe con esta identificación o email' });
        }

        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
};

/**
 * GET /users
 * Obtiene todos los usuarios de la base de datos.
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

/**
 * GET /users/:id
 * Obtiene un usuario por su ID.
 */
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
    }
};
/* Elimina un usuario por su ID.*/
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedUser = await User.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        res.status(200).json({ 
            message: 'Usuario eliminado correctamente',
            user: deletedUser
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al eliminar el usuario', 
            error: error.message 
        });
    }
};
export { createUser, getAllUsers, getUserById, deleteUser };