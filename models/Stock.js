const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  stock_id: { type: Number, required: true, unique: true },
  ProductName: { type: String, required: true },
  StockQuantity: { type: Number, required: true }
});

module.exports = mongoose.model('Stock', stockSchema);
