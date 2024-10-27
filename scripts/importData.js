const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Transaction = require('../models/Transaction');
const transactions = require('../data/transactions.json');

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const importData = async () => {
  try {
    await Transaction.deleteMany();

    // Add default RemainingQuantity if it's not present in the data
    const transactionsWithRemainingQuantity = transactions.map(transaction => ({
      ...transaction,
      RemainingQuantity: transaction.RemainingQuantity || 0
    }));

    await Transaction.insertMany(transactionsWithRemainingQuantity);

    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData();
