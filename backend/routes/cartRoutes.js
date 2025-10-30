const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// @route   GET /api/cart
// @desc    Get cart
// @access  Public
router.get("/", cartController.getCart);

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Public
router.post("/", cartController.addToCart);

// @route   PUT /api/cart/:id
// @desc    Update cart item quantity
// @access  Public
router.put("/:id", cartController.updateCartItem);

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart
// @access  Public
router.delete("/:id", cartController.removeFromCart);

module.exports = router;

