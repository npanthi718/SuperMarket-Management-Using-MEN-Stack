// controllers/reportController.js
const Product = require('../models/Product');
const Bill = require('../models/Bill');

// Get report of products added and sold
exports.getReport = async (req, res) => {
    try {
        const addedProducts = await Product.countDocuments();
        const soldProducts = await Bill.aggregate([
            { $unwind: '$products' },
            { $group: { _id: null, totalSold: { $sum: '$products.quantity' } } }
        ]);

        res.json({
            addedProducts,
            soldProducts: soldProducts[0]?.totalSold || 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating report', error });
    }
};
