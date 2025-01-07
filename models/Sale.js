const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    products: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sale', saleSchema);
