const Stock = require('../models/Stock');

const updateStockForPurchase = async (productName, quantityPurchased) => {
  const stockItem = await Stock.findOne({ ProductName: productName });
  if (stockItem) {
    stockItem.StockQuantity += quantityPurchased;
    await stockItem.save();
  } else {
    throw new Error('Product not found in stock');
  }
};

module.exports = updateStockForPurchase;
