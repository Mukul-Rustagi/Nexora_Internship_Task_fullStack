import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const authApi = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register new user
export const register = async (name, email, password) => {
  const response = await authApi.post('/register', { name, email, password });
  return response.data;
};

// Login user
export const login = async (email, password) => {
  const response = await authApi.post('/login', { email, password });
  return response.data;
};

// Get user profile
export const getProfile = async (userId) => {
  const response = await authApi.get(`/profile/${userId}`);
  return response.data;
};

// Add to wishlist
export const addToWishlist = async (userId, productId) => {
  const response = await authApi.post(`/wishlist/${userId}`, { productId });
  return response.data;
};

// Remove from wishlist
export const removeFromWishlist = async (userId, productId) => {
  const response = await authApi.delete(`/wishlist/${userId}/${productId}`);
  return response.data;
};

// Get wishlist products
export const getWishlist = async (userId) => {
  const response = await authApi.get(`/wishlist/${userId}`);
  return response.data;
};

export default authApi;

