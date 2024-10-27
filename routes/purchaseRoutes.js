const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const updateStockForPurchase = require('../utils/updateStockForPurchase');

// Get all purchases
router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new purchase
router.post('/', async (req, res) => {
  const purchase = new Purchase(req.body);
  try {
    const newPurchase = await purchase.save();
    await updateStockForPurchase(purchase.ProductName, purchase.QuantityPurchased);
    res.status(201).json(newPurchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
