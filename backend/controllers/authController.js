const authService = require("../services/authService");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const user = await authService.registerUser(name, email, password);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: user,
    });
  } catch (error) {
    if (error.message === "User with this email already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await authService.loginUser(email, password);

    res.json({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    if (error.message === "Invalid email or password") {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile/:id
// @access  Public (should be protected in production)
const getProfile = async (req, res) => {
  try {
    const user = await authService.getUserById(req.params.id);

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
};

// @desc    Add to wishlist
// @route   POST /api/auth/wishlist/:userId
// @access  Public (should be protected in production)
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const user = await authService.addToWishlist(userId, productId);

    res.json({
      success: true,
      message: "Added to wishlist",
      data: user,
    });
  } catch (error) {
    if (error.message === "Product already in wishlist") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error adding to wishlist",
      error: error.message,
    });
  }
};

// @desc    Remove from wishlist
// @route   DELETE /api/auth/wishlist/:userId/:productId
// @access  Public (should be protected in production)
const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await authService.removeFromWishlist(
      userId,
      parseInt(productId)
    );

    res.json({
      success: true,
      message: "Removed from wishlist",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing from wishlist",
      error: error.message,
    });
  }
};

// @desc    Get wishlist products
// @route   GET /api/auth/wishlist/:userId
// @access  Public (should be protected in production)
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlistProducts = await authService.getWishlistProducts(userId);

    res.json({
      success: true,
      data: wishlistProducts,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error fetching wishlist",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};

