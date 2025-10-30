const cartService = require("../services/cartService");

// @desc    Get cart
// @route   GET /api/cart
// @access  Public
const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart("guest-user");
    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const cart = await cartService.addToCart("guest-user", productId, quantity);

    res.json({
      success: true,
      message: "Item added to cart successfully",
      data: cart,
    });
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Public
const updateCartItem = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Valid quantity is required",
      });
    }

    const cart = await cartService.updateCartItem(
      "guest-user",
      productId,
      quantity
    );

    res.json({
      success: true,
      message: "Cart updated successfully",
      data: cart,
    });
  } catch (error) {
    if (
      error.message === "Cart not found" ||
      error.message === "Item not found in cart"
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message,
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Public
const removeFromCart = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const cart = await cartService.removeFromCart("guest-user", productId);

    res.json({
      success: true,
      message: "Item removed from cart successfully",
      data: cart,
    });
  } catch (error) {
    if (error.message === "Cart not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};

