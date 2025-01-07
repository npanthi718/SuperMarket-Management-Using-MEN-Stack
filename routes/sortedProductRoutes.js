const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get products with low stock (quantity <= 20)
router.get('/', async (req, res) => {
    try {
        const sortedProducts = await Product.find({ quantity: { $lte: 20 } });
        res.status(200).json(sortedProducts);
    } catch (error) {
        console.error('Error fetching sorted products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
