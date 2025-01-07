const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Sale = require('../models/Sale');

// Generate a bill
router.post('/generate', async (req, res) => {
    try {
        const { customerName, phone, address, products } = req.body;

        let totalAmount = 0;
        const soldProducts = [];

        for (const item of products) {
            const product = await Product.findOne({ name: item.name });

            if (!product) {
                return res.status(400).json({ error: `Product ${item.name} not found in stock.` });
            }

            if (product.quantity < item.quantity) {
                return res.status(400).json({ error: `${item.name} is out of stock or insufficient quantity.` });
            }

            // Calculate the total price
            totalAmount += product.sellingPrice * item.quantity;

            // Update stock quantity
            product.quantity -= item.quantity;
            await product.save();

            // Add to soldProducts array
            soldProducts.push({
                name: product.name,
                quantity: item.quantity,
                price: product.sellingPrice,
            });
        }

        // Record the sale
        const newSale = new Sale({
            customerName,
            phone,
            address,
            products: soldProducts, // Matches the schema
            totalAmount, // Matches the schema
            date: new Date(),
        });
        await newSale.save();

        res.status(201).json({ message: 'Bill generated successfully', totalAmount });
    } catch (error) {
        console.error('Error generating bill:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
