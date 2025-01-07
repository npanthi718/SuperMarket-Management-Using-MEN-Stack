const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add or update product
router.post('/add', async (req, res) => {
    try {
        const { name, quantity, buyingPrice, sellingPrice } = req.body;

        let product = await Product.findOne({ name, buyingPrice, sellingPrice });

        if (product) {
            product.quantity += quantity; // Merge quantities
        } else {
            product = new Product({ name, quantity, buyingPrice, sellingPrice });
        }

        await product.save();
        res.status(201).json({ message: 'Product added/updated successfully' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({ quantity: { $gt: 0 } }); // Exclude out-of-stock items
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
