const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transaction_id: { type: Number, required: true, unique: true },
  ProductName: { type: String, required: true },
  QuantitySold: { type: Number, required: true },
  CostPrice: { type: Number, required: true },
  COGS: { type: Number, required: true },
  SalesPrice: { type: Number, required: true },
  Sales: { type: Number, required: true },
  Date: { type: Date, required: true },
  RemainingQuantity: { type: Number, default: 0 } // Make it optional and provide a default value
});

module.exports = mongoose.model('Transaction', transactionSchema);
