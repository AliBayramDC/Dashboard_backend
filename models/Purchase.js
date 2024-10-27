const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  purchase_id: { type: Number, required: true, unique: true },
  ProductName: { type: String, required: true },
  QuantityPurchased: { type: Number, required: true },
  Date: { type: Date, required: true }
});

module.exports = mongoose.model('Purchase', purchaseSchema);
