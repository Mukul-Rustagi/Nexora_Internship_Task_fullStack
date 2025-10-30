const Cart = require("../models/Cart");
const productService = require("./productService");

/**
 * Get or create cart for user
 * @param {String} userId - User ID
 * @returns {Promise<Object>} Cart data with formatted response
 */
const getCart = async (userId) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  return {
    items: cart.items,
    totalAmount: cart.totalAmount,
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
  };
};

/**
 * Add item to cart
 * @param {String} userId - User ID
 * @param {Number} productId - Product ID
 * @param {Number} quantity - Quantity to add
 * @returns {Promise<Object>} Updated cart data
 */
const addToCart = async (userId, productId, quantity) => {
  // Find the product
  const product = await productService.getProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  // Find or create cart
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  // Check if product already in cart
  const existingItemIndex = cart.items.findIndex(
    (item) => item.productId === productId
  );

  if (existingItemIndex > -1) {
    // Update quantity
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  }

  await cart.save();

  return {
    items: cart.items,
    totalAmount: cart.totalAmount,
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
  };
};

/**
 * Update cart item quantity
 * @param {String} userId - User ID
 * @param {Number} productId - Product ID
 * @param {Number} quantity - New quantity
 * @returns {Promise<Object>} Updated cart data
 */
const updateCartItem = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId === productId
  );
  if (itemIndex === -1) {
    throw new Error("Item not found in cart");
  }

  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  return {
    items: cart.items,
    totalAmount: cart.totalAmount,
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
  };
};

/**
 * Remove item from cart
 * @param {String} userId - User ID
 * @param {Number} productId - Product ID
 * @returns {Promise<Object>} Updated cart data
 */
const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter((item) => item.productId !== productId);
  await cart.save();

  return {
    items: cart.items,
    totalAmount: cart.totalAmount,
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
  };
};

/**
 * Clear cart
 * @param {String} userId - User ID
 * @returns {Promise<void>}
 */
const clearCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};

