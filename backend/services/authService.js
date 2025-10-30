const User = require("../models/User");

/**
 * Register a new user
 * @param {String} name - User's name
 * @param {String} email - User's email
 * @param {String} password - User's password
 * @returns {Promise<Object>} User object without password
 */
const registerUser = async (name, email, password) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Create new user (in production, hash password with bcrypt)
  const user = await User.create({
    name,
    email,
    password, // In production: await bcrypt.hash(password, 10)
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=6366f1&color=fff`,
  });

  // Return user without password
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    wishlist: user.wishlist,
    createdAt: user.createdAt,
  };
};

/**
 * Login user
 * @param {String} email - User's email
 * @param {String} password - User's password
 * @returns {Promise<Object>} User object without password
 */
const loginUser = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check password (in production, use bcrypt.compare)
  const isPasswordValid = user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Return user without password
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    wishlist: user.wishlist,
    createdAt: user.createdAt,
  };
};

/**
 * Get user by ID
 * @param {String} userId - User ID
 * @returns {Promise<Object>} User object without password
 */
const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

/**
 * Add product to wishlist
 * @param {String} userId - User ID
 * @param {Number} productId - Product ID
 * @returns {Promise<Object>} Updated user
 */
const addToWishlist = async (userId, productId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Check if already in wishlist
  if (user.wishlist.includes(productId)) {
    throw new Error("Product already in wishlist");
  }

  user.wishlist.push(productId);
  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    wishlist: user.wishlist,
  };
};

/**
 * Remove product from wishlist
 * @param {String} userId - User ID
 * @param {Number} productId - Product ID
 * @returns {Promise<Object>} Updated user
 */
const removeFromWishlist = async (userId, productId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.wishlist = user.wishlist.filter((id) => id !== productId);
  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    wishlist: user.wishlist,
  };
};

/**
 * Get wishlist products with full details
 * @param {String} userId - User ID
 * @returns {Promise<Array>} Array of wishlist products
 */
const getWishlistProducts = async (userId) => {
  const Product = require("../models/Product");
  
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Get full product details for all wishlist items
  const wishlistProducts = await Product.find({
    id: { $in: user.wishlist },
  });

  return wishlistProducts;
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  addToWishlist,
  removeFromWishlist,
  getWishlistProducts,
};

