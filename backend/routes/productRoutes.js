const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get("/", productController.getAllProducts);

module.exports = router;

