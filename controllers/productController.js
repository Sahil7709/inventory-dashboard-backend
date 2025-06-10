const Product = require('../models/product');

exports.getProducts = async (req, res) => {
    const products = await Product.find({ user: req.user._id });
    res.json(products);
};

exports.addProduct = async (req, res) => {
    const { name, quantity, price, category } = req.body;
    const product = await Product.create({ name, quantity, price, category, user: req.user._id });
    res.json(product);
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
};