const Order = require("../models/Order");
const cartService = require("./cartService");

/**
 * Generate unique order ID
 * @returns {String} Unique order ID
 */
const generateOrderId = () => {
  return `ORD-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;
};

/**
 * Calculate total amount from cart items
 * @param {Array} cartItems - Array of cart items
 * @returns {Number} Total amount
 */
const calculateTotal = (cartItems) => {
  return cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
};

/**
 * Process checkout and create order
 * @param {String} userId - User ID (can be guest-user or actual user ID)
 * @param {String} customerName - Customer name
 * @param {String} customerEmail - Customer email
 * @param {Array} cartItems - Cart items
 * @returns {Promise<Object>} Order receipt
 */
const processCheckout = async (
  userId,
  customerName,
  customerEmail,
  cartItems
) => {
  // Calculate total
  const totalAmount = calculateTotal(cartItems);

  // Generate order ID
  const orderId = generateOrderId();

  // Prepare order data
  const orderData = {
    orderId,
    customerName,
    customerEmail,
    items: cartItems,
    totalAmount,
    orderDate: new Date(),
  };

  // Add userId if it's not a guest user
  if (userId && userId !== "guest-user") {
    orderData.userId = userId;
  }

  // Create order
  const order = await Order.create(orderData);

  // Clear cart after successful order
  await cartService.clearCart(userId);

  // Generate receipt
  const receipt = {
    orderId: order.orderId,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    items: order.items,
    totalAmount: order.totalAmount,
    orderDate: order.orderDate,
    status: order.status,
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    message:
      "Thank you for your order! We will send you a confirmation email shortly.",
  };

  return receipt;
};

/**
 * Get order by ID
 * @param {String} orderId - Order ID
 * @returns {Promise<Object>} Order object
 */
const getOrderById = async (orderId) => {
  const order = await Order.findOne({ orderId });
  return order;
};

/**
 * Get all orders for a user by email
 * @param {String} customerEmail - Customer email
 * @returns {Promise<Array>} Array of orders
 */
const getOrdersByEmail = async (customerEmail) => {
  const orders = await Order.find({ customerEmail }).sort({ createdAt: -1 });
  return orders;
};

/**
 * Get all orders for a user by userId
 * @param {String} userId - User ID
 * @returns {Promise<Array>} Array of orders
 */
const getOrdersByUserId = async (userId) => {
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  return orders;
};

module.exports = {
  processCheckout,
  getOrderById,
  getOrdersByEmail,
  getOrdersByUserId,
};

