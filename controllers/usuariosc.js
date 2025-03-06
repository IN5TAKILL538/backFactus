import Usuario from('../models/usuarios.js');



const getUsers = async (req, res) => {
    const users = await Usuario.find();
    res.json(users);
};

const createUser = async (req, res) => {
    const user = new Usuario(req.body);
    await user.save();
    res.json(user);
};


const getUserById = async (req, res) => {
    const user = await Usuario.findById(req.params.id);
    res.json(user);
};

const updateUser = async (req, res) => {
    const updatedUser = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
};
export {
    getUsers,
    createUser,
    updateUser,
    getUserById
}