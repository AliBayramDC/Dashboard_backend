const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const updateStockForTransaction = require('../utils/updateStockForTransaction');

// Route to fetch unique ProductName values
router.get('/unique-product-names', async (req, res) => {
  try {
    const uniqueProductNames = await Transaction.distinct('ProductName');
    res.json(uniqueProductNames);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Get all transactions with pagination
router.get('/', async (req, res) => {
  const { page = 1, limit = 100 } = req.query;
  try {
    const transactions = await Transaction.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Transaction.countDocuments();
    res.json({
      transactions,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new transaction
router.post('/', async (req, res) => {
  try {
    const transactionData = req.body;
    delete transactionData.RemainingQuantity; // Ensure RemainingQuantity is not set from request body
    const transaction = new Transaction(transactionData);
    await updateStockForTransaction(transaction);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to fetch sales summary within a date range
router.get('/sales-summary', async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const salesSummary = await Transaction.aggregate([
      { 
        $match: {
          Date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      { 
        $group: {
          _id: '$ProductName',
          salesSum: { $sum: '$Sales' }
        }
      },
      {
        $project: {
          _id: 0,
          ProductName: '$_id',
          salesSum: 1
        }
      }
    ]);
    res.json(salesSummary);
  } catch (error) {
    console.error('Error fetching sales summary:', error); // Debug log

    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;
