const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", authController.register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", authController.login);

// @route   GET /api/auth/profile/:id
// @desc    Get user profile
// @access  Public
router.get("/profile/:id", authController.getProfile);

// @route   GET /api/auth/wishlist/:userId
// @desc    Get user's wishlist products
// @access  Public
router.get("/wishlist/:userId", authController.getWishlist);

// @route   POST /api/auth/wishlist/:userId
// @desc    Add product to wishlist
// @access  Public
router.post("/wishlist/:userId", authController.addToWishlist);

// @route   DELETE /api/auth/wishlist/:userId/:productId
// @desc    Remove product from wishlist
// @access  Public
router.delete(
  "/wishlist/:userId/:productId",
  authController.removeFromWishlist
);

module.exports = router;

