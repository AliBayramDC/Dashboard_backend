const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get unique ProductName values
router.get('/unique-product-names', async (req, res) => {
  try {
    const uniqueProductNames = await Transaction.distinct('ProductName');
    res.json(uniqueProductNames);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
