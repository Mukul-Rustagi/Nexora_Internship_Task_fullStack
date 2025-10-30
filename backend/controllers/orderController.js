const orderService = require("../services/orderService");

// @desc    Process checkout and create order
// @route   POST /api/orders/checkout
// @access  Public
const checkout = async (req, res) => {
  try {
    const { customerName, customerEmail, cartItems, userId } = req.body;

    // Validation
    if (!customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: "Customer name and email are required",
      });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const receipt = await orderService.processCheckout(
      userId || "guest-user",
      customerName,
      customerEmail,
      cartItems
    );

    res.json({
      success: true,
      message: "Order placed successfully",
      data: receipt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing checkout",
      error: error.message,
    });
  }
};

// @desc    Get orders by user ID
// @route   GET /api/orders/user/:userId
// @access  Public (should be protected in production)
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || userId === "undefined" || userId === "null") {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const orders = await orderService.getOrdersByUserId(userId);

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

module.exports = {
  checkout,
  getUserOrders,
};

