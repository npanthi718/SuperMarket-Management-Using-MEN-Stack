// models/Bill.js
const mongoose = require('mongoose');

// Bill Schema
const billSchema = new mongoose.Schema({
    customerName: { 
        type: String, 
        required: true 
    },
    customerAddress: { 
        type: String, 
        required: false  // Optional field
    },
    customerPhone: { 
        type: String, 
        required: false  // Optional field
    },
    items: [
        {
            productName: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity must be at least 1'], // Ensure quantity is positive
            },
            price: {
                type: Number,
                required: true,
                min: [0, 'Price must be positive'], // Price should be positive
            },
            subtotal: {
                type: Number,
                required: true,
                min: [0, 'Subtotal must be positive'], // Subtotal should not be negative
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: [0, 'Total amount cannot be negative'], // Ensuring totalAmount is non-negative
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Bill', billSchema);
