const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// Get all stock items
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new stock item
router.post('/', async (req, res) => {
  const stock = new Stock(req.body);
  try {
    const newStock = await stock.save();
    res.status(201).json(newStock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
