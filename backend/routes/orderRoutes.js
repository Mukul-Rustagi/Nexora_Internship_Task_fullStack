const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// @route   POST /api/orders/checkout
// @desc    Process checkout and create order
// @access  Public
router.post("/checkout", orderController.checkout);

// @route   GET /api/orders/user/:userId
// @desc    Get all orders for a user
// @access  Public (should be protected in production)
router.get("/user/:userId", orderController.getUserOrders);

module.exports = router;

