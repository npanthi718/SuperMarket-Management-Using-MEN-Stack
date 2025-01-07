// controllers/billController.js
const Bill = require('../models/Bill');
const Product = require('../models/Product');

// Generate a bill
exports.generateBill = async (req, res) => {
    const { products } = req.body;
    let totalAmount = 0;

    try {
        const billProducts = await Promise.all(products.map(async item => {
            const product = await Product.findById(item.productId);
            if (product.quantity < item.quantity) {
                throw new Error(`${product.name} is out of stock!`);
            }
            product.quantity -= item.quantity;
            await product.save();

            totalAmount += item.quantity * product.sellingPrice;
            return { ...item, price: product.sellingPrice };
        }));

        const bill = new Bill({ products: billProducts, totalAmount });
        await bill.save();
        res.status(201).json({ message: 'Bill generated successfully', bill });
    } catch (error) {
        res.status(500).json({ message: 'Error generating bill', error });
    }
};
