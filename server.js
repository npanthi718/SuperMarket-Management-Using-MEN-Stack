const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const billRoutes = require('./routes/billRoutes');
const sortedProductRoutes = require('./routes/sortedProductRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/supermarketDB2',)
.then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/sorted', sortedProductRoutes);
app.use('/api/reports', reportRoutes);

// Default route
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
