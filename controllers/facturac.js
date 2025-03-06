import Factura from '../models/factura.js';

const getFacturas = async (req, res) => {
    try {
        const facturas = await Factura.find().populate('usuarioId');
        res.json(facturas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createFactura = async (req, res) => {
    try {
        const factura = new Factura(req.body);
        await factura.save();
        res.json(factura);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFacturaById = async (req, res) => {
    const factura = await Factura.findById(req.params.id);
    res.json(factura);
};
const updateFactura = async (req, res) => {
    const updatedFactura = await Factura.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFactura);
};

export {
    getFacturas,
    createFactura,
    getFacturaById,
    updateFactura

}