import productos from '../models/productos.js';
/**
 * POST /products
 * Crea un nuevo producto en la base de datos.
 */
const createProduct = async (req, res) => {
    try {
        const { codeReference } = req.body;
        
        // Verificar si el producto ya existe
        const existingProduct = await productos.findOne({ codeReference });
        if (existingProduct) {
            return res.status(400).json({ message: 'El producto ya existe con este código de referencia' });
        }
        
        const newProduct = new productos(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

/**
 * GET /products
 * Obtiene todos los productos de la base de datos.
 */
const getAllProducts = async (req, res) => {
    try {
        const products = await productos.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
};

/**
 * GET /products/:id
 * Obtiene un producto por su ID.
 */
const getProductById = async (req, res) => {
    try {
        const product = await productos.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};

/**
 * PUT /products/:id
 * Actualiza un producto existente por su ID.
 */
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Verificar si el código de referencia ya existe en otro producto
        if (req.body.codeReference) {
            const existingProduct = await productos.findOne({ 
                codeReference: req.body.codeReference, 
                _id: { $ne: id } 
            });
            
            if (existingProduct) {
                return res.status(400).json({ 
                    message: 'El código de referencia ya está en uso por otro producto' 
                });
            }
        }
        
        // Buscar y actualizar el producto
        const updatedProduct = await productos.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al actualizar el producto', 
            error: error.message 
        });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedProduct = await productos.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        res.status(200).json({ 
            message: 'Producto eliminado correctamente',
            product: deletedProduct
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al eliminar el producto', 
            error: error.message 
        });
    }
};

export { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct
};