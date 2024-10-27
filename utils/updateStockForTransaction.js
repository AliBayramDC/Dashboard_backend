const Stock = require('../models/Stock');
const Transaction = require('../models/Transaction');

const updateStockForTransaction = async (transaction) => {
  try {
    // Fetch the stock item for the given product
    const stockItem = await Stock.findOne({ ProductName: transaction.ProductName });

    if (!stockItem) {
      throw new Error(`Product not found in stock: ${transaction.ProductName}`);
    }

    console.log(`Current stock quantity for ${transaction.ProductName}: ${stockItem.StockQuantity}`);

    // Update stock quantity
    stockItem.StockQuantity -= transaction.QuantitySold;
    console.log(`New stock quantity for ${transaction.ProductName}: ${stockItem.StockQuantity}`);

    // Save the updated stock quantity
    await stockItem.save();

    // Update transaction's RemainingQuantity
    transaction.RemainingQuantity = stockItem.StockQuantity;
    console.log(`RemainingQuantity for transaction: ${transaction.RemainingQuantity}`);

    // Save the transaction
    await transaction.save();
  } catch (error) {
    console.error('Error updating stock for transaction:', error);
    throw error;
  }
};

module.exports = updateStockForTransaction;
