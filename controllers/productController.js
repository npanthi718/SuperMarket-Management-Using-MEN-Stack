// controllers/productController.js
const Product = require('../models/Product');

// Add or merge product
exports.addProduct = async (req, res) => {
    const { name, category, quantity, buyingPrice, sellingPrice } = req.body;
    try {
        let product = await Product.findOne({ name, sellingPrice });
        if (product) {
            product.quantity += quantity;
        } else {
            product = new Product({ name, category, quantity, buyingPrice, sellingPrice });
        }
        await product.save();
        res.status(201).json({ message: 'Product added or merged successfully!', product });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
};

// View all products
exports.viewProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};

// Edit product details
exports.editProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, updates, { new: true });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error editing product', error });
    }
};
