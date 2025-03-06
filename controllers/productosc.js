const Producto = require('../models/productos.js');

const getProducts = async (req, res) => {
    const products = await Producto.find();
    res.json(products);
};

const getProductById = async (req, res) => {
    const product = await Producto.findById(req.params.id);
    res.json(product);
};

const createProduct = async (req, res) => {
    const product = new Producto(req.body);
    await product.save();
    res.json(product);
};

const updateProduct = async (req, res) => {
    const updatedProduct = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
};

const toggleProductState = async (req, res) => {
    const product = await Producto.findById(req.params.id);
    product.status = !product.status;
    await product.save();
    res.json(product);
};

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    toggleProductState
}