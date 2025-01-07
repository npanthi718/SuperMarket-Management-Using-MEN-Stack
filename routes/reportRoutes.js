const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Sale = require('../models/Sale');

// Get daily and overall reports
router.get('/', async (req, res) => {
    try {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        // Daily Reports
        const salesToday = await Sale.find({ date: { $gte: startOfToday } });
        const productsAddedToday = await Product.find({ createdAt: { $gte: startOfToday } });

        // Calculate today's product sold count and revenue
        const productsSoldToday = salesToday.reduce(
            (total, sale) => total + sale.products.reduce((subtotal, product) => subtotal + product.quantity, 0),
            0
        );
        const totalRevenueToday = salesToday.reduce((total, sale) => total + sale.totalAmount, 0);

        // Calculate today's expenses for added products

        // Calculate profit for today (revenue minus cost of sold items)
        const totalCostOfSoldItems = salesToday.reduce((total, sale) => {
            return (
                total +
                sale.products.reduce((subtotal, product) => {
                    const productInfo = productsAddedToday.find((p) => p.name === product.name);
                    const cost = productInfo ? product.quantity * productInfo.buyingPrice : 0;
                    return subtotal + cost;
                }, 0)
            );
        }, 0);

        const profitToday = totalRevenueToday - totalCostOfSoldItems;

        // Overall Reports
        const overallRevenueData = await Sale.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } },
        ]);
        const overallCostOfSoldItems = await Sale.aggregate([
            { $unwind: '$products' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.name',
                    foreignField: 'name',
                    as: 'productInfo',
                },
            },
            {
                $project: {
                    cost: {
                        $multiply: [
                            { $arrayElemAt: ['$productInfo.buyingPrice', 0] },
                            '$products.quantity',
                        ],
                    },
                },
            },
            { $group: { _id: null, totalCost: { $sum: '$cost' } } },
        ]);

        const overallExpensesData = await Product.aggregate([
            { $group: { _id: null, totalExpenses: { $sum: { $multiply: ['$quantity', '$buyingPrice'] } } } },
        ]);

        const overallRevenue = overallRevenueData[0]?.totalRevenue || 0;
        const overallExpenses = overallCostOfSoldItems[0]?.totalCost || 0;

        res.status(200).json({
            productsAdded: productsAddedToday.length,
            productsSold: productsSoldToday,
            totalRevenue: `INR ${totalRevenueToday.toFixed(2)}`,
            totalExpenses: `INR ${totalCostOfSoldItems.toFixed(2)}`,
            profit: `INR ${profitToday.toFixed(2)}`,
            overallRevenue: `INR ${overallRevenue.toFixed(2)}`,
            overallExpenses: `INR ${overallExpenses.toFixed(2)}`,
        });
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
